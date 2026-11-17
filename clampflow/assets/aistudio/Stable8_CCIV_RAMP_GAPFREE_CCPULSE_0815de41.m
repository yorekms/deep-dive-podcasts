%% 1. Import File & Global Sampling Logic
[fileName,path] = uigetfile('*.abf', 'abf files');
if isequal(fileName,0), return; end 
pathFileName = fullfile(path, fileName);
[data,si,h] = abfload(pathFileName);
run_id = datestr(now,'yyyymmdd_HHMMSS_FFF');
outDir = path; % write CSVs next to ABF by default

% --- GLOBAL SAMPLING & SCALING ---
sampling_multiplier = 0.5; 
actual_si = si * sampling_multiplier; 
sampling_rate = 1 / (actual_si * 1e-6); 
dt_ms = actual_si / 1000; 
voltage_scaling = 1.0; % Correct for x1.00 headstage

[i,o,u] = size(data);
Timemat = (0:i-1)' * dt_ms; 

%% 2. Select Analysis
% Re-ordered so "Current Pulse" sits directly under Gapfree
list={'CCIV Standard','Current Clamp Ramp','Current Clamp Gapfree',...
      'Current Pulse','Repetitive Stimulation','CCIV_Hyperpol',...
      'Evoke_Neuron_Stimulation','CCIV_FirstAP'};
[index, tf] = listdlg('PromptString','Select Type of Analysis','ListString', list, 'SelectionMode', 'single');
if ~tf, return; end

%% 3. ANALYSIS ROUTER
switch index
    case 1 % CCIV Standard
        do_cciv_analysis_full(data, Timemat, dt_ms, voltage_scaling, fileName, h, si, outDir, run_id);
    case 2 % Ramp
		% Wrap ramp in try/catch so errors are visible in Command Window
		try
			do_ramp_analysis_robust(data, Timemat, dt_ms, voltage_scaling, fileName, si, outDir, run_id);
		catch ME_ramp
			warning('Ramp analysis failed: %s', ME_ramp.message);
			for k = 1:numel(ME_ramp.stack)
				warning('  at %s (line %d)', ME_ramp.stack(k).name, ME_ramp.stack(k).line);
			end
		end
    case 3 % Gapfree
        do_gapfree_analysis_full(data, Timemat, dt_ms, voltage_scaling, fileName, si, outDir, run_id);
    case 4 % Current Pulse
        do_current_pulse_analysis(data, Timemat, voltage_scaling, fileName, outDir, run_id);
    case 5 % Repetitive Stimulation
        do_reliability_analysis_full(data, voltage_scaling, fileName, outDir, run_id);
    case 6 % CCIV_Hyperpol
        do_hyperpol_analysis_full(data, Timemat, voltage_scaling, fileName, outDir, run_id);
    case 7 % Evoke_Neuron_Stimulation
        do_evoked_analysis_full(data, dt_ms, sampling_rate, voltage_scaling, fileName, outDir, run_id);
    case 8 % CCIV_FirstAP
        do_first_ap_analysis_full(data, Timemat, dt_ms, voltage_scaling, fileName, si, outDir, run_id);
end

%% --- MASTER FUNCTIONS ---

function do_cciv_analysis_full(data, Timemat, dt_ms, v_scale, fName, h, raw_si, outDir, run_id)
    try
        curr_start = h.fEpochInitLevel(2);
        curr_step  = h.fEpochLevelInc(2);
    catch
        prompt = {'Start Current (pA):','Current Step (pA):'};
        answer = inputdlg(prompt,'CCIV Protocol',[1 35],{'-40','20'});
        if isempty(answer), return; end
        curr_start = str2double(answer{1});
        curr_step  = str2double(answer{2});
    end

    [~,~,u] = size(data);
    nCh = size(data,2); % number of channels

    delta_v_vec = [];
    i_step_vec  = [];

    rheobase = NaN;
    tau_ms   = NaN;
    apd50    = NaN;
    up_v     = NaN;
    down_v   = NaN;

    threshold_cciv = NaN;
    extras_cciv = struct();

    % --- Per-sweep exports (CCIV) ---
    spike_count_vec       = nan(u,1);
    spike_count_total_vec = nan(u,1); % total detected peaks (whole sweep)
    firing_rate_hz_vec    = nan(u,1);
    first_latency_ms_vec  = nan(u,1); % from sweep start (ms)
    first_latency_from_step_ms_vec = nan(u,1); % from step onset (ms)
    mean_isi_ms_vec       = nan(u,1);
    median_isi_ms_vec     = nan(u,1);
    first_isi_ms_vec      = nan(u,1);

    % Variable-length per-sweep vectors (stored as strings for LONG CSV)
    isi_list_str          = strings(u,1);
    spike_times_ms_str    = strings(u,1);

    % For raster/heatmap plots
    spike_times_ms_cell   = cell(u,1);
    isi_ms_cell           = cell(u,1);

    tau_candidate_ms_vec  = nan(u,1); % tau per subthreshold sweep (for selection)
    current_vec           = nan(u,1);

    % Phase plot export decimation factor (1 = full data; higher = smaller files)
    phase_export_decim = 5;

    for sweep = 1:u
        % If user exited (closed all figures), stop cleanly
        if isempty(findall(0,'Type','figure')) && sweep > 1
            break;
        end

        % Always initialize these each sweep (prevents step-window carryover bugs)
        p_start = NaN; p_end = NaN;
        v_base  = NaN; v_ss  = NaN; dv = NaN;

        current_pA = curr_start + (sweep-1) * curr_step;
        current_pA = ensure_pA(current_pA); % auto-fix nA->pA if needed

        v_raw = data(:,1,sweep) * v_scale;
        v_raw = ensure_mV(v_raw); % auto-fix V->mV if needed

        % Keep a lightly-smoothed version for display & spike detection,
        % and a slightly more smoothed trace for dV/dt stability.
        z = smooth(v_raw, 2);
        v_for_dv = smooth(v_raw, 5);

        dvdt = [0; diff(v_for_dv)] / dt_ms; % mV/ms (numerically == V/s)

        % Export phase-plot data for this sweep (V vs dV/dt, plus time/current)
        try
            export_cciv_phase_data_per_sweep(outDir, fName, run_id, sweep, current_pA, Timemat, v_raw, dvdt, phase_export_decim);
        catch
            % If export fails (permissions/path), keep analysis running
        end


        % -------------------------
        % Spike detection (OLD method)
        % -------------------------
        minDist_ms   = 2;
        minDist_samp = max(1, round(minDist_ms/dt_ms));
        minProm_mV   = 20;
        minHeight_mV = -20;

        if max(z) <= minHeight_mV
            pks = []; locs = [];
        else
            [pks, locs] = findpeaks(z, ...
                'MinPeakDistance',   minDist_samp, ...
                'MinPeakProminence', minProm_mV, ...
                'MinPeakHeight',     minHeight_mV);
        end

        % Total spike count (entire sweep)
        spike_count_total_vec(sweep) = numel(pks);
        % Robust step timing & current amplitude (unchanged)
        % -------------------------
        i_for_rin = current_pA;
        best = struct('p_on',NaN,'p_off',NaN,'dI_pA',NaN,'score',-Inf,'ch',NaN);

        if nCh >= 2
            for ch = 2:nCh
                cmd_try = data(:,ch,sweep);
                [p_on0, p_off0, dI0] = detect_step_from_command(cmd_try, dt_ms);
                score0 = abs(dI0);
                if isfinite(score0) && score0 > best.score
                    best.p_on = p_on0;
                    best.p_off = p_off0;
                    best.dI_pA = dI0;
                    best.score = score0;
                    best.ch = ch;
                end
            end
        end

        if isfinite(best.score) && best.score > 0
            [dv_new, v_base_new, v_ss_new] = dv_from_windows(z, best.p_on, best.p_off, dt_ms);
            if ~isnan(best.dI_pA), i_for_rin = best.dI_pA; end

            % Only accept if dv_new is valid; otherwise we force fallback below
            if ~isnan(dv_new)
                p_start = best.p_on;
                p_end   = best.p_off;
                v_base  = v_base_new;
                v_ss    = v_ss_new;
                dv      = dv_new;
            end
        end

        % Fallback if command channel fails OR dv_new was NaN OR p_start/p_end not set
        if ~isfinite(p_start) || ~isfinite(p_end) || p_end <= p_start
            v_diff = abs(diff(z));
            [~, p_start] = max(v_diff(1:round(length(z)*0.6)));
            p_start = p_start + 1;

            s_win = p_start + round(50/dt_ms);
            if s_win < numel(v_diff)
                [~, p_end_rel] = max(v_diff(s_win:end));
                p_end = p_end_rel + s_win;
            else
                p_end = min(numel(z), p_start + round(200/dt_ms)); % conservative fallback
            end

            p_end = min(numel(z), max(p_end, p_start+1));

            v_base = mean(z(max(1,p_start-10):max(1,p_start-2)));
            v_ss   = mean(z(max(1,p_end-20):max(1,p_end-2)));
            dv     = v_ss - v_base;
        end

        % -------------------------
        % Rin collection (subthreshold)
        % -------------------------
        if isempty(pks) && isfinite(dv) && isfinite(i_for_rin)
            if abs(dv) <= 40
                delta_v_vec = [delta_v_vec; dv];
                i_step_vec  = [i_step_vec;  current_pA]; % use protocol current (pA) for Rin fit
            end
        end

        % -------------------------
        % Rheobase + features on first spiking sweep
        % -------------------------
        if ~isempty(pks) && isnan(rheobase)
            rheobase = current_pA;

            RMP0 = v_base;
            fs = 1000/dt_ms;

            [thr0, pk0, apd0, up0, down0, amp0, ahp0, ov0, ahpDepth0, p2t0] = detect_ap_features_sub(v_raw, RMP0, fs);

            if ~isnan(apd0)
                apd50 = apd0;
            else
                [apd50, ~, ~] = kinetics_from_peak(z, dvdt, locs(1), dt_ms);
            end

            if ~isnan(up0),   up_v   = up0;   end
            if ~isnan(down0), down_v = down0; end

            threshold_cciv = thr0;

            extras_cciv = struct();
            extras_cciv.RMP_mV         = RMP0;
            extras_cciv.Peak_mV        = pk0;
            extras_cciv.Overshoot_mV   = ov0;
            extras_cciv.Undershoot_mV  = ahp0;
            extras_cciv.AHP_Depth_mV   = ahpDepth0;
            extras_cciv.Amplitude_mV   = amp0;
            extras_cciv.PeakToTrough_ms= p2t0;
        end
        % Tau candidate: only from non-spiking sweeps with a clear hyperpolarizing response
        if isempty(pks) && isfinite(dv) && dv < 0
            tau_candidate_ms_vec(sweep) = calculate_tau(v_raw, p_start, p_end, dt_ms);
        end
        % -------------------------
        % CCIV metrics for export (TOTAL spikes per sweep; no step-window counting)
        % -------------------------
        current_vec(sweep) = current_pA;

        % Total spikes over the entire sweep (what we care about)
        spike_count_vec(sweep) = numel(locs);

        % Firing rate over the entire sweep duration
        sweep_dur_s = max(eps, numel(z) * dt_ms / 1000);
        firing_rate_hz_vec(sweep) = spike_count_vec(sweep) / sweep_dur_s;

        % Latency / ISI metrics
        if ~isempty(locs)
            % Latency to first spike from sweep start (ms)
            first_latency_ms_vec(sweep) = (locs(1) - 1) * dt_ms;

            % Latency to first spike from STEP onset (ms) (preferred for CCIV)
            if isfinite(p_start)
                first_latency_from_step_ms_vec(sweep) = (locs(1) - p_start) * dt_ms;
            end

            % Spike times (ms) for raster (from sweep start)
            spike_times_ms = (locs(:) - 1) * dt_ms;
            spike_times_ms_cell{sweep} = spike_times_ms;
            spike_times_ms_str(sweep) = strjoin(string(round(spike_times_ms,3)), ';');

            % Inter-spike intervals (ms)
            isi_ms = diff(locs(:)) * dt_ms;
            isi_ms_cell{sweep} = isi_ms;
            if ~isempty(isi_ms)
                mean_isi_ms_vec(sweep)   = mean(isi_ms, 'omitnan');
                median_isi_ms_vec(sweep) = median(isi_ms, 'omitnan');
                first_isi_ms_vec(sweep)  = isi_ms(1);
                isi_list_str(sweep)      = strjoin(string(round(isi_ms,3)), ';');
            else
                isi_list_str(sweep) = "";
            end
        end


        % -------------------------
        % Display

        % -------------------------
        fig = figure(sweep);
        fig.Position = [100 100 1150 750];

        subplot(2,2,1); hold on;
        text(0.1,0.9, ['Spikes: ', num2str(numel(pks))], ...
            'FontSize', 12, 'Color', 'b', 'FontWeight', 'bold');
        text(0.1,0.7, ['Current: ', num2str(i_for_rin), ' pA']);
        text(0.1,0.5, ['Rheobase: ', num2str(rheobase), ' pA']);
        text(0.1,0.3, ['APD50: ', num2str(apd50, '%.2f'), ' ms']);
        text(0.1,0.1, ['Down: ', num2str(down_v, '%.1f'), ' V/s']);
        title('Sweep Metrics'); axis off;

        subplot(2,2,3);
        plot(Timemat, z, 'k'); hold on;
        % Plot ALL detected peaks (black open circles)
        if ~isempty(locs)
            plot(Timemat(locs), z(locs), 'ko', 'MarkerSize', 4);
        end

        grid on; title('Voltage + Peaks (all spikes counted)');

        subplot(2,2,4);
        plot(z(1:end-1), dvdt(1:end-1), 'b');
        title('Phase Plane'); grid on;

        uicontrol('Style', 'pushbutton', 'String', 'Next Sweep', ...
            'Units', 'normalized', 'Position', [0.85 0.92 0.12 0.05], ...
            'Callback', 'uiresume(gcf)');

        uicontrol('Style', 'pushbutton', 'String', 'EXIT', ...
            'Units', 'normalized', 'Position', [0.85 0.86 0.12 0.05], ...
            'Callback', 'delete(findall(0,''Type'',''figure''));');

        uiwait(fig);
    end
    % Select Tau from the most hyperpolarizing valid subthreshold sweep (more stable than sweep 1)
    if any(isfinite(tau_candidate_ms_vec))
        tau_ok = isfinite(tau_candidate_ms_vec) & isfinite(current_vec) & spike_count_vec==0;
        if any(tau_ok)
            % prefer most negative current (largest hyperpolarizing step)
            [~, ix] = min(current_vec(tau_ok));
            cand_idx = find(tau_ok);
            tau_ms = tau_candidate_ms_vec(cand_idx(ix));
        else
            tau_ms = tau_candidate_ms_vec(find(isfinite(tau_candidate_ms_vec),1,'first'));
        end
    end


    % -------------------------
    % Export + report
    % -------------------------
    if ~isempty(delta_v_vec) || ~isnan(rheobase)
        valid = isfinite(i_step_vec) & isfinite(delta_v_vec);

        if sum(valid) >= 2
            p = polyfit(i_step_vec(valid), delta_v_vec(valid), 1);
            Rin = abs(p(1) * 1000);
            fprintf('CCIV Rin: %.2f MOhms (fit n=%d)\n', Rin, sum(valid));
        else
            Rin = NaN;
            fprintf('CCIV Rin: NaN (insufficient valid steps for fit)\n');
        end

        % Filter only analyzed sweeps (prevents NaN rows / mismatched CSV if EXIT early)
        analyzed = isfinite(current_vec) & isfinite(spike_count_vec);


% -------------------------
% Max firing rate sweep (CCIV)
% -------------------------
try
    fr_used = firing_rate_hz_vec(analyzed);
    if any(isfinite(fr_used))
        [max_fr, rel_idx] = max(fr_used);
        idx_list = find(analyzed);
        sweep_at_max_fr = idx_list(rel_idx);
        extras_cciv.MaxFiringRate_Hz = max_fr;
        extras_cciv.SweepAtMaxFiringRate = sweep_at_max_fr;
        extras_cciv.CurrentAtMaxFiringRate_pA = current_vec(sweep_at_max_fr);
    end
catch
    % If anything goes wrong, don't block export/report.
end

        % Export per-sweep CCIV metrics (TOTAL spikes per sweep)
        % Keep both SpikeCount_Step and SpikeCount_Total populated (same value),
        % but ensure FiringRate and Latency are not mis-assigned.
        export_cciv_per_sweep_metrics( ...
            fName, ...
            current_vec(analyzed), ...
            spike_count_vec(analyzed), ...            % SpikeCount_Step
            firing_rate_hz_vec(analyzed), ...         % FiringRate_Hz
            first_latency_ms_vec(analyzed), ...       % FirstSpikeLatency_ms (from sweep start)
            spike_count_vec(analyzed), ...            % SpikeCount_Total
            outDir, ...
            first_latency_from_step_ms_vec(analyzed), ...
            mean_isi_ms_vec(analyzed), ...
            median_isi_ms_vec(analyzed), ...
            first_isi_ms_vec(analyzed), ...
            isi_list_str(analyzed), ...
            spike_times_ms_str(analyzed));

        % -------------------------
        % CCIV Spike Raster + ISI Heatmap (integration)
        % -------------------------
        try
            % Restrict to analyzed sweeps only
            spike_times_cell_used = spike_times_ms_cell(analyzed);
            isi_ms_cell_used      = isi_ms_cell(analyzed);
            current_used          = current_vec(analyzed);

            export_cciv_spike_raster_and_isi_heatmap(outDir, fName, run_id, current_used, spike_times_cell_used, isi_ms_cell_used);
        catch MEplot
            warning('Raster/ISI plot export failed. %s', MEplot.message);
        end



        try
            print_and_save_report( ...
                fName, 'CCIV', Rin, tau_ms, rheobase, apd50, up_v, down_v, ...
                outDir, run_id, NaN, threshold_cciv, extras_cciv);
        catch ME
            warning('Report/CSV export failed (permission/path issue). %s', ME.message);
        end
    end

    post_analysis_prompt('CCIV Standard', outDir);

end

function do_ramp_analysis_robust(data, Timemat, dt_ms, v_scale, fName, raw_si, outDir, run_id)
    % Use RAW voltage for peak location/plotting (true peak), and a lightly-smoothed trace for derivatives
    v_raw = data(:,1,1) * v_scale;
    v_raw = ensure_mV(v_raw);

    v_smooth = smooth(v_raw, 2);            % mild smoothing for display/threshold stability
    v_for_dv = smooth(v_raw, 5);            % a bit more smoothing for dV/dt
    dvdt_Vs  = [0; diff(v_for_dv)] / dt_ms; % V/s (numerically == mV/ms)

    v = v_smooth; % keep variable name 'v' for the rest of this function (threshold uses this)

    % -------------------------
    % Ramp spike detection (for total AP count / ISI / latency)
    % -------------------------
    minDist_ms   = 2;
    minDist_samp = max(1, round(minDist_ms/dt_ms));
    minProm_mV   = 20;
    minHeight_mV = -20;

    if max(v_smooth) <= minHeight_mV
        pks_all = []; locs_all = [];
    else
        [pks_all, locs_all] = findpeaks(v_smooth, ...
            'MinPeakDistance',   minDist_samp, ...
            'MinPeakProminence', minProm_mV, ...
            'MinPeakHeight',     minHeight_mV);
    end

    ramp_total_spikes = numel(locs_all);
    ramp_first_latency_ms = NaN;
    ramp_mean_isi_ms = NaN;
    ramp_first_isi_ms = NaN;
    if ~isempty(locs_all)
        ramp_first_latency_ms = (locs_all(1) - 1) * dt_ms;
        isi_ms = diff(locs_all(:)) * dt_ms;
        if ~isempty(isi_ms)
            ramp_mean_isi_ms = mean(isi_ms, 'omitnan');
            ramp_first_isi_ms = isi_ms(1);
        end
    end


		f1 = figure('Name','Ramp: Peak Selection');
    plot(Timemat, v_raw, 'b'); grid on;
    title('Click near the PEAK of the FIRST spike (coarse)');

    % Add close button + robust click capture (avoids getting stuck in ginput)
    setappdata(f1,'macro_x', NaN);
    setappdata(f1,'cancelled', false);
		% Ensure clicking the window close "X" cancels cleanly (prevents silent uiwait lockups)
		set(f1, 'CloseRequestFcn', @(~,~) ramp_cancel_and_close(f1));
    uicontrol(f1, 'Style','pushbutton','String','Close','Units','normalized', ...
        'Position',[0.88 0.93 0.10 0.05], 'Callback', @(~,~) ramp_cancel_and_close(f1));

    % Prevent UI-mode lockups (zoom/pan/datacursor) stealing click focus
    figure(f1); zoom off; pan off; datacursormode off; set(f1,'Pointer','crosshair'); drawnow;

    % Capture a click anywhere on the axes
    ax = gca;
    set(f1, 'WindowButtonDownFcn', @(~,~) ramp_capture_click(f1, ax));
    uiwait(f1);

    macro_x = getappdata(f1,'macro_x');
    cancelled = getappdata(f1,'cancelled');
    if ishandle(f1), close(f1); end
    drawnow;

    if cancelled || isnan(macro_x)
        fprintf('Ramp selection cancelled.\n');
        return;
    end

    click_idx = max(1, min(numel(v), round(macro_x / dt_ms)));

    % Refine peak (use a wider window and RAW voltage so the red dot lands on the true peak)
    w_pre  = round(30/dt_ms); w_post = round(30/dt_ms);
    w1 = max(1, click_idx - w_pre); w2 = min(numel(v_raw), click_idx + w_post);
    [~, pk_rel] = max(v_raw(w1:w2));
    peak_idx = w1 + pk_rel - 1;

    [~, up_v, down_v] = kinetics_from_peak(v_raw, dvdt_Vs, peak_idx, dt_ms);
    apd50 = apd50_single_spike(v_raw, peak_idx, dt_ms);
% --- IMPROVED KINK DETECTION (D2V/Dt2) ---
    search_win = max(1, peak_idx - round(12/dt_ms)) : peak_idx;
    v_search = v(search_win);
    dv_search = dvdt_Vs(search_win);
    d2v = [0; diff(dv_search)] / dt_ms; % Acceleration
    
    [max_accel, max_accel_idx] = max(d2v);
    accel_crit = 0.15 * max_accel; % Raise to avoid overly-low thresholds (tune 0.10–0.25)
    k_rel = find(d2v(1:max_accel_idx) >= accel_crit, 1, 'first');
    
    if ~isempty(k_rel)
        thr_idx = search_win(k_rel);
        threshold = v_raw(thr_idx); % report threshold on the raw trace
    else
        % Fallback to standard dV/dt threshold if acceleration is too noisy
        k_fallback = find(dv_search >= 15, 1, 'first');
        if ~isempty(k_fallback)
            thr_idx = search_win(k_fallback);
            threshold = v_raw(thr_idx); % report threshold on the raw trace
        else
            threshold = NaN; thr_idx = 1;
        end
    end


    % Enforce a minimum dV/dt at threshold so it doesn't land too early
    if ~isnan(threshold)
        min_dvdt_for_thr = 20; % V/s (tune 15–30)
        if dvdt_Vs(thr_idx) < min_dvdt_for_thr
            k2 = find(dv_search >= min_dvdt_for_thr, 1, 'first');
            if ~isempty(k2)
                thr_idx   = search_win(k2);
                threshold = v_raw(thr_idx);
            end
        end
    end

    f2 = figure('Name','Ramp: First Spike Diagnostics');
    subplot(2,1,1); hold on;
    plot(Timemat, v_raw, 'k');
    plot(Timemat(peak_idx), v_raw(peak_idx), 'ro', 'MarkerFaceColor', 'r');
    if ~isnan(threshold)
        plot(Timemat(thr_idx), v_raw(thr_idx), 'go', 'MarkerFaceColor', 'g', 'MarkerSize', 8);
        legend({'V','Peak','Threshold (Kink)'}, 'Location','best');
    end
    xlabel('ms'); ylabel('mV'); grid on; title('Threshold Detection (Kink method)');

    subplot(2,1,2); hold on;
    plot(Timemat, dvdt_Vs, 'b'); xline(Timemat(peak_idx), '--r');
    xlabel('ms'); ylabel('V/s'); grid on;

    % Add an explicit close button (this window is informational only)
    uicontrol(f2, 'Style','pushbutton','String','Close','Units','normalized',...
        'Position',[0.88 0.93 0.10 0.05], 'Callback', @(~,~) close(f2));

    % Rin & Tau estimate from ramp command (robust; does not require threshold)
    Rin = NaN; Tau = NaN;
    nCh = size(data,2);
    if nCh >= 2
        cmd = data(:,2,1);
        cmd_pA = ensure_pA(cmd);

        % Use a pre-spike window for Rin (avoid the spike itself)
        w_end = max(1, peak_idx - round(5/dt_ms));
        w_start = max(1, w_end - round(300/dt_ms)); % ~300 ms window
        if w_end > w_start + 20
            I = cmd_pA(w_start:w_end);
            V = v_raw(w_start:w_end);
            good = isfinite(I) & isfinite(V);

            % If command is near-constant (all zeros), polyfit will fail -> keep NaN
            if sum(good) > 50 && (max(I(good)) - min(I(good))) > 1
                p = polyfit(I(good), V(good), 1);
                Rin = abs(p(1) * 1000); % mV/pA -> GOhm; *1000 -> MOhm
            end
        end

        % Try to detect an actual step (some ramp protocols include a pre-step)
        [p_on, p_off, ~] = detect_step_from_command(cmd, dt_ms);
        if isfinite(p_on) && isfinite(p_off) && p_off > p_on && p_on < peak_idx
            if (p_off - p_on) * dt_ms >= 50  % at least 50 ms long
                Tau = calculate_tau(v_raw, p_on, p_off, dt_ms);
            end
        end
    end

    fprintf('\n--- RAMP REPORT (%s) ---\n', fName);
    fprintf('Rin: %.2f MOhms | Tau: %.2f ms | Threshold: %.2f mV\n', Rin, Tau, threshold);

    % Additional AP metrics (first spike)
    fs = 1000/dt_ms;
        % Local baseline just before the first spike (ramp Vm is rising, so global pre-windows bias APD)
    b2 = max(1, peak_idx - round(5/dt_ms));
    b1 = max(1, peak_idx - round(25/dt_ms));
    RMP = median(v_raw(b1:b2));

    [th2, pk2, apd2, up2, down2, amp2, ahp2, ov2, ahpDepth2, p2t2] = detect_ap_features_sub(v_raw, RMP, fs);
    % Prefer kink-threshold if available; otherwise derivative/amplitude fallback
    if ~isnan(threshold), th2 = threshold; end

    rise_ms = NaN;
    if ~isnan(th2)
        thr_idx2 = find(v_raw >= th2, 1, 'first');
        if ~isempty(thr_idx2)
            rise_ms = (peak_idx - thr_idx2) / fs * 1000;
        end
    end
    peak_to_rmp_ms = NaN;
    i_rmp = find(v_raw(peak_idx:end) <= RMP, 1, 'first');
    if ~isempty(i_rmp), peak_to_rmp_ms = (i_rmp-1) / fs * 1000; end

    extras = struct();
    extras.TotalSpikes = ramp_total_spikes;
    extras.FirstSpikeLatency_ms = ramp_first_latency_ms;
    extras.MeanISI_ms = ramp_mean_isi_ms;
    extras.FirstISI_ms = ramp_first_isi_ms;
    extras.RMP_mV = RMP;
    extras.Peak_mV = pk2;
    extras.Overshoot_mV = ov2;
    extras.Undershoot_mV = ahp2;
    extras.AHP_Depth_mV = ahpDepth2;
    extras.Amplitude_mV = amp2;
    extras.RiseTime_ms = rise_ms;
    extras.PeakToTrough_ms = p2t2;
    extras.PeakToRMP_ms = peak_to_rmp_ms;

    print_and_save_report(fName, 'Ramp', Rin, Tau, NaN, apd2, up2, down2, outDir, run_id, NaN, th2, extras);

    % Also echo the new ramp spiking metrics explicitly in the Command Window
    % (so they are visible even if print_and_save_report is unchanged).
    fprintf('Ramp spiking: Total APs = %d | Latency to 1st AP = %.3f ms | Mean ISI = %.3f ms\n', ...
        ramp_total_spikes, ramp_first_latency_ms, ramp_mean_isi_ms);
    post_analysis_prompt('Ramp', outDir);


    % --- UI helpers for Ramp peak selection ---
    function ramp_capture_click(figH, axH)
        if ~ishandle(figH) || ~ishandle(axH), return; end
        cp = get(axH,'CurrentPoint');
        setappdata(figH,'macro_x', cp(1,1));
        uiresume(figH);
    end

    function ramp_cancel_and_close(figH)
        if ~ishandle(figH), return; end
        setappdata(figH,'cancelled', true);
        % IMPORTANT: if we override CloseRequestFcn, MATLAB will not close
        % the window unless we explicitly delete it here.
        try
            if strcmpi(get(figH,'WaitStatus'),'waiting')
                uiresume(figH);
            end
        catch
            % no-op
        end
        try
            delete(figH);
        catch
            % no-op
        end
    end

end
function do_gapfree_analysis_full(data, Timemat, dt_ms, v_scale, fName, raw_si, outDir, run_id)
    sweep_data = data(:,1,1) * v_scale;
    sweep_data = ensure_mV(sweep_data);
    v_rmp = median(sweep_data); 
    minHeight_mV = -20; minProm_mV = 20; minDist = round(2/dt_ms);
    if max(sweep_data) <= minHeight_mV
        pks = []; locs = [];
    else
        [pks, locs] = findpeaks(sweep_data, 'MinPeakDistance', minDist, ...
                                'MinPeakProminence', minProm_mV, 'MinPeakHeight', minHeight_mV);
    end
    spike_count = length(pks); spike_freq = spike_count / (max(Timemat)/1000);
    fprintf('\n--- GAPFREE REPORT (%s) ---\n', fName);
    fprintf('RMP (median): %.2f mV | Spikes: %d | Freq: %.3f Hz\n', v_rmp, spike_count, spike_freq);
    avg_apd = NaN; avg_up = NaN;
    if ~isempty(pks)
        dvdt_gap = [0; diff(sweep_data)] / dt_ms;
        [avg_apd, avg_up, ~] = calculate_kinetics(sweep_data, dvdt_gap, locs(1), dt_ms);
    end
    f_gap = figure('Name', ['Gapfree: ', fName]);
    uicontrol(f_gap, 'Style','pushbutton','String','Close','Units','normalized',...
        'Position',[0.88 0.93 0.10 0.05], 'Callback', @(~,~) close(f_gap));
    plot(Timemat/1000, sweep_data, 'k'); hold on;
    if ~isempty(pks), plot(Timemat(locs)/1000, pks, 'ro'); end
    line([Timemat(1)/1000 Timemat(end)/1000], [v_rmp v_rmp], 'Color', 'g', 'LineWidth', 1.5);
    title(sprintf('RMP: %.1f mV | Spike Count: %d', v_rmp, spike_count));
    names = {'RMP_Median_mV', 'SpikeCount', 'SpikeFreq_Hz', 'APD50_ms', 'Upstroke_Vs'};
    vals = [v_rmp, spike_count, spike_freq, avg_apd, avg_up];
    accumulate_to_csv(fName, 'Gapfree', names, vals, outDir, run_id);
    post_analysis_prompt('Gapfree', outDir);
end

function do_reliability_analysis_full(data, v_scale, fName, outDir, run_id), disp('Reliability Placeholder'); end
function do_hyperpol_analysis_full(data, Timemat, v_scale, fName, outDir, run_id), disp('Hyperpol Placeholder'); end

function do_current_pulse_analysis(data, Timemat, v_scale, fName, outDir, run_id)
    [nSamp, nCh, nSweeps] = size(data);
    dt_ms = Timemat(2) - Timemat(1);
    use_cmd = (nCh >= 2);

    prompt = {'Start Current (pA):','Current Step (pA):'};
    answer = inputdlg(prompt,'Current Pulse Protocol',[1 45],{'100','5'});
    if isempty(answer), return; end
    curr_start = str2double(answer{1});
    curr_step  = str2double(answer{2});

    I_pA      = nan(nSweeps,1);
    apd50_ms  = nan(nSweeps,1);
    up_Vs     = nan(nSweeps,1);
    down_Vs   = nan(nSweeps,1);
    vth_mV    = nan(nSweeps,1);

    fig = [];
    for sweep = 1:nSweeps
        v_raw = data(:,1,sweep) * v_scale;
        v_raw = ensure_mV(v_raw);
        v = smooth(v_raw, 2);
        v = ensure_mV(v);
p_on  = round(0.2*nSamp); p_off = round(0.8*nSamp);
        % Expected protocol value (what the user typed)
        I_expected = ensure_pA(curr_start + (sweep-1)*curr_step);
        I_pA(sweep) = I_expected;

        if use_cmd
            cmd = data(:,2,sweep);
            [p_on0, p_off0, dI_pA0] = detect_step_from_command(cmd, dt_ms);
            if ~isnan(p_on0), p_on = p_on0; p_off = p_off0; end

            % (Do not overwrite protocol current level with command-derived amplitude)
        end

        seg = v(p_on:p_off);
        minHeight_mV = -20; minProm_mV = 20; minDist = round(2/dt_ms);
        if max(seg) <= minHeight_mV
            pks = []; locs_rel = [];
        else
            [pks, locs_rel] = findpeaks(seg, 'MinPeakDistance', minDist, ...
                                        'MinPeakProminence', minProm_mV, 'MinPeakHeight', minHeight_mV);
        end
        locs = locs_rel + p_on - 1;
        if ~isempty(locs)
            peak_idx = locs(1);
            dvdt_Vs = [0; diff(v)] / dt_ms;
            [apd50_ms(sweep), up_Vs(sweep), down_Vs(sweep)] = kinetics_from_peak(v, dvdt_Vs, peak_idx, dt_ms);
            pre = max(1, peak_idx - round(5/dt_ms));
            dv_pre = dvdt_Vs(pre:peak_idx);
            k = find(dv_pre >= 20, 1, 'first');
            if ~isempty(k), vth_mV(sweep) = v(pre + k - 1); end
        end

        if sweep == 1 || isempty(fig) || ~isvalid(fig)
            fig = figure('Name','Current Pulse Viewer'); fig.Position = [100 100 1200 650];
        else figure(fig); end
        clf(fig); subplot(2,1,1); hold on; plot(Timemat, v_raw, 'k');
        xline(Timemat(p_on), '--'); xline(Timemat(p_off), '--');
        if ~isempty(locs), plot(Timemat(locs), v_raw(locs), 'ro'); end
        title(sprintf('Sweep %d | I=%.1f pA', sweep, I_pA(sweep)));
        subplot(2,1,2); axis off; hold on;
        text(0.02, 0.65, sprintf('Injected I: %.2f pA', I_pA(sweep)), 'FontSize', 12);
        if ~isempty(locs)
            text(0.02, 0.45, sprintf('Vth (est): %.2f mV', vth_mV(sweep)), 'FontSize', 12);
            text(0.02, 0.30, sprintf('APD50: %.2f ms', apd50_ms(sweep)), 'FontSize', 12);
            text(0.02, 0.15, sprintf('Up: %.1f V/s | Down: %.1f V/s', up_Vs(sweep), down_Vs(sweep)), 'FontSize', 12);
        else text(0.02, 0.30, 'No spikes detected', 'FontSize', 12); end
        uicontrol('Style','pushbutton','String','Next Sweep','Units','normalized','Position',[0.85 0.92 0.12 0.05],'Callback','uiresume(gcf)');
        uicontrol('Style','pushbutton','String','EXIT','Units','normalized','Position',[0.85 0.86 0.12 0.05],'Callback','delete(findall(0,''Type'',''figure''));');
        uiwait(fig);
    end

    figFI = figure('Name','AP Kinetics Summary'); ok = ~isnan(I_pA) & ~isnan(apd50_ms);
    if any(ok)
        [I_sorted, ix] = sort(I_pA(ok)); apd_sorted = apd50_ms(ok); apd_sorted = apd_sorted(ix);
        plot(I_sorted, apd_sorted, 'o-'); xlabel('pA'); ylabel('APD50 (ms)'); grid on;
    end
    fprintf('\n--- CURRENT PULSE REPORT: %s ---\n', fName);
    fprintf('Sweep\tI_pA\tVth_mV\tAPD50_ms\tUp_Vs\tDown_Vs\n');
    for s = 1:nSweeps
        fprintf('%d\t%.2f\t%.2f\t%.2f\t%.2f\t%.2f\n', s, I_pA(s), vth_mV(s), apd50_ms(s), up_Vs(s), down_Vs(s));
    end

    % ---- CSV export (per-sweep, accumulating) ----
    T = table();
    T.Date = repmat(datetime('now'), nSweeps, 1);
    T.RunID = repmat(string(run_id), nSweeps, 1);
    T.File = repmat(string(fName), nSweeps, 1);
    T.Sweep = (1:nSweeps)';
    T.Current_pA = I_pA;
    T.Threshold_mV = vth_mV;
    T.APD50_ms = apd50_ms;
    T.Upstroke_Vs = up_Vs;
    T.Downstroke_Vs = down_Vs;

    longFile = fullfile(outDir, 'CurrentPulse_PerSweep_LONG.csv');
    if exist(longFile,'file')
        T0 = readtable(longFile, 'TextType','string');
        T = [T0; T];
    end
    writetable(T, longFile);

    snapFile = fullfile(outDir, sprintf('Run_%s_CurrentPulse_PerSweep.csv', run_id));
    writetable(T, snapFile);

    post_analysis_prompt('Current Pulse', outDir);

end

function do_evoked_analysis_full(data, dt_ms, fs, v_scale, fName, outDir, run_id)
    sweep_data = data(:, 1, 1) * v_scale; sweep_data = ensure_mV(sweep_data); time_s = (0:length(sweep_data)-1) * (dt_ms/1000);
    figure('Name','Evoked'); plot(time_s, sweep_data, 'b'); 
    title('Zoom, Press Enter, then Click Baseline Start');
    zoom on; pause; zoom off; [selected_x, selected_y] = ginput(1); [~, b_idx] = min(abs(time_s - selected_x));
    down_idx = find(sweep_data(b_idx:end) <= selected_y, 1, 'first') + b_idx - 1;
    if isempty(down_idx), down_idx = length(sweep_data); end
    time_int = time_s(b_idx:down_idx); auc_vals = sweep_data(b_idx:down_idx) - selected_y; AUC = trapz(time_int, auc_vals) * 1000; 
    [thresh, ~, apd50, up_v, down_v, ~, ~] = detect_ap_features_sub(sweep_data, selected_y, fs);
    print_and_save_report(fName, 'Evoked', NaN, NaN, NaN, apd50, up_v, down_v, AUC, thresh, outDir, run_id);
end

function do_first_ap_analysis_full(data, Timemat, dt_ms, v_scale, fName, raw_si, outDir, run_id), disp('FirstAP Placeholder'); end

%% --- HELPERS ---

function [apd50, up_v, down_v] = calculate_kinetics(z, dvdt, spk_idx, dt_ms)
    [apd50, up_v, down_v] = kinetics_from_peak(z, dvdt, spk_idx, dt_ms);
end

function [AP_thresh, AP_peak, APD50, up_v, down_v, amp, ahp, overshoot, ahp_depth, peak_to_trough_ms] = detect_ap_features_sub(sweep_data, RMP, fs)
    % Improved single-AP feature extraction (more robust threshold + APD50).
    %
    % Key adjustments (helps CCIV):
    %   - Threshold is adaptive to baseline dV/dt noise (prevents "early" thresholds)
    %   - Uses a sustain requirement on dV/dt (rejects single-sample noise)
    %   - APD50 uses linear interpolation at half-amplitude crossings (reduces bias)
    %   - dV/dt computed on a lightly-filtered copy, while voltages reported on raw

    AP_thresh = NaN; AP_peak = NaN; APD50 = NaN;
    up_v = NaN; down_v = NaN; amp = NaN; ahp = NaN;
    overshoot = NaN; ahp_depth = NaN; peak_to_trough_ms = NaN;

    if isempty(sweep_data) || all(~isfinite(sweep_data))
        return;
    end

    v_raw = sweep_data(:);
    v_filt = smooth(v_raw, 2); % very light smoothing for detection
% Peak on raw (true peak)
    [AP_peak, p_idx] = max(v_raw);
    if isempty(p_idx) || ~isfinite(AP_peak) || p_idx < 2
        return;
    end

    amp = AP_peak - RMP;
    overshoot = AP_peak; % relative to 0 mV

    % dV/dt (V/s) from a minimally smoothed trace using a central difference
    v_dv = smooth(v_raw, 2);
    dvdt_Vs = gradient(v_dv, 1000/fs); % mV/ms numerically equals V/s
    up_v = max(dvdt_Vs(1:max(2,p_idx)));
    down_v = min(dvdt_Vs(p_idx:end));

    % Afterhyperpolarization (AHP) on raw
    % NOTE:
    %   Using the minimum from peak->end of sweep can yield unrealistically large
    %   "peak-to-trough" times (e.g., hundreds of ms) in CCIV/Ramp protocols
    %   where the membrane slowly drifts/hyperpolarizes later in the sweep.
    %   To make this physiologically meaningful, we constrain the trough search
    %   to a short post-peak window.
    ahp_search_window_ms = 30; % <-- adjust if you prefer (e.g., 20–50 ms)
    ahp_end = min(numel(v_raw), p_idx + round(ahp_search_window_ms * fs / 1000));
    [ahp, ahp_rel] = min(v_raw(p_idx:ahp_end));
    ahp_idx = p_idx + ahp_rel - 1;
    ahp_depth = RMP - ahp;
    peak_to_trough_ms = (ahp_idx - p_idx) / fs * 1000;

    % -------------------------
    % Adaptive threshold detection
    % -------------------------
    search_end = min(numel(v_raw), p_idx);
    search_start = max(1, p_idx - round(15 * fs / 1000)); % 15 ms before peak

    % Baseline window just before the search region
    base_end = max(2, search_start - 1);
    base_start = max(1, base_end - round(8 * fs / 1000)); % 8 ms baseline
    dv_base = dvdt_Vs(base_start:base_end);
    v_base  = v_filt(base_start:base_end);

    dv_mu = mean(dv_base, 'omitnan');
    dv_sd = std(dv_base,  'omitnan');
    v_sd  = std(v_base,   'omitnan');

    % Typical starting point 20 V/s, but raise if baseline noise is high
    dvdt_thr_Vs = max(20, dv_mu + 6 * dv_sd);
    dvdt_thr_Vs = min(dvdt_thr_Vs, 120); % cap to avoid impossible thresholds

    % Voltage guard relative to RMP (raise if baseline voltage is noisy)
    v_guard_mV = max(6, 6 * v_sd);

    % Sustain requirement (>= 0.3 ms above threshold)
    sustain_samp = max(1, round(0.3 * fs / 1000));

    dv_seg = dvdt_Vs(search_start:search_end);
    v_seg  = v_filt(search_start:search_end);

    cand = find(dv_seg >= dvdt_thr_Vs & v_seg >= (RMP + v_guard_mV));
    thr_idx = [];
    if ~isempty(cand)
        for k = 1:numel(cand)
            ii = cand(k);
            jj = min(numel(dv_seg), ii + sustain_samp - 1);
            if all(dv_seg(ii:jj) >= dvdt_thr_Vs) && all(diff(v_seg(max(1,ii-2):jj)) >= -0.2)
                thr_idx = search_start + ii - 1;
                break;
            end
        end
    end

    if ~isempty(thr_idx)
        AP_thresh = v_raw(thr_idx); % report threshold on raw
    else
        % Fallback: 10% amplitude crossing (only if amplitude is meaningful)
        if isfinite(amp) && amp > 8
            t_idx = find(v_filt(1:search_end) > RMP + 0.10 * amp, 1, 'first');
            if ~isempty(t_idx)
                AP_thresh = v_raw(t_idx);
            end
        end
    end

    % -------------------------
    % APD50 (half-width) with interpolation
    % -------------------------
    if isfinite(amp) && amp > 8 && p_idx > 2
        if isfinite(AP_thresh)
            half_level = AP_thresh + 0.5 * (AP_peak - AP_thresh); % half-height from threshold
        else
            half_level = RMP + 0.5 * amp; % fallback
        end

        % Pre-peak crossing (last sample below half)
        i1b = find(v_filt(1:p_idx) <= half_level, 1, 'last');
        if ~isempty(i1b) && i1b < p_idx
            i1a = i1b + 1;
            % Linear interpolation between i1b and i1a
            y0 = v_filt(i1b); y1 = v_filt(i1a);
            if y1 ~= y0
                t1 = (i1b - 1) + (half_level - y0) / (y1 - y0);
            else
                t1 = i1b - 1;
            end
        else
            t1 = NaN;
        end

        % Post-peak crossing (first sample below half)
        i2a_rel = find(v_filt(p_idx:end) <= half_level, 1, 'first');
        if ~isempty(i2a_rel)
            i2a = p_idx + i2a_rel - 1;
            i2b = max(p_idx, i2a - 1);
            y0 = v_filt(i2b); y1 = v_filt(i2a);
            if y1 ~= y0
                t2 = (i2b - 1) + (half_level - y0) / (y1 - y0);
            else
                t2 = i2a - 1;
            end
        else
            t2 = NaN;
        end

        if isfinite(t1) && isfinite(t2) && t2 > t1
            APD50 = (t2 - t1) / fs * 1000; % ms
        end
    end
end

function print_and_save_report(fName, type, Rin, Tau, Rheo, APD, Up, Down, outDir, run_id, varargin)
    fprintf('\n--- %s REPORT ---\n', type);
    fprintf('Rin: %.2f MOhms | Tau: %.2f ms | Rheobase: %.1f pA\n', Rin, Tau, Rheo);
    if ~isnan(APD) && APD >= 50
        fprintf('APD50: %.2f ms (%.3f s) | Up: %.1f V/s | Down: %.1f V/s\n', APD, APD/1000, Up, Down);
    else
        fprintf('APD50: %.3f ms | Up: %.1f V/s | Down: %.1f V/s\n', APD, Up, Down);
    end

    % Optional extras:
    %   varargin{1} = AUC (numeric)
    %   varargin{2} = Threshold (numeric)
    %   varargin{3} = struct of additional metrics (fields = names, values = numbers)
    auc = NaN; thresh = NaN; extras = struct();
    if numel(varargin) >= 1 && ~isempty(varargin{1}), auc = varargin{1}; end
    if numel(varargin) >= 2 && ~isempty(varargin{2}), thresh = varargin{2}; end
    if numel(varargin) >= 3 && isstruct(varargin{3}), extras = varargin{3}; end

    vals  = [Rin, Tau, Rheo, APD, Up, Down, auc, thresh];
    names = {'Rin_MOhms','Tau_ms','Rheobase_pA','APD50_ms','Upstroke_Vs','Downstroke_Vs','AUC_mVms','Thresh_mV'};

    % Append extras (stable order)
    fns = fieldnames(extras);
    for i = 1:numel(fns)
        nm = fns{i};
        vv = extras.(nm);
        if ~isscalar(vv) || ~isnumeric(vv), continue; end
        names{end+1} = nm; %#ok<AGROW>
        vals(end+1)  = vv; %#ok<AGROW>
        fprintf('%s: %.3f\n', nm, vv);
    end

    accumulate_to_csv(fName, type, names, vals, outDir, run_id);
end

function accumulate_to_csv(fName, type, names, values, outDir, run_id)
    dt = datetime('now');

    % Safety: ensure names and values have matching lengths (prevent table assignment errors)
    nNames = numel(names); nVals = numel(values);
    n = max(nNames, nVals);
    names = names(:); values = values(:);
    if nNames < n, names(end+1:n,1) = {''}; end
    if nVals  < n, values(end+1:n,1) = NaN; end

    % If any blank metric names exist, fill them with generic placeholders
    for ii = 1:n
        if isempty(names{ii}), names{ii} = sprintf('Metric_%02d', ii); end
    end

    type_clean = regexprep(type, '[^A-Za-z0-9]+', '_');

    % Ensure outDir exists (when possible)
    if ~exist(outDir, 'dir')
        try, mkdir(outDir); catch, end
    end

    % Try writing to requested outDir first; if that fails (e.g., network permissions),
    % fall back to a local user-writable folder.
    wrote_ok = false;
    lastErr = [];

    for attempt = 1:2
        try
            longFile = fullfile(outDir, 'Master_Ephys_Results_LONG.csv');
            L = table();
            L.Date = repmat(dt, numel(names), 1);
            L.File = repmat({fName}, numel(names), 1);
            L.Analysis = repmat({type}, numel(names), 1);
            L.Metric = names(:);
            L.Value = values(:);

            if exist(longFile, 'file')
                L0 = readtable(longFile, 'TextType', 'string');
                L = [L0; L];
            end
            writetable(L, longFile);

            wideFile = fullfile(outDir, sprintf('Master_%s.csv', type_clean));
            W = table(dt, {fName}, {type}, 'VariableNames', {'Date','File','Analysis'});

            % Make wide table as a SINGLE ROW with one variable per metric
            vn = matlab.lang.makeValidName(names);
            vn = matlab.lang.makeUniqueStrings(vn);
            W = [W, array2table(values(:).', 'VariableNames', vn)];

            if exist(wideFile, 'file')
                W0 = readtable(wideFile, 'TextType', 'string');
                [W0, W] = reconcile_tables_helper(W0, W);
                W = [W0; W];
            end
            writetable(W, wideFile);

            % Also write a per-run snapshot (unique filename) so nothing ever overwrites
            snapFile = fullfile(outDir, sprintf('Run_%s_%s.csv', run_id, type_clean));
            writetable(W, snapFile);

            wrote_ok = true;
            break;

        catch ME
            lastErr = ME;

            % Fallback on second attempt
            if attempt == 1
                try
                    outDir = fullfile(userpath, 'EphysExports');
                    if ~exist(outDir, 'dir'), mkdir(outDir); end
                catch
                    outDir = fullfile(tempdir, 'EphysExports');
                    if ~exist(outDir, 'dir'), mkdir(outDir); end
                end
            end
        end
    end

    if ~wrote_ok && ~isempty(lastErr)
        warning('Could not write CSV outputs (permission/path issue). Last error: %s', lastErr.message);
    end
end

% --- RECONCILIATION HELPER ---
function [T1, T2] = reconcile_tables_helper(T1, T2)
    v1 = T1.Properties.VariableNames; v2 = T2.Properties.VariableNames;
    m1 = setdiff(v2, v1); 
    for i = 1:numel(m1)
        T1.(m1{i}) = repmat(missing_val_logic(T2, m1{i}), height(T1), 1); 
    end
    m2 = setdiff(v1, v2); 
    for i = 1:numel(m2)
        T2.(m2{i}) = repmat(missing_val_logic(T1, m2{i}), height(T2), 1); 
    end
    T1 = T1(:, sort(T1.Properties.VariableNames)); 
    T2 = T2(:, sort(T2.Properties.VariableNames));
end

function val = missing_val_logic(T, nm)
    if isstring(T.(nm)) || iscell(T.(nm)), val = ""; else, val = NaN; end
end

function post_analysis_prompt(typeLabel, outDir)
    try
        msg = sprintf('Saved/updated CSVs in:\n%s', outDir);
        choice = questdlg([msg sprintf('\n\nClose all figures?')], [typeLabel ' finished'], ...
                          'Close all','Keep open','Keep open');
        if strcmp(choice,'Close all')
            close all;
        end
    catch
        % If running headless or questdlg fails, do nothing.
    end
end

function tau = calculate_tau(z, p_start, p_end, dt_ms)
    % Fast/robust tau estimation for hyperpolarizing steps (CCIV).
    %
    % Why this version:
    %   - Avoids the onset capacitive artifact (skips first ~2 ms)
    %   - Avoids Ih/sag contamination by estimating V_inf from an EARLY window
    %     (typically 40–60 ms after onset), then measuring tau from the early decay.
    %   - Uses a 63.2% time-to-target with interpolation; falls back to an early
    %     exponential fit if needed.
    %
    % z       : mV
    % p_start : step onset index
    % p_end   : step offset index
    % dt_ms   : ms/sample

    tau = NaN;
    n = numel(z);
    if any(isnan([p_start p_end])) || p_end <= p_start || p_start < 3 || p_end > n
        return;
    end

    % Baseline (pre-step)
    b1 = max(1, p_start - round(30/dt_ms));
    b2 = max(1, p_start - round(5/dt_ms));
    if b2 <= b1, return; end
    v_base = median(z(b1:b2));

    % Early "steady state" estimate to reduce sag bias:
    % Prefer 40–60 ms after onset; if step is short, use the last 20 ms.
    e1 = p_start + round(40/dt_ms);
    e2 = p_start + round(60/dt_ms);
    if e1 < p_end - 5 && e2 < p_end - 5
        v_inf = median(z(e1:e2));
    else
        s1 = max(p_start+5, p_end - round(25/dt_ms));
        s2 = max(s1+1, p_end - round(5/dt_ms));
        if s2 <= s1, return; end
        v_inf = median(z(s1:s2));
    end

    dv = v_inf - v_base;

    % Only for clear hyperpolarizing deflections
    if ~isfinite(dv) || dv >= 0 || abs(dv) < 1
        return;
    end

    % Target at 63.2% of the way from baseline to v_inf (hyperpolarizing)
    v_target = v_base + (1 - exp(-1)) * dv;

    % Search window: skip ~2 ms artifact; cap to first 80 ms after onset
    s0 = p_start + max(1, round(2/dt_ms));
    sN = min(p_end - 1, p_start + round(80/dt_ms));
    if sN <= s0 + 3, return; end

    seg = z(s0:sN);

    % For hyperpolarizing step, we look for first time seg <= v_target
    idx = find(seg <= v_target, 1, 'first');

    if ~isempty(idx) && idx > 1
        % Linear interpolation between idx-1 and idx
        v0 = seg(idx-1); v1 = seg(idx);
        t0 = (s0 + idx - 2 - p_start) * dt_ms;
        t1 = (s0 + idx - 1 - p_start) * dt_ms;

        if v1 ~= v0
            frac = (v_target - v0) / (v1 - v0);
            tau = t0 + frac * (t1 - t0);
        else
            tau = t1;
        end
        return;
    end

    % Fallback: early exponential fit on normalized decay (2–50 ms)
    fit_start = s0;
    fit_end   = min(p_end - round(10/dt_ms), p_start + round(50/dt_ms));
    if fit_end <= fit_start + 6, return; end

    y = z(fit_start:fit_end) - v_inf;  % positive then decays toward 0
    y0 = v_base - v_inf;               % positive
    if ~isfinite(y0) || y0 <= 0, return; end

    y = y / y0;
    t = ((fit_start:fit_end)' - p_start) * dt_ms;

    keep = isfinite(y) & y > 0.20 & y < 0.90;
    if sum(keep) < 8
        keep = isfinite(y) & y > 0.10 & y < 0.95;
    end
    if sum(keep) < 8, return; end

    X = [ones(sum(keep),1), t(keep)];
    beta = X \ log(y(keep));
    slope = beta(2);
    if ~isfinite(slope) || slope >= 0, return; end

    tau = -1 / slope; % ms
end



function x_mV = ensure_mV(x)
    if max(abs(x)) < 1.5, x_mV = x * 1000; else, x_mV = x; end
end

function i_pA = ensure_pA(i_raw)
    % Attempt to coerce command/current values into pA.
    a = max(abs(i_raw(:)));
    if a == 0 || ~isfinite(a)
        i_pA = i_raw;
        return;
    end
    if a < 1e-6
        i_pA = i_raw * 1e12;   % A -> pA
    elseif a < 1
        i_pA = i_raw * 1000;   % nA -> pA
    else
        i_pA = i_raw;          % assume already pA
    end
end

function [p_on, p_off, dI_pA] = detect_step_from_command(cmd, dt_ms)
    cmd = cmd(:); dcmd = abs([0; diff(cmd)]);
    thr = 0.3 * max(dcmd); idx = find(dcmd >= thr);
    if isempty(idx), p_on=NaN; p_off=NaN; dI_pA=NaN; return; end
    p_on = idx(1); p_off = idx(end);
    % RIN FIX: ensure base/step windows are clean
    base_win = max(1, p_on - round(20/dt_ms)) : max(1, p_on - round(5/dt_ms));
    step_win = max(1, p_off - round(55/dt_ms)) : max(1, p_off - round(5/dt_ms));
    i_base = median(cmd(base_win)); i_step = median(cmd(step_win));
    dI_pA = ensure_pA(i_step - i_base);
end

function [dv_mV, v_base, v_ss] = dv_from_windows(v_mV, p_on, p_off, dt_ms)
    n = numel(v_mV);
    if any(isnan([p_on p_off])) || p_off <= p_on, dv_mV=NaN; v_base=NaN; v_ss=NaN; return; end
    % RIN FIX: Stabilize windows for steady-state
    b1 = max(1, p_on - round(30/dt_ms)); b2 = max(1, p_on - round(5/dt_ms));
    s1 = max(1, p_off - round(55/dt_ms)); s2 = max(1, p_off - round(5/dt_ms));
    v_base = median(v_mV(b1:b2)); v_ss = median(v_mV(s1:s2));
    dv_mV = v_ss - v_base;
end

function [apd50_ms, up_Vs, down_Vs] = kinetics_from_peak(v_mV, dvdt_Vs, peak_idx, dt_ms)
    pre = max(1, peak_idx - round(5/dt_ms)); post = min(numel(v_mV), peak_idx + round(5/dt_ms));
    up_Vs = max(dvdt_Vs(pre:peak_idx)); down_Vs = min(dvdt_Vs(peak_idx:post));
    b1 = max(1, peak_idx - round(20/dt_ms)); b2 = max(1, peak_idx - round(5/dt_ms));
    v_base = median(v_mV(b1:b2)); v_peak = v_mV(peak_idx); v_half = v_base + 0.5*(v_peak - v_base);
    up_idx = find(v_mV(b1:peak_idx) >= v_half, 1, 'first') + b1 - 1;
    down_idx = find(v_mV(peak_idx:end) <= v_half, 1, 'first') + peak_idx - 1;
    if ~isempty(up_idx) && ~isempty(down_idx), apd50_ms = (down_idx - up_idx) * dt_ms; else, apd50_ms = NaN; end
end

function export_cciv_per_sweep_metrics(fName, current_vec, spike_count_step_vec, firing_rate_hz_vec, first_latency_ms_vec, varargin)
    % Exports CCIV per-sweep metrics
    % Supports:
    %   export_cciv_per_sweep_metrics(fName, I, spikesStep, fr, lat, outDir)
    %   export_cciv_per_sweep_metrics(fName, I, spikesStep, fr, lat, spikesTotal, outDir)
    % Also writes a WIDE accumulating table (per file = new columns).

    spike_count_total_vec = [];
    outDir = pwd;

    % New optional fields (aligned with call site in do_cciv_analysis_full)
    first_latency_from_step_ms_vec = [];
    mean_isi_ms_vec   = [];
    median_isi_ms_vec = [];
    first_isi_ms_vec  = [];
    isi_list_str      = [];
    spike_times_ms_str= [];

    % Backwards-compatible varargin parsing:
    %   Old: (outDir) or (spikesTotal, outDir)
    %   New: (spikesTotal, outDir, stepLat, meanISI, medianISI, firstISI, isiListStr, spikeTimesStr)
    if numel(varargin) >= 1
        if ischar(varargin{1}) || isstring(varargin{1})
            % Old style: only outDir provided
            outDir = varargin{1};
        else
            % New/old style: spikesTotal first
            spike_count_total_vec = varargin{1};
            if numel(varargin) >= 2
                outDir = varargin{2};
            end
            if numel(varargin) >= 3, first_latency_from_step_ms_vec = varargin{3}; end
            if numel(varargin) >= 4, mean_isi_ms_vec   = varargin{4}; end
            if numel(varargin) >= 5, median_isi_ms_vec = varargin{5}; end
            if numel(varargin) >= 6, first_isi_ms_vec  = varargin{6}; end
            if numel(varargin) >= 7, isi_list_str      = varargin{7}; end
            if numel(varargin) >= 8, spike_times_ms_str= varargin{8}; end
        end
    end

    good = isfinite(current_vec);
    if ~any(good)
        fprintf('No valid CCIV per-sweep metrics to export.\n');
        return;
    end

    I = current_vec(good);
    spikesStep = spike_count_step_vec(good);
    fr = firing_rate_hz_vec(good);
    lat = first_latency_ms_vec(good);

    if ~isempty(spike_count_total_vec)
        spikesTotal = spike_count_total_vec(good);
    else
        spikesTotal = nan(size(spikesStep));
    end

    if ~exist(outDir,'dir')
        try
            mkdir(outDir);
        catch
            fprintf('Warning: could not create outDir. Exporting to current folder instead.\n');
            outDir = pwd;
        end
    end

    % -----------------------
    % 1) LONG format
    % -----------------------
    longFile = fullfile(outDir, 'CCIV_PerSweep_LONG.csv');
    n = numel(I);
    Tlong = table();
    Tlong.Date = repmat(datetime('now'), n, 1);
    Tlong.File = repmat(string(fName), n, 1);
    Tlong.Sweep = (1:n)';
    Tlong.Current_pA = I(:);
    Tlong.SpikeCount_Step = spikesStep(:);
    Tlong.SpikeCount_Total = spikesTotal(:);
    Tlong.FiringRate_Hz = fr(:);
    Tlong.FirstSpikeLatency_ms = lat(:);

    % Optional extended metrics (may be empty if caller used old signature)
    if ~isempty(first_latency_from_step_ms_vec)
        Tlong.FirstSpikeLatencyFromStep_ms = first_latency_from_step_ms_vec(good);
    else
        Tlong.FirstSpikeLatencyFromStep_ms = nan(size(lat(:)));
    end

    if ~isempty(mean_isi_ms_vec)
        Tlong.MeanISI_ms = mean_isi_ms_vec(good);
    else
        Tlong.MeanISI_ms = nan(size(lat(:)));
    end

    if ~isempty(median_isi_ms_vec)
        Tlong.MedianISI_ms = median_isi_ms_vec(good);
    else
        Tlong.MedianISI_ms = nan(size(lat(:)));
    end

    if ~isempty(first_isi_ms_vec)
        Tlong.FirstISI_ms = first_isi_ms_vec(good);
    else
        Tlong.FirstISI_ms = nan(size(lat(:)));
    end

    if ~isempty(isi_list_str)
        Tlong.ISI_List_ms = isi_list_str(good);
    else
        Tlong.ISI_List_ms = repmat("", numel(I), 1);
    end

    if ~isempty(spike_times_ms_str)
        Tlong.SpikeTimes_ms = spike_times_ms_str(good);
    else
        Tlong.SpikeTimes_ms = repmat("", numel(I), 1);
    end

    if exist(longFile,'file')
        T0 = readtable(longFile, 'TextType','string');
        [T0, Tlong] = reconcile_tables_helper(T0, Tlong);
        Tlong = [T0; Tlong];
    end
    writetable(Tlong, longFile);

    % -----------------------
    % 2) WIDE accumulating format (per file = new columns)
    % -----------------------
    wideFile = fullfile(outDir, 'CCIV_PerSweep_WIDE.csv');

    base = regexprep(fName, '\.abf$', '');
    base = matlab.lang.makeValidName(base, 'ReplacementStyle','delete');

    c_spkStep  = matlab.lang.makeUniqueStrings([base '_SpikeCountStep']);
    c_spkTotal = matlab.lang.makeUniqueStrings([base '_SpikeCountTotal']);
    c_fr       = matlab.lang.makeUniqueStrings([base '_FiringRateHz']);
    c_lat      = matlab.lang.makeUniqueStrings([base '_FirstLatencyMs']);

    Tnew = table(I(:), spikesStep(:), spikesTotal(:), fr(:), lat(:), ...
        'VariableNames', {'Current_pA', c_spkStep, c_spkTotal, c_fr, c_lat});

    if exist(wideFile,'file')
        Tw = readtable(wideFile, 'TextType','string');

        % Ensure Current_pA is numeric
        if iscell(Tw.Current_pA) || isstring(Tw.Current_pA)
            Tw.Current_pA = str2double(string(Tw.Current_pA));
        end

        Tw2 = outerjoin(Tw, Tnew, 'Keys','Current_pA', 'MergeKeys',true, 'Type','full');
        Tw2 = sortrows(Tw2, 'Current_pA');
        writetable(Tw2, wideFile);
    else
        Tnew = sortrows(Tnew, 'Current_pA');
        writetable(Tnew, wideFile);
    end

    fprintf('Exported CCIV per-sweep metrics to:\n  %s\n  %s\n', longFile, wideFile);
end

function apd50_ms = apd50_single_spike(Vm, peak_idx, dt_ms)
% Compute APD50 (half-width) for ONE action potential around peak_idx.
    n = numel(Vm);
    if isempty(Vm) || ~isfinite(peak_idx) || peak_idx<1 || peak_idx>n
        apd50_ms = NaN; return;
    end
    pre_ms = 5; post_ms = 20;
    pre_samp = max(1, round(pre_ms/dt_ms)); post_samp = max(1, round(post_ms/dt_ms));
    i0 = max(1, peak_idx - pre_samp); i1 = min(n, peak_idx + post_samp);
    [Vpk, pk_local] = max(Vm(i0:i1)); pk = i0 + pk_local - 1;
    rmp_ms = 2; rmp_samp = max(5, round(rmp_ms/dt_ms));
    r0 = max(1, pk - rmp_samp); r1 = max(1, pk - 1);
    if r1 <= r0, apd50_ms = NaN; return; end
    RMP = median(Vm(r0:r1));
    amp = Vpk - RMP;
    
    % --- ACTION POTENTIAL FILTER ---
    if ~isfinite(amp) || amp <= 20
        apd50_ms = NaN; return;
    end
    Vhalf = RMP + 0.5*amp;
    rise_range = Vm(i0:pk); rise_rel = find(rise_range >= Vhalf, 1, 'first');
    if isempty(rise_rel), apd50_ms = NaN; return; end
    rise = i0 + rise_rel - 1;
    fall_range = Vm(pk:i1); fall_rel = find(fall_range <= Vhalf, 1, 'first');
    if isempty(fall_rel), apd50_ms = NaN; return; end
    fall = pk + fall_rel - 1;
    apd50_ms = (fall - rise) * dt_ms;
    
    % --- SANITY GUARD FOR RAMP ANALYSIS ---
    if apd50_ms > 15
        apd50_ms = NaN;
    end
end


function export_cciv_phase_data_per_sweep(outDir, fName, run_id, sweep, current_pA, Timemat, v_mV, dvdt_Vs, decim)
    % Export phase-plot data for one CCIV sweep.
    % Columns: Time_ms, Current_pA, V_mV, dVdt_Vs
    if nargin < 9 || isempty(decim) || decim < 1, decim = 1; end

    if ~exist(outDir,'dir')
        try, mkdir(outDir); catch, return; end
    end

    % Make a safe subfolder to keep files organized
    subDir = fullfile(outDir, sprintf('CCIV_PhaseData_%s', run_id));
    if ~exist(subDir,'dir')
        try, mkdir(subDir); catch, subDir = outDir; end
    end

    n = numel(v_mV);
    if numel(Timemat) ~= n || numel(dvdt_Vs) ~= n
        Timemat = (0:n-1)' * (Timemat(2)-Timemat(1)); %#ok<NASGU>
    end

    idx = 1:decim:n;

    T = table();
    T.Time_ms = Timemat(idx);
    T.Current_pA = repmat(current_pA, numel(idx), 1);
    T.V_mV = v_mV(idx);
    T.dVdt_Vs = dvdt_Vs(idx); % mV/ms numerically equals V/s

    fbase = regexprep(fName, '\.abf$', '');
    outFile = fullfile(subDir, sprintf('%s_CCIV_Phase_Sweep%03d_%s.csv', fbase, sweep, run_id));
    writetable(T, outFile);
end

function export_cciv_spike_raster_and_isi_heatmap(outDir, fName, run_id, current_vec, spike_times_ms_cell, isi_ms_cell)
    % Create and save:
    %  1) Spike raster plot (rows = steps/sweeps, ticks = spike times)
    %  2) ISI heatmap (X = step current, Y = interval number, color = ms)
    %
    % Also exports underlying ISI matrix + spike-time lists to CSV.

    if ~exist(outDir,'dir')
        try, mkdir(outDir); catch, outDir = pwd; end
    end

    fbase = regexprep(fName, '\.abf$', '');

    nSweeps = numel(current_vec);
    if nSweeps == 0, return; end

    % -------------------------
    % Spike raster
    % -------------------------
    fr = figure('Name','CCIV Spike Raster');
    hold on;
    for s = 1:nSweeps
        st = spike_times_ms_cell{s};
        if isempty(st), continue; end
        y = s * ones(size(st));
        plot(st, y, 'k.', 'MarkerSize', 10);
    end
    xlabel('Time (ms)');
    ylabel('Step # (analyzed order)');
    title('Spike Raster Plot');
    grid on;

    % Label y-ticks with current steps if not too many
    if nSweeps <= 60
        yticks(1:nSweeps);
        yticklabels(string(current_vec));
        ylabel('Step Current (pA)');
    end

    rasterFile = fullfile(outDir, sprintf('%s_CCIV_SpikeRaster_%s.png', fbase, run_id));
    try, saveas(fr, rasterFile); catch, end

    % -------------------------
    % ISI heatmap
    % -------------------------
    maxN = 0;
    for s = 1:nSweeps
        maxN = max(maxN, numel(isi_ms_cell{s}));
    end
    if maxN < 1
        % No ISIs (no sweeps with >=2 spikes)
        close(fr);
        return;
    end

    isiMat = nan(maxN, nSweeps);
    for s = 1:nSweeps
        isi = isi_ms_cell{s};
        if isempty(isi), continue; end
        isiMat(1:numel(isi), s) = isi(:);
    end

    fh = figure('Name','CCIV ISI Heatmap');
    imagesc(1:nSweeps, 1:maxN, isiMat);
    set(gca,'YDir','normal');
    xlabel('Step # (analyzed order)');
    ylabel('Interval #');
    title('Inter-Spike Interval (ISI) Heatmap (ms)');
    colorbar;

    if nSweeps <= 60
        xticks(1:nSweeps);
        xticklabels(string(current_vec));
        xlabel('Step Current (pA)');
    end

    heatFile = fullfile(outDir, sprintf('%s_CCIV_ISIHeatmap_%s.png', fbase, run_id));
    try, saveas(fh, heatFile); catch, end

    % -------------------------
    % CSV exports (ISI matrix + spike times)
    % -------------------------
    try
        % ISI matrix
        Tisi = array2table(isiMat);
        for s = 1:nSweeps
            Tisi.Properties.VariableNames{s} = matlab.lang.makeValidName(sprintf('Step_%g_pA', current_vec(s)));
        end
        Tisi.IntervalNumber = (1:maxN)';
        Tisi = movevars(Tisi, 'IntervalNumber', 'Before', 1);
        isiFile = fullfile(outDir, sprintf('%s_CCIV_ISI_Matrix_%s.csv', fbase, run_id));
        writetable(Tisi, isiFile);

        % Spike-time lists
        Ts = table();
        Ts.StepIndex = (1:nSweeps)';
        Ts.Current_pA = current_vec(:);
        stStr = strings(nSweeps,1);
        for s = 1:nSweeps
            st = spike_times_ms_cell{s};
            if isempty(st)
                stStr(s) = "";
            else
                stStr(s) = strjoin(string(round(st,3)), ';');
            end
        end
        Ts.SpikeTimes_ms = stStr;
        stFile = fullfile(outDir, sprintf('%s_CCIV_SpikeTimes_%s.csv', fbase, run_id));
        writetable(Ts, stFile);
    catch
        % ignore
    end

    % Keep figures open for user inspection; comment these lines if you prefer auto-close:
    % close(fr); close(fh);
end

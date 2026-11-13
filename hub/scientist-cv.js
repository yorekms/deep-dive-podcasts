/*! Standalone Flagship CV & Lead Portal Bundle (MY-scientist.carrd.co) v1.0.0 */
(function () {
  'use strict';
  if (window.__crpStandaloneScientistCVLoaded) return;
  window.__crpStandaloneScientistCVLoaded = true;

  var CONFIG = {
    name: 'Matthew S. Yorek, M.S.',
    monogram: 'MY',
    role: 'Research Scientist • University of Virginia Health System (Anesthesiology)',
    location: 'Charlottesville, Virginia',
    tagline: 'Cancer Immunology • Ion-Channel & Epilepsy Neurophysiology • Multi-Species Transcriptomics • Bayesian Modeling & Scientific Software',
    email: 'yorekms@gmail.com',
    orcid: '0000-0002-4737-9367',
    orcidUrl: 'https://orcid.org/0000-0002-4737-9367',
    pubmedUrl: 'https://www.ncbi.nlm.nih.gov/myncbi/1XAQAfuLLOMkz/bibliography/public/',
    githubUrl: 'https://github.com/yorekms',
    podcastDirectoryUrl: 'https://yorekms.github.io/deep-dive-podcasts/',
    masterRssUrl: 'https://yorekms.github.io/deep-dive-podcasts/feed.xml',
    // Swap with exact numeric https://www.strava.com/athletes/<id> URL anytime:
    stravaUrl: 'https://www.strava.com/athletes/search?text=Yorek',
    portraitVideoUrl: 'https://yorekms.github.io/deep-dive-podcasts/hub/media/my-headshot-loop.mp4',
    portraitPosterUrl: 'https://yorekms.github.io/deep-dive-podcasts/hub/media/my-headshot-poster.jpg',
    portraitUrl: ''
  };

  var PUBLICATIONS = [
    {
      num: 1, year: 2026, firstAuthor: false, cats: ['neuro', 'top10'],
      pmid: '42218829', cites: 6, fwci: 4.80, oaPct: 92.8, rcr: null, nihPct: null,
      title: 'Microenvironment T-type calcium channels regulate neuronal and glial processes in tumor cells to promote glioblastoma growth',
      authors: 'Dube CJ, Zhang Y, Saha S, Deutsch TCJ, Yorek M, Lai M, Gibert MK, Escalante M, Hudson K, Wong D, Marcinkiewicz P, Yener U, Sun Y, Xu E, Sorot A, Mulcahy E, Kefas B, Hanif F, Guessous F, Vernon A, Schiff D, Zong H, Purow B, Holland E, Sonkusare S, Sontheimer H, Patel MK, Abounader R',
      journal: 'Neuro-Oncology', cite: '2026;28(9):2123–2135',
      doi: '10.1093/neuonc/noag131', roleNote: 'Intracranial glioblastoma tumor-cell stereotaxic injections & microenvironment electrophysiology collaboration (UVA).'
    },
    {
      num: 2, year: 2026, firstAuthor: false, cats: ['neuro', 'top10'],
      pmid: '41623181', cites: 7, fwci: 18.27, oaPct: 99.2, rcr: null, nihPct: null,
      title: 'Base editing rescues seizures and sudden death in a SCN8A mutation-associated developmental epileptic encephalopathy model',
      authors: 'Reever CM, Boscia AR, Deutsch TC, Patel MP, Miralles RM, Kittur S, Fleischel EJ, Buo AM, Yorek MS, Meisler MH, Farber CR, Patel MK',
      journal: 'Journal of Clinical Investigation', cite: '2026;136(3):e196402',
      doi: '10.1172/JCI196402', roleNote: 'SCN8A NaV1.6 epileptic encephalopathy seizure & survival rescue data contribution (UVA Anesthesiology).'
    },
    {
      num: 3, year: 2025, firstAuthor: false, cats: ['cancer', 'top10'],
      pmid: '40913763', cites: 14, fwci: 4.20, oaPct: 95.1, rcr: 2.65, nihPct: 80.9,
      title: 'FABP5 in skin macrophages mediates saturated fat-induced IL-1β signaling in psoriatic inflammation',
      authors: 'Yu J, Hao J, Yorek MS, Jiang X, Avellino A, Liu S, Han X, Shilyansky J, Wang Z, Wang Y, Kang Z, Jabbari A, Li B',
      journal: 'Cell Reports', cite: '2025;44(9):116254',
      doi: '10.1016/j.celrep.2025.116254', roleNote: 'Macrophage fatty-acid binding protein signaling & dietary lipid immunometabolism.'
    },
    {
      num: 4, year: 2024, firstAuthor: true, cats: ['cancer', 'first', 'top10'],
      pmid: '39513934', cites: 57, fwci: 7.75, oaPct: 98.4, rcr: 4.73, nihPct: 91.5,
      title: 'FABP4-mediated lipid accumulation and lipolysis in tumor-associated macrophages promote breast cancer metastasis',
      authors: 'Yorek M, Jiang X, Liu S, Hao J, Yu J, Avellino A, Liu Z, Curry M, Keen H, Shao J, Kanagasabapathy A, Kong M, Xiong Y, Sauter ER, Sugg SL, Li B',
      journal: 'eLife', cite: '2024;13:RP101221',
      doi: '10.7554/eLife.101221.2', roleNote: 'First Author • NCI MeDOC (U01CA272424): human breast cancer specimen correlations (FABP4/CD163 & tumor burden), TAM lipolysis & metastasis — already 57 citations (7.75× global field impact; Top 1.6% worldwide).'
    },
    {
      num: 5, year: 2024, firstAuthor: false, cats: ['neuro', 'top10'],
      pmid: '39435659', cites: 20, fwci: 4.74, oaPct: 96.1, rcr: 3.00, nihPct: 83.8,
      title: 'Parvalbumin interneuron impairment causes synaptic transmission deficits and seizures in SCN8A developmental and epileptic encephalopathy',
      authors: 'Miralles RM, Boscia AR, Kittur S, Hanflink JC, Panchal PS, Yorek MS, Deutsch TCJ, Reever CM, Vundela SR, Wengert ER, Patel MK',
      journal: 'JCI Insight', cite: '2024;9(20):e181005',
      doi: '10.1172/jci.insight.181005', roleNote: 'Quantitative electrophysiological & synaptic transmission analysis in inhibitory PV interneurons (UVA).'
    },
    {
      num: 6, year: 2024, firstAuthor: false, cats: ['cancer'],
      pmid: '38613778', cites: 3, fwci: 0.45, oaPct: 52.7, rcr: 0.25, nihPct: 15.4,
      title: 'Determination of the FABP5 expression profile in skin lesions of an IMQ-induced psoriasis mouse model using flow cytometry',
      authors: 'Yu J, Hao J, Yorek MS, Han X, Avellino A, Jiang X, Liu S, Wang J, Li B',
      journal: 'STAR Protocols', cite: '2024;5(2):103018',
      doi: '10.1016/j.xpro.2024.103018', roleNote: 'Standardized multiparameter flow-cytometry immunophenotyping protocol.'
    },
    {
      num: 7, year: 2023, firstAuthor: false, cats: ['cancer', 'top10'],
      pmid: '37967009', cites: 36, fwci: 3.62, oaPct: 94.4, rcr: 3.27, nihPct: 85.6,
      title: 'Keratinocyte FABP5-VCP complex mediates recruitment of neutrophils in psoriasis',
      authors: 'Hao J, Yu J, Yorek MS, Yu CL, Pope RM, Chimenti MS, Xiong Y, Klingelhutz A, Jabbari A, Li B',
      journal: 'Cell Reports', cite: '2023;42(11):113449',
      doi: '10.1016/j.celrep.2023.113449', roleNote: 'FABP5–valosin-containing protein (VCP) complex proteomics & neutrophil chemotaxis.'
    },
    {
      num: 8, year: 2023, firstAuthor: false, cats: ['cancer'],
      pmid: '36608128', cites: 8, fwci: 0.80, oaPct: 64.8, rcr: 0.66, nihPct: 36.6,
      title: 'CD47 halts Ptpn6-deficient neutrophils from provoking lethal inflammation',
      authors: 'Mazgaeen L, Yorek M, Saini S, Vogel P, Meyerholz DK, Kanneganti TD, Gurung P',
      journal: 'Science Advances', cite: '2023;9(1):eade3942',
      doi: '10.1126/sciadv.ade3942', roleNote: 'Innate immune checkpoint regulation of SHP-1 (Ptpn6)-deficient neutrophil autoinflammation.'
    },
    {
      num: 9, year: 2022, firstAuthor: false, cats: ['cancer', 'top10'],
      pmid: '36516778', cites: 26, fwci: 4.26, oaPct: 94.5, rcr: 1.68, nihPct: 67.9,
      title: 'Consumption of fish oil high-fat diet induces murine hair loss via epidermal fatty acid binding protein in skin macrophages',
      authors: 'Hao J, Jin R, Zeng J, Hua Y, Yorek MS, Liu L, Mandal A, Li J, Zheng H, Sun Y, Yi Y, Yin D, Zheng Q, Li X, Ng CK, Rouchka EC, Egilmez NK, Jabbari A, Li B',
      journal: 'Cell Reports', cite: '2022;41(11):111804',
      doi: '10.1016/j.celrep.2022.111804', roleNote: 'Omega-3 lipid peroxidation & macrophage E-FABP signaling in cutaneous tissue remodeling.'
    },
    {
      num: 10, year: 2022, firstAuthor: false, cats: ['cancer'],
      pmid: '35304452', cites: 13, fwci: 0.88, oaPct: 67.2, rcr: 0.47, nihPct: 27.6,
      title: 'CD4 expression in effector T cells depends on DNA demethylation over a developmentally established stimulus-responsive element',
      authors: 'Teghanemt A, Pulipati P, Misel-Wuchter K, Day K, Yorek MS, Yi R, Keen HL, Au C, Maretzky T, Gurung P, Littman DR, Issuree PD',
      journal: 'Nature Communications', cite: '2022;13(1):1477',
      doi: '10.1038/s41467-022-28914-4', roleNote: 'Epigenetic cis-regulatory DNA demethylation governing effector T-cell lineage stability.'
    },
    {
      num: 11, year: 2020, firstAuthor: false, cats: ['cancer'],
      pmid: '32948646', cites: 16, fwci: 1.64, oaPct: 84.2, rcr: 0.71, nihPct: 39.0,
      title: 'Acute IL-4 governs pathogenic T cell responses during Leishmania major infection',
      authors: 'Poudel B, Yorek MS, Mazgaeen L, Brown SA, Kanneganti TD, Gurung P',
      journal: 'ImmunoHorizons', cite: '2020;4(9):546–560',
      doi: '10.4049/immunohorizons.2000076', roleNote: 'In vivo L. major infection, cytokine-blockade kinetics & Th1/Th2 immunopathology.'
    },
    {
      num: 12, year: 2019, firstAuthor: true, cats: ['cancer', 'first'],
      pmid: '31260451', cites: 9, fwci: 1.13, oaPct: 77.2, rcr: 0.32, nihPct: 19.1,
      title: 'Leishmania major degrades murine CXCL1 – An immune evasion strategy',
      authors: 'Yorek MS, Poudel B, Mazgaeen L, Pope RM, Wilson ME, Gurung P',
      journal: 'PLoS Neglected Tropical Diseases', cite: '2019;13(7):e0007533',
      doi: '10.1371/journal.pntd.0007533', roleNote: 'First Author • Biochemical characterization of metalloprotease chemokine cleavage subverting neutrophil recruitment.'
    },
    {
      num: 13, year: 2017, firstAuthor: true, cats: ['vision', 'first'],
      pmid: '28025096', cites: 30, fwci: 2.39, oaPct: 86.1, rcr: 1.14, nihPct: 54.5,
      title: 'Early vs. late intervention of high fat/low dose streptozotocin treated C57Bl/6J mice with enalapril, α-lipoic acid, menhaden oil or their combination: Effect on diabetic neuropathy related endpoints',
      authors: 'Yorek MS, Obrosov A, Shevalye H, Coppey LJ, Kardon RH, Yorek MA',
      journal: 'Neuropharmacology', cite: '2017;116:122–131',
      doi: '10.1016/j.neuropharm.2016.12.022', roleNote: 'First Author • Combination vascular, antioxidant & omega-3 intervention across corneal nerve and nociceptive endpoints.'
    },
    {
      num: 14, year: 2016, firstAuthor: true, cats: ['vision', 'first'],
      pmid: '27634964', cites: 9, fwci: 0.65, oaPct: 66.7, rcr: 0.34, nihPct: 20.5,
      title: 'Effect of inhibition or deletion of neutral endopeptidase on neuropathic endpoints in high fat fed/low dose streptozotocin-treated mice',
      authors: 'Yorek MS, Obrosov A, Lu B, Gerard C, Kardon RH, Yorek MA',
      journal: 'J Neuropathol Exp Neurol', cite: '2016;75(11):1072–1080',
      doi: '10.1093/jnen/nlw083', roleNote: 'First Author • Neprilysin/NEP genetic deletion & pharmacological blockade in type 2 diabetic neuropathy.'
    },
    {
      num: 15, year: 2016, firstAuthor: true, cats: ['vision', 'first'],
      pmid: '27774316', cites: 29, fwci: 2.17, oaPct: 84.7, rcr: 1.15, nihPct: 54.9,
      title: 'Effect of treatment with salsalate, menhaden oil, combination of salsalate and menhaden oil, or resolvin D1 of C57Bl/6J type 1 diabetic mouse on neuropathic endpoints',
      authors: 'Yorek MS, Coppey LJ, Shevalye H, Obrosov A, Kardon RH, Yorek MA',
      journal: 'Journal of Nutrition and Metabolism', cite: '2016;2016:5905891',
      doi: '10.1155/2016/5905891', roleNote: 'First Author • Specialized pro-resolving lipid mediators (Resolvin D1) & salicylate synergy on nerve regeneration.'
    },
    {
      num: 16, year: 2016, firstAuthor: false, cats: ['vision', 'top10'],
      pmid: '27230286', cites: 307, fwci: 20.67, oaPct: 99.7, rcr: 9.03, nihPct: 97.0,
      title: 'Nicotinamide riboside opposes type 2 diabetes and neuropathy in mice',
      authors: 'Trammell SA, Weidemann BJ, Chadda A, Yorek MS, Holmes A, Coppey LJ, Obrosov A, Kardon RH, Yorek MA, Brenner C',
      journal: 'Scientific Reports', cite: '2016;6:26933',
      doi: '10.1038/srep26933', roleNote: 'NAD+ precursor metabolomics & in vivo corneal confocal microscopy neuroprotection — 307 citations (20.67× global field impact; Top 0.3% worldwide).'
    },
    {
      num: 17, year: 2016, firstAuthor: true, cats: ['vision', 'first'],
      pmid: '27145474', cites: 20, fwci: 2.17, oaPct: 84.7, rcr: 0.93, nihPct: 47.7,
      title: 'Corneal sensitivity to hyperosmolar eye drops: A novel behavioral assay to assess diabetic peripheral neuropathy',
      authors: 'Yorek MS, Davidson EP, Poolman P, Coppey LJ, Obrosov A, Holmes A, Kardon RH, Yorek MA',
      journal: 'Investigative Ophthalmology & Visual Science', cite: '2016;57(6):2412–2419',
      doi: '10.1167/iovs.16-19435', roleNote: 'First Author • Designed, validated & authored novel quantitative ocular psychophysical assay for small-fiber neuropathy.'
    },
    {
      num: 18, year: 2015, firstAuthor: false, cats: ['vision', 'top10'],
      pmid: '25925322', cites: 85, fwci: 9.27, oaPct: 98.5, rcr: 3.15, nihPct: 84.8,
      title: 'Effect of enriching the diet with menhaden oil or daily treatment with resolvin D1 on neuropathy in a mouse model of type 2 diabetes',
      authors: 'Shevalye H, Yorek MS, Coppey LJ, Holmes A, Harper MM, Kardon RH, Yorek MA',
      journal: 'Journal of Neurophysiology', cite: '2015;114(1):199–208',
      doi: '10.1152/jn.00224.2015', roleNote: 'Nerve conduction velocity, OCT & sub-basal corneal nerve fiber morphometry.'
    },
    {
      num: 19, year: 2015, firstAuthor: true, cats: ['vision', 'first', 'top10'],
      pmid: '25858759', cites: 65, fwci: 5.59, oaPct: 96.5, rcr: 2.62, nihPct: 80.7,
      title: 'Effect of diet-induced obesity or type 1 or type 2 diabetes on corneal nerves and peripheral neuropathy in C57Bl/6J mice',
      authors: 'Yorek MS, Obrosov A, Shevalye H, Holmes A, Harper MM, Kardon RH, Yorek MA',
      journal: 'Journal of the Peripheral Nervous System', cite: '2015;20(1):24–31',
      doi: '10.1111/jns.12111', roleNote: 'First Author • Comparative longitudinal staging of pre-diabetic obesity vs. insulinopenic & hyperglycemic neuropathy.'
    },
    {
      num: 20, year: 2014, firstAuthor: false, cats: ['vision', 'top10'],
      pmid: '25468886', cites: 90, fwci: 6.90, oaPct: 97.2, rcr: 2.74, nihPct: 81.8,
      title: 'Early detection of subclinical visual damage after blast-mediated TBI enables prevention of chronic visual deficit by treatment with P7C3-S243',
      authors: 'Dutca LM, Stasheff SF, Hedberg-Buenz A, Rudd DS, Batra N, Blodi FR, Yorek MS, Yin T, Shankar M, Herlein JA, Naidoo J, Morlock L, Williams N, Kardon RH, Anderson MG, Pieper AA, Harper MM',
      journal: 'Investigative Ophthalmology & Visual Science', cite: '2014;55(12):8330–8341',
      doi: '10.1167/iovs.14-15468', roleNote: 'Thy1-GFP retinal ganglion cell dendritic arborization imaging & NAMPT activator neuroprotection in blast TBI.'
    },
    {
      num: 21, year: 2014, firstAuthor: true, cats: ['vision', 'first', 'top10'],
      pmid: '25403729', cites: 51, fwci: 4.03, oaPct: 93.8, rcr: 1.55, nihPct: 65.3,
      title: 'Effect of glycemic control on corneal nerves and peripheral neuropathy in streptozotocin-induced diabetic C57Bl/6J mice',
      authors: 'Yorek MS, Obrosov A, Shevalye H, Lupachyk S, Harper MM, Kardon RH, Yorek MA',
      journal: 'Journal of the Peripheral Nervous System', cite: '2014;19(3):205–217',
      doi: '10.1111/jns.12086', roleNote: 'First Author • Quantitative corneal confocal & intraepidermal nerve fiber recovery under insulin intervention.'
    },
    {
      num: 22, year: 2010, firstAuthor: false, cats: ['neuro'],
      pmid: '20031321', cites: 85, fwci: 2.19, oaPct: 85.4, rcr: 1.99, nihPct: 73.2,
      title: 'Nociceptive sensitization by complement C5a and C3a in mouse',
      authors: 'Jang JH, Clark DJ, Li X, Yorek MS, Usachev YM, Brennan TJ',
      journal: 'PAIN', cite: '2010;148(2):343–352',
      doi: '10.1016/j.pain.2009.11.021', roleNote: 'Primary DRG sensory-neuron intracellular Ca2+ imaging & TRPV1 sensitization (Usachev & Brennan Labs, UIowa).'
    },
    {
      num: 23, year: 2008, firstAuthor: false, cats: ['neuro', 'top10'],
      pmid: '18183531', cites: 70, fwci: 4.66, oaPct: 96.4, rcr: 2.30, nihPct: 77.3,
      title: 'Selective nicotinic acetylcholine receptor agonists: potential therapies for neuropsychiatric disorders with cognitive dysfunction',
      authors: 'Cincotta SL, Yorek MS, Moschak TM, Lewis SR, Rodefer JS',
      journal: 'Curr Opin Investig Drugs', cite: '2008;9(1):47–56',
      doi: '', roleNote: 'Prefrontal attentional set-shifting & α7/α4β2 nicotinic pharmacology review (Rodefer Lab, UIowa).'
    }
  ];

  var FLAGSHIP_PORTALS = [
    {
      badge: 'Electrophysiology Web App',
      accent: '#F59E0B',
      title: 'ClampFlow ABF Pipeline & Compiler',
      domainPrefix: 'MY', domainRest: '-clampflow.carrd.co',
      url: 'https://my-clampflow.carrd.co',
      desc: 'Interactive Axon Binary Format (.abf) patch-clamp sweep inspector, Boltzmann & mono-exponential τ kinetics QC, and publication-ready spreadsheet compiler.'
    },
    {
      badge: '14 Python v14 & MATLAB Suites',
      accent: '#C084FC',
      title: 'Scientific Software & Imaging Portfolio',
      domainPrefix: 'MY', domainRest: '-scientific-software.carrd.co',
      url: 'https://my-scientific-software.carrd.co',
      desc: 'NaV1.6 voltage-clamp gating, HEK16 drug binding/unbinding, iPSC persistent Na+ TTX subtraction, plethysmography, EEG seizure viewer & v25 microscope GUI.'
    },
    {
      badge: '44 Contrasts • 15 GEO Accessions',
      accent: '#34D399',
      title: 'Seizure Transcriptomics Workbench',
      domainPrefix: '', domainRest: 'yorek-cancer-ai-primer • #workbench',
      url: 'https://yorek-cancer-ai-primer.tasty-siren-3221.chatgpt.site/research-software/',
      desc: 'Cross-species human, mouse & rat seizure meta-regression (R edgeR/limma, MATLAB & Python Bayesian forecasts across 311 Rab7/endolysosomal & channel genes, tested on 16 human donors).'
    },
    {
      badge: 'Interactive Learning Suite',
      accent: '#38BDF8',
      title: 'Estudia! & Research Study Web Apps',
      domainPrefix: 'MY', domainRest: '-study-apps.carrd.co',
      url: 'https://my-study-apps.carrd.co',
      desc: 'Active-recall physiology, receptor pharmacology, clinical diagnostics, and Bayesian reasoning web tools synchronized with the Deep Dive audio library.'
    },
    {
      badge: 'eLife 2024 & NCI MeDOC Companion',
      accent: '#FB7185',
      title: 'Cancer Immunometabolism & AI Primer',
      domainPrefix: '', domainRest: 'yorek-cancer-ai-primer.chatgpt.site',
      url: 'https://yorek-cancer-ai-primer.tasty-siren-3221.chatgpt.site/',
      desc: 'Interactive exploration of FABP4/FABP5 macrophage lipid metabolism in breast cancer metastasis alongside reproducible multi-omics software.'
    },
    {
      badge: '13 Feeds • Open Audio Curriculum',
      accent: '#60A5FA',
      title: 'Deep Dive Audio & RSS Command Deck',
      domainPrefix: '', domainRest: 'yorekms.github.io/deep-dive-podcasts',
      url: 'https://yorekms.github.io/deep-dive-podcasts/',
      desc: 'Master RSS directory powering 694+ long-form two-host audio treatises across 1-Ångström structural biology, One Medicine diagnostics, pharmacology & history of science.'
    }
  ];

  var APPOINTMENTS = [
    {
      period: 'Jul 2024 – Present',
      role: 'Research Scientist',
      org: 'University of Virginia Health System • Department of Anesthesiology',
      loc: 'Charlottesville, VA',
      accent: '#38BDF8',
      bullets: [
        'Investigate cellular & circuit excitability in SCN8A (NaV1.6) developmental and epileptic encephalopathy—coauthoring the 2026 JCI base-editing rescue of seizures/SUDEP and the 2024 JCI Insight parvalbumin interneuron synaptic transmission study.',
        'Collaborate across neuro-oncology and electrophysiology on microenvironment T-type calcium channels driving neuronal/glial signaling in glioblastoma (Neuro-Oncology, 2026; performed stereotaxic intracranial tumor injections).',
        'Architected the Seizure Transcriptomics Workbench (44 contrast bundles from 15 public GEO datasets; R edgeR/limma + MATLAB + Python Bayesian forecasting validated against 16 human neuronal donors).'
      ]
    },
    {
      period: 'Jun 2016 – Jul 2024',
      role: 'Research Associate',
      org: 'University of Iowa Healthcare • Pathology, Internal Medicine & Cancer Immunology',
      loc: 'Iowa City, IA',
      accent: '#C084FC',
      bullets: [
        'First author of the 2024 eLife study demonstrating how FABP4-mediated lipid accumulation and lipolysis in tumor-associated macrophages drive human & murine breast cancer metastasis (NCI MeDOC consortium U01CA272424; bariatric surgery working group presenter).',
        'Coauthored high-impact immunometabolism and T-cell/neutrophil studies in Science Advances (2023), Nature Communications (2022), Cell Reports (2022, 2023, 2025), STAR Protocols (2024), ImmunoHorizons (2020), and first-author PLoS Negl Trop Dis (2019, Leishmania major CXCL1 cleavage).',
        'Administered clinical & restricted human specimen datasets in REDCap, mentored graduate and PhD trainees in Spearman/nonparametric human correlation workflows, and served as Inflammation Program Environmental Health & Safety liaison (modernizing Eckstein Building SDS chemical inventory).'
      ]
    },
    {
      period: '2016 – 2017 • 12-Hr Rotating Day/Night Shifts',
      role: 'Quality Control Analytical Laboratory Technician',
      org: 'Grain Processing Corporation (GPC) • Mississippi River Wet-Milling Biorefinery',
      loc: 'Muscatine, IA',
      accent: '#F59E0B',
      bullets: [
        'Worked rotating 12-hour day and night shifts (36.75 / 49 hrs/wk plus overtime) inside one of North America’s largest single-site corn wet-milling plants on the banks of the Mississippi River—engineered for whole-kernel utilization of corn sourced across Iowa, Illinois, and Indiana into food/pharmaceutical modified starches, maltodextrins, beverage & USP ethyl alcohol, corn oil, and high-protein feed.',
        'Conducted real-time surveillance of in-process modified starch reactions, beverage/industrial alcohol distillation & sensory QC, and co-product feed streams via HPLC, GC, and LC-MS impurity & carbohydrate profiling.',
        'Executed quantitative wet chemistry including Kjeldahl protein, Nitrogen & Sulfur combustion elemental analysis, Soxhlet/ether lipid extraction, active chlorine, sulfur dioxide/sodium bisulfite, carboxyl, viscosity, moisture, ash, particle-size, and specific-gravity determinations—and trained incoming technicians in the starch analytical laboratory.'
      ]
    },
    {
      period: '2012 – 2016',
      role: 'Biological & Laboratory Research Technician',
      org: 'Iowa City VA Health Care System • Center for the Prevention and Treatment of Visual Loss',
      loc: 'Iowa City, IA',
      accent: '#34D399',
      bullets: [
        'Designed, validated, and first-authored a novel hyperosmolar eye-drop behavioral assay for diabetic peripheral neuropathy (IOVS, 2016) alongside five additional first-author neuropathy & corneal nerve regeneration studies (Neuropharmacology 2017; JNEN 2016; J Nutr Metab 2016; JPNS 2014, 2015).',
        'Quantified Thy1-GFP retinal ganglion cell dendritic arborization & P7C3-S243 neuroprotection after blast-wave TBI (IOVS, 2014) and nicotinamide riboside NAD+ neuroprotection (Scientific Reports, 2016); oversaw confocal/OCT imaging training and served on VA IACUC & Safety Committees.'
      ]
    },
    {
      period: '2008 – 2012',
      role: 'Graduate Research Assistant (M.S. in Neuropharmacology)',
      org: 'University of Iowa • Department of Pharmacology (Labs of Yuriy M. Usachev & Johannes W. Hell)',
      loc: 'Iowa City, IA',
      accent: '#FB7185',
      bullets: [
        'M.S. Thesis: “Mechanism of TRPM8-Mediated [Ca2+]i Oscillations in Sensory Neurons”—combining primary dorsal root ganglion culture, whole-cell patch-clamp electrophysiology, ratiometric Ca2+ imaging, and TRP/CaV/NaV/mitochondrial pharmacology.',
        'Demonstrated complement C5a and C3a nociceptive sensitization of TRPV1 in mouse DRG neurons (PAIN, 2010) and delivered invited neuroscience seminars at the University of Melbourne (2015).'
      ]
    },
    {
      period: '2005 – 2008',
      role: 'Undergraduate Honors Research Assistant (B.S. Psychology, Minor in Biology)',
      org: 'University of Iowa • Department of Psychology (Lab of Joshua S. Rodefer)',
      loc: 'Iowa City, IA',
      accent: '#60A5FA',
      bullets: [
        'Honors Thesis: Designed and programmed an automated operant-chamber attentional task-switching paradigm in a preclinical PCP model of schizophrenia; coauthored a 2008 review on α7/α4β2 nicotinic acetylcholine receptor agonists for cognitive dysfunction.'
      ]
    }
  ];

  var HUB_CARDS = [
    { slug: 'consciousness', icon: '🧠', name: 'Consciousness & Memory', sub: 'Language, LTP, Phantoms & Neural Circuits', url: 'https://my-consciousness.carrd.co', accent: '#A78BFA' },
    { slug: 'cell-death', icon: '🔥', name: 'Cell Death & Immunity', sub: 'Ferroptosis, Pyroptosis, GPX4 & Gasdermin Pores', url: 'https://my-cell-death.carrd.co', accent: '#F87171' },
    { slug: 'biophysics', icon: '⚡', name: 'Biophysics & Ion Channels', sub: 'Patch-Clamp, 1-Ångström Machines & Bioenergetics', url: 'https://my-biophysics.carrd.co', accent: '#38BDF8' },
    { slug: 'nutrition-metabolism', icon: '🥗', name: 'Nutrition & Metabolism', sub: 'GLUT1/SGLT2 Gates, Tracer Trials & GI Physiology', url: 'https://my-nutrition-metabolism.carrd.co', accent: '#34D399' },
    { slug: 'pharmacology', icon: '💊', name: 'Pharmacology & Toxicology', sub: 'GPCR Poses, PGx Safety, ICU Tox & Clinical Trials', url: 'https://my-pharmacology.carrd.co', accent: '#F472B6' },
    { slug: 'oncology', icon: '🎗️', name: 'Precision Oncology', sub: 'p53 Y220C Rescue, Liquid Biopsies & Microenvironment', url: 'https://my-oncology.carrd.co', accent: '#FB7185' },
    { slug: 'forensic-medicine', icon: '🕵️', name: 'Forensic Medicine', sub: 'Postmortem Chemistry, Taphonomy & Biomechanics', url: 'https://my-forensic-medicine.carrd.co', accent: '#FBBF24' },
    { slug: 'medical-testing', icon: '🩺', name: 'Medical Testing & One Medicine', sub: 'Comparative Human/Vet Diagnostics & Lab Priors', url: 'https://my-medical-testing.carrd.co', accent: '#2DD4BF' },
    { slug: 'ancient-medicine', icon: '⚕️', name: 'Ancient Medicine', sub: 'Paleosurgery, Ancient Genomes & Ethnopharmacology', url: 'https://my-ancient-medicine.carrd.co', accent: '#F59E0B' },
    { slug: 'philosophy-science', icon: '🔬', name: 'Philosophy & Bayesian Stats', sub: 'Spike-and-Slab, Causal Inference & Open Data', url: 'https://my-philosophy-science.carrd.co', accent: '#818CF8' },
    { slug: 'human-origins', icon: '🏺', name: 'Human Origins & Language', sub: 'Ancient DNA, Epigraphy & Early States', url: 'https://my-human-origins.carrd.co', accent: '#FB923C' },
    { slug: 'religion-cooperation', icon: '🏛️', name: 'Religion & Cooperation', sub: 'Collective Ritual, Social Ecology & Universe 25', url: 'https://my-religion-cooperation.carrd.co', accent: '#C084FC' }
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightYorek(authorsStr) {
    return esc(authorsStr).replace(/\b(Yorek\s+MS|Yorek\s+M)\b/g, '<strong style="color:#38BDF8;font-weight:800;text-decoration:underline;text-decoration-color:rgba(56,189,248,0.45);text-underline-offset:2px;">$1</strong>');
  }

  function formatMyDomain(url) {
    var clean = String(url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (clean.indexOf('my-') === 0) {
      return '<span class="my-tag-chip"><span class="my-tag-hi">MY</span>' + esc(clean.slice(2)) + '</span>';
    }
    return '<span class="my-tag-chip">' + esc(clean) + '</span>';
  }

  function buildPortraitSVG() {
    if (CONFIG.portraitVideoUrl) {
      return (
        '<div id="my-cv-video-stage" style="position:relative;width:100%;height:100%;background:#060A14;overflow:hidden;border-radius:18px;cursor:pointer;" title="Click to pause or resume 3D NaV1.6 studio loop">' +
          '<video id="my-cv-portrait-video" autoplay loop muted playsinline preload="auto" poster="' + esc(CONFIG.portraitPosterUrl) + '" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:18px;">' +
            '<source src="' + esc(CONFIG.portraitVideoUrl) + '" type="video/mp4" />' +
          '</video>' +
          '<img class="my-print-only-portrait" src="' + esc(CONFIG.portraitPosterUrl) + '" alt="' + esc(CONFIG.name) + '" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:18px;" />' +
          '<button type="button" id="my-cv-video-toggle" aria-label="Pause or play portrait loop" style="position:absolute;bottom:8px;left:9px;z-index:3;appearance:none;border:1px solid rgba(56,189,248,0.42);background:rgba(6,10,20,0.72);backdrop-filter:blur(8px);color:#BAE6FD;font-size:10px;font-weight:800;letter-spacing:0.04em;padding:3px 8px;border-radius:999px;cursor:pointer;opacity:0.78;transition:opacity 0.18s ease;">&#9646;&#9646; 3D NaV1.6</button>' +
        '</div>'
      );
    }
    if (CONFIG.portraitUrl) {
      return '<img id="my-cv-portrait-img" src="' + esc(CONFIG.portraitUrl) + '" alt="' + esc(CONFIG.name) + '" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:18px;" />';
    }
    return (
      '<img id="my-cv-portrait-img" src="" alt="' + esc(CONFIG.name) + '" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:18px;" />' +
      '<div id="my-cv-portrait-placeholder" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:16px 12px;box-sizing:border-box;background:radial-gradient(circle at 30% 20%, rgba(56,189,248,0.22), rgba(15,23,42,0.96) 68%);position:relative;overflow:hidden;">' +
        '<svg viewBox="0 0 220 130" style="width:100%;height:112px;overflow:visible;" aria-hidden="true">' +
          '<defs>' +
            '<linearGradient id="myGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
              '<stop offset="0%" stop-color="#38BDF8"/>' +
              '<stop offset="52%" stop-color="#C084FC"/>' +
              '<stop offset="100%" stop-color="#F59E0B"/>' +
            '</linearGradient>' +
          '</defs>' +
          '<circle cx="110" cy="64" r="52" fill="rgba(9,14,26,0.75)" stroke="url(#myGrad)" stroke-width="2" stroke-dasharray="5 3"/>' +
          '<circle cx="110" cy="64" r="43" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.3)" stroke-width="1"/>' +
          '<path d="M 12 96 L 52 96 L 60 99 L 68 24 L 76 108 L 86 88 L 102 96 L 208 96" fill="none" stroke="rgba(56,189,248,0.42)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<text x="110" y="76" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif" font-size="34" font-weight="900" letter-spacing="2" fill="url(#myGrad)">MY</text>' +
        '</svg>' +
        '<div style="text-align:center;z-index:2;">' +
          '<div style="font-size:10.5px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#E2E8F0;margin-bottom:3px;">Portrait Frame Ready</div>' +
          '<div style="font-size:10px;color:#94A3B8;line-height:1.35;">Headshot slot • Click below to test-preview any photo locally</div>' +
        '</div>' +
        '<label style="z-index:2;margin-top:6px;display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:999px;font-size:10.5px;font-weight:700;color:#BAE6FD;background:rgba(14,116,144,0.38);border:1px solid rgba(56,189,248,0.5);cursor:pointer;">' +
          '&#128247; Preview Photo' +
          '<input id="my-cv-photo-input" type="file" accept="image/*" style="display:none;" />' +
        '</label>' +
      '</div>'
    );
  }

  function mount() {
    document.title = 'Matthew S. Yorek, M.S. | MY·Scientist — CV & Research Portal';
    var inner = document.querySelector('.site-main > .inner') || document.querySelector('#main > .inner') || document.body;
    var root = document.getElementById('crp-hub-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'crp-hub-root';
      inner.insertBefore(root, inner.firstChild);
    } else if (inner && root.parentNode !== inner) {
      inner.insertBefore(root, inner.firstChild);
    }

    var styleEl = document.createElement('style');
    styleEl.id = 'my-scientist-cv-styles';
    styleEl.textContent = [
      'html { font-size: 16px !important; scroll-behavior: smooth; }',
      'body { background-color: #060B16 !important; color: #F1F5F9 !important; }',
      '.site-main > .inner, #main > .inner { width: min(96vw, 1520px) !important; max-width: 1520px !important; padding: 20px 20px 100px 20px !important; margin: 0 auto !important; }',
      '.site-main > .inner > :not(#crp-hub-root), #main > .inner > :not(#crp-hub-root), #crp-author-cred-box { display: none !important; }',
      '#text01,#text02,#text03,#text04,#text05,#text06,#text07,#text08,#divider01,#divider02,#divider03,#divider04,#divider05,#divider06,#buttons01,#buttons02,#buttons03,#buttons04,#buttons05 { display: none !important; }',
      '#my-cv-wrap { width: 100%; max-width: 1480px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif; color: #F1F5F9; text-align: left; box-sizing: border-box; -webkit-font-smoothing: antialiased; }',
      '#my-cv-wrap * { box-sizing: border-box; }',
      '.my-hi { font-weight: 900; background: linear-gradient(135deg, #38BDF8 0%, #C084FC 55%, #F59E0B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: 0.03em; }',
      '.my-mono-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 11px; border-radius: 999px; background: rgba(15,23,42,0.92); border: 1px solid rgba(56,189,248,0.48); font-size: 11.5px; font-weight: 700; color: #CBD5E1; }',
      '.my-tag-chip { display: inline-flex; align-items: center; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11.5px; color: #94A3B8; background: rgba(2,6,23,0.72); border: 1px solid rgba(148,163,184,0.24); padding: 2px 8px; border-radius: 6px; }',
      '.my-tag-hi { font-weight: 900; color: #38BDF8; letter-spacing: 0.04em; margin-right: 0.5px; text-shadow: 0 0 10px rgba(56,189,248,0.45); }',
      '.my-hero-card { background: linear-gradient(145deg, rgba(15,23,42,0.96) 0%, rgba(9,14,26,0.98) 100%); border: 1px solid rgba(56,189,248,0.35); border-radius: 24px; padding: 28px; box-shadow: 0 24px 60px rgba(0,0,0,0.65), 0 0 40px rgba(56,189,248,0.09); margin-bottom: 18px; position: relative; overflow: hidden; }',
      '.my-hero-grid { display: grid; grid-template-columns: 432px minmax(0, 1fr); gap: 26px; align-items: center; }',
      '.my-portrait-box { width: 432px; aspect-ratio: 16 / 9; height: auto; border-radius: 20px; border: 1.5px solid rgba(56,189,248,0.48); box-shadow: 0 18px 42px rgba(0,0,0,0.72), 0 0 32px rgba(56,189,248,0.18); overflow: hidden; background: #060A14; flex-shrink: 0; position: relative; }',
      '#my-cv-video-stage:hover #my-cv-video-toggle { opacity: 1 !important; border-color: #38BDF8 !important; }',
      '.my-action-btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px; border-radius: 999px; font-size: 12.5px; font-weight: 800; text-decoration: none !important; transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease; cursor: pointer; font-family: inherit; }',
      '.my-action-btn:hover { transform: translateY(-1.5px); box-shadow: 0 8px 20px rgba(0,0,0,0.45); }',
      '.my-stat-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; margin-bottom: 18px; }',
      '.my-stat-card { background: rgba(15,23,42,0.9); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 15px 16px; box-shadow: 0 10px 24px rgba(0,0,0,0.32); }',
      '.my-jump-bar { position: sticky; top: 8px; z-index: 50; display: flex; flex-wrap: wrap; align-items: center; gap: 7px; padding: 9px 13px; border-radius: 14px; background: rgba(9,14,26,0.92); border: 1px solid rgba(255,255,255,0.15); backdrop-filter: blur(16px); margin-bottom: 22px; box-shadow: 0 12px 30px rgba(0,0,0,0.5); }',
      '.my-jump-link { display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; color: #CBD5E1; text-decoration: none !important; background: rgba(30,41,59,0.65); border: 1px solid rgba(148,163,184,0.22); transition: all 0.16s ease; }',
      '.my-jump-link:hover { color: #FFFFFF; border-color: #38BDF8; background: rgba(14,116,144,0.35); }',
      '.my-sec-card { background: rgba(11,17,32,0.92); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 24px 26px; margin-bottom: 22px; box-shadow: 0 16px 40px rgba(0,0,0,0.42); }',
      '.my-sec-hdr { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 16px; margin-bottom: 16px; padding-bottom: 11px; border-bottom: 1px solid rgba(148,163,184,0.16); }',
      '.my-bento-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }',
      '.my-bento-card { display: flex; flex-direction: column; justify-content: space-between; background: rgba(15,23,42,0.94); border: 1px solid rgba(255,255,255,0.13); border-radius: 16px; padding: 18px; text-decoration: none !important; color: inherit !important; transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease; }',
      '.my-bento-card:hover { transform: translateY(-2.5px); border-color: #38BDF8; box-shadow: 0 14px 32px rgba(0,0,0,0.55), 0 0 22px rgba(56,189,248,0.14); }',
      '.my-timeline { display: flex; flex-direction: column; gap: 14px; position: relative; }',
      '.my-tl-item { background: rgba(15,23,42,0.88); border: 1px solid rgba(255,255,255,0.11); border-left-width: 4px; border-radius: 14px; padding: 16px 18px; }',
      '.my-pub-filter-btn { appearance: none; border: 1px solid rgba(148,163,184,0.3); background: rgba(15,23,42,0.85); color: #CBD5E1; font-size: 12px; font-weight: 700; padding: 6px 13px; border-radius: 999px; cursor: pointer; font-family: inherit; transition: all 0.15s ease; }',
      '.my-pub-filter-btn:hover { border-color: #38BDF8; color: #FFFFFF; }',
      '.my-pub-filter-btn.active { background: #38BDF8; color: #090E1A; border-color: #38BDF8; box-shadow: 0 0 14px rgba(56,189,248,0.45); }',
      '.my-pub-item { background: rgba(15,23,42,0.88); border: 1px solid rgba(255,255,255,0.11); border-radius: 14px; padding: 14px 16px; margin-bottom: 10px; transition: border-color 0.15s ease; }',
      '.my-pub-item:hover { border-color: rgba(56,189,248,0.5); }',
      '.my-hub-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 11px; }',
      '.my-hub-card { display: flex; flex-direction: column; justify-content: space-between; gap: 8px; background: rgba(15,23,42,0.9); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 13px 14px; text-decoration: none !important; color: inherit !important; transition: all 0.16s ease; }',
      '.my-hub-card:hover { transform: translateY(-2px); border-color: #C084FC; box-shadow: 0 10px 24px rgba(0,0,0,0.45); }',
      '.my-two-col { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }',
      '@media (max-width: 1180px) { .my-hero-grid { grid-template-columns: 352px minmax(0, 1fr); gap: 20px; } .my-portrait-box { width: 352px; } .my-bento-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .my-hub-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .my-stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }',
      '@media (max-width: 820px) { .my-hero-grid { grid-template-columns: 1fr; justify-items: center; text-align: center; } .my-portrait-box { width: 100%; max-width: 460px; } .my-bento-grid, .my-hub-grid, .my-two-col, .my-stat-grid { grid-template-columns: 1fr; } .my-hero-card, .my-sec-card { padding: 18px 16px; } .my-jump-bar { position: static; } }',
      '@media print { body { background: #FFFFFF !important; color: #0F172A !important; } #crp-top-hub-nav, #crp-author-cred-box, .my-jump-bar, #crp-rss-modal, #my-cv-portrait-video, #my-cv-video-toggle { display: none !important; } .my-print-only-portrait { display: block !important; } .my-portrait-box { width: 240px !important; border: 1px solid #94A3B8 !important; box-shadow: none !important; } .my-hero-grid { grid-template-columns: 240px minmax(0, 1fr) !important; } .my-hero-card, .my-sec-card, .my-tl-item, .my-pub-item, .my-stat-card { background: #FFFFFF !important; color: #0F172A !important; border: 1px solid #CBD5E1 !important; box-shadow: none !important; break-inside: avoid; } h1, h2, h3, strong { color: #0F172A !important; -webkit-text-fill-color: initial !important; } }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(styleEl);

    // Top 16-site nav container (hydrated automatically by hub-nav.js)
    var topNavHtml =
      '<div id="crp-top-hub-nav" style="width:100%;max-width:1480px;margin:0 auto 14px auto;padding:10px 13px;background:rgba(9,14,26,0.9);border:1px solid rgba(255,255,255,0.14);border-radius:15px;box-shadow:0 10px 28px rgba(0,0,0,0.42);backdrop-filter:blur(14px);display:flex;flex-direction:column;gap:8px;">' +
        '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;"></div>' +
        '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.09);"></div>' +
      '</div>';

    // Flagship Bento cards
    var bentoHtml = FLAGSHIP_PORTALS.map(function (p) {
      return (
        '<a href="' + esc(p.url) + '" target="_blank" rel="noopener" class="my-bento-card" style="border-top: 3px solid ' + p.accent + ';">' +
          '<div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">' +
              '<span style="font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.07em;color:' + p.accent + ';">' + esc(p.badge) + '</span>' +
              '<span style="font-size:13px;color:#94A3B8;">&#8599;</span>' +
            '</div>' +
            '<div style="font-size:16.5px;font-weight:800;color:#FFFFFF;margin-bottom:7px;line-height:1.3;">' + esc(p.title) + '</div>' +
            '<p style="font-size:13px;line-height:1.55;color:#CBD5E1;margin:0 0 12px 0;">' + esc(p.desc) + '</p>' +
          '</div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:9px;border-top:1px solid rgba(148,163,184,0.14);">' +
            (p.domainPrefix === 'MY'
              ? '<span class="my-tag-chip"><span class="my-tag-hi">MY</span>' + esc(p.domainRest) + '</span>'
              : '<span class="my-tag-chip">' + esc(p.domainRest) + '</span>') +
            '<span style="font-size:11.5px;font-weight:800;color:' + p.accent + ';">Open Portal &rarr;</span>' +
          '</div>' +
        '</a>'
      );
    }).join('');

    // Timeline items
    var timelineHtml = APPOINTMENTS.map(function (ap) {
      var lis = ap.bullets.map(function (b) {
        return '<li style="margin-bottom:5px;line-height:1.55;color:#CBD5E1;font-size:13.2px;">' + esc(b) + '</li>';
      }).join('');
      return (
        '<div class="my-tl-item" style="border-left-color:' + ap.accent + ';">' +
          '<div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:6px 14px;margin-bottom:4px;">' +
            '<div style="font-size:16px;font-weight:800;color:#FFFFFF;">' + esc(ap.role) + '</div>' +
            '<span style="font-family:ui-monospace,monospace;font-size:12px;font-weight:800;color:' + ap.accent + ';background:rgba(2,6,23,0.65);padding:3px 9px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);">' + esc(ap.period) + '</span>' +
          '</div>' +
          '<div style="font-size:13.5px;font-weight:700;color:#94A3B8;margin-bottom:8px;">' + esc(ap.org) + ' &bull; ' + esc(ap.loc) + '</div>' +
          '<ul style="margin:0;padding-left:18px;">' + lis + '</ul>' +
        '</div>'
      );
    }).join('');

    // Hub cards
    var hubsHtml = HUB_CARDS.map(function (h) {
      return (
        '<a href="' + esc(h.url) + '" class="my-hub-card" data-hub-card="' + esc(h.slug) + '">' +
          '<div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:5px;">' +
              '<span style="font-size:18px;">' + h.icon + '</span>' +
              '<span class="my-hub-ep-count" data-count-slug="' + esc(h.slug) + '" style="font-family:ui-monospace,monospace;font-size:10.5px;font-weight:800;color:' + h.accent + ';background:rgba(2,6,23,0.7);padding:2px 7px;border-radius:999px;border:1px solid rgba(255,255,255,0.1);">Live Hub</span>' +
            '</div>' +
            '<div style="font-size:14px;font-weight:800;color:#FFFFFF;line-height:1.3;margin-bottom:3px;">' + esc(h.name) + '</div>' +
            '<div style="font-size:11.8px;color:#94A3B8;line-height:1.4;">' + esc(h.sub) + '</div>' +
          '</div>' +
          '<div style="padding-top:6px;border-top:1px solid rgba(148,163,184,0.12);display:flex;align-items:center;justify-content:space-between;">' +
            formatMyDomain(h.url) +
            '<span style="font-size:11px;font-weight:800;color:' + h.accent + ';">&rarr;</span>' +
          '</div>' +
        '</a>'
      );
    }).join('');

    root.innerHTML =
      '<div id="my-cv-wrap">' +
        topNavHtml +

        /* HERO CV & MONOGRAM CARD */
        '<section class="my-hero-card">' +
          '<div class="my-hero-grid">' +
            '<div class="my-portrait-box">' + buildPortraitSVG() + '</div>' +
            '<div>' +
              '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:10px;">' +
                '<span class="my-mono-pill"><span class="my-hi" style="font-size:13px;">MY</span><span>&middot;scientist.carrd.co</span></span>' +
                '<span style="font-size:11.5px;font-weight:700;color:#94A3B8;background:rgba(30,41,59,0.7);padding:4px 10px;border-radius:999px;border:1px solid rgba(148,163,184,0.25);">&#128205; ' + esc(CONFIG.location) + '</span>' +
                '<span style="font-size:11.5px;font-weight:700;color:#34D399;background:rgba(6,78,59,0.45);padding:4px 10px;border-radius:999px;border:1px solid rgba(52,211,153,0.4);">Curriculum Vitae &amp; Lead Research Portal</span>' +
              '</div>' +

              '<h1 style="margin:0 0 6px 0;font-size:clamp(28px, 3.4vw, 40px);font-weight:900;letter-spacing:-0.02em;color:#FFFFFF;line-height:1.12;">' +
                '<span class="my-hi">M</span>atthew S. <span class="my-hi">Y</span>orek, <span style="font-weight:700;color:#CBD5E1;font-size:0.76em;">M.S.</span>' +
              '</h1>' +
              '<div style="font-size:16px;font-weight:700;color:#E2E8F0;margin-bottom:6px;">' + esc(CONFIG.role) + '</div>' +
              '<p style="margin:0 0 14px 0;font-size:13.8px;line-height:1.58;color:#94A3B8;max-width:980px;">' + esc(CONFIG.tagline) + '</p>' +

              /* THE "MY-" INITIALS EXPLAINER CALLOUT */
              '<div style="background:linear-gradient(90deg, rgba(56,189,248,0.13) 0%, rgba(192,132,252,0.10) 60%, rgba(245,158,11,0.09) 100%);border:1px solid rgba(56,189,248,0.38);border-left:4px solid #38BDF8;border-radius:12px;padding:10px 14px;margin-bottom:16px;font-size:12.8px;line-height:1.5;color:#E2E8F0;">' +
                '<strong style="color:#FFFFFF;"><span class="my-hi" style="font-size:14px;">[MY]</span> Why <code style="color:#38BDF8;background:rgba(2,6,23,0.65);padding:1px 6px;border-radius:5px;">my-</code> across every domain?</strong> ' +
                'Every portal in this 16-site ecosystem&mdash;from <code style="color:#FDE68A;background:rgba(2,6,23,0.6);padding:1px 5px;border-radius:4px;"><strong>MY</strong>-scientist</code> and <code style="color:#FDE68A;background:rgba(2,6,23,0.6);padding:1px 5px;border-radius:4px;"><strong>MY</strong>-clampflow</code> to <code style="color:#BAE6FD;background:rgba(2,6,23,0.6);padding:1px 5px;border-radius:4px;"><strong>MY</strong>-biophysics</code> and <code style="color:#FBCFE8;background:rgba(2,6,23,0.6);padding:1px 5px;border-radius:4px;"><strong>MY</strong>-oncology</code>&mdash;is signed with the initials of <strong><span style="color:#38BDF8;">M</span>atthew <span style="color:#C084FC;">Y</span>orek</strong>: one connected bench-to-code-to-audio notebook.' +
              '</div>' +

              /* PRIMARY EXTERNAL LINKS (ORCID, PUBMED, GITHUB, STRAVA, EMAIL, PRINT) */
              '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:9px;">' +
                '<a href="' + esc(CONFIG.orcidUrl) + '" target="_blank" rel="noopener" class="my-action-btn" style="background:rgba(63,98,18,0.52);border:1px solid rgba(163,230,53,0.68);color:#ECFCCB;">' +
                  '<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#A6CE39;color:#090E1A;font-size:10.5px;font-weight:900;">iD</span>' +
                  'ORCID ' + esc(CONFIG.orcid) + ' &#8599;' +
                '</a>' +
                '<a href="' + esc(CONFIG.pubmedUrl) + '" target="_blank" rel="noopener" class="my-action-btn" style="background:rgba(14,116,144,0.45);border:1px solid rgba(56,189,248,0.68);color:#E0F2FE;">' +
                  '&#128218; PubMed Bibliography (23) &#8599;' +
                '</a>' +
                '<a href="' + esc(CONFIG.githubUrl) + '" target="_blank" rel="noopener" class="my-action-btn" style="background:rgba(30,41,59,0.92);border:1px solid rgba(148,163,184,0.5);color:#F8FAFC;">' +
                  '&#128187; GitHub @yorekms &#8599;' +
                '</a>' +
                '<a href="' + esc(CONFIG.stravaUrl) + '" target="_blank" rel="noopener" id="my-strava-hero-btn" class="my-action-btn" style="background:linear-gradient(135deg, rgba(252,76,2,0.92) 0%, rgba(234,88,12,0.92) 100%);border:1px solid #FDBA74;color:#FFFFFF;box-shadow:0 0 18px rgba(252,76,2,0.32);">' +
                  '&#127939;&#8205;&#9794;&#65039; Strava &bull; YOREK &#8599;' +
                '</a>' +
                '<a href="mailto:' + esc(CONFIG.email) + '" class="my-action-btn" style="background:rgba(15,23,42,0.9);border:1px solid rgba(192,132,252,0.5);color:#F3E8FF;">' +
                  '&#9993;&#65039; ' + esc(CONFIG.email) +
                '</a>' +
                '<button type="button" id="my-print-cv-btn" class="my-action-btn" style="background:rgba(15,23,42,0.85);border:1px solid rgba(148,163,184,0.38);color:#CBD5E1;">' +
                  '&#128424; Print CV' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>' +

        /* 5-METRIC TELEMETRY RIBBON */
        '<section class="my-stat-grid" aria-label="Research Telemetry">' +
          '<div class="my-stat-card" style="border-top:2px solid #38BDF8;">' +
            '<div style="font-size:23px;font-weight:900;color:#FFFFFF;font-variant-numeric:tabular-nums;">1,056 <span style="font-size:12px;font-weight:800;color:#38BDF8;">Cites &bull; h=15</span></div>' +
            '<div style="font-size:11.3px;font-weight:700;color:#94A3B8;margin-top:3px;">23 Papers (8 First-Author) &bull; i10=17 &bull; g-index 23/23 (100%) &bull; 65% h-Core</div>' +
          '</div>' +
          '<div class="my-stat-card" style="border-top:2px solid #34D399;">' +
            '<div style="font-size:23px;font-weight:900;color:#FFFFFF;font-variant-numeric:tabular-nums;">4.92&times; <span style="font-size:12px;font-weight:800;color:#34D399;">Global FWCI</span></div>' +
            '<div style="font-size:11.3px;font-weight:700;color:#94A3B8;margin-top:3px;">2.13&times; NIH RCR Baseline &bull; 13 of 23 (57%) in Global Top 10% for Field &amp; Year</div>' +
          '</div>' +
          '<div class="my-stat-card" style="border-top:2px solid #F59E0B;">' +
            '<div style="font-size:23px;font-weight:900;color:#FFFFFF;font-variant-numeric:tabular-nums;">57 Cites <span style="font-size:12px;font-weight:800;color:#FBBF24;">Top 1.6%</span></div>' +
            '<div style="font-size:11.3px;font-weight:700;color:#94A3B8;margin-top:3px;">2024 First-Author <em>eLife</em> Study (7.75&times; FWCI &bull; 91.5th NIH Percentile)</div>' +
          '</div>' +
          '<div class="my-stat-card" style="border-top:2px solid #C084FC;">' +
            '<div style="font-size:23px;font-weight:900;color:#FFFFFF;font-variant-numeric:tabular-nums;">20+ Yrs <span style="font-size:12px;font-weight:800;color:#C084FC;">&amp; 14+ Suites</span></div>' +
            '<div style="font-size:11.3px;font-weight:700;color:#94A3B8;margin-top:3px;">UVA Health &bull; UIowa &bull; Grain Processing Corp. &bull; Iowa City VA &bull; ClampFlow</div>' +
          '</div>' +
          '<div class="my-stat-card" style="border-top:2px solid #FB7185;">' +
            '<div id="my-live-ep-total" style="font-size:23px;font-weight:900;color:#FFFFFF;font-variant-numeric:tabular-nums;">701</div>' +
            '<div style="font-size:11.3px;font-weight:700;color:#94A3B8;margin-top:3px;">Long-Form Scientific Audio Treatises Across 12 <strong style="color:#38BDF8;">MY-</strong> Subject Hubs</div>' +
          '</div>' +
        '</section>' +

        /* STICKY JUMP BAR */
        '<nav class="my-jump-bar" aria-label="CV Sections">' +
          '<span style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.07em;color:#38BDF8;margin-right:4px;">MY&middot;CV Sections:</span>' +
          '<a href="#sec-portals" class="my-jump-link">&#128640; Software &amp; Portals</a>' +
          '<a href="#sec-appointments" class="my-jump-link">&#127963;&#65039; Appointments &amp; GPC</a>' +
          '<a href="#sec-publications" class="my-jump-link">&#128200; Impact &amp; Publications (23)</a>' +
          '<a href="#sec-methods" class="my-jump-link">&#128736;&#65039; Methods, Education &amp; Talks</a>' +
          '<a href="#sec-audio-hubs" class="my-jump-link">&#127911; 12 MY- Audio Hubs</a>' +
          '<a href="#sec-strava" class="my-jump-link" style="border-color:rgba(252,76,2,0.45);color:#FED7AA;">&#128692; Off-Bench &amp; Strava</a>' +
        '</nav>' +

        /* SECTION 1: FLAGSHIP PORTALS & SOFTWARE */
        '<section id="sec-portals" class="my-sec-card">' +
          '<div class="my-sec-hdr">' +
            '<div>' +
              '<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#38BDF8;margin-bottom:3px;">Primary Ecosystem Link-Outs</div>' +
              '<h2 style="margin:0;font-size:22px;font-weight:900;color:#FFFFFF;">Flagship Scientific Software, Workbenches &amp; Research Primers</h2>' +
            '</div>' +
            '<span style="font-size:12px;color:#94A3B8;">6 Active Tools &amp; Portals</span>' +
          '</div>' +
          '<div class="my-bento-grid">' + bentoHtml + '</div>' +
        '</section>' +

        /* SECTION 2: RESEARCH APPOINTMENTS & TIMELINE */
        '<section id="sec-appointments" class="my-sec-card">' +
          '<div class="my-sec-hdr">' +
            '<div>' +
              '<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#C084FC;margin-bottom:3px;">Academic, Clinical &amp; Industrial Analytical Lineage (2005 &ndash; Present)</div>' +
              '<h2 style="margin:0;font-size:22px;font-weight:900;color:#FFFFFF;">Research &amp; Analytical Chemistry Appointments</h2>' +
            '</div>' +
            '<span style="font-size:12px;color:#94A3B8;">UVA Health &bull; UIowa &bull; Grain Processing Corp. (Mississippi River) &bull; Iowa City VA</span>' +
          '</div>' +
          '<div class="my-timeline">' + timelineHtml + '</div>' +
        '</section>' +

        /* SECTION 3: PEER-REVIEWED PUBLICATIONS & BIBLIOMETRIC IMPACT */
        '<section id="sec-publications" class="my-sec-card">' +
          '<div class="my-sec-hdr">' +
            '<div>' +
              '<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#34D399;margin-bottom:3px;">ORCID 0000-0002-4737-9367 &bull; OpenAlex &amp; Official NIH iCite Verified Impact</div>' +
              '<h2 style="margin:0;font-size:22px;font-weight:900;color:#FFFFFF;">Objective Bibliometrics &amp; Peer-Reviewed Publications (2008 &ndash; 2026)</h2>' +
            '</div>' +
            '<a href="' + esc(CONFIG.pubmedUrl) + '" target="_blank" rel="noopener" style="font-size:12.5px;font-weight:800;color:#38BDF8;text-decoration:none;">Open Official NCBI MyBibliography &#8599;</a>' +
          '</div>' +

          /* OBJECTIVE IMPACT EXPLAINER GRID */
          '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(255px,1fr));gap:12px;margin-bottom:18px;padding:15px;border-radius:16px;background:linear-gradient(135deg,rgba(14,116,144,0.16) 0%,rgba(15,23,42,0.92) 55%,rgba(16,185,129,0.12) 100%);border:1px solid rgba(52,211,153,0.32);">' +
            '<div style="background:rgba(2,6,23,0.62);border:1px solid rgba(56,189,248,0.28);border-radius:12px;padding:12px 14px;">' +
              '<div style="font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#38BDF8;margin-bottom:4px;">Citation Density &amp; Efficiency</div>' +
              '<div style="font-size:17px;font-weight:900;color:#FFFFFF;margin-bottom:3px;">1,056 Citations &bull; 45.9 / Paper</div>' +
              '<div style="font-size:12px;line-height:1.45;color:#CBD5E1;"><strong>h-index = 15</strong> (65.2% of all 23 papers inside the h-core; 16th paper at 14 cites), <strong>i10-index = 17</strong> (74%), and maximum possible <strong>g-index = 23/23 (100%)</strong>.</div>' +
            '</div>' +
            '<div style="background:rgba(2,6,23,0.62);border:1px solid rgba(52,211,153,0.28);border-radius:12px;padding:12px 14px;">' +
              '<div style="font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#34D399;margin-bottom:4px;">Field- &amp; Age-Normalized Impact (FWCI)</div>' +
              '<div style="font-size:17px;font-weight:900;color:#FFFFFF;margin-bottom:3px;">4.92&times; World Average (4.03&times; Median)</div>' +
              '<div style="font-size:12px;line-height:1.45;color:#CBD5E1;">Unlike raw h-index (capped by paper count), OpenAlex FWCI normalizes by subfield &amp; year (1.0&times; = world mean): <strong>13 of 23 papers (56.5%) rank in the Global Top 10%</strong> and <strong>9 (39%) in the Top 5%</strong>.</div>' +
            '</div>' +
            '<div style="background:rgba(2,6,23,0.62);border:1px solid rgba(192,132,252,0.28);border-radius:12px;padding:12px 14px;">' +
              '<div style="font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#C084FC;margin-bottom:4px;">NIH Study-Section Benchmark (iCite RCR)</div>' +
              '<div style="font-size:17px;font-weight:900;color:#FFFFFF;margin-bottom:3px;">2.13&times; NIH R01 Peer Baseline</div>' +
              '<div style="font-size:12px;line-height:1.45;color:#CBD5E1;">Official NIH Office of Portfolio Analysis <em>iCite</em> scores 21 benchmarked articles at <strong>44.69 Weighted RCR</strong> (~45 NIH-average papers of impact), with <strong>9 papers in the NIH Top Quartile (&ge;75th pct)</strong>.</div>' +
            '</div>' +
            '<div style="background:rgba(2,6,23,0.62);border:1px solid rgba(245,158,11,0.32);border-radius:12px;padding:12px 14px;">' +
              '<div style="font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#FBBF24;margin-bottom:4px;">Recent First-Author &amp; UVA Velocity</div>' +
              '<div style="font-size:17px;font-weight:900;color:#FFFFFF;margin-bottom:3px;">eLife 2024: 57 Cites (7.75&times; FWCI)</div>' +
              '<div style="font-size:12px;line-height:1.45;color:#CBD5E1;">First-author 2024 <em>eLife</em> breast cancer study is in the <strong>Global Top 1.6% (98.4th pct; NIH RCR 4.73, 91.5th pct)</strong>; 2026 <em>JCI</em> SCN8A base editing is at <strong>18.27&times; FWCI (99.2nd pct)</strong>; 136 cites/yr peak velocity in 2026.</div>' +
            '</div>' +
          '</div>' +

          '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;">' +
            '<div id="my-pub-filters" style="display:flex;flex-wrap:wrap;gap:6px;">' +
              '<button type="button" class="my-pub-filter-btn active" data-filter="all">All (23)</button>' +
              '<button type="button" class="my-pub-filter-btn" data-filter="first">&#9733; First-Author (8 &bull; 270 Cites)</button>' +
              '<button type="button" class="my-pub-filter-btn" data-filter="top10">&#127942; Global Top 10% Field Impact (13)</button>' +
              '<button type="button" class="my-pub-filter-btn" data-filter="neuro">&#9889; Epilepsy, GBM &amp; Ion Channels (5)</button>' +
              '<button type="button" class="my-pub-filter-btn" data-filter="cancer">&#129516; Cancer &amp; Immunometabolism (8)</button>' +
              '<button type="button" class="my-pub-filter-btn" data-filter="vision">&#128065;&#65039; Neuropathy, Cornea &amp; TBI (10)</button>' +
            '</div>' +
            '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;flex:1;justify-content:flex-end;">' +
              '<div id="my-pub-sorts" style="display:inline-flex;align-items:center;gap:4px;background:rgba(2,6,23,0.75);padding:3px;border-radius:999px;border:1px solid rgba(148,163,184,0.28);">' +
                '<button type="button" class="my-pub-filter-btn active" data-sort="year" style="padding:4px 10px;font-size:11px;">Newest</button>' +
                '<button type="button" class="my-pub-filter-btn" data-sort="cites" style="padding:4px 10px;font-size:11px;">Most Cited</button>' +
                '<button type="button" class="my-pub-filter-btn" data-sort="fwci" style="padding:4px 10px;font-size:11px;">Highest FWCI</button>' +
              '</div>' +
              '<input id="my-pub-search" type="search" placeholder="Search gene, journal, year (e.g. SCN8A, FABP4, eLife)..." style="min-width:230px;max-width:340px;padding:7px 13px;border-radius:999px;border:1px solid rgba(148,163,184,0.35);background:rgba(2,6,23,0.8);color:#F8FAFC;font-size:12.2px;outline:none;" />' +
            '</div>' +
          '</div>' +
          '<div id="my-pub-list"></div>' +
        '</section>' +

        /* SECTION 4: EDUCATION, TECHNICAL METHODS, INVITED TALKS & SERVICE */
        '<section id="sec-methods" class="my-sec-card">' +
          '<div class="my-sec-hdr">' +
            '<div>' +
              '<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#F59E0B;margin-bottom:3px;">Training, Quantitative Stack &amp; Governance</div>' +
              '<h2 style="margin:0;font-size:22px;font-weight:900;color:#FFFFFF;">Education, Technical Methods, Invited Seminars &amp; Service</h2>' +
            '</div>' +
          '</div>' +
          '<div class="my-two-col">' +
            '<div style="background:rgba(15,23,42,0.88);border:1px solid rgba(255,255,255,0.11);border-radius:15px;padding:18px;">' +
              '<h3 style="margin:0 0 10px 0;font-size:16px;font-weight:800;color:#38BDF8;">&#127891; Academic Degrees</h3>' +
              '<div style="margin-bottom:11px;padding-bottom:11px;border-bottom:1px solid rgba(148,163,184,0.14);">' +
                '<div style="font-size:14.5px;font-weight:800;color:#FFFFFF;">M.S. in Neuropharmacology <span style="color:#94A3B8;font-weight:600;">&bull; University of Iowa (2012)</span></div>' +
                '<div style="font-size:12.8px;color:#CBD5E1;margin-top:3px;">Thesis: <em>&ldquo;Mechanism of TRPM8-Mediated [Ca<sup>2+</sup>]<sub>i</sub> Oscillations in Sensory Neurons&rdquo;</em></div>' +
              '</div>' +
              '<div style="margin-bottom:11px;padding-bottom:11px;border-bottom:1px solid rgba(148,163,184,0.14);">' +
                '<div style="font-size:14.5px;font-weight:800;color:#FFFFFF;">B.S. in Psychology (with Honors), Minor in Biology <span style="color:#94A3B8;font-weight:600;">&bull; University of Iowa (2008)</span></div>' +
                '<div style="font-size:12.8px;color:#CBD5E1;margin-top:3px;">Honors Thesis: <em>&ldquo;Attentional Task Switching in a Rat Model of Schizophrenia: Comparison to Attentional Set-Shifting&rdquo;</em></div>' +
              '</div>' +
              '<div>' +
                '<div style="font-size:13.8px;font-weight:800;color:#E2E8F0;">A.S. in Automotive &amp; Diesel Mechanics <span style="color:#94A3B8;font-weight:600;">&bull; Wyoming Technical Institute (2002)</span></div>' +
                '<div style="font-size:12.3px;color:#94A3B8;margin-top:2px;">Precision diagnostics, hydraulics, electrical wiring &amp; mechanical fabrication foundation.</div>' +
              '</div>' +
            '</div>' +

            '<div style="background:rgba(15,23,42,0.88);border:1px solid rgba(255,255,255,0.11);border-radius:15px;padding:18px;">' +
              '<h3 style="margin:0 0 10px 0;font-size:16px;font-weight:800;color:#C084FC;">&#128187; Quantitative, Wet-Lab &amp; Imaging Stack</h3>' +
              '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.58;color:#CBD5E1;">' +
                '<li style="margin-bottom:6px;"><strong>Statistical &amp; Scientific Computing:</strong> R (<code>edgeR</code>, <code>limma</code>, study-level meta-regression), Python (<code>NumPy</code>, <code>SciPy</code>, Bayesian forecasting), MATLAB (<code>ClampFlow</code>, 14 physiology &amp; EEG/ABF toolboxes), SQL &amp; REDCap clinical data administration.</li>' +
                '<li style="margin-bottom:6px;"><strong>Electrophysiology &amp; Live-Cell Biophysics:</strong> Whole-cell voltage/current clamp, intracellular Ca<sup>2+</sup> imaging, DRG &amp; central slice physiology, stereotaxic intracranial surgery, plethysmography &amp; EEG seizure telemetry.</li>' +
                '<li style="margin-bottom:6px;"><strong>Microscopy, Cytometry &amp; Analytical Process Chemistry:</strong> Confocal, multiphoton/light &amp; electron microscopy, 3D volume reconstruction (<code>IMARIS</code>, <code>FIJI/ImageJ</code>), optical coherence tomography (OCT), FlowJo multiparameter flow cytometry, HPLC, GC, LC-MS, Kjeldahl protein, N/S combustion analysis &amp; Soxhlet/ether lipid extraction.</li>' +
                '<li><strong>Software Heritage:</strong> Coding since 1997 across FORTRAN, Pascal, C/C++ (including early C-based NUTS network servers), Visual Basic, HTML/JS, and two+ years of agentic LLM scientific tool engineering.</li>' +
              '</ul>' +
            '</div>' +

            '<div style="background:rgba(15,23,42,0.88);border:1px solid rgba(255,255,255,0.11);border-radius:15px;padding:18px;">' +
              '<h3 style="margin:0 0 10px 0;font-size:16px;font-weight:800;color:#34D399;">&#127908; Selected Invited Seminars &amp; National Presentations</h3>' +
              '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.58;color:#CBD5E1;">' +
                '<li style="margin-bottom:6px;"><strong>NCI MeDOC Consortium &amp; Holden Comprehensive Cancer Center (2023–2024):</strong> <em>The role of A-FABP (FABP4) in macrophage triglyceride formation, lipolysis, and breast cancer proliferation/metastasis</em>; Bariatric Surgery Working Group.</li>' +
                '<li style="margin-bottom:6px;"><strong>University of Melbourne, Dept. of Anatomy &amp; Neuroscience (Invited Oral Seminars, Aug 13 &amp; 14, 2015, Melbourne, Australia):</strong> (1) <em>TRPM8 agonist-induced intracellular Ca<sup>2+</sup> oscillations</em>; (2) <em>Corneal nerves in diabetic peripheral neuropathy</em>.</li>' +
                '<li><strong>Society for Neuroscience (SfN), ARVO, ACNP &amp; Iowa Microscopy Society (2007–2016):</strong> First-author presentations on hyperosmolar corneal psychophysics (ARVO Seattle 2016), TRPM8 Ca<sup>2+</sup> oscillations (SfN San Diego 2010), complement C3a/C5a TRPV1 sensitization (2010), and PDE/attentional task-switching (SfN 2007–2009).</li>' +
              '</ul>' +
            '</div>' +

            '<div style="background:rgba(15,23,42,0.88);border:1px solid rgba(255,255,255,0.11);border-radius:15px;padding:18px;">' +
              '<h3 style="margin:0 0 10px 0;font-size:16px;font-weight:800;color:#F59E0B;">&#9878;&#65039; Institutional Committees, Mentorship &amp; Societies</h3>' +
              '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.58;color:#CBD5E1;">' +
                '<li style="margin-bottom:6px;"><strong>Institutional Oversight:</strong> Iowa City VA Institutional Animal Care and Use Committee (<strong>IACUC</strong>, 2012–2013) &amp; VA Research Safety Committee (2013–2016, rDNA &amp; chemical safety auditing).</li>' +
                '<li style="margin-bottom:6px;"><strong>Environmental Health &amp; Safety Liaison (2017–2021):</strong> University of Iowa Inflammation Program &mdash; led laboratory relocation to Eckstein Biomedical Research Building and digitized chemical inventory to computerized SDS tracking while reducing hazardous stock volume.</li>' +
                '<li><strong>Scientific Societies &amp; Mentorship:</strong> Society for Neuroscience (SfN), Microscopy Society of America / Iowa Microscopy Society, Society for Leukocyte Biology; trained undergraduate, graduate, and PhD colleagues in microscopy, animal surgery, and reproducible R/Python statistical workflows.</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</section>' +

        /* SECTION 5: ALL 12 MY- PODCAST HUBS */
        '<section id="sec-audio-hubs" class="my-sec-card">' +
          '<div class="my-sec-hdr">' +
            '<div>' +
              '<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#38BDF8;margin-bottom:3px;">Open Scientific Communication &bull; <span class="my-hi">MY-</span> Podcast Network</div>' +
              '<h2 style="margin:0;font-size:22px;font-weight:900;color:#FFFFFF;">12 Subject Hubs &amp; Long-Form Audio Treatises</h2>' +
            '</div>' +
            '<a href="' + esc(CONFIG.podcastDirectoryUrl) + '" target="_blank" rel="noopener" style="font-size:12.5px;font-weight:800;color:#C084FC;text-decoration:none;">All 13 Apple/Overcast RSS Feeds &#8599;</a>' +
          '</div>' +
          '<div class="my-hub-grid">' + hubsHtml + '</div>' +
        '</section>' +

        /* SECTION 6: OFF-BENCH, STRAVA & CRAFT */
        '<section id="sec-strava" class="my-sec-card" style="background:linear-gradient(135deg, rgba(252,76,2,0.12) 0%, rgba(15,23,42,0.96) 52%, rgba(56,189,248,0.10) 100%);border-color:rgba(252,76,2,0.42);">' +
          '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;">' +
            '<div style="flex:1;min-width:280px;">' +
              '<div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.09em;color:#FB923C;margin-bottom:4px;">&#127939;&#8205;&#9794;&#65039; &#128692; &#127805; Off-Bench Miles, Riverfront Craft &amp; Endurance</div>' +
              '<h2 style="margin:0 0 8px 0;font-size:22px;font-weight:900;color:#FFFFFF;">Aerobic Miles, Industrial Grit &amp; Hands-On Mechanics</h2>' +
              '<p style="margin:0;font-size:13.6px;line-height:1.6;color:#E2E8F0;max-width:900px;">' +
                'Outside the electrophysiology rig and R/Python terminal, long endurance miles on the roads and trails around Virginia are where experimental designs, Bayesian models, and 60-minute podcast arcs get stress-tested. Grounded in hands-on mechanical diagnostics (rebuilding transmissions, air-brakes &amp; hydraulics), rotating 12-hour day/night analytical shifts on the Mississippi River at Grain Processing Corporation&rsquo;s Muscatine wet-milling plant, and custom imaging/operant rig wiring, <strong style="color:#FFFFFF;"><span class="my-hi">MY</span>-scientist</strong> bridges real-world craft, open code, and endurance grit.' +
              '</p>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;align-items:flex-start;gap:8px;">' +
              '<a href="' + esc(CONFIG.stravaUrl) + '" target="_blank" rel="noopener" class="my-action-btn" style="background:#FC4C02;border:1px solid #FDBA74;color:#FFFFFF;padding:11px 20px;font-size:13.5px;box-shadow:0 10px 26px rgba(252,76,2,0.4);">' +
                '&#9889; Connect on Strava (YOREK) &#8599;' +
              '</a>' +
              '<span style="font-size:11px;color:#94A3B8;">Charlottesville, VA &bull; Running, Cycling &amp; Challenge Logs</span>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</div>';

    // Render filterable & sortable publications
    var activeFilter = 'all';
    var activeSort = 'year';
    var searchQuery = '';
    var pubListEl = document.getElementById('my-pub-list');

    function renderPubs() {
      if (!pubListEl) return;
      var q = searchQuery.trim().toLowerCase();
      var matches = PUBLICATIONS.filter(function (p) {
        var catOk = activeFilter === 'all' || p.cats.indexOf(activeFilter) !== -1;
        if (!catOk) return false;
        if (!q) return true;
        var hay = (p.title + ' ' + p.authors + ' ' + p.journal + ' ' + p.year + ' ' + (p.pmid || '') + ' ' + (p.roleNote || '')).toLowerCase();
        return hay.indexOf(q) !== -1;
      }).slice();

      if (activeSort === 'cites') {
        matches.sort(function (a, b) { return (b.cites || 0) - (a.cites || 0) || a.num - b.num; });
      } else if (activeSort === 'fwci') {
        matches.sort(function (a, b) { return (b.fwci || 0) - (a.fwci || 0) || (b.cites || 0) - (a.cites || 0); });
      } else {
        matches.sort(function (a, b) { return a.num - b.num; });
      }

      if (!matches.length) {
        pubListEl.innerHTML = '<div style="padding:18px;text-align:center;color:#94A3B8;font-size:13.5px;">No publications matched that filter. Try clearing the search box.</div>';
        return;
      }

      pubListEl.innerHTML = matches.map(function (p) {
        var linkUrl = p.doi ? ('https://doi.org/' + p.doi) : (p.pmid ? ('https://pubmed.ncbi.nlm.nih.gov/' + p.pmid + '/') : CONFIG.pubmedUrl);
        var linkLabel = p.doi ? ('DOI: ' + p.doi + ' &#8599;') : ('PMID: ' + p.pmid + ' &#8599;');
        var citeBadge = '<span title="OpenAlex Verified Citation Count" style="font-family:ui-monospace,monospace;font-size:11.2px;font-weight:800;color:#6EE7B7;background:rgba(6,78,59,0.52);padding:2px 8px;border-radius:999px;border:1px solid rgba(52,211,153,0.45);">&#128200; ' + (p.cites || 0) + ' Cites</span>';
        var fwciBadge = '';
        if (p.fwci && p.fwci >= 1.5) {
          var topTxt = (p.oaPct && p.oaPct >= 90) ? (' &bull; Top ' + Math.max(0.3, (100 - p.oaPct)).toFixed(1).replace(/\.0$/, '') + '%') : '';
          var isElite = p.oaPct && p.oaPct >= 90;
          fwciBadge = '<span title="OpenAlex Field-Weighted Citation Impact (1.0x = Global Mean for Field &amp; Year)" style="font-family:ui-monospace,monospace;font-size:11px;font-weight:800;color:' + (isElite ? '#FDE68A' : '#BAE6FD') + ';background:' + (isElite ? 'rgba(146,64,14,0.45)' : 'rgba(14,116,144,0.32)') + ';padding:2px 8px;border-radius:999px;border:1px solid ' + (isElite ? 'rgba(251,191,36,0.52)' : 'rgba(56,189,248,0.38)') + ';">' + p.fwci.toFixed(2) + '&times; FWCI' + topTxt + '</span>';
        }
        var rcrBadge = '';
        if (p.rcr && p.rcr >= 1.5) {
          rcrBadge = '<span title="Official NIH iCite Relative Citation Ratio (1.0 = NIH-Funded Median)" style="font-family:ui-monospace,monospace;font-size:11px;font-weight:800;color:#E9D5FF;background:rgba(88,28,135,0.42);padding:2px 8px;border-radius:999px;border:1px solid rgba(192,132,252,0.45);">NIH RCR ' + p.rcr.toFixed(2) + '</span>';
        }
        return (
          '<article class="my-pub-item">' +
            '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 12px;margin-bottom:5px;">' +
              '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;">' +
                '<span style="font-family:ui-monospace,monospace;font-size:11.5px;font-weight:800;color:#38BDF8;background:rgba(14,116,144,0.3);padding:2px 8px;border-radius:6px;border:1px solid rgba(56,189,248,0.35);">#' + p.num + ' &bull; ' + p.year + '</span>' +
                '<span style="font-size:12px;font-weight:800;color:#F8FAFC;background:rgba(30,41,59,0.9);padding:2px 9px;border-radius:6px;border:1px solid rgba(148,163,184,0.28);">' + esc(p.journal) + ' <span style="color:#94A3B8;font-weight:600;">' + esc(p.cite) + '</span></span>' +
                (p.firstAuthor ? '<span style="font-size:11px;font-weight:800;color:#FEF08A;background:rgba(161,98,7,0.42);padding:2px 8px;border-radius:999px;border:1px solid rgba(250,204,21,0.5);">&#9733; First Author</span>' : '') +
                citeBadge + fwciBadge + rcrBadge +
              '</div>' +
              '<a href="' + esc(linkUrl) + '" target="_blank" rel="noopener" style="font-family:ui-monospace,monospace;font-size:11.5px;font-weight:700;color:#34D399;text-decoration:none;">' + linkLabel + '</a>' +
            '</div>' +
            '<div style="font-size:14.5px;font-weight:800;color:#FFFFFF;line-height:1.38;margin-bottom:4px;">' +
              '<a href="' + esc(linkUrl) + '" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">' + esc(p.title) + '</a>' +
            '</div>' +
            '<div style="font-size:12.5px;line-height:1.5;color:#CBD5E1;margin-bottom:5px;">' + highlightYorek(p.authors) + '</div>' +
            (p.roleNote ? '<div style="font-size:11.8px;color:#94A3B8;border-left:2px solid rgba(56,189,248,0.45);padding-left:8px;">' + esc(p.roleNote) + '</div>' : '') +
          '</article>'
        );
      }).join('');
    }

    renderPubs();

    var filterWrap = document.getElementById('my-pub-filters');
    if (filterWrap) {
      filterWrap.addEventListener('click', function (ev) {
        var btn = ev.target && ev.target.closest ? ev.target.closest('.my-pub-filter-btn') : null;
        if (!btn) return;
        activeFilter = btn.getAttribute('data-filter') || 'all';
        filterWrap.querySelectorAll('.my-pub-filter-btn').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderPubs();
      });
    }

    var sortWrap = document.getElementById('my-pub-sorts');
    if (sortWrap) {
      sortWrap.addEventListener('click', function (ev) {
        var btn = ev.target && ev.target.closest ? ev.target.closest('.my-pub-filter-btn') : null;
        if (!btn) return;
        activeSort = btn.getAttribute('data-sort') || 'year';
        sortWrap.querySelectorAll('.my-pub-filter-btn').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        renderPubs();
      });
    }

    var searchEl = document.getElementById('my-pub-search');
    if (searchEl) {
      searchEl.addEventListener('input', function () {
        searchQuery = searchEl.value || '';
        renderPubs();
      });
    }

    var printBtn = document.getElementById('my-print-cv-btn');
    if (printBtn) {
      printBtn.addEventListener('click', function () { window.print(); });
    }

    document.addEventListener('click', function (ev) {
      var rssBtn = ev.target && ev.target.closest ? ev.target.closest('#crp-open-rss-modal-btn') : null;
      if (rssBtn) {
        window.open(CONFIG.podcastDirectoryUrl, '_blank', 'noopener');
      }
    });

    var videoStage = document.getElementById('my-cv-video-stage');
    var portraitVid = document.getElementById('my-cv-portrait-video');
    var videoToggle = document.getElementById('my-cv-video-toggle');
    if (portraitVid) {
      portraitVid.muted = true;
      var playPromise = portraitVid.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          if (videoToggle) videoToggle.innerHTML = '&#9654; Play 3D NaV1.6';
        });
      }
      if (videoStage) {
        videoStage.addEventListener('click', function () {
          if (portraitVid.paused) {
            portraitVid.play().catch(function () {});
            if (videoToggle) videoToggle.innerHTML = '&#9646;&#9646; 3D NaV1.6';
          } else {
            portraitVid.pause();
            if (videoToggle) videoToggle.innerHTML = '&#9654; Paused';
          }
        });
      }
    }

    var photoInput = document.getElementById('my-cv-photo-input');
    if (photoInput) {
      photoInput.addEventListener('change', function () {
        var f = photoInput.files && photoInput.files[0];
        if (!f) return;
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = document.getElementById('my-cv-portrait-img');
          var ph = document.getElementById('my-cv-portrait-placeholder');
          if (img && e.target && e.target.result) {
            img.src = e.target.result;
            img.style.display = 'block';
            if (ph) ph.style.display = 'none';
          }
        };
        reader.readAsDataURL(f);
      });
    }

    // Load shared 16-site nav + GA4 + #crp_s sync module
    if (!window.__crpPortalAnalyticsLoaded) {
      var navScript = document.createElement('script');
      navScript.src = 'https://yorekms.github.io/deep-dive-podcasts/hub/hub-nav.js';
      navScript.setAttribute('data-hub', 'scientist');
      document.body.appendChild(navScript);
    }

    // Hydrate live total & per-hub episode counts from same-repo JSON
    var bust = 'v=' + Math.floor(Date.now() / 300000);
    fetch('https://yorekms.github.io/deep-dive-podcasts/hub/network.json?' + bust, { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (net) {
        if (net && net.master_total) {
          var totEl = document.getElementById('my-live-ep-total');
          if (totEl) totEl.textContent = String(net.master_total);
        }
      }).catch(function () {});

    HUB_CARDS.forEach(function (hc) {
      fetch('https://yorekms.github.io/deep-dive-podcasts/hub/data/' + hc.slug + '.json?' + bust)
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          if (!d || !Array.isArray(d.sections)) return;
          var n = 0;
          d.sections.forEach(function (s) { n += (s.episodes ? s.episodes.length : 0); });
          var badge = document.querySelector('[data-count-slug="' + hc.slug + '"]');
          if (badge && n > 0) badge.textContent = n + ' Episodes';
        }).catch(function () {});
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();

window.ESTUDIA_STARTER_DATA = {
  subjects: [
    {
      id: "subj-spanish",
      name: "Spanish (Español)",
      icon: "🇪🇸",
      color: "#F59E0B",
      description: "Conversational vocabulary, classroom phrases, and irregular verb mastery with native Spanish pronunciation.",
      languageCode: "es-ES"
    },
    {
      id: "subj-biology",
      name: "AP Biology & Physiology",
      icon: "🧬",
      color: "#10B981",
      description: "Cellular organelles, membrane transport, bioenergetics, and physiological signaling.",
      languageCode: "en-US"
    },
    {
      id: "subj-chemistry",
      name: "Chemistry",
      icon: "⚗️",
      color: "#38BDF8",
      description: "Chemical bonding, intermolecular forces, thermodynamics, and reaction kinetics.",
      languageCode: "en-US"
    },
    {
      id: "subj-history",
      name: "US & World History",
      icon: "📜",
      color: "#A855F7",
      description: "Constitutional amendments, primary historical turning points, and civic institutions.",
      languageCode: "en-US"
    }
  ],
  decks: [
    {
      id: "deck-spanish-conv",
      subjectId: "subj-spanish",
      title: "High-Frequency Conversational Spanish",
      description: "Essential everyday expressions with audio pronunciation and usage examples.",
      createdAt: 1761000000000,
      tags: ["Spanish", "Conversation", "Starter"],
      cards: [
        { id: "sc-1", deckId: "deck-spanish-conv", front: "Sin embargo", back: "However / Nevertheless", example: "Estaba cansado; sin embargo, terminó el experimento.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sc-2", deckId: "deck-spanish-conv", front: "A pesar de que", back: "Despite / Even though", example: "Salimos a correr a pesar de que llovía.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sc-3", deckId: "deck-spanish-conv", front: "Darse cuenta de", back: "To realize / Notice", example: "Me di cuenta de que faltaba un reactivo.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sc-4", deckId: "deck-spanish-conv", front: "Vale la pena", back: "It is worth it", example: "Vale la pena verificar los controles dos veces.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sc-5", deckId: "deck-spanish-conv", front: "Echar de menos", back: "To miss (someone or something)", example: "Echo de menos las tardes en el laboratorio.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sc-6", deckId: "deck-spanish-conv", front: "En cuanto", back: "As soon as", example: "Te llamo en cuanto tengamos los resultados.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sc-7", deckId: "deck-spanish-conv", front: "Llevar a cabo", back: "To carry out / Execute", example: "Llevaron a cabo un ensayo clínico aleatorizado.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sc-8", deckId: "deck-spanish-conv", front: "Por lo tanto", back: "Therefore / Consequently", example: "El valor p fue muy bajo; por lo tanto, rechazamos la hipótesis nula.", mastery: 0, timesReviewed: 0, timesCorrect: 0 }
      ]
    },
    {
      id: "deck-spanish-school",
      subjectId: "subj-spanish",
      title: "School & Classroom Vocabulary",
      description: "Core academic, laboratory, and classroom nouns and phrases.",
      createdAt: 1761000100000,
      tags: ["Spanish", "School", "Starter"],
      cards: [
        { id: "ss-1", deckId: "deck-spanish-school", front: "El ensayo", back: "The essay / Laboratory trial", example: "Entregué el ensayo antes del viernes.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ss-2", deckId: "deck-spanish-school", front: "La asignatura", back: "School subject / Course", example: "La biología es mi asignatura favorita.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ss-3", deckId: "deck-spanish-school", front: "El borrador", back: "Rough draft / Eraser", example: "Revisamos el primer borrador del manuscrito.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ss-4", deckId: "deck-spanish-school", front: "Tomar apuntes", back: "To take notes", example: "Siempre tomo apuntes durante la conferencia.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ss-5", deckId: "deck-spanish-school", front: "La beca", back: "Scholarship / Fellowship grant", example: "Obtuvo una beca de investigación de verano.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ss-6", deckId: "deck-spanish-school", front: "Aprobar un examen", back: "To pass an exam", example: "Estudió toda la semana para aprobar el examen.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ss-7", deckId: "deck-spanish-school", front: "El plazo de entrega", back: "Deadline / Due date", example: "El plazo de entrega vence mañana al mediodía.", mastery: 0, timesReviewed: 0, timesCorrect: 0 }
      ]
    },
    {
      id: "deck-spanish-verbs",
      subjectId: "subj-spanish",
      title: "Top Irregular Spanish Verbs",
      description: "Stem-changing and irregular preterite/present stems essential for fluency.",
      createdAt: 1761000200000,
      tags: ["Spanish", "Verbs", "Grammar"],
      cards: [
        { id: "sv-1", deckId: "deck-spanish-verbs", front: "Tener (preterite yo / él)", back: "tuve / tuvo (to have)", example: "Tuvo que repetir la medición tres veces.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sv-2", deckId: "deck-spanish-verbs", front: "Poder (preterite yo / ellos)", back: "pude / pudieron (to be able to)", example: "Pudieron aislar la proteína intacta.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sv-3", deckId: "deck-spanish-verbs", front: "Saber (preterite vs. imperfect)", back: "supe (found out) / sabía (knew)", example: "Supe la verdad cuando vi el cromatograma.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sv-4", deckId: "deck-spanish-verbs", front: "Poner (present yo / preterite yo)", back: "pongo / puse (to put, place)", example: "Puse las muestras en hielo inmediatamente.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sv-5", deckId: "deck-spanish-verbs", front: "Decir (preterite ellos / participle)", back: "dijeron / dicho (to say, tell)", example: "Los datos dijeron algo completamente inesperado.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "sv-6", deckId: "deck-spanish-verbs", front: "Ir / Ser (preterite nosotros)", back: "fuimos (went / were — resolved by context)", example: "Fuimos al simposio de neurociencia.", mastery: 0, timesReviewed: 0, timesCorrect: 0 }
      ]
    },
    {
      id: "deck-bio-organelles",
      subjectId: "subj-biology",
      title: "Cell Organelles & Bioenergetics",
      description: "Core eukaryotic compartments, proton-motive ATP synthesis, and quality control.",
      createdAt: 1761000300000,
      tags: ["Biology", "Cells", "AP Bio"],
      cards: [
        { id: "bo-1", deckId: "deck-bio-organelles", front: "Mitochondrial Cristae", back: "Infolded inner mitochondrial membranes housing the electron transport chain and F1Fo-ATP synthase; folding concentrates protons locally and expands surface area.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "bo-2", deckId: "deck-bio-organelles", front: "Lysosome & V-ATPase", back: "Acidic degradative organelle (pH ~4.5–5.0) acidified by ATP-driven vacuolar H+ pumps to activate acid hydrolases for autophagy and macromolecule recycling.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "bo-3", deckId: "deck-bio-organelles", front: "Rough Endoplasmic Reticulum", back: "Ribosome-studded membrane network where co-translational translocation folds, glycosylates, and disulfide-bonds secreted and transmembrane ion-channel proteins.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "bo-4", deckId: "deck-bio-organelles", front: "Na+/K+-ATPase Electrogenic Pump", back: "Exports 3 Na+ and imports 2 K+ per ATP hydrolyzed, maintaining resting electrochemical gradients and osmotic volume across animal plasma membranes.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "bo-5", deckId: "deck-bio-organelles", front: "Peroxisome", back: "Single-membrane organelle oxidizing very-long-chain fatty acids and detoxifying resulting H2O2 via catalase.", mastery: 0, timesReviewed: 0, timesCorrect: 0 }
      ]
    },
    {
      id: "deck-us-amendments",
      subjectId: "subj-history",
      title: "Key Constitutional Amendments",
      description: "Foundational Bill of Rights and Reconstruction amendments in US constitutional law.",
      createdAt: 1761000400000,
      tags: ["History", "Civics", "APUSH"],
      cards: [
        { id: "ua-1", deckId: "deck-us-amendments", front: "First Amendment", back: "Protects freedom of speech, press, peaceable assembly, petition, and prohibits establishment of religion or interference with free exercise.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ua-2", deckId: "deck-us-amendments", front: "Fourth Amendment", back: "Protects against unreasonable searches and seizures and requires warrants to be supported by probable cause and particular description.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ua-3", deckId: "deck-us-amendments", front: "Fifth Amendment", back: "Guarantees grand jury indictment, bars double jeopardy and compelled self-incrimination, and requires due process and just compensation for takings.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ua-4", deckId: "deck-us-amendments", front: "Fourteenth Amendment (1868)", back: "Establishes birthright citizenship and binds states to Due Process and Equal Protection of the laws (vehicle for selective incorporation).", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "ua-5", deckId: "deck-us-amendments", front: "Nineteenth Amendment (1920)", back: "Prohibits federal and state governments from denying the right to vote on the basis of sex.", mastery: 0, timesReviewed: 0, timesCorrect: 0 }
      ]
    },
    {
      id: "deck-chem-bonds",
      subjectId: "subj-chemistry",
      title: "Chemical Bonds & Intermolecular Forces",
      description: "Covalent, ionic, hydrogen-bonding, and dispersion interactions governing molecular structure.",
      createdAt: 1761000500000,
      tags: ["Chemistry", "Bonding", "AP Chem"],
      cards: [
        { id: "cb-1", deckId: "deck-chem-bonds", front: "Polar Covalent Bond", back: "Unequal sharing of bonding electron pairs between atoms of differing electronegativity (Δχ ~ 0.4–1.7), creating a permanent bond dipole.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "cb-2", deckId: "deck-chem-bonds", front: "Hydrogen Bond", back: "Directional electrostatic + orbital attraction between an H atom covalently bound to N, O, or F and a lone pair on an electronegative acceptor (typically 2.7–3.1 Å).", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "cb-3", deckId: "deck-chem-bonds", front: "London Dispersion Forces", back: "Instantaneous induced-dipole attractions present between all molecules; scale with polarizability and contact surface area.", mastery: 0, timesReviewed: 0, timesCorrect: 0 },
        { id: "cb-4", deckId: "deck-chem-bonds", front: "Lattice Energy (Born-Landé / Coulomb)", back: "Energy required to separate 1 mole of an ionic solid into gaseous ions; increases with ionic charge product |z+·z−| and decreases with interionic distance r0.", mastery: 0, timesReviewed: 0, timesCorrect: 0 }
      ]
    }
  ]
};

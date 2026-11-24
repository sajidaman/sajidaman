import type {
  ArchiveItem,
  AwardItem,
  ExperienceItem,
  PhotoFrame,
  ProjectItem,
  PublicationItem,
} from '../types/portfolio';

export const ASSETS = {
  heroSculpture: '/src/assets/images/hero_academic_sculpture_1795550118335.jpg',
  aboutPortrait: '/src/assets/images/about_student_portrait_1795550119341.jpg',
  acousticDevice: '/src/assets/images/project_acoustic_device_1795550119441.jpg',
  microfluidicsChip: '/src/assets/images/project_microfluidics_chip_1795550120324.jpg',
  architecture35mm: '/src/assets/images/fun_architecture_35mm_1795550120898.jpg',
};

export const PROFILE = {
  name: 'Ananya Nair',
  classYear: 'Class of 2027',
  school: 'Palo Alto High School',
  location: 'Palo Alto, California',
  email: 'ananya.nair@paly-research.org',
  orcid: '0009-0004-8192-3041',
  githubHandle: 'ananyanair-lab',
  tagline: 'Precision inquiry, built from first principles.',
  subtitle:
    'High school senior researching computational acoustics, low-cost biomedical instrumentation, and applied mathematics.',
  metrics: [
    { value: '3', label: 'Peer-Reviewed Papers & Preprints' },
    { value: '14', label: 'Hardware & Computational Builds' },
    { value: '2', label: 'Regeneron ISEF & National Honors' },
    { value: '3.98', label: 'Unweighted Academic GPA' },
  ],
};

export const COURSEWORK = [
  {
    code: 'MATH 241',
    title: 'Linear Algebra & Partial Differential Equations',
    institution: 'Stanford Online High School / Dual Enrollment',
    term: 'Fall 2026',
    grade: 'A+',
  },
  {
    code: 'PHYS 210',
    title: 'AP Physics C: Mechanics & Electromagnetism',
    institution: 'Palo Alto High School',
    term: '2025–2026',
    grade: '5 / A',
  },
  {
    code: 'CS 320',
    title: 'Signal Processing & Embedded Systems Lab',
    institution: 'Independent Directed Study',
    term: 'Spring 2026',
    grade: 'A+',
  },
  {
    code: 'BIOL 180',
    title: 'AP Biology & Quantitative Genetics Seminar',
    institution: 'Palo Alto High School',
    term: '2024–2025',
    grade: '5 / A',
  },
  {
    code: 'MATH 195',
    title: 'Multivariable Calculus & Real Analysis Foundations',
    institution: 'Foothill College Dual Enrollment',
    term: 'Spring 2025',
    grade: 'A',
  },
];

export const READING_SHELF = [
  {
    title: 'The Art of Doing Science and Engineering',
    author: 'Richard W. Hamming',
    note: 'A foundational lens on taste, first-principles framing, and why problem selection matters more than speed.',
  },
  {
    title: 'Nonlinear Dynamics and Chaos',
    author: 'Steven H. Strogatz',
    note: 'Turned differential equations from symbol manipulation into geometric intuition.',
  },
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    note: 'Why clinical hardware fails when acoustic feedback and ergonomics are treated as afterthoughts.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'stethonet',
    title: 'StethoNet Acoustic Diagnostic Array',
    subtitle: 'Sub-$35 MEMS auscultation sensor with on-device murmur screening',
    category: 'Hardware & Embedded',
    year: '2026',
    featured: true,
    image: ASSETS.acousticDevice,
    imageAlt:
      'Matte black and brushed aluminum portable acoustic diagnostic sensor prototype on a light grey surface',
    diagramType: 'acoustic',
    summary:
      'Designed a dual-microphone acoustic chest piece machined in anodized aluminum paired with a low-power microcontroller running quantized spectral inference for pediatric cardiac murmur triage.',
    methodology:
      'Constructed a differential MEMS transducer chamber to cancel ambient clinic noise above 60 dB. Trained a 1D depthwise separable CNN on 1,840 de-identified heart sound cycles using short-time Fourier spectrograms and deployed INT8 weights onto an ARM Cortex-M4 MCU.',
    outcome:
      'Achieved 94.2% sensitivity and 91.8% specificity on held-out clinical recordings while keeping bill-of-materials under $34.40 per unit and inference latency below 110 ms.',
    techStack: ['C++ / CMSIS-DSP', 'KiCad 4-Layer PCB', 'MEMS Acoustics', 'PyTorch INT8'],
    metrics: [
      { label: 'BOM Cost', value: '$34.40' },
      { label: 'Sensitivity', value: '94.2%' },
      { label: 'Inference Latency', value: '108 ms' },
      { label: 'Noise Rejection', value: '-24 dB' },
    ],
    repoLabel: 'github.com/ananyanair-lab/stethonet',
  },
  {
    id: 'celldiff',
    title: 'CellDiff Inertial Microfluidic Solver',
    subtitle: 'Navier-Stokes particle trajectory simulator for spiral lab-on-a-chip geometries',
    category: 'Computational Biology',
    year: '2026',
    featured: true,
    image: ASSETS.microfluidicsChip,
    imageAlt:
      'Precision clear glass microfluidic lab-on-a-chip illuminated with crisp white rim lighting on dark charcoal',
    diagramType: 'microfluidic',
    summary:
      'Built a differentiable surrogate model predicting Dean-flow equilibrium positions of mammalian cells inside curved microfluidic channels without full 3D finite-element sweeps.',
    methodology:
      'Generated 4,200 parameterized channel geometries in Python/FEniCSx, extracting Reynolds and Dean numbers across curvature ratios. Fitted a physics-constrained neural operator enforcing mass conservation along channel cross-sections.',
    outcome:
      'Accelerated optimal channel width search by 180x compared to COMSOL baseline sweeps with < 1.9% radial error across validation channels.',
    techStack: ['Python', 'FEniCSx', 'JAX', 'Fluid Mechanics'],
    metrics: [
      { label: 'Solver Speedup', value: '180x' },
      { label: 'Radial Error', value: '1.84%' },
      { label: 'Simulated Chips', value: '4,200' },
      { label: 'Target Throughput', value: '1.4 mL/min' },
    ],
    repoLabel: 'github.com/ananyanair-lab/celldiff',
  },
  {
    id: 'quantalab',
    title: 'QuantaLab Wavefront Optics Workbench',
    subtitle: 'Browser-native Fresnel and Fraunhofer diffraction engine for AP Physics students',
    category: 'Systems & ML',
    year: '2025',
    diagramType: 'optics',
    summary:
      'Interactive 2D scalar diffraction simulator allowing students to draw arbitrary apertures and inspect real-time intensity fringes across arbitrary focal planes.',
    methodology:
      'Implemented a WebAssembly 2D Fast Fourier Transform pipeline using angular spectrum propagation, pairing real-time phase overlays with zero-dependency SVG cross-sectional intensity plots.',
    outcome:
      'Adopted by 6 AP Physics classrooms across the Santa Clara district, serving over 420 high school students during optics lab modules.',
    techStack: ['TypeScript', 'Rust / WebAssembly', '2D FFT', 'Angular Spectrum'],
    metrics: [
      { label: 'Frame Time', value: '6.4 ms' },
      { label: 'Grid Resolution', value: '512x512' },
      { label: 'District Students', value: '420+' },
      { label: 'Zero Install', value: 'WASM' },
    ],
    repoLabel: 'github.com/ananyanair-lab/quantalab',
  },
  {
    id: 'tactile-braille',
    title: 'Piezoelectric Tactile Refresh Cell',
    subtitle: 'Modular 8-pin braille actuator driven by multiplexed high-voltage shift registers',
    category: 'Hardware & Embedded',
    year: '2025',
    diagramType: 'braille',
    summary:
      'Re-engineered single-character braille display actuation using low-profile ceramic piezo benders and open-source 3D-printed cam latches to reduce per-cell fabrication cost.',
    methodology:
      'Modeled cantilever beam deflection against fingertip force thresholds (0.15 N) and designed a compact boost converter stage generating 110 V from a 5 V USB-C supply.',
    outcome:
      'Achieved 14 Hz refresh rate with 0.65 mm pin travel height across 10,000 actuation test cycles without thermal drift.',
    techStack: ['SolidWorks CAD', 'Altium', 'STM32 Firmware', 'Piezo Actuators'],
    metrics: [
      { label: 'Pin Travel', value: '0.65 mm' },
      { label: 'Refresh Rate', value: '14 Hz' },
      { label: 'Holding Force', value: '0.18 N' },
      { label: 'Cycle Endurance', value: '10,000+' },
    ],
    repoLabel: 'github.com/ananyanair-lab/tactile-cell',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'stanford-simr',
    role: 'Summer Research Intern — Computational Acoustics',
    organization: 'Stanford Bioengineering & Translational Sensing Lab',
    location: 'Stanford, CA',
    period: 'Jun 2026 – Aug 2026',
    category: 'Research Labs',
    mentor: 'Dr. David Chen, Ph.D.',
    summary:
      'Developed adaptive Wiener noise-cancellation pipelines for wearable cardiopulmonary microphones and co-authored an evaluation manuscript on noisy clinical environments.',
    highlights: [
      'Processed 1,840 clinical auscultation segments with automated artifact rejection and SNR telemetry.',
      'Reduced false-positive murmur alerts by 31% in simulated ward noise conditions (65 dBA).',
      'Presented final poster to 45 faculty and graduate fellows at the Summer Symposium.',
    ],
  },
  {
    id: 'ucsf-microfluidics',
    role: 'Visiting High School Student Researcher',
    organization: 'UCSF Quantitative Cellular Engineering Group',
    location: 'San Francisco, CA',
    period: 'Sep 2025 – May 2026',
    category: 'Research Labs',
    mentor: 'Prof. Miriam Alverez',
    summary:
      'Simulated Dean-vortex particle focusing in spiral polydimethylsiloxane (PDMS) microchannels and validated surrogate predictions against high-speed microscopy videos.',
    highlights: [
      'Authored automated Python particle-tracking scripts extracting bead equilibrium radii from 4,000 fps captures.',
      'Cut channel geometry iteration time from 3 days of manual CAD/COMSOL runs to 12 minutes.',
    ],
  },
  {
    id: 'math-circle',
    role: 'Lead Instructor — Olympiad Combinatorics & Linear Algebra',
    organization: 'Peninsula Youth Math Circle',
    location: 'Palo Alto, CA',
    period: 'Sep 2024 – Present',
    category: 'Teaching & Mentorship',
    summary:
      'Design weekly problem sets and lead 90-minute proof-writing seminars for 28 middle and early high school students preparing for AMC 10 and AIME.',
    highlights: [
      'Authored a 94-page open-access monochrome problem workbook covering generating functions and invariants.',
      '9 mentored students qualified for AIME across the 2025 and 2026 competition cycles.',
    ],
  },
  {
    id: 'scioly-captain',
    role: 'Co-Captain & Hardware Division Lead',
    organization: 'Palo Alto High School Science Olympiad',
    location: 'Palo Alto, CA',
    period: 'Aug 2024 – Present',
    category: 'Leadership',
    summary:
      'Direct a 30-member varsity engineering and physics roster, overseeing workshop safety, laser-cutter scheduling, and calibration protocols for Optics and Detector Building.',
    highlights: [
      'Led team to 2nd Place Overall at the Northern California State Tournament (2026).',
      'Established peer technical review critiques modeled after undergraduate engineering design reviews.',
    ],
  },
];

export const AWARDS: AwardItem[] = [
  {
    id: 'isef-2026',
    year: '2026',
    title: 'Regeneron ISEF — Grand Award (3rd Place, Biomedical Engineering)',
    organization: 'Society for Science',
    tier: 'International & National',
    recognition: 'International Finalist',
    linkedWork: 'StethoNet Acoustic Diagnostic Array',
    details:
      'Awarded among 1,700+ finalists from 67 countries for engineering a sub-$35 dual-MEMS cardiac auscultation platform with quantized on-device neural inference.',
  },
  {
    id: 'usapho-2026',
    year: '2026',
    title: 'USA Physics Olympiad (USAPhO) — Honorable Mention',
    organization: 'American Association of Physics Teachers',
    tier: 'International & National',
    recognition: 'Top 15% National Exam',
    linkedWork: 'Theoretical Mechanics & E&M',
    details:
      'Qualified via the F=ma exam (Top 400 nationally) and earned Honorable Mention on the 3-hour proof-based USAPhO examination.',
  },
  {
    id: 'aime-2025-2026',
    year: '2026',
    title: 'AIME Qualifier (2x) — Score 11 / 15',
    organization: 'Mathematical Association of America',
    tier: 'International & National',
    recognition: 'Distinction Roll (AMC 12A)',
    linkedWork: 'Peninsula Math Circle',
    details:
      'Earned AMC 12A Honor Roll of Distinction in both 2025 and 2026, scoring 11 on the 2026 American Invitational Mathematics Examination.',
  },
  {
    id: 'csef-2026',
    year: '2026',
    title: 'California Science & Engineering Fair — 1st Place & Best Hardware',
    organization: 'California Science Center',
    tier: 'State & Regional',
    recognition: 'Senior Division Winner',
    linkedWork: 'StethoNet Acoustic Diagnostic Array',
    details:
      'Selected 1st in Senior Applied Mechanics & Biomedical Devices, earning direct advancement to Regeneron ISEF.',
  },
  {
    id: 'synopsys-2025',
    year: '2025',
    title: 'Synopsys Silicon Valley Championship — Grand Prize Alternate',
    organization: 'Santa Clara Valley Science & Engineering Fair',
    tier: 'State & Regional',
    recognition: '1st Place Computational Modeling',
    linkedWork: 'CellDiff Inertial Microfluidic Solver',
    details:
      'Recognized for developing a physics-constrained surrogate operator for spiral microfluidic cell-sorting channels.',
  },
  {
    id: 'paly-fellowship',
    year: '2025',
    title: 'Raytheon Young Investigator STEM Endowment',
    organization: 'Palo Alto Unified Educational Foundation',
    tier: 'School & Fellowships',
    recognition: '$2,500 Hardware Grant',
    linkedWork: 'Piezoelectric Tactile Refresh Cell',
    details:
      'Competitive research micro-grant funding PCB fabrication, CNC aluminum enclosures, and piezo actuator procurement.',
  },
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-stethonet',
    year: '2026',
    venue: 'IEEE MIT Undergraduate Research Technology Conference (URTC)',
    status: 'Accepted Manuscript',
    title:
      'Differential MEMS Auscultation and Quantized Spectral Inference for Low-Resource Cardiac Screening',
    authors: 'Nair, A., & Chen, D.',
    doiOrId: 'arXiv:2604.01842',
    pages: '1–8',
    citationKey: 'nair2026differential',
    abstract:
      'Low-cost acoustic screening of structural heart murmurs remains unreliable in rural clinics due to ambient background noise and rigid mechanical chest pieces. We present StethoNet, a $34.40 dual-transducer differential stethoscope that subtracts far-field room acoustics prior to digitization, coupled with an INT8-quantized 1D depthwise separable convolutional network executing on an ARM Cortex-M4 processor. Evaluated across 1,840 de-identified pediatric recordings augmented with 65 dBA clinic noise, the system preserves 94.2% sensitivity while operating completely offline with a 108 ms inference budget.',
    keyFindings: [
      'Dual-chamber differential MEMS subtraction suppresses stationary ambient noise by 24 dB across 80–600 Hz.',
      'Post-training INT8 quantization reduces flash footprint from 1.9 MB to 184 KB with < 0.4% accuracy drop.',
      'Open hardware CAD files and acoustic calibration scripts released for reproducible clinic prototyping.',
    ],
  },
  {
    id: 'pub-celldiff',
    year: '2026',
    venue: 'Journal of Emerging Investigators (JEI)',
    status: 'Published · Peer-Reviewed',
    title:
      'Physics-Constrained Surrogate Modeling of Inertial Particle Equilibrium in Spiral Microfluidic Channels',
    authors: 'Nair, A., & Alverez, M.',
    doiOrId: 'DOI: 10.59720/26-019',
    pages: '14–27',
    citationKey: 'nair2026physics',
    abstract:
      'Inertial microfluidic devices sort biological cells by size using balanced lift and Dean drag forces, yet tuning spiral channel curvature traditionally demands computationally expensive 3D Navier-Stokes sweeps. We train a physics-constrained neural operator on 4,200 FEniCSx simulations spanning Dean numbers from 4 to 48, predicting equilibrium focusing bands with 1.84% mean radial error at 180x speedup over conventional finite-element solvers.',
    keyFindings: [
      'Enforcing cross-sectional mass-flux conservation reduces out-of-distribution curvature error by 42%.',
      'Surrogate predictions match high-speed 4,000 fps polystyrene bead microscopy tracks within 3.1 micrometers.',
    ],
  },
  {
    id: 'pub-optics',
    year: '2025',
    venue: 'The Physics Teacher — High School Inquiry Notes',
    status: 'Preprint · Technical Essay',
    title:
      'Visualizing Angular Spectrum Propagation in Introductory Wave Optics Through WebAssembly FFTs',
    authors: 'Nair, A.',
    doiOrId: 'arXiv:2511.09411',
    pages: '1–5',
    citationKey: 'nair2025visualizing',
    abstract:
      'Introductory optics curricula treat single-slit and double-slit diffraction in isolation from arbitrary two-dimensional apertures. This note documents QuantaLab, an open browser-based angular spectrum propagation engine compiled from Rust to WebAssembly, enabling real-time exploration of Fresnel-to-Fraunhofer transitions in classroom laboratories.',
    keyFindings: [
      'Sub-7 ms 512x512 FFT propagation supports live aperture sketching on standard school Chromebooks.',
      'Classroom post-lab surveys (n = 112) showed a 29% gain in qualitative phase-front sketching accuracy.',
    ],
  },
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arch-01',
    year: '2026',
    dateLabel: 'Oct 2026',
    title: 'Anodized Aluminum Chest Piece Acoustic Impedance Sweep',
    type: 'Lab Log',
    artifactCode: 'LOG-26-10',
    summary:
      'Bode magnitude curves comparing 6061-T6 aluminum vs. Delrin bell chambers across 40–1,200 Hz.',
    excerpt:
      'Resonance peak shifted from 410 Hz (Delrin) to 890 Hz (machined 6061-T6 aluminum), clearing the primary S1/S2 cardiac murmur band (60–500 Hz) of structural ringing.',
  },
  {
    id: 'arch-02',
    year: '2026',
    dateLabel: 'Jul 2026',
    title: 'Wiener Spectral Subtraction Bench Notes',
    type: 'Math Note',
    artifactCode: 'NOTE-26-07',
    summary:
      'Derivation of adaptive noise-floor estimation for dual-channel non-stationary clinic recordings.',
    excerpt:
      'Derived minimum-statistics spectral floor update with alpha=0.88 smoothing constant; verified phase coherence across primary and reference MEMS capsules within 1.4 degrees.',
  },
  {
    id: 'arch-03',
    year: '2025',
    dateLabel: 'Dec 2025',
    title: 'PDMS Spiral Channel Mold Rev 3 Delamination Report',
    type: 'Prototype',
    artifactCode: 'PROTO-25-12',
    summary:
      'Failure analysis on SU-8 photoresist aspect ratios exceeding 1:8 during oxygen-plasma bonding.',
    excerpt:
      'Increased post-bake ramp time to 45 minutes and reduced plasma RF power from 80 W to 45 W, eliminating micro-channel roof collapse across 12 consecutive wafers.',
  },
  {
    id: 'arch-04',
    year: '2025',
    dateLabel: 'May 2025',
    title: '110V Piezo Driver Boost Converter Schematic (Rev A)',
    type: 'Prototype',
    artifactCode: 'PROTO-25-05',
    summary:
      'Early breadboard and PCB layout for driving 8 multiplexed piezoelectric tactile braille pins.',
    excerpt:
      'Replaced discrete BJT level shifters with HV507 high-voltage serial-to-parallel shift registers, cutting quiescent current draw from 48 mA to 6.2 mA.',
  },
  {
    id: 'arch-05',
    year: '2024',
    dateLabel: 'Nov 2024',
    title: 'Generating Functions & Partition Identities Workbook',
    type: 'Math Note',
    artifactCode: 'NOTE-24-11',
    summary:
      '94-page teaching manuscript compiled for Peninsula Youth Math Circle combinatorics fellows.',
    excerpt:
      'Includes annotated proofs of Euler’s pentagonal number theorem, bijective Young tableau exercises, and 40 graded AIME-level practice problems.',
  },
  {
    id: 'arch-06',
    year: '2024',
    dateLabel: 'Mar 2024',
    title: 'On Instrument Craft: Why Black-Box Models Need Clean Sensors',
    type: 'Essay',
    artifactCode: 'ESSAY-24-03',
    summary:
      'Short reflection on physical boundary conditions, transducer placement, and overfitting in student ML.',
    excerpt:
      'Half of the variance blamed on model capacity in student biomedical projects is actually microphone coupling jitter. Fix the brass bell before adding layers.',
  },
  {
    id: 'arch-07',
    year: '2023',
    dateLabel: 'Oct 2023',
    title: 'Single-Photodiode Spectrophotometer (Science Olympiad Build #1)',
    type: 'Lab Log',
    artifactCode: 'LOG-23-10',
    summary:
      'First high school hardware log: Arduino-based Beer-Lambert transmittance meter using diffraction grating film.',
    excerpt:
      'Calibrated against five copper(II) sulfate molarities (R^2 = 0.994); learned firsthand how stray room light ruins transimpedance amplifier dynamic range.',
  },
];

export const PHOTO_FRAMES: PhotoFrame[] = [
  {
    id: 'frame-cantilever',
    title: 'Cantilever Shadow Study',
    location: 'Palo Alto Art Center',
    year: '2026',
    camera: 'Leica M6 · 35mm Summicron',
    film: 'Ilford HP5 Plus 400',
    exposure: 'f/8 · 1/500s',
    image: ASSETS.architecture35mm,
    alt: 'Black and white 35mm architectural photograph of concrete stairs and cantilevered roof shadows',
    caption:
      'Captured at solar noon in October. I shoot monochrome film on weekends because manual focus and 36-frame limits force deliberate observation.',
  },
  {
    id: 'frame-slate',
    title: 'Acoustic Transducer & Prism',
    location: 'Home Studio Bench',
    year: '2026',
    camera: '50mm Macro · Diffused Softbox',
    film: 'Digital Monochrome',
    exposure: 'f/5.6 · 1/60s · ISO 100',
    image: ASSETS.heroSculpture,
    alt: 'Studio monochrome photograph of anodized matte black aluminum acoustic sensors and an optical glass prism',
    caption:
      'Side-by-side study of two projects from the same semester: machined aluminum acoustic housings and an equilateral BK7 glass prism.',
  },
  {
    id: 'frame-library',
    title: 'Winter Finals Study Light',
    location: 'Stanford Green Library',
    year: '2025',
    camera: '35mm · Natural Window Light',
    film: 'Kodak Tri-X 400',
    exposure: 'f/2.8 · 1/125s',
    image: ASSETS.aboutPortrait,
    alt: 'Black and white portrait beside architectural window light with Quantum Mechanics textbook and camera',
    caption:
      'Between problem sets on Griffiths Quantum Mechanics and editing acoustic filtering scripts.',
  },
];

export const FUN_NOTES = [
  {
    title: '35mm Darkroom Printing',
    meta: 'Ilford Multigrade · Palo Alto Community Darkroom',
    description:
      'Developing Ilford HP5 rolls by hand in D-76 developer teaches patience with physical chemistry—every temperature degree changes silver grain contrast.',
  },
  {
    title: 'Split Ortholinear Keyboards',
    meta: 'QMK Firmware · Tactile Switches',
    description:
      'Hand-wired a 42-key split Corne keyboard in matte black anodized aluminum with custom LaTeX math symbol layers for faster paper drafting.',
  },
  {
    title: 'Classical Guitar & Bach Etudes',
    meta: 'Nylon Acoustic · Daily 30-Minute Practice',
    description:
      'Working through Villa-Lobos Etude No. 1 and Bach Cello Suite transcriptions—polyphonic voice leading feels remarkably close to harmonic analysis.',
  },
];

// ─── Edit this file to update your site content ───────────────────────────────

// ─── Coursework ───────────────────────────────────────────────────────────────

export type Course = {
  code: string
  name: string
  semester: string
  cheatsheet?: string  // URL to PDF — leave undefined if not yet uploaded
}

export const COURSES: Course[] = [
  // ── Fall 2024 ──────────────────────────────────────────────────────────────
  { code: 'CS 61A',    name: 'Structure and Interpretation of Computer Programs', semester: 'Fall 2024',   cheatsheet: undefined },
  { code: 'EECS 16A',  name: 'Designing Information Devices and Systems I',       semester: 'Fall 2024',   cheatsheet: '/cheatsheets/EECS 16A Cheatsheet.pdf' },

  // ── Spring 2025 ────────────────────────────────────────────────────────────
  { code: 'CS 61B',    name: 'Data Structures',                                   semester: 'Spring 2025', cheatsheet: undefined },
  { code: 'EECS 16B',  name: 'Designing Information Devices and Systems II',      semester: 'Spring 2025', cheatsheet: '/cheatsheets/EECS 16B Cheatsheet.pdf' },
  { code: 'MATH 53',   name: 'Multivariable Calculus',                            semester: 'Spring 2025', cheatsheet: undefined },

  // ── Fall 2025 ──────────────────────────────────────────────────────────────
  { code: 'CS 61C',    name: 'Great Ideas of Computer Architecture',              semester: 'Fall 2025',   cheatsheet: '/cheatsheets/CS 61C Cheatsheet.pdf' },
  { code: 'CS 70',     name: 'Discrete Mathematics and Probability Theory',       semester: 'Fall 2025',   cheatsheet: '/cheatsheets/CS 70 Cheatsheet.pdf' },
  { code: 'PHYSICS 7B',name: 'Physics for Scientists and Engineers',              semester: 'Fall 2025',   cheatsheet: undefined },

  // ── Spring 2026 ────────────────────────────────────────────────────────────
  { code: 'CS 170',    name: 'Efficient Algorithms and Intractable Problems',     semester: 'Spring 2026', cheatsheet: '/cheatsheets/CS 170 Cheatsheet.pdf' },
  { code: 'CS 186',    name: 'Introduction to Database Systems',                  semester: 'Spring 2026', cheatsheet: '/cheatsheets/CS 186 Cheatsheet.pdf' },
  { code: 'EECS 126',  name: 'Probability and Random Processes',                  semester: 'Spring 2026', cheatsheet: '/cheatsheets/EECS 126 Cheatsheet.pdf' },

  // ── Fall 2026 ──────────────────────────────────────────────────────────────
  { code: 'CS 161',    name: 'Computer Security',                                 semester: 'Fall 2026',   cheatsheet: undefined },
  { code: 'CS 168',    name: 'Internet Architecture and Protocols',               semester: 'Fall 2026',   cheatsheet: undefined },
  { code: 'CS 189',    name: 'Introduction to Machine Learning',                  semester: 'Fall 2026',   cheatsheet: undefined },
]

export const RESUME_URL = '/resume/Arnav Mahadev Resume.pdf'

export const SOCIALS = {
  github:    'https://github.com/arnavmahadev',
  linkedin:  'https://www.linkedin.com/in/arnavmahadev/',
  spotify:   'https://open.spotify.com/user/qjzz2wqvhzmjkjitps4vilhrm?si=485b1738bb864b7b',
  instagram: 'https://www.instagram.com/arnav.mahadev/',
  email:     'arnavrmahadev@gmail.com',
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    name: 'Falsetto',
    hook: 'Detecting AI Generated Music',
    description:
      'A deep learning system that detects AI-generated music using audio embeddings and attention-based classification through an end-to-end machine learning pipeline.',
    tech: ['Python', 'PyTorch', 'Hugging Face Transformers', 'scikit-learn'],
    github: 'https://github.com/arnavmahadev/Falsetto',
    demo: 'https://arnavmahadev.github.io/Falsetto/' as string | undefined,
  },
  {
    name: 'DEFCON',
    hook: 'Quantifying Defensive Contributions',
    description:
      'A graph neural network-based soccer analytics platform that quantifies defensive contributions using player tracking and event data.',
    tech: ['Python', 'PyTorch Geometric', 'scikit-learn', 'XGBoost', 'NumPy'],
    github: 'https://github.com/arnavmahadev/DEFCON',
    demo: undefined as string | undefined,
  },
  {
    name: 'SoccerBoard',
    hook: 'Forecasting the World Cup with machine learning.',
    description:
      'A soccer analytics platform that predicts match outcomes and expected goals using statistical models, machine learning, and interactive visualizations.',
    tech: ['Python', 'JavaScript', 'XGBoost', 'PyTorch', 'FastAPI', 'Docker'],
    github: 'https://github.com/arnavmahadev/SoccerBoard',
    demo: 'https://arnavmahadev-soccerboard.hf.space/' as string | undefined,
  },
  {
    name: 'SaveBites',
    hook: 'Fight food waste, one receipt at a time.',
    description:
      'A full-stack food waste reduction web app that scans grocery receipts using an OCR pipeline to automatically extract items, update pantry inventories, and generate recipe suggestions.',
    tech: ['Python', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'React'],
    github: 'https://github.com/Devansh-Ojha/SaveBites',
    demo: undefined as string | undefined,
  },
  {
    name: 'Wordle',
    hook: 'A web-based Wordle clone with real-time feedback.',
    description:
      'A browser-based Wordle game with game state management, guess validation, and real-time visual feedback. Features 3 different modes, and a clean, robust UI presented to 30+ peers.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/arnavmahadev/Wordle',
    demo: 'https://arnavmahadev.github.io/Wordle/' as string | undefined,
  },
  {
    name: 'Hexapod Robot',
    hook: 'A 6-legged robot that senses and avoids obstacles.',
    description:
      'A hexapod robot with multi-directional movement, obstacle avoidance, and real-time sensor integration. I designed the breadboard layout and soldered connections for 18 servo motors, an ultrasonic sensor, and an LCD display.',
    tech: ['C++'],
    github: 'https://github.com/arnavmahadev/Arnav_BlueStampPortfolio',
    demo: 'https://arnavmahadev.github.io/Arnav_BlueStampPortfolio/' as string | undefined,
  },
]

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCE = [
  {
    role: 'Software Engineering Intern',
    org: 'Maadhev LLC',
    period: 'May 2026 - Present',
    location: 'Cupertino, CA',
    link: 'https://maadhev.com',
    bullets: [
      'Built a custom ACH payment system (Python, Flask, Stripe API) integrated with a Shopify app, enabling bank transfer payments at 70% lower per-transaction cost than card processing.',
      'Engineered Stripe webhook handlers to sync payment and fulfillment data between Stripe and Shopify in real time, automating order confirmation across 50+ transactions.',
      'Rebuilt the Shopify storefront and checkout flow, consolidating a multi step checkout into a single page.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    org: 'iPick.ai',
    period: 'Jan 2026 - May 2026',
    location: 'Berkeley, CA',
    nexusLink: 'https://www.ipick.ai/nexus/',
    bullets: [
      'Architected a graph-based company relationship visualizer using React, D3.js, and PostgreSQL.',
      'Built a supplier/subsidiary relationship extraction pipeline across 5,000+ public company tickers, storing structured supplier/subsidiary edges in PostgreSQL to power graph-based visualization in the frontend.',
      'Integrated the Anthropic API to generate real-time news summaries, enriching company profiles with live information.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Claythis',
    period: 'May 2025 - Aug 2025',
    location: 'San Mateo, CA',
    link: undefined as string | undefined,
    bullets: [
      'Created a Unity-based game in C# showcasing Claythis\'s AI-driven 3D model generation pipeline, implementing core weapon & health systems such as reloading, recoil, animations, armor, and healing.',
      'Tested and validated integration of the AI-generated 3D character models into Unity, verifying rigging, animation, and rendering behavior across the pipeline\'s outputs.'
    ],
  },
]

// ─── Adventures ───────────────────────────────────────────────────────────────
//
// One unified list. Each entry's `date` decides where it shows up:
//   • date in the future → "Upcoming" card with a live countdown (uses `image`)
//   • date in the past   → "Past" card (uses `photos`), auto-sorted newest first
// When a countdown reaches zero the trip moves to Past automatically — no edits
// needed. Just add `photos` to its entry once you have them.

export type AdventurePhoto = { src: string; caption: string }

export type Adventure = {
  id: string
  label: string
  date: Date                      // when it happens / happened — decides the section
  description: string
  coordinates: [number, number]
  image?: string | null           // shown on the upcoming countdown card
  photos?: AdventurePhoto[]        // shown in the Past dropdown; add after the trip
}

export const ADVENTURES: Adventure[] = [
  {
    id: 'kili',
    label: 'Summit Mt. Kilimanjaro',
    date: new Date('2026-08-02T05:00:00Z'),
    description: '5,895 m (19,341 ft) · Uhuru Peak · Tanzania',
    coordinates: [37.36, -3.07],
    image: '/adventures/kili.jpg',
  },
  {
    id: 'safari',
    label: 'Tanzania Safari',
    date: new Date('2026-08-10T03:00:00Z'),
    description: 'Serengeti · Tarangire · Ngorongoro Crater',
    coordinates: [34.83, -2.33],
    image: '/adventures/safari.jpg',
  },

  {
    id: 'dana',
    label: 'Summit Mt. Dana',
    date: new Date('2026-06-01'),
    description: '3,979 m (13,061 ft) · Yosemite National Park · California',
    coordinates: [-119.22, 37.90] as [number, number],
    photos: [
      { src: '/adventures/dana/IMG_5269.jpg', caption: 'Mt. Dana' },
      { src: '/adventures/dana/IMG_5274.jpg', caption: 'Mt. Dana' },
    ],
  },
  {
    id: 'utah',
    label: 'Utah Road Trip',
    date: new Date('2026-05-01'),
    description: 'Zion · Bryce · Arches · Canyonlands · Capitol Reef · Dead Horse Point · La Sal',
    coordinates: [-111.09, 39.32] as [number, number],
    photos: [
      { src: '/adventures/utah/IMG_4189.JPG', caption: 'Utah' },
      { src: '/adventures/utah/IMG_4661.JPG', caption: 'Utah' },
      { src: '/adventures/utah/IMG_4919.JPG', caption: 'Utah' },
      { src: '/adventures/utah/IMG_5023.JPG', caption: 'Utah' },
      { src: '/adventures/utah/IMG_5157.JPG', caption: 'Utah' },
      { src: '/adventures/utah/IMG_5158.JPG', caption: 'Utah' },
      { src: '/adventures/utah/IMG_5203.JPG', caption: 'Utah' },
    ],
  },
  {
    id: 'barcelona',
    label: 'Barcelona, Spain',
    date: new Date('2026-01-01'),
    description: 'Gothic Quarter · La Sagrada Família · Park Güell · Montserrat · Sitges · Costa Brava · Castell de Montjuïc · Bunkers del Carmel · Camp Nou',
    coordinates: [2.17, 41.39] as [number, number],
    photos: [
      { src: '/adventures/barcelona/IMG_2134.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2212_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2232_3.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2263.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2394_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2623_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2857.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_2876.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3003_3.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3465.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3487.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3495_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3588_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/IMG_3870_2.jpg', caption: 'Barcelona' },
      { src: '/adventures/barcelona/PXL_20260105_025312781_Original_2.jpg', caption: 'Barcelona' },
    ],
  },
  {
    id: 'norcal',
    label: 'Northern California Road Trip',
    date: new Date('2025-12-01'),
    description: 'Redwood National Park · Avenue of the Giants · Humboldt Redwoods · Eureka',
    coordinates: [-124.00, 41.21] as [number, number],
    photos: [
      { src: '/adventures/norcal/IMG_1050_2.jpg', caption: '' },
      { src: '/adventures/norcal/IMG_1287_3.jpg', caption: '' },
      { src: '/adventures/norcal/IMG_1293_2.jpg', caption: '' },
      { src: '/adventures/norcal/IMG_1467_2.jpg', caption: '' },
      { src: '/adventures/norcal/IMG_1604_2.jpg', caption: '' },
    ],
  },
  {
    id: 'colorado',
    label: 'Colorado Road Trip',
    date: new Date('2025-08-01'),
    description: 'Rocky Mountain · Maroon Bells · Grand Mesa · Black Canyon · Garden of the Gods · Pikes Peak · Great Sand Dunes',
    coordinates: [-105.78, 39.55] as [number, number],
    photos: [
      { src: '/adventures/colorado/IMG_0014_2.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0131.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0209.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0211.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0215.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0224.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0237.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0285.jpg', caption: '' },
      { src: '/adventures/colorado/IMG_0306.jpg', caption: '' },
      { src: '/adventures/colorado/f1ae8af3-956d-4921-ab75-c7389fdb2e39.jpg', caption: '' },
    ],
  },
  {
    id: 'yosemite',
    label: 'Yosemite National Park',
    date: new Date('2025-04-01'),
    description: 'Vernal Falls · Nevada Falls · Mist Trail · John Muir Trail',
    coordinates: [-119.54, 37.87] as [number, number],
    photos: [
      { src: '/adventures/yosemite/IMG_8996.jpg', caption: '' },
      { src: '/adventures/yosemite/IMG_9169.jpg', caption: '' },
      { src: '/adventures/yosemite/e9493737-9685-4d20-9f04-985601cdd59c.jpg', caption: '' },
      { src: '/adventures/yosemite/ec668a3e-0f73-43a2-92b6-a9bc89a4603b.jpg', caption: '' },
    ],
  },
  {
    id: 'cabo',
    label: 'Cabo San Lucas, Mexico',
    date: new Date('2024-12-01'),
    description: 'El Arco · ATVs· Ziplining · Rappelling · Snorkeling',
    coordinates: [-109.92, 22.89] as [number, number],
    photos: [
      { src: '/adventures/cabo/IMG_7420.JPG', caption: '' },
      { src: '/adventures/cabo/IMG_7478.JPG', caption: '' },
      { src: '/adventures/cabo/IMG_7866.JPG', caption: '' },
      { src: '/adventures/cabo/IMG_8166.JPG', caption: '' },
    ],
  },
]

// ─── Map-only visited locations (no trip card) ────────────────────────────────

export const VISITED_LOCATIONS: { id: string; label: string; coordinates: [number, number] }[] = [
  { id: 'bangalore',       label: 'Bangalore, India',        coordinates: [77.59,  12.97] },
  { id: 'mysore',          label: 'Mysore, India',           coordinates: [76.64,  12.30] },
  { id: 'madapura',        label: 'Madapura, India',         coordinates: [75.80,  13.95] },
  { id: 'ballari',         label: 'Ballari, India',          coordinates: [76.92,  15.14] },
  { id: 'delhi',           label: 'Delhi, India',            coordinates: [77.21,  28.63] },
  { id: 'jammukashmir',    label: 'Jammu & Kashmir, India',  coordinates: [74.80,  34.08] },
  { id: 'florida',         label: 'Florida',                 coordinates: [-81.52, 27.66] },
  { id: 'minnesota',       label: 'Minnesota',               coordinates: [-94.34, 46.73] },
  { id: 'newmexico',       label: 'New Mexico',              coordinates: [-106.02, 34.52] },
  { id: 'hawaii',          label: 'Hawaii (Big Island)',     coordinates: [-155.50, 19.90] },
  { id: 'maui',            label: 'Maui',                   coordinates: [-156.33, 20.80] },
  { id: 'cancun',          label: 'Cancún, Mexico',         coordinates: [-86.85,  21.16] },
  { id: 'westvirginia',    label: 'West Virginia',           coordinates: [-80.45,  38.59] },
  { id: 'tahoe',           label: 'Lake Tahoe',              coordinates: [-120.03, 39.09] },
  { id: 'slo',             label: 'San Luis Obispo',         coordinates: [-120.66, 35.28] },
  { id: 'losangeles',      label: 'Los Angeles',             coordinates: [-118.24, 34.05] },
  { id: 'lasvegas',        label: 'Las Vegas',               coordinates: [-115.14, 36.17] },
  { id: 'detroit',         label: 'Detroit',                 coordinates: [-83.05,  42.33] },
  { id: 'niagarafalls',    label: 'Niagara Falls, Canada',   coordinates: [-79.07,  43.10] },
  { id: 'seattle',         label: 'Seattle',                 coordinates: [-122.33, 47.61] },
  { id: 'olympic',         label: 'Olympic National Park',   coordinates: [-123.50, 47.80] },
  { id: 'mtrainier',       label: 'Mt. Rainier National Park', coordinates: [-121.73, 46.85] },
  { id: 'northcascades',   label: 'North Cascades National Park', coordinates: [-121.20, 48.70] },
  { id: 'palmsprings',     label: 'Palm Springs',             coordinates: [-116.54, 33.83] },
  { id: 'lavabeds',        label: 'Lava Beds National Monument', coordinates: [-121.51, 41.71] },
  { id: 'sandiego',        label: 'San Diego',                coordinates: [-117.16, 32.72] },
  { id: 'ensenada',        label: 'Ensenada, Mexico',         coordinates: [-116.60, 31.87] },
  { id: 'calgary',         label: 'Calgary, Canada',          coordinates: [-114.07, 51.05] },
  { id: 'banff',           label: 'Banff National Park',      coordinates: [-115.93, 51.50] },
  { id: 'edmonton',        label: 'Edmonton, Canada',         coordinates: [-113.49, 53.55] },
  { id: 'sacramento',      label: 'Sacramento',               coordinates: [-121.49, 38.58] },
  { id: 'davis',           label: 'Davis',                    coordinates: [-121.74, 38.54] },
  { id: 'reno',            label: 'Reno',                     coordinates: [-119.81, 39.53] },
  { id: 'deathvalley',     label: 'Death Valley',             coordinates: [-116.82, 36.53] },
  { id: 'santabarbara',    label: 'Santa Barbara',            coordinates: [-119.70, 34.42] },
  { id: 'mojave',          label: 'Mojave National Preserve', coordinates: [-115.51, 35.05] },
  { id: 'joshuatree',      label: 'Joshua Tree National Park', coordinates: [-115.90, 33.88] },
]

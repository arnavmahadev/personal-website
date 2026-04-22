// ─── Edit this file to update your site content ───────────────────────────────

export const RESUME_URL =
  'https://drive.google.com/file/d/1wmozeliCJVnk9ZliHNIlQWGL4Lh4Ym_M/view?usp=sharing'

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
    name: 'SaveBites',
    hook: 'Fight food waste, one receipt at a time.',
    description:
      'A full-stack food waste reduction web app that scans grocery receipts using an OCR pipeline to automatically extract items, update pantry inventories, and generate recipe suggestions.',
    tech: ['Python', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'React'],
    github: 'https://github.com/Devansh-Ojha/SaveBites',
    demo: undefined as string | undefined,
  },
  {
    name: 'Hexapod Robot',
    hook: 'A 6-legged robot that moves, senses, and avoids obstacles.',
    description:
      'A hexapod robot with multi-directional movement, obstacle avoidance, and real-time sensor integration. I designed the breadboard layout and soldered connections for 18 servo motors, an ultrasonic sensor, and an LCD display.',
    tech: ['C++'],
    github: 'https://github.com/arnavmahadev/Arnav_BlueStampPortfolio',
    demo: 'https://arnavmahadev.github.io/Arnav_BlueStampPortfolio/' as string | undefined,
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
]

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCE = [
  {
    role: 'Software Developer & Project Manager',
    org: 'iPick.ai',
    period: 'Jan 2026 — Present',
    location: 'Berkeley, CA',
    nexusLink: 'https://www.ipick.ai/nexus/',
    github: 'https://github.com/andrewyzhou/nexus',
    bullets: [
      'Architected a graph-based company relationship visualizer for iPick.ai using React, D3.js, and PostgreSQL.',
      'Built a supplier/subsidiary relationship extraction pipeline across 5,000+ public company tickers, storing structured supplier/subsidiary edges in PostgreSQL to power graph-based visualization in the frontend.',
      'Led a team of engineers toward a May 2026 live demo milestone for a CEO-facing client deliverable.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Claythis',
    period: 'May 2025 — Aug 2025',
    location: 'San Mateo, CA',
    link: undefined as string | undefined,
    bullets: [
      "Developed a Unity-based game showcasing Claythis’s AI-driven 3D model generation pipeline.",
      'Implemented modular weapon & health systems (reload, recoil, animations, armor, healing) enhancing code maintainability and reducing future implementation time by 40%.',
      "Presented the project to 15 stakeholders and potential clients, demonstrating the product’s capabilities.",
    ],
  },
]

// ─── Upcoming Adventures ──────────────────────────────────────────────────────

export const UPCOMING_TRIPS = [
  {
    id: 'utah',
    label: 'Utah Road Trip',
    image: '/adventures/utah.jpg' as string | null,
    target: new Date('2026-05-21T03:00:00Z'),
    description: 'Zion · Bryce · Arches · Canyonlands · Capitol Reef · La Sal',
  },
  {
    id: 'kili',
    label: 'Summit Mt. Kilimanjaro',
    image: '/adventures/kili.jpg' as string | null,
    target: new Date('2026-08-02T05:00:00Z'),
    description: '5,895 m (19,341 ft) · Uhuru Peak · Tanzania',
  },
  {
    id: 'safari',
    label: 'Tanzania Safari',
    image: '/adventures/safari.jpg' as string | null,
    target: new Date('2026-08-10T03:00:00Z'),
    description: 'Serengeti · Tarangire · Ngorongoro Crater',
  },
]

// ─── Past Adventures ──────────────────────────────────────────────────────────

export const PAST_TRIPS = [
  {
    id: 'barcelona',
    label: 'Barcelona, Spain',
    date: 'January 2026',
    description: 'Gothic Quarter · La Sagrada Família · Park Güell · Montserrat · Sitges · Costa Brava · Castell de Montjuïc · Bunkers del Carmel · Camp Nou',
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
    date: 'December 2025',
    description: 'Redwood National Park · Avenue of the Giants · Humboldt Redwoods · Eureka',
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
    date: 'August 2025',
    description: 'Rocky Mountain · Maroon Bells · Grand Mesa · Black Canyon · Garden of the Gods · Pikes Peak · Great Sand Dunes',
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
]

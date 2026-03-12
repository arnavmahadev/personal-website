import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'
import ProjectCard from './ui/ProjectCard'

const projects = [
  {
    name: 'SaveBites',
    hook: 'Fight food waste, one receipt at a time.',
    description:
      'A full-stack food waste reduction web app that scans grocery receipts using an optical character recognition (OCR) pipeline to automatically extract items, update users\' pantry inventories, and generate recipe suggestions.',
    tech: ['Python', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'React'],
    github: 'https://github.com/Devansh-Ojha/SaveBites',
    demo: undefined,
    featured: false,
  },
  {
    name: 'Hexapod Robot',
    hook: 'A 6-legged robot that moves, senses, and avoids obstacles.',
    description:
      'Engineered a hexapod robot with multi-directional movement, obstacle avoidance, and real-time sensor integration. Designed the breadboard layout and soldered connections for 18 servo motors, an ultrasonic sensor, and an LCD display.',
    tech: ['C++'],
    github: 'https://github.com/arnavmahadev/Arnav_BlueStampPortfolio',
    demo: undefined,
    featured: false,
  },
  {
    name: 'Wordle',
    hook: 'A web-based Wordle clone with real-time feedback.',
    description:
      'Designed and built a browser-based Wordle game with game state management, guess validation, and real-time visual feedback. Features a clean, robust UI presented to 30+ peers.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/arnavmahadev/Wordle',
    demo: undefined,
    featured: false,
  },
]

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="relative">
      {/* Subtle section grid background */}
      <div className="absolute inset-0 section-grid opacity-40 pointer-events-none" />

      <div className="relative z-10">
        <SectionHeading
          title="Projects"
        />

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} {...project} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

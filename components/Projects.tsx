import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'
import ProjectCard from './ui/ProjectCard'
import { PROJECTS as projects } from '@/content'

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div>
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

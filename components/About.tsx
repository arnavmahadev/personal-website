import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'

export default function About() {
  return (
    <SectionWrapper id="about">
      <div>
        <SectionHeading title="About" />

        <div className="space-y-4 text-zinc-400 text-[15px] leading-relaxed">
          <p>
            I&apos;m a second-year EECS student at UC Berkeley interested in
            software engineering and backend systems.
          </p>
          <p>
            I enjoy building systems that are technically sound but also helpful
            for people. Most of my projects involve some mix of full-stack
            development, data organization, and clean system design.
          </p>
          <p>
            Currently, I&apos;m a Project Manager for Nexus at iPick.ai, where I lead
            a team of 15 developers building a graph-based platform that visualizes
            relationships between thousands of companies. I previously interned at
            Claythis as a Software Engineer, where I worked on a Unity game used to
            showcase their AI-driven 3D model generation technology.
          </p>
          <p>
            I&apos;m currently looking for a Summer 2027 SWE internship where I can
            contribute to real products, learn from experienced engineers, and work
            on software that genuinely helps people.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}

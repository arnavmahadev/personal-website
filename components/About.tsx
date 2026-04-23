import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'
import GitHubCalendar from './ui/GitHubCalendar'

export default function About() {
  return (
    <SectionWrapper id="about">
      <div>
        <SectionHeading title="About" />

        <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
          <p>
            I&apos;m an undergraduate at UC Berkeley studying Electrical Engineering &amp; Computer Science.
            I&apos;m interested in software engineering and backend systems.
          </p>
          <p>
            I enjoy building systems that are technically sound but also helpful
            for people. Most of my projects involve some mix of full-stack
            development, data organization, and clean system design.
          </p>
          <p>
            Currently, I&apos;m a Software Developer and Project Manager at iPick.ai, where I lead
            a team of 15 developers building a graph-based platform that visualizes
            relationships between thousands of companies. I previously interned at
            Claythis as a Software Engineer, where I worked on their AI-driven 3D model generation technology.
          </p>
          <p>
            I&apos;m currently looking for opportunities where I can
            contribute to real products, learn from experienced engineers, and work
            on projects that make a difference.
          </p>
        </div>

        <div className="mt-6 p-5 rounded-xl bg-card border border-border">
          <p className="text-base font-mono text-muted-foreground uppercase tracking-widest mb-4">GitHub Activity</p>
          <GitHubCalendar />
        </div>
      </div>
    </SectionWrapper>
  )
}

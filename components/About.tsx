import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'
import GitHubCalendar from './ui/GitHubCalendar'

const linkClass =
  'text-foreground underline decoration-border underline-offset-4 hover:decoration-primary transition-colors'

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
            Currently, I&apos;m a Software Engineering Intern at LG NOVA, where I work across a
            Flask/PostgreSQL backend and a React/TypeScript frontend. I previously interned at iPick.ai,
            where I built an LLM-based portfolio optimizer, a reinforcement learning pipeline of trading
            agents, and a graph-based platform that visualizes relationships between thousands of
            companies; at Maadhev LLC, where I built a custom ACH payment system and Shopify
            integrations; and at Claythis, where I worked on their AI-driven 3D model generation technology.
          </p>
          <p>
            Away from the keyboard, I&apos;m usually doing something active or yapping with my friends
            about nothing in particular. I&apos;ve played soccer since I was 4 and still jump into pickup
            and intramural games whenever I can, and I&apos;ve been a Barça fan for just as long, for
            better or worse. I lift regularly and I&apos;m on a cut right now, which I track a little
            too publicly in the{' '}
            <a href="#interests" className={linkClass}>hobbies section</a>. When I&apos;m not doing any
            of that, I&apos;m probably playing video games with the same friends, or planning the next{' '}
            <a href="#adventures" className={linkClass}>trip</a>; the most recent big one was summiting
            Kilimanjaro.
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

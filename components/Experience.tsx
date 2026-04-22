'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'

const experiences = [
  {
    role: 'Software Developer & Project Manager',
    org: 'iPick.ai',
    period: 'Jan 2026 — Present',
    location: 'Berkeley, CA',
    link: 'https://www.ipick.ai/nexus/',
    bullets: [
      'Led development of a graph-based stock and company relationship visualizer, coordinating a team of 15 developers.',
      'Authored technical design docs, tasks, and workshops, setting goals to keep the team on track.',
      'Oversaw migration of 8,000+ JSON company records into a PostgreSQL database with a React/D3.js frontend for interactive graph exploration.',
    ],
    accent: true,
  },
  {
    role: 'Software Engineering Intern',
    org: 'Claythis',
    link: undefined,
    period: 'May 2025 — Aug 2025',
    location: 'San Mateo, CA',
    bullets: [
      'Worked on the AI-driven 3D character model generation pipeline, enabling automated creation of production-ready assets.',
      'Implemented modular systems to integrate generated models into an interactive environment, reducing future implementation time by 40%.',
      'Presented the pipeline to 15 stakeholders and potential clients, demonstrating the product\'s capabilities.',
    ],
    accent: true,
  },
]

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Experience" />

      <div className="relative">
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.org}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-2xl border p-5 transition-colors duration-200 bg-card border-border hover:border-accent/50">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold font-serif text-foreground">{exp.role}</h3>
                    <p className="text-base font-medium text-primary">{exp.org}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-muted-foreground">{exp.period}</p>
                    <p className="text-sm text-muted-foreground/70">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-3">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-border" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={13} />
                    Website
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

'use client'

import { motion } from 'framer-motion'
import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'

const experiences = [
  {
    role: 'Project Manager',
    org: 'iPick.ai',
    period: 'Jan 2026 — Present',
    location: 'Berkeley, CA',
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
    period: 'May 2025 — Aug 2025',
    location: 'San Mateo, CA',
    bullets: [
      'Developed a Unity-based game showcasing Claythis\'s AI-driven 3D model generation pipeline.',
      'Implemented modular weapon & health systems (reload, recoil, animations, armor, healing), reducing future implementation time by 40%.',
      'Presented the project to 15 stakeholders and potential clients, demonstrating the product\'s capabilities.',
    ],
    accent: true,
  },
]

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        title="Experience"
      />

      <div className="relative">
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.org}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Card */}
              <div
                className={`rounded-2xl border p-6 transition-colors duration-200
                            ${exp.accent
                              ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                              : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                            }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-100">{exp.role}</h3>
                    <p className={`text-sm font-medium ${exp.accent ? 'text-blue-400' : 'text-zinc-400'}`}>
                      {exp.org}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-zinc-500">{exp.period}</p>
                    <p className="text-xs text-zinc-600">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-zinc-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

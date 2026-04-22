'use client'

import { motion } from 'framer-motion'
import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'
import { EXPERIENCE as experiences } from '@/content'

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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold font-serif text-foreground">{exp.role}</h3>
                    {exp.link ? (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium text-primary hover:underline"
                      >
                        {exp.org}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-foreground">{exp.org}</p>
                    )}
                  </div>
                  <div className="sm:text-right shrink-0">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

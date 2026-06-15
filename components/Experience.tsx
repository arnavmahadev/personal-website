import { Github, ExternalLink } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'
import { EXPERIENCE as experiences } from '@/content'

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Experience" />

      <div className="relative">
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.role + exp.org}>
              <div className="rounded-2xl border p-5 transition-colors duration-200 bg-card border-border hover:border-accent/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold font-serif text-foreground">{exp.role}</h3>
                    <p className="text-base font-medium text-primary">{exp.org}</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-sm font-mono text-muted-foreground">{exp.period}</p>
                    <p className="text-sm text-muted-foreground/70" translate="no">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-3">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                      <span className="mt-[0.6rem] flex-shrink-0 w-1 h-1 rounded-full bg-border" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                {('github' in exp && exp.github) || ('nexusLink' in exp && exp.nexusLink) || ('link' in exp && exp.link) ? (
                  <div className="flex items-center gap-3">
                    {('link' in exp && exp.link || 'nexusLink' in exp && exp.nexusLink) && (
                      <a
                        href={('link' in exp && exp.link) || ('nexusLink' in exp && exp.nexusLink) || ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Website
                      </a>
                    )}
                    {'github' in exp && exp.github && (
                      <a
                        href={exp.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

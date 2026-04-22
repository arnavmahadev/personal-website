'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  name: string
  hook: string
  description: string
  tech: string[]
  github?: string
  demo?: string
  featured?: boolean
  index: number
}

export default function ProjectCard({
  name,
  hook,
  description,
  tech,
  github,
  demo,
  featured,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col bg-card border border-border rounded-2xl p-6 card-glow"
    >

      <div className="flex items-start justify-between mb-4">
        <div>
          {featured && (
            <span className="inline-block text-[10px] font-mono font-medium tracking-widest
                             text-primary uppercase mb-2">
              Featured
            </span>
          )}
          <h3 className="text-xl font-semibold font-serif text-foreground group-hover:text-foreground transition-colors">
            {name}
          </h3>
          <p className="text-base text-primary font-medium mt-0.5">{hook}</p>
        </div>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed flex-1 mb-6">{description}</p>

      {/* Links */}
      <div className="flex items-center gap-3 mt-auto">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg
                       border border-border text-muted-foreground hover:text-foreground
                       hover:border-foreground/30 transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg
                       border border-border text-muted-foreground hover:text-primary
                       hover:border-primary/30 transition-colors"
          >
            <ExternalLink size={14} />
            Website
          </a>
        )}
      </div>
    </motion.div>
  )
}

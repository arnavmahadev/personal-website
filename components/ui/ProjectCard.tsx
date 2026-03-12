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
      whileHover={{ y: -4 }}
      className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl p-6
                 card-glow transition-all duration-300 hover:border-zinc-700"
    >
      {/* Subtle top glow on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

      <div className="flex items-start justify-between mb-4">
        <div>
          {featured && (
            <span className="inline-block text-[10px] font-mono font-medium tracking-widest
                             text-blue-400 uppercase mb-2">
              Featured
            </span>
          )}
          <h3 className="text-xl font-semibold text-zinc-50 group-hover:text-white transition-colors">
            {name}
          </h3>
          <p className="text-sm text-blue-400 font-medium mt-0.5">{hook}</p>
        </div>
      </div>

      <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-6">{description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-0.5 text-xs font-mono bg-zinc-800 text-zinc-400
                       rounded-md border border-zinc-700/60"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 mt-auto">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-400
                       hover:text-zinc-100 transition-colors"
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
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-400
                       hover:text-blue-400 transition-colors"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  )
}

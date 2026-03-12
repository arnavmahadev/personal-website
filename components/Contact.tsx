'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'

const EMAIL = 'arnavrmahadev@gmail.com'
const GITHUB_URL = 'https://github.com/arnavmahadev'
const LINKEDIN_URL = 'https://www.linkedin.com/in/arnavmahadev/'
const RESUME_URL = 'https://drive.google.com/file/d/1g9jVD6AIIQGwrUabWjQY9Y-ybVZBRLnh/view?usp=sharing'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/arnavmahadev',
    href: GITHUB_URL,
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/arnavmahadev',
    href: LINKEDIN_URL,
    external: true,
  },
  {
    icon: FileText,
    label: 'Resume',
    value: 'View PDF',
    href: RESUME_URL,
    external: true,
  },
]

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-4">
          Contact
        </h2>
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
          I&apos;m actively looking for Summer 2027 SWE internships. If you&apos;re a recruiter,
          engineer, or just want to chat about a project or opportunity, please don&apos;t
          hesitate to reach out!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800
                       hover:border-zinc-700 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700
                            flex items-center justify-center flex-shrink-0
                            group-hover:bg-blue-500/10 group-hover:border-blue-500/30
                            transition-colors duration-200">
              <link.icon size={16} className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500 mb-0.5">{link.label}</p>
              <p className="text-sm text-zinc-300 truncate group-hover:text-zinc-100 transition-colors">
                {link.value}
              </p>
            </div>
            <ArrowUpRight
              size={14}
              className="text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0"
            />
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  )
}

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
    label: 'Résumé',
    value: 'View PDF',
    href: RESUME_URL,
    external: true,
  },
]

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight text-foreground mb-4">
          Contact
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          I&apos;m actively looking for SWE internships. If you&apos;re a recruiter,
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
            className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border
                       hover:border-accent/50 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-lg bg-muted border border-border
                            flex items-center justify-center flex-shrink-0
                            group-hover:bg-primary/10 group-hover:border-primary/30
                            transition-colors duration-200">
              <link.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-0.5">{link.label}</p>
              <p className="text-base text-foreground/80 truncate group-hover:text-foreground transition-colors">
                {link.value}
              </p>
            </div>
            <ArrowUpRight
              size={14}
              className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex-shrink-0"
            />
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  )
}

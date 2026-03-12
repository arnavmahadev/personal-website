'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Hobbies', href: '#interests' },
  { label: 'Contact', href: '#contact' },
]

const RESUME_URL = 'https://drive.google.com/file/d/1g9jVD6AIIQGwrUabWjQY9Y-ybVZBRLnh/view?usp=sharing'
const GITHUB_URL = 'https://github.com/arnavmahadev'
const LINKEDIN_URL = 'https://www.linkedin.com/in/arnavmahadev/'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Active section tracking
      const sections = navLinks.map((l) => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'glass border-b border-white/[0.06]' : 'bg-transparent'}`}
      >
        <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-sm font-semibold text-zinc-100 hover:text-blue-400
                       transition-colors tracking-tight"
          >
            arnav<span className="text-blue-400">.</span>dev
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200
                  ${activeSection === link.href.slice(1)
                    ? 'text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-500 hover:text-zinc-200 transition-colors"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-500 hover:text-zinc-200 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-4 py-1.5 text-sm font-medium rounded-lg
                         bg-zinc-100 text-zinc-900 hover:bg-white
                         transition-colors duration-200"
            >
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-white/[0.06] md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-zinc-800 flex items-center gap-4">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                   className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Github size={18} />
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
                   className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
                   className="ml-auto px-4 py-1.5 text-sm font-medium rounded-lg
                              bg-zinc-100 text-zinc-900 hover:bg-white transition-colors">
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X, Sun, Moon } from 'lucide-react'
import { RESUME_URL, SOCIALS } from '@/content'

function SpotifyIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hobbies', href: '#interests' },
  { label: 'Adventures', href: '#adventures' },
  { label: 'Contact', href: '#contact' },
]


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const dark = saved !== 'light'
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActiveSection('contact')
        return
      }

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

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300
          ${scrolled ? 'glass border-b border-border/40' : 'bg-transparent'}`}
      >
        <nav className="max-w-[96rem] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-sm font-semibold text-foreground hover:text-primary
                       transition-colors tracking-tight"
          >
            arnavmaha<span className="text-primary">.</span>dev
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200
                  ${activeSection === link.href.slice(1)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={SOCIALS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Spotify"
            >
              <SpotifyIcon size={17} />
            </a>
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href={`mailto:${SOCIALS.email}`}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
            <button
              onClick={toggleTheme}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-4 py-1.5 text-sm font-medium rounded-lg
                         bg-primary text-primary-foreground hover:opacity-90
                         transition-opacity duration-200"
            >
              Résumé
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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
            className="fixed inset-x-0 top-16 z-40 glass border-b border-border/40 md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-border flex items-center gap-4">
                <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={18} />
                </a>
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href={SOCIALS.spotify} target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <SpotifyIcon size={18} />
                </a>
                <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <InstagramIcon size={18} />
                </a>
                <a href={`mailto:${SOCIALS.email}`}
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={18} />
                </a>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
                   className="ml-auto px-4 py-1.5 text-sm font-medium rounded-lg
                              bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  Résumé
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

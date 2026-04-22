'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { RESUME_URL, SOCIALS } from '@/content'

function SpotifyIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}


const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-8 w-full py-16">
        <div className="grid gap-16">
          {/* Left — text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center items-center text-center"
          >
            <motion.div variants={item} className="mb-8">
              <Image
                src="/avatar.jpg"
                alt="Arnav Mahadev"
                width={120}
                height={120}
                className="rounded-full object-cover border-2 border-border"
              />
            </motion.div>

            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                               bg-primary/10 border border-primary/20 text-primary
                               text-sm font-mono font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-7xl lg:text-8xl font-extrabold font-serif tracking-tight leading-[1.05] mb-6"
            >
              <span className="text-foreground">Arnav</span>
              <br />
              <span className="text-gradient">Mahadev</span>
            </motion.h1>

            <motion.div variants={item} className="mb-8">
              <p className="text-2xl text-foreground/80 font-medium font-serif">
                EECS @ UC Berkeley
              </p>
              <p className="text-muted-foreground text-xl mt-1 font-serif">
                Software Engineer
              </p>
            </motion.div>

            <motion.div variants={item} className="flex justify-center mb-8">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl
                           bg-primary text-primary-foreground text-base font-semibold
                           transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              >
                <Download size={16} />
                Résumé
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} className="flex items-center gap-3">
              {[
                { href: SOCIALS.github, label: 'GitHub', icon: <Github size={20} />, external: true },
                { href: SOCIALS.linkedin, label: 'LinkedIn', icon: <Linkedin size={20} />, external: true },
                { href: SOCIALS.spotify, label: 'Spotify', icon: <SpotifyIcon />, external: true },
                { href: SOCIALS.instagram, label: 'Instagram', icon: <InstagramIcon />, external: true },
                { href: `mailto:${SOCIALS.email}`, label: 'Email', icon: <Mail size={20} />, external: false },
              ].map(({ href, label, icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card
                             transition-all duration-200"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ delay: 0, duration: 0.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-transparent to-border"
          />
          <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-border to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

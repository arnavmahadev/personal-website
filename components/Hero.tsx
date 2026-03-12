'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import CodeGrid from './ui/CodeGrid'

const GITHUB_URL = 'https://github.com/arnavmahadev'
const LINKEDIN_URL = 'https://www.linkedin.com/in/arnavmahadev/'
const EMAIL = 'arnavrmahadev@gmail.com'
const RESUME_URL = 'https://drive.google.com/file/d/1g9jVD6AIIQGwrUabWjQY9Y-ybVZBRLnh/view?usp=sharing'

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
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Radial gradient overlay to fade the dots toward center */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950" />

      {/* Blue glow orb — top left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      {/* Cyan glow orb — right */}
      <div className="absolute top-1/3 -right-24 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                               bg-blue-500/10 border border-blue-500/20 text-blue-400
                               text-xs font-mono font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Open to 2027 Internships
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.08] mb-5"
            >
              <span className="text-zinc-50">Arnav</span>
              <br />
              <span className="text-gradient">Mahadev</span>
            </motion.h1>

            <motion.div variants={item} className="mb-6">
              <p className="text-lg text-zinc-300 font-medium">
                EECS @ UC Berkeley
              </p>
              <p className="text-zinc-500 text-base mt-0.5">
                Software Engineer &amp; Builder
              </p>
            </motion.div>

            <motion.p
              variants={item}
              className="text-zinc-400 text-base leading-relaxed max-w-md mb-10"
            >
              I build full-stack applications that turn complex systems into simple, usable tools.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold
                           transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                View Projects
                <ArrowRight size={15} />
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold
                           border border-zinc-700 hover:border-zinc-600
                           transition-all duration-200"
              >
                <Download size={14} />
                Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} className="flex items-center gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800
                           transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800
                           transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800
                           transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — bento grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <CodeGrid />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ delay: 0, duration: 0.3 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-transparent to-zinc-600"
          />
          <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-zinc-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

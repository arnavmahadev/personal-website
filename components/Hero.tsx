'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { RESUME_URL, SOCIALS } from '@/content'


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
    <section className="relative h-screen sm:min-h-screen flex items-start sm:items-center overflow-hidden pt-16">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-8 w-full py-2 sm:py-16">
        <div className="grid gap-8 sm:gap-16">
          {/* Left — text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center items-center text-center"
          >
            <motion.div variants={item} className="mb-4 sm:mb-8">
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
                               text-sm font-mono font-medium mb-4 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-7xl lg:text-8xl font-extrabold font-serif tracking-tight leading-[1.05] mb-4 sm:mb-6"
            >
              <span className="text-foreground">Arnav</span>
              <br />
              <span className="text-gradient">Mahadev</span>
            </motion.h1>

            <motion.div variants={item} className="mb-4 sm:mb-8">
              <p className="text-2xl text-foreground/80 font-medium font-serif">
                EECS @ UC Berkeley
              </p>
              <p className="text-muted-foreground text-xl mt-1 font-serif">
                Software Engineer
              </p>
            </motion.div>

            <motion.div variants={item} className="flex justify-center mb-4 sm:mb-8">
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

      </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
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
    </section>
  )
}

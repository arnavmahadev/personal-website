'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download } from 'lucide-react'
import Image from 'next/image'
import { RESUME_URL } from '@/content'


const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  // The backdrop is pinned behind the page and drifts up and fades as you scroll.
  // Browsers with scroll-driven animations run that entirely in CSS, off the main
  // thread. Elsewhere only the fade is driven from here: moving a pinned layer from
  // script trails the scroll by a frame, which reads as jitter on phones.
  const { scrollY } = useScroll()
  const [scriptedFade, setScriptedFade] = useState(false)
  useEffect(() => {
    setScriptedFade(!CSS.supports('animation-timeline: scroll()'))
  }, [])
  const backdropOpacity = useTransform(scrollY, (v) =>
    typeof window === 'undefined' ? 1 : Math.max(0, 1 - v / (window.innerHeight * 0.85))
  )

  return (
    <section className="relative h-screen sm:min-h-screen flex items-start sm:items-center pt-16">
      {/* Circuit-trace backdrop, taller than the screen so its bottom edge never shows while it drifts up */}
      <motion.div aria-hidden className="backdrop-layer" style={scriptedFade ? { opacity: backdropOpacity } : undefined}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="backdrop absolute inset-0 w-full h-full">
          <use href="/circuit.svg#c" />
        </svg>
        {/* Thins the lines out behind the text */}
        <div className="backdrop-clearing absolute inset-0" />
      </motion.div>

      <div className="relative max-w-[96rem] mx-auto px-4 sm:px-8 w-full py-2 sm:py-16">
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
                priority
                className="rounded-full object-cover border-2 border-border"
              />
            </motion.div>

            <motion.div variants={item}>
              <span className="inline-block text-primary text-lg font-mono font-medium mb-4 sm:mb-8">
                Open to Opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-7xl lg:text-8xl font-extrabold font-display tracking-tight leading-[1.05] mb-4 sm:mb-6"
            >
              <span className="text-foreground">Arnav</span>
              <br />
              <span className="text-gradient">Mahadev</span>
            </motion.h1>

            <motion.div variants={item} className="mb-4 sm:mb-8">
              <p className="text-2xl text-foreground/80 font-medium font-display">
                EECS @ UC Berkeley
              </p>
              <p className="text-muted-foreground text-xl mt-1 font-display">
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

          </motion.div>

        </div>

      </div>

    </section>
  )
}

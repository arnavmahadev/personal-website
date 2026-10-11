'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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
  // The contour map is pinned behind the page. As you scroll it drifts upward
  // at a fraction of the scroll speed, grows slightly, and fades out by the
  // time the hero has left the screen.
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  const progress = (v: number) => (typeof window === 'undefined' ? 0 : Math.min(1, v / (window.innerHeight * 0.85)))
  const topoOpacity = useTransform(scrollY, (v) => 1 - progress(v))
  const topoY = useTransform(scrollY, (v) => (reduceMotion ? 0 : -v * 0.35))
  const topoScale = useTransform(scrollY, (v) => (reduceMotion ? 1 : 1 + progress(v) * 0.12))

  return (
    <section className="relative h-screen sm:min-h-screen flex items-start sm:items-center pt-16">
      {/* Contour-map backdrop, thinned out behind the text. Taller than the screen so its
          bottom edge never shows while it drifts up. */}
      <motion.div
        aria-hidden
        className="topo-fade fixed inset-x-0 top-0 h-[140vh] -z-10 pointer-events-none origin-top will-change-transform"
        style={{ opacity: topoOpacity, y: topoY, scale: topoScale }}
      >
        <div className="topo absolute inset-0" />
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

          </motion.div>

        </div>

      </div>

    </section>
  )
}

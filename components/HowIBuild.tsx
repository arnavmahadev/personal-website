'use client'

import { motion } from 'framer-motion'
import { Target, Layers, Zap } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'

const pillars = [
  {
    icon: Target,
    number: '01',
    title: 'Build for real users',
    body: "Code that doesn't solve an actual problem isn't valuable. I think about who is using something and why before I think about how to build it.",
  },
  {
    icon: Layers,
    number: '02',
    title: 'Keep systems clean and scalable',
    body: 'Good architecture doesn\'t happen by accident. I care about clean data models, sensible abstractions, and code that someone else can actually read later.',
  },
  {
    icon: Zap,
    number: '03',
    title: 'Ship intuitive, useful products',
    body: 'The best products are ones where the interface disappears. I focus on making systems that feel simple from the outside even when the internals are complex.',
  },
]

export default function HowIBuild() {
  return (
    <SectionWrapper id="how-i-build" className="relative">
      {/* Subtle blue glow behind this section */}
      <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-blue-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        <SectionHeading
          title="How I Build"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800
                         hover:border-zinc-700 transition-colors duration-300 group"
            >
              {/* Number watermark */}
              <span className="absolute top-5 right-5 font-mono text-4xl font-bold
                               text-zinc-800 group-hover:text-zinc-700 transition-colors select-none">
                {pillar.number}
              </span>

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20
                              flex items-center justify-center mb-5">
                <pillar.icon size={18} className="text-blue-400" />
              </div>

              <h3 className="text-base font-semibold text-zinc-100 mb-2">{pillar.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

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
<div className="relative z-10">
        <SectionHeading title="How I Build" />

        <div className="grid md:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-5 rounded-2xl bg-card border border-border
                         hover:border-accent/50 transition-colors duration-300 group"
            >
              <span className="absolute top-5 right-5 font-mono text-4xl font-bold
                               text-border group-hover:text-border/70 transition-colors select-none">
                {pillar.number}
              </span>

              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20
                              flex items-center justify-center mb-5">
                <pillar.icon size={18} className="text-primary" />
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

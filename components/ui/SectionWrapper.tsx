'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      className={clsx('py-16 px-6', className)}
    >
      <div className="max-w-5xl mx-auto">{children}</div>
    </motion.section>
  )
}

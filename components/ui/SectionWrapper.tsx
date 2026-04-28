'use client'

import { ReactNode, useRef } from 'react'
import { clsx } from 'clsx'
import { motion, useInView } from 'framer-motion'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={ref}
      id={id}
      className={clsx('py-10 px-4 sm:px-8 scroll-mt-20', className)}
    >
      <motion.div
        className="max-w-[96rem] mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}

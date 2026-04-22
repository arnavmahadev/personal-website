import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={clsx('py-10 px-4 sm:px-8 scroll-mt-20', className)}
    >
      <div className="max-w-[96rem] mx-auto">{children}</div>
    </section>
  )
}

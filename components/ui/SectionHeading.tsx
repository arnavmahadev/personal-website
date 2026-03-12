interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      {label && (
        <span className="text-xs font-mono font-medium tracking-widest text-blue-400 uppercase">
          {label}
        </span>
      )}
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-zinc-400 text-base max-w-xl">{subtitle}</p>
      )}
    </div>
  )
}

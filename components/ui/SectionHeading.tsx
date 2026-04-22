interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-5">
      {label && (
        <span className="text-xs font-mono font-medium tracking-widest text-primary uppercase">
          {label}
        </span>
      )}
      <h2 className="mt-2 text-4xl sm:text-5xl font-bold font-serif tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base max-w-xl">{subtitle}</p>
      )}
    </div>
  )
}

interface SkillChipProps {
  label: string
  accent?: boolean
}

export default function SkillChip({ label }: SkillChipProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-mono border bg-card border-border text-foreground/80">
      {label}
    </span>
  )
}

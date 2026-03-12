interface SkillChipProps {
  label: string
  accent?: boolean
}

export default function SkillChip({ label }: SkillChipProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-mono border bg-zinc-800/80 border-zinc-700/60 text-zinc-300">
      {label}
    </span>
  )
}

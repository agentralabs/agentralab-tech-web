interface SectionRailProps {
  label: string
  step: string
}

export function SectionRail({ label, step }: SectionRailProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{label}</span>
      <div className="flex-1 border-t border-border" />
      <span className="h-1.5 w-1.5 bg-[#ea580c]" />
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{step}</span>
    </div>
  )
}

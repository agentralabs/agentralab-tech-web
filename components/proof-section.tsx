"use client"

import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"

const ease = [0.22, 1, 0.36, 1] as const

const benchmarks = [
  { label: "Solen vs GPT-4o (Supply Chain)", value: "Coming soon", step: 1 },
  { label: "Verac vs GPT-4o (Finance)", value: "Coming soon", step: 2 },
  { label: "Axiom vs GPT-4o (Markets)", value: "Coming soon", step: 3 },
]

const substrateStats = [
  { label: "Memory: causal traversal", value: "< 1 ms", barPct: 95 },
  { label: "Memory: semantic search (100K nodes)", value: "< 10 ms", barPct: 85 },
  { label: "Codebase: symbol lookup", value: "14.3 \u00B5s", barPct: 98 },
  { label: "All MCP p99", value: "< 100 ms", barPct: 70 },
]

/* ── SVG Icons ───────────────────────────────────────────────────── */

function ServerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      className="w-6 h-6 text-[#ea580c]"
    >
      <rect x="2" y="2" width="20" height="8" />
      <rect x="2" y="14" width="20" height="8" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <line x1="10" y1="6" x2="18" y2="6" />
      <line x1="10" y1="18" x2="18" y2="18" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      className="w-6 h-6 text-[#ea580c]"
    >
      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
      <rect x="9" y="10" width="6" height="5" />
      <line x1="12" y1="10" x2="12" y2="8" />
    </svg>
  )
}

function ClockInfinityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      className="w-6 h-6 text-[#ea580c]"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      {/* small infinity at bottom */}
      <path d="M8 18c0-1 1-2 2-2s2 1 2 0 1-2 2-2 2 1 2 2" strokeWidth={1.5} />
    </svg>
  )
}

const valueCards = [
  {
    headline: "LOCAL-FIRST",
    body: "Every model runs on your hardware. Every .amem file lives on your disk. Zero cloud dependency.",
    Icon: ServerIcon,
  },
  {
    headline: "DATA STAYS ON-PREMISE",
    body: "Verac runs on your servers. Nothing leaves.",
    Icon: ShieldIcon,
  },
  {
    headline: "20-YEAR MEMORY",
    body: "2 GB of reasoning continuity in a single .amem file",
    Icon: ClockInfinityIcon,
  },
]

/* ── Dot-grid overlay ────────────────────────────────────────────── */

function DotGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="proof-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="currentColor" opacity="0.07" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#proof-dots)" />
    </svg>
  )
}

/* ── Main component ──────────────────────────────────────────────── */

export function ProofSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12 lg:py-28" aria-label="Proof">
      <SectionRail label="// SECTION: PROOF" step="006" />

      {/* Two-column benchmarks + speed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left: Model Benchmarks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="border-2 border-foreground bg-background"
        >
          <div className="px-4 py-3 border-b border-foreground">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
              Model Benchmarks
            </span>
          </div>
          <div className="px-4 py-3 space-y-0">
            {benchmarks.map((b, i) => (
              <div
                key={b.label}
                className={`flex items-center justify-between gap-4 px-4 py-3 border border-border/40 ${
                  i > 0 ? "-mt-px" : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex items-center justify-center w-6 h-6 border border-foreground/20 rounded-full text-[10px] font-mono text-muted-foreground shrink-0">
                    {b.step}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground truncate">
                    {b.label}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground/60 italic shrink-0 border border-dashed border-border/60 px-2 py-0.5 rounded">
                  {b.value}
                </span>
              </div>
            ))}
            <p className="text-[10px] font-mono text-muted-foreground/50 pt-3 px-3 border-t border-border/40 mt-2">
              Graded by Claude (neutral). Methodology published in full.
            </p>
          </div>
        </motion.div>

        {/* Right: Substrate Speed — animated bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="border-2 border-foreground bg-background"
        >
          <div className="px-4 py-3 border-b border-foreground">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
              Substrate Speed
            </span>
          </div>
          <div className="px-4 py-4 space-y-4">
            {substrateStats.map((s, i) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs font-mono text-muted-foreground">
                    {s.label}
                  </span>
                  <span className="text-sm font-mono font-semibold shrink-0">
                    {s.value}
                  </span>
                </div>
                {/* Animated horizontal bar */}
                <div className="w-full h-2 bg-border/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#ea580c]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.barPct}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.0,
                      ease,
                      delay: 0.2 + i * 0.12,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Value cards with dot-grid overlay */}
      <div className="relative">
        <DotGrid />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {valueCards.map((card, i) => (
            <motion.div
              key={card.headline}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease, delay: i * 0.08 }}
              className="border-2 border-foreground bg-background p-5"
            >
              {/* MODULE.GLYPH-style icon container */}
              <div className="mb-4">
                <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-muted-foreground block mb-1.5">
                  MODULE.GLYPH
                </span>
                <div className="border border-foreground p-3 bg-background/50 w-14 h-14 flex items-center justify-center">
                  <card.Icon />
                </div>
              </div>
              <span className="text-sm font-mono font-bold tracking-tight uppercase block mb-2">
                {card.headline}
              </span>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

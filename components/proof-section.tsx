"use client"

import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"

const ease = [0.22, 1, 0.36, 1] as const

const benchmarks = [
  { label: "Solen vs GPT-4o (Supply Chain)", value: "Coming soon" },
  { label: "Verac vs GPT-4o (Finance)", value: "Coming soon" },
  { label: "Axiom vs GPT-4o (Markets)", value: "Coming soon" },
]

const substrateStats = [
  { label: "Memory: causal traversal", value: "< 1 ms" },
  { label: "Memory: semantic search (100K nodes)", value: "< 10 ms" },
  { label: "Codebase: symbol lookup", value: "14.3 \u00B5s" },
  { label: "All MCP p99", value: "< 100 ms" },
]

const valueCards = [
  {
    headline: "$328K \u2192 $80/mo",
    body: "Enterprise API costs replaced by owned infrastructure",
  },
  {
    headline: "DATA STAYS ON-PREMISE",
    body: "Verac runs on your servers. Nothing leaves.",
  },
  {
    headline: "20-YEAR MEMORY",
    body: "2 GB of reasoning continuity in a single .amem file",
  },
]

export function ProofSection() {
  return (
    <section className="w-full px-6 pb-14 lg:px-12" aria-label="Proof">
      <SectionRail label="// SECTION: PROOF" step="006" />

      {/* Two-column benchmarks + speed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
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
          <div className="px-4 py-3 space-y-3">
            {benchmarks.map((b) => (
              <div key={b.label} className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-mono text-muted-foreground">{b.label}</span>
                <span className="text-xs font-mono text-muted-foreground/60 italic shrink-0">
                  {b.value}
                </span>
              </div>
            ))}
            <p className="text-[10px] font-mono text-muted-foreground/50 pt-2 border-t border-border/40">
              Graded by Claude (neutral). Methodology published in full.
            </p>
          </div>
        </motion.div>

        {/* Right: Substrate Speed */}
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
          <div className="px-4 py-3 space-y-3">
            {substrateStats.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-mono text-muted-foreground">{s.label}</span>
                <span className="text-sm font-mono font-semibold shrink-0">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Value cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {valueCards.map((card, i) => (
          <motion.div
            key={card.headline}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease, delay: i * 0.08 }}
            className="border-2 border-foreground bg-background p-4"
          >
            <span className="text-sm font-mono font-bold tracking-tight uppercase">
              {card.headline}
            </span>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
              {card.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

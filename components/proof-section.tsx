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
  { label: "Memory: causal traversal", value: "< 1 ms", pct: 1 },
  { label: "Memory: semantic search (100K nodes)", value: "< 10 ms", pct: 10 },
  { label: "Codebase: symbol lookup", value: "14.3 \u00B5s", pct: 0.5 },
  { label: "All MCP p99", value: "< 100 ms", pct: 100 },
]

const valueCards = [
  {
    headline: "LOCAL-FIRST",
    body: "Every model runs on your hardware. Every .amem file lives on your disk. Zero cloud dependency.",
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
          <div className="px-4 py-3 space-y-0">
            {benchmarks.map((b, i) => (
              <div
                key={b.label}
                className={`flex items-center justify-between gap-4 px-3 py-3 border border-border/40 ${
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

        {/* Right: Substrate Speed — visual bar chart */}
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
                {/* Mini bar */}
                <div className="w-full h-1.5 bg-border/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.max(s.pct, 2)}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease,
                      delay: 0.2 + i * 0.1,
                    }}
                  />
                </div>
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

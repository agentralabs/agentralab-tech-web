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
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-[#ea580c]"
    >
      {/* House outline — peaked roof */}
      <path d="M6 22 L24 6 L42 22 L42 42 L6 42 Z" fill="none" />
      {/* Roof peak emphasis */}
      <line x1="6" y1="22" x2="42" y2="22" strokeOpacity="0.3" />
      {/* Server rack shelves inside house */}
      <line x1="14" y1="27" x2="34" y2="27" />
      <line x1="14" y1="33" x2="34" y2="33" />
      <line x1="14" y1="39" x2="34" y2="39" />
      {/* Side rails of rack */}
      <line x1="14" y1="25" x2="14" y2="41" strokeOpacity="0.4" />
      <line x1="34" y1="25" x2="34" y2="41" strokeOpacity="0.4" />
      {/* Blinking activity dot on middle shelf */}
      <circle cx="17" cy="30" r="1.5" fill="#ea580c" stroke="none" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-[#ea580c]"
    >
      {/* Vault door — rounded rectangle */}
      <rect x="6" y="6" width="36" height="36" rx="4" strokeWidth="2.5" />
      {/* Inner border */}
      <rect x="10" y="10" width="28" height="28" rx="2" strokeOpacity="0.3" strokeWidth="1" />
      {/* Combination lock circle */}
      <circle cx="24" cy="24" r="10" strokeWidth="1.5" />
      {/* Tick marks around lock */}
      <line x1="24" y1="14" x2="24" y2="16" strokeWidth="1" />
      <line x1="24" y1="32" x2="24" y2="34" strokeWidth="1" />
      <line x1="14" y1="24" x2="16" y2="24" strokeWidth="1" />
      <line x1="32" y1="24" x2="34" y2="24" strokeWidth="1" />
      <line x1="17" y1="17" x2="18.4" y2="18.4" strokeWidth="1" />
      <line x1="29.6" y1="29.6" x2="31" y2="31" strokeWidth="1" />
      <line x1="31" y1="17" x2="29.6" y2="18.4" strokeWidth="1" />
      <line x1="18.4" y1="29.6" x2="17" y2="31" strokeWidth="1" />
      {/* Keyhole */}
      <circle cx="24" cy="22" r="2" fill="currentColor" />
      <path d="M23 24 L23 28 L25 28 L25 24" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ClockInfinityIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-[#ea580c]"
    >
      {/* Hourglass frame — outer structure */}
      <line x1="12" y1="4" x2="36" y2="4" strokeWidth="2" />
      <line x1="12" y1="44" x2="36" y2="44" strokeWidth="2" />
      {/* Hourglass body — two triangles meeting at waist */}
      <path d="M14 6 L24 22 L34 6" strokeWidth="1.5" />
      <path d="M14 42 L24 26 L34 42" strokeWidth="1.5" />
      {/* Narrow waist connectors */}
      <line x1="14" y1="6" x2="14" y2="4" strokeWidth="1" />
      <line x1="34" y1="6" x2="34" y2="4" strokeWidth="1" />
      <line x1="14" y1="42" x2="14" y2="44" strokeWidth="1" />
      <line x1="34" y1="42" x2="34" y2="44" strokeWidth="1" />
      {/* Sand in top chamber — small area */}
      <path d="M21 15 L24 20 L27 15 Z" fill="#ea580c" fillOpacity="0.3" stroke="none" />
      {/* Sand stream at waist */}
      <line x1="24" y1="22" x2="24" y2="26" stroke="#ea580c" strokeWidth="1" />
      {/* Sand pile in bottom */}
      <path d="M18 39 Q24 33 30 39" fill="#ea580c" fillOpacity="0.5" stroke="none" />
      {/* Falling sand particles */}
      <circle cx="24" cy="29" r="0.8" fill="#ea580c" />
      <circle cx="23" cy="31" r="0.6" fill="#ea580c" fillOpacity="0.7" />
      <circle cx="25" cy="32.5" r="0.7" fill="#ea580c" fillOpacity="0.5" />
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

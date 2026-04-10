"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"

const ease = [0.22, 1, 0.36, 1] as const

/* ── Hydra network SVG ───────────────────────────────────────────── */

function HydraNetworkSVG() {
  /* DNA helix parameters */
  const helixCx = 160
  const helixTopY = 280
  const helixBotY = 120
  const helixAmplitude = 28
  const helixSteps = 40

  /* Generate two sinusoidal helix strands */
  const strand1Points: string[] = []
  const strand2Points: string[] = []
  const rungPairs: { x1: number; y1: number; x2: number; y2: number }[] = []

  for (let i = 0; i <= helixSteps; i++) {
    const t = i / helixSteps
    const y = helixTopY + (helixBotY - helixTopY) * t
    const phase = t * Math.PI * 4
    const x1 = helixCx + Math.sin(phase) * helixAmplitude
    const x2 = helixCx + Math.sin(phase + Math.PI) * helixAmplitude
    strand1Points.push(`${x1},${y}`)
    strand2Points.push(`${x2},${y}`)
    if (i % 5 === 2 && i > 0 && i < helixSteps) {
      rungPairs.push({ x1, y1: y, x2, y2: y })
    }
  }

  const strand1Path = `M ${strand1Points.join(" L ")}`
  const strand2Path = `M ${strand2Points.join(" L ")}`

  /* Branch tips — spread from the top of the helix */
  const branchData = [
    { label: "Memory", tipX: 60, tipY: 30, ctrlX: 100, ctrlY: 60, icon: "brain" },
    { label: "Identity", tipX: 120, tipY: 18, ctrlX: 135, ctrlY: 55, icon: "shield" },
    { label: "Planning", tipX: 170, tipY: 12, ctrlX: 165, ctrlY: 50, icon: "gear" },
    { label: "Contract", tipX: 220, tipY: 22, ctrlX: 195, ctrlY: 55, icon: "doc" },
    { label: "Vision", tipX: 270, tipY: 40, ctrlX: 230, ctrlY: 65, icon: "eye" },
  ]

  return (
    <motion.svg
      viewBox="0 0 320 320"
      fill="none"
      className="w-full max-w-xs mx-auto lg:mx-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Helix rungs — subtle horizontal connectors */}
      {rungPairs.map((r, i) => (
        <motion.line
          key={`rung-${i}`}
          x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke="currentColor" strokeWidth={0.8} strokeOpacity={0.12}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.3, delay: 0.6 + i * 0.08, ease } },
          }}
        />
      ))}

      {/* Helix strand 1 */}
      <motion.path
        d={strand1Path}
        stroke="currentColor" strokeWidth={1.8} strokeOpacity={0.6} fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, delay: 0.1, ease } },
        }}
      />

      {/* Helix strand 2 */}
      <motion.path
        d={strand2Path}
        stroke="currentColor" strokeWidth={1.8} strokeOpacity={0.4} fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, delay: 0.2, ease } },
        }}
      />

      {/* HYDRA label at base of helix */}
      <motion.g
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5, delay: 0.8, ease } },
        }}
      >
        <rect x={helixCx - 28} y={290} width={56} height={18} rx={2} fill="#ea580c" />
        <text x={helixCx} y={302} textAnchor="middle" className="font-mono" fontSize={9} fontWeight={700} fill="#fff">HYDRA</text>
      </motion.g>

      {/* Branches spreading from helix top */}
      {branchData.map((b, i) => (
        <motion.g
          key={b.label}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5, delay: 0.9 + i * 0.12, ease } },
          }}
        >
          {/* Organic branch curve */}
          <path
            d={`M ${helixCx} ${helixBotY} Q ${b.ctrlX} ${b.ctrlY} ${b.tipX} ${b.tipY}`}
            stroke="currentColor" strokeWidth={1.2} strokeOpacity={0.3} fill="none"
          />

          {/* Branch tip icon */}
          <g transform={`translate(${b.tipX - 8}, ${b.tipY - 8})`}>
            {b.icon === "brain" && (
              /* Small brain — curved outline */
              <g stroke="#ea580c" strokeWidth={1.2} fill="none">
                <path d="M8 2 Q14 2 14 8 Q14 14 8 14 Q2 14 2 8 Q2 2 8 2" />
                <path d="M5 6 Q8 4 11 6" strokeWidth={0.8} />
                <path d="M5 10 Q8 8 11 10" strokeWidth={0.8} />
              </g>
            )}
            {b.icon === "shield" && (
              <g stroke="#ea580c" strokeWidth={1.2} fill="none">
                <path d="M8 1 L14 4 L14 9 Q14 14 8 15 Q2 14 2 9 L2 4 Z" />
                <circle cx={8} cy={8} r={2} fill="#ea580c" fillOpacity={0.3} />
              </g>
            )}
            {b.icon === "gear" && (
              <g stroke="#ea580c" strokeWidth={1.2} fill="none">
                <circle cx={8} cy={8} r={3.5} />
                <circle cx={8} cy={8} r={1.5} fill="#ea580c" fillOpacity={0.3} />
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const rad = (angle * Math.PI) / 180
                  return (
                    <line
                      key={angle}
                      x1={8 + Math.cos(rad) * 3.5}
                      y1={8 + Math.sin(rad) * 3.5}
                      x2={8 + Math.cos(rad) * 5.5}
                      y2={8 + Math.sin(rad) * 5.5}
                      strokeWidth={1.5}
                    />
                  )
                })}
              </g>
            )}
            {b.icon === "doc" && (
              <g stroke="#ea580c" strokeWidth={1.2} fill="none">
                <path d="M3 1 L11 1 L13 3 L13 15 L3 15 Z" />
                <line x1={5} y1={5} x2={11} y2={5} strokeWidth={0.8} />
                <line x1={5} y1={8} x2={11} y2={8} strokeWidth={0.8} />
                <line x1={5} y1={11} x2={9} y2={11} strokeWidth={0.8} />
              </g>
            )}
            {b.icon === "eye" && (
              <g stroke="#ea580c" strokeWidth={1.2} fill="none">
                <path d="M1 8 Q8 1 15 8 Q8 15 1 8" />
                <circle cx={8} cy={8} r={3} />
                <circle cx={8} cy={8} r={1} fill="#ea580c" />
              </g>
            )}
          </g>

          {/* Label below icon */}
          <text
            x={b.tipX}
            y={b.tipY + 16}
            textAnchor="middle"
            className="font-mono fill-current"
            fontSize={6}
            fontWeight={600}
            opacity={0.5}
          >
            {b.label}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  )
}

/* ── Stat blocks ─────────────────────────────────────────────────── */

const stats = [
  { value: "68", label: "CRATES" },
  { value: "SELF-WRITING", label: "GENOME" },
  { value: "CONSTITUTIONAL", label: "GOVERNANCE" },
] as const

/* ── Main component ──────────────────────────────────────────────── */

export function HydraSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12 lg:py-28" aria-label="Showcase">
      <SectionRail label="// SECTION: SHOWCASE" step="007" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground"
      >
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row">
          {/* LEFT — SVG visualization (40%) */}
          <div className="lg:w-[40%] bg-background p-6 lg:p-8 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-foreground">
            <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-muted-foreground block mb-3">
              HYDRA.NETWORK
            </span>
            <div className="border border-foreground p-4 bg-background/50 flex-1 flex items-center justify-center">
              <HydraNetworkSVG />
            </div>
          </div>

          {/* RIGHT — Text content (60%) */}
          <div className="lg:w-[60%] bg-background text-foreground">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-foreground">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">
                Hydra
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                Showcase
              </span>
            </div>

            {/* Body */}
            <div className="p-6 lg:p-8 space-y-4">
              <motion.p
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="text-sm font-mono font-semibold leading-relaxed"
              >
                The living proof that the stack composes.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                className="text-xs font-mono text-muted-foreground leading-relaxed max-w-3xl"
              >
                68 Rust crates. Persistent memory via AgenticMemory. Self-writing genome.
                Constitutional governance via AgenticContract. Planning via AgenticPlanning.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease }}
                className="text-xs font-mono text-muted-foreground leading-relaxed max-w-3xl"
              >
                When Hydra needs to reason about supply chain, it calls Solen. When it needs finance,
                it calls Verac. The first customer of the entire stack.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5, ease }}
                className="pt-2"
              >
                <a
                  href="https://github.com/agentralabs/hydra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-foreground px-4 py-2 text-[10px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors"
                >
                  View on GitHub
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stat blocks at bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border-t-2 border-foreground">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease }}
              className="border-2 border-foreground bg-background text-foreground text-center p-4"
            >
              <span className="block text-lg font-mono font-bold tracking-tight text-[#ea580c]">
                {stat.value}
              </span>
              <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

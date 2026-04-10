"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { SectionRail } from "@/components/section-rail"
import { SUBSTRATE_PROJECTS, type SubstrateTier } from "@/lib/substrate"

const ease = [0.22, 1, 0.36, 1] as const

/* ── tier grouping ─────────────────────────────────────────── */

const TIER_ORDER: SubstrateTier[] = ["flagship", "core", "standard", "utility"]

const TIER_LABELS: Record<SubstrateTier, string> = {
  flagship: "FLAGSHIP",
  core: "CORE",
  standard: "STANDARD",
  utility: "UTILITY",
}

function tierRowStyle(tier: SubstrateTier) {
  switch (tier) {
    case "flagship":
      return "font-semibold border-l-2 border-l-[#ea580c]"
    case "core":
      return "font-medium"
    case "standard":
      return "text-muted-foreground"
    case "utility":
      return "text-muted-foreground/60 text-[9px]"
  }
}

/* ── animated counter ──────────────────────────────────────── */

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const spring = useSpring(0, { stiffness: 60, damping: 20 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (isInView) spring.set(value)
  }, [isInView, spring, value])

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return unsubscribe
  }, [display])

  return <span ref={ref}>0{suffix}</span>
}

/* ── constellation SVG ─────────────────────────────────────── */

interface ConstellationNode {
  id: string
  cx: number
  cy: number
  r: number
  glow: boolean
}

const NODES: ConstellationNode[] = [
  // flagship — large, center, glowing
  { id: "Memory", cx: 200, cy: 140, r: 18, glow: true },
  // core — medium
  { id: "Vision", cx: 90, cy: 80, r: 10, glow: false },
  { id: "Codebase", cx: 310, cy: 70, r: 10, glow: false },
  { id: "Identity", cx: 120, cy: 210, r: 10, glow: false },
  // standard — small dots
  { id: "Time", cx: 320, cy: 180, r: 5, glow: false },
  { id: "Contract", cx: 280, cy: 240, r: 5, glow: false },
  { id: "Comm", cx: 60, cy: 160, r: 5, glow: false },
  { id: "Planning", cx: 160, cy: 50, r: 5, glow: false },
  { id: "Cognition", cx: 350, cy: 120, r: 5, glow: false },
  { id: "Reality", cx: 240, cy: 40, r: 5, glow: false },
  { id: "Veritas", cx: 50, cy: 240, r: 4, glow: false },
  { id: "Data", cx: 180, cy: 250, r: 4, glow: false },
  { id: "Workflow", cx: 360, cy: 240, r: 4, glow: false },
  { id: "Connect", cx: 340, cy: 40, r: 4, glow: false },
  // utility — tiny
  { id: "Forge", cx: 30, cy: 40, r: 3, glow: false },
  { id: "Aegis", cx: 380, cy: 200, r: 3, glow: false },
  { id: "Evolve", cx: 100, cy: 270, r: 3, glow: false },
  { id: "SDK", cx: 260, cy: 280, r: 3, glow: false },
]

// edges — connect Memory to every core/standard, and a few cross-links
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], // Memory → core
  [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], // Memory → standard
  [1, 6], [1, 7], // Vision → Comm, Planning
  [2, 8], [2, 9], // Codebase → Cognition, Reality
  [3, 4], [3, 5], // Identity → Time, Contract
  [10, 3], // Veritas → Identity
  [11, 0], // Data → Memory
  [12, 5], // Workflow → Contract
  [13, 8], // Connect → Cognition
]

function ConstellationSVG() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[260px]" aria-hidden="true">
      <defs>
        <filter id="glow-orange">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* edges */}
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={`e-${i}`}
          x1={NODES[a].cx}
          y1={NODES[a].cy}
          x2={NODES[b].cx}
          y2={NODES[b].cy}
          stroke="rgba(234,88,12,0.18)"
          strokeWidth={0.8}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.04, duration: 0.6, ease }}
        />
      ))}

      {/* nodes */}
      {NODES.map((n, i) => (
        <motion.g key={n.id}>
          {/* glow ring for Memory */}
          {n.glow && (
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={n.r + 8}
              fill="none"
              stroke="#ea580c"
              strokeWidth={1.5}
              opacity={0.25}
              filter="url(#glow-orange)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ delay: 0.6, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <motion.circle
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={n.glow ? "#ea580c" : "currentColor"}
            className={n.glow ? "" : "text-background"}
            stroke={n.glow ? "#ea580c" : "rgba(255,255,255,0.5)"}
            strokeWidth={n.r > 6 ? 1.5 : 0.8}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease }}
          />

          {/* label for large + medium nodes */}
          {n.r >= 10 && (
            <motion.text
              x={n.cx}
              y={n.cy + n.r + 14}
              textAnchor="middle"
              className="fill-background/60 text-[9px] font-mono uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
            >
              {n.id}
            </motion.text>
          )}
        </motion.g>
      ))}
    </svg>
  )
}

/* ── main component ────────────────────────────────────────── */

export function SubstrateSummarySection() {
  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    projects: SUBSTRATE_PROJECTS.filter((p) => p.tier === tier),
  }))

  // running index for row numbers
  let runningIndex = 0

  return (
    <section className="w-full px-6 pb-14 lg:px-12" aria-label="Substrate Directory">
      <SectionRail label="// SECTION: SUBSTRATE_DIRECTORY" step="005" />

      <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
        {/* ─── LEFT: visual showcase ─── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="w-full lg:w-1/2 border-2 border-foreground bg-foreground text-background flex flex-col justify-between"
        >
          <div className="px-6 pt-8 pb-4">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50 mb-3">
              Open-Source Substrate
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-none mb-2">
              18 OPEN-SOURCE
              <br />
              SYSTEMS
            </h2>
            <p className="text-sm opacity-60 max-w-xs">
              The substrate your models run on
            </p>
          </div>

          {/* constellation */}
          <div className="px-6 py-4 flex-1 flex items-center justify-center min-h-[220px]">
            <ConstellationSVG />
          </div>

          {/* stats row */}
          <div className="grid grid-cols-3 border-t border-background/20">
            {[
              { value: 147, suffix: "+", label: "MCP tools" },
              { value: 10, suffix: "", label: "file formats" },
              { value: 18, suffix: "", label: "MIT repos" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`px-4 py-4 text-center ${i < 2 ? "border-r border-background/20" : ""}`}
              >
                <span className="block text-xl font-bold font-mono tracking-tight">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="block text-[9px] font-mono tracking-[0.15em] uppercase opacity-50 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-6 py-5 border-t border-background/20">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.14em] uppercase hover:opacity-70 transition-opacity"
            >
              View All Projects
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ─── RIGHT: compact directory table ─── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="w-full lg:w-1/2 border-2 border-foreground bg-background lg:border-l-0"
        >
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-foreground">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
              Substrate Directory
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
              18 MIT
            </span>
          </div>

          {/* column header */}
          <div className="grid grid-cols-[2rem_1fr_4.5rem_2.5rem_1.5rem] gap-1.5 px-4 py-2 border-b border-border text-[10px] font-mono tracking-[0.14em] uppercase text-muted-foreground">
            <span>#</span>
            <span>Project</span>
            <span>Artifact</span>
            <span>Tools</span>
            <span />
          </div>

          {/* grouped rows */}
          {grouped.map(({ tier, projects }) => {
            const startIdx = runningIndex
            runningIndex += projects.length

            return (
              <div key={tier}>
                {/* tier label */}
                <div className="px-4 pt-3 pb-1">
                  <span
                    className={`text-[9px] font-mono tracking-[0.25em] uppercase ${
                      tier === "flagship" || tier === "core"
                        ? "text-[#ea580c]"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {TIER_LABELS[tier]}
                  </span>
                </div>

                {projects.map((project, i) => (
                  <motion.div
                    key={project.key}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.05 * (startIdx + i),
                      duration: 0.35,
                      ease,
                    }}
                    className={`grid grid-cols-[2rem_1fr_4.5rem_2.5rem_1.5rem] gap-1.5 px-4 py-1.5 border-b border-border/40 items-center font-mono text-xs ${tierRowStyle(tier)}`}
                  >
                    <span className="text-[10px] text-muted-foreground">
                      {String(startIdx + i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{project.name}</span>
                    <span className="text-[10px] text-muted-foreground">{project.artifact}</span>
                    <span className="text-[10px]">{project.toolCount}</span>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#ea580c] transition-colors"
                      aria-label={`${project.name} repository`}
                    >
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </motion.div>
                ))}

                {/* divider between tier groups (except last) */}
                {tier !== "utility" && (
                  <div className="border-t border-foreground/10 mx-4" />
                )}
              </div>
            )
          })}

          {/* footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-foreground/20">
            <span className="text-[10px] font-mono text-muted-foreground">
              All open source. Published on crates.io, PyPI, npm.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

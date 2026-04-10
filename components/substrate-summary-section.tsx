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

/* ── Circuit board chip definitions ─────────────────────────── */

const centralChip = { x: 155, y: 110, w: 90, h: 60, label: "MEMORY" }

const coreChips = [
  { x: 40, y: 40, w: 50, h: 30, label: "VIS" },
  { x: 310, y: 40, w: 50, h: 30, label: "CODE" },
  { x: 40, y: 220, w: 50, h: 30, label: "ID" },
  { x: 310, y: 220, w: 50, h: 30, label: "TIME" },
]

/* PCB traces — 90-degree routed paths from central chip to core chips */
const pcbTraces = [
  // MEMORY → VIS (go up then left)
  "M 175 110 L 175 55 L 90 55",
  // MEMORY → CODE (go up then right)
  "M 225 110 L 225 55 L 310 55",
  // MEMORY → ID (go down then left)
  "M 175 170 L 175 235 L 90 235",
  // MEMORY → TIME (go down then right)
  "M 225 170 L 225 235 L 310 235",
]

/* Secondary traces to small unlabeled components */
const secondaryTraces = [
  // From VIS chip going further out
  "M 40 55 L 20 55 L 20 30",
  "M 65 40 L 65 20",
  // From CODE chip going further out
  "M 360 55 L 380 55 L 380 30",
  "M 335 40 L 335 18",
  // From ID chip going further out
  "M 40 235 L 15 235 L 15 265",
  "M 65 250 L 65 275",
  // From TIME chip going further out
  "M 360 235 L 385 235 L 385 268",
  "M 335 250 L 335 278",
  // Cross-bus horizontal from MEMORY
  "M 155 140 L 120 140 L 120 160",
  "M 245 140 L 280 140 L 280 160",
]

/* Via holes (small filled circles at trace intersections) */
const viaHoles = [
  { cx: 175, cy: 55 }, { cx: 225, cy: 55 },
  { cx: 175, cy: 235 }, { cx: 225, cy: 235 },
  { cx: 20, cy: 55 }, { cx: 380, cy: 55 },
  { cx: 15, cy: 235 }, { cx: 385, cy: 235 },
  { cx: 120, cy: 140 }, { cx: 280, cy: 140 },
]

/* Small unlabeled components (tiny rectangles) */
const tinyComponents = [
  { x: 14, y: 18, w: 12, h: 12 },
  { x: 59, y: 12, w: 12, h: 8 },
  { x: 374, y: 18, w: 12, h: 12 },
  { x: 329, y: 10, w: 12, h: 8 },
  { x: 9, y: 265, w: 12, h: 12 },
  { x: 59, y: 275, w: 12, h: 8 },
  { x: 379, y: 268, w: 12, h: 12 },
  { x: 329, y: 278, w: 12, h: 8 },
  { x: 114, y: 160, w: 12, h: 10 },
  { x: 274, y: 160, w: 12, h: 10 },
]

function ConstellationSVG() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[260px]" aria-hidden="true">
      {/* Main bus traces — thick */}
      {pcbTraces.map((d, i) => (
        <motion.path
          key={`trace-${i}`}
          d={d}
          stroke="currentColor"
          strokeWidth={2}
          strokeOpacity={0.35}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease }}
        />
      ))}

      {/* Secondary traces — thin, some dashed */}
      {secondaryTraces.map((d, i) => (
        <motion.path
          key={`sec-${i}`}
          d={d}
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.2}
          fill="none"
          strokeDasharray={i % 3 === 0 ? "4 3" : "none"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.6 + i * 0.05, duration: 0.5, ease }}
        />
      ))}

      {/* Via holes */}
      {viaHoles.map((v, i) => (
        <motion.circle
          key={`via-${i}`}
          cx={v.cx}
          cy={v.cy}
          r={2.5}
          fill="currentColor"
          fillOpacity={0.25}
          stroke="currentColor"
          strokeWidth={0.5}
          strokeOpacity={0.3}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.03, duration: 0.3, ease }}
        />
      ))}

      {/* Tiny unlabeled components */}
      {tinyComponents.map((c, i) => (
        <motion.rect
          key={`comp-${i}`}
          x={c.x}
          y={c.y}
          width={c.w}
          height={c.h}
          stroke="currentColor"
          strokeWidth={0.8}
          strokeOpacity={0.25}
          fill="currentColor"
          fillOpacity={0.04}
          rx={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.04, duration: 0.3, ease }}
        />
      ))}

      {/* Core chips — medium labeled rectangles */}
      {coreChips.map((chip, i) => (
        <motion.g
          key={chip.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
        >
          <rect
            x={chip.x}
            y={chip.y}
            width={chip.w}
            height={chip.h}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeOpacity={0.5}
            fill="currentColor"
            fillOpacity={0.06}
            rx={2}
          />
          {/* Pin marks on edges */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={`pin-${chip.label}-${t}`}
              x1={chip.x + chip.w * t}
              y1={chip.y}
              x2={chip.x + chip.w * t}
              y2={chip.y - 3}
              stroke="currentColor"
              strokeWidth={0.8}
              strokeOpacity={0.2}
            />
          ))}
          <text
            x={chip.x + chip.w / 2}
            y={chip.y + chip.h / 2 + 3}
            textAnchor="middle"
            className="font-mono fill-current"
            fontSize={8}
            fontWeight={600}
            opacity={0.6}
          >
            {chip.label}
          </text>
        </motion.g>
      ))}

      {/* Central MEMORY chip — large, orange border */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease }}
      >
        <rect
          x={centralChip.x}
          y={centralChip.y}
          width={centralChip.w}
          height={centralChip.h}
          stroke="#ea580c"
          strokeWidth={2}
          fill="#ea580c"
          fillOpacity={0.08}
          rx={3}
        />
        {/* Pin marks on top and bottom edges */}
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.85].map((t) => (
          <g key={`cpin-${t}`}>
            <line
              x1={centralChip.x + centralChip.w * t}
              y1={centralChip.y}
              x2={centralChip.x + centralChip.w * t}
              y2={centralChip.y - 4}
              stroke="#ea580c"
              strokeWidth={1}
              strokeOpacity={0.3}
            />
            <line
              x1={centralChip.x + centralChip.w * t}
              y1={centralChip.y + centralChip.h}
              x2={centralChip.x + centralChip.w * t}
              y2={centralChip.y + centralChip.h + 4}
              stroke="#ea580c"
              strokeWidth={1}
              strokeOpacity={0.3}
            />
          </g>
        ))}
        <text
          x={centralChip.x + centralChip.w / 2}
          y={centralChip.y + centralChip.h / 2 + 4}
          textAnchor="middle"
          className="font-mono"
          fontSize={11}
          fontWeight={700}
          fill="#ea580c"
          opacity={0.9}
        >
          {centralChip.label}
        </text>
      </motion.g>
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
    <section className="w-full px-6 py-16 lg:px-12 lg:py-24" aria-label="Substrate Directory">
      <SectionRail label="// SECTION: SUBSTRATE_DIRECTORY" step="005" />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
        {/* ─── LEFT: visual showcase ─── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="w-full lg:w-1/2 border-2 border-foreground bg-background text-foreground flex flex-col justify-between"
        >
          <div className="px-8 lg:px-10 pt-8 lg:pt-10 pb-4">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Open-Source Substrate
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-none mb-2">
              18 OPEN-SOURCE
              <br />
              SYSTEMS
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              The substrate your models run on
            </p>
          </div>

          {/* constellation */}
          <div className="px-8 lg:px-10 py-4 flex-1 flex flex-col min-h-[220px]">
            <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-muted-foreground block mb-2">
              MODULE.GLYPH
            </span>
            <div className="border border-foreground p-4 bg-background/50 flex-1 flex items-center justify-center">
              <ConstellationSVG />
            </div>
          </div>

          {/* stats row */}
          <div className="grid grid-cols-3 border-t border-foreground">
            {[
              { value: 147, suffix: "+", label: "MCP tools" },
              { value: 10, suffix: "", label: "file formats" },
              { value: 18, suffix: "", label: "MIT repos" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`p-4 text-center ${i < 2 ? "border-r border-foreground" : ""}`}
              >
                <span className="block text-xl font-bold font-mono tracking-tight">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="block text-[9px] font-mono tracking-[0.15em] uppercase text-muted-foreground mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-8 lg:px-10 py-5 border-t border-foreground">
            <Link
              href="/projects"
              className="inline-flex items-center gap-0 bg-foreground text-background text-[10px] font-mono tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              <span className="flex items-center justify-center w-8 h-8 bg-[#ea580c]">
                <ArrowUpRight className="h-3.5 w-3.5 text-background" />
              </span>
              <span className="px-4 py-2">View All Projects</span>
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

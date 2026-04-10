"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Star, FileText, Layers } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"
import { MemoryCapacity } from "@/components/memory-capacity"

const ease = [0.22, 1, 0.36, 1] as const

/* ── Cognitive graph SVG ─────────────────────────────────────────── */

const nodes = [
  { id: "decision", label: "DECISION", cx: 260, cy: 120, r: 36, fill: "#ea580c" },
  { id: "fact1", label: "FACT", cx: 100, cy: 60, r: 22, fill: "currentColor" },
  { id: "fact2", label: "FACT", cx: 120, cy: 210, r: 22, fill: "currentColor" },
  { id: "fact3", label: "FACT", cx: 420, cy: 180, r: 22, fill: "currentColor" },
  { id: "correction", label: "CORRECTION", cx: 440, cy: 60, r: 26, fill: "currentColor" },
  { id: "inference", label: "INFERENCE", cx: 300, cy: 260, r: 22, fill: "currentColor" },
] as const

const edges = [
  { from: "fact1", to: "decision", label: "CAUSED_BY" },
  { from: "fact2", to: "decision", label: "CAUSED_BY" },
  { from: "fact3", to: "decision", label: "CAUSED_BY" },
  { from: "correction", to: "decision", label: "SUPERSEDES" },
  { from: "decision", to: "inference", label: "INFERRED" },
] as const

function nodeById(id: string) {
  return nodes.find((n) => n.id === id)!
}

function CognitiveGraph() {
  return (
    <motion.svg
      viewBox="0 0 540 300"
      fill="none"
      className="w-full max-w-2xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Edges */}
      {edges.map((edge, i) => {
        const from = nodeById(edge.from)
        const to = nodeById(edge.to)
        const mx = (from.cx + to.cx) / 2
        const my = (from.cy + to.cy) / 2
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <motion.line
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeOpacity={0.35}
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 0.6, delay: 0.6 + i * 0.12, ease },
                },
              }}
            />
            <motion.text
              x={mx}
              y={my - 6}
              textAnchor="middle"
              className="fill-current font-mono"
              fontSize={8}
              opacity={0.45}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 0.45,
                  transition: { duration: 0.4, delay: 0.9 + i * 0.12, ease },
                },
              }}
            >
              {edge.label}
            </motion.text>
          </g>
        )
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={node.id}
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: i * 0.1, ease },
            },
          }}
          style={{ originX: `${node.cx}px`, originY: `${node.cy}px` }}
        >
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={node.fill}
            fillOpacity={node.id === "decision" ? 1 : 0.12}
            stroke={node.fill}
            strokeWidth={2}
            strokeOpacity={node.id === "decision" ? 1 : 0.5}
          />
          <text
            x={node.cx}
            y={node.cy + 3}
            textAnchor="middle"
            className="font-mono"
            fontSize={node.id === "decision" ? 10 : 8}
            fill={node.id === "decision" ? "#fff" : "currentColor"}
            fontWeight={node.id === "decision" ? 700 : 500}
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  )
}

/* ── Animated count-up ───────────────────────────────────────────── */

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    let frame: number
    const duration = 1200
    const start = performance.now()
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      setCount(Math.round(t * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target])

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </motion.span>
  )
}

/* ── Integration steps ───────────────────────────────────────────── */

const steps = [
  { num: 1, text: "Solen recommends changing suppliers" },
  { num: 2, text: "Memory stores 3 facts, 2 decisions, 1 inference" },
  { num: 3, text: '6 months later: chain is traversable — "why did we switch?"' },
] as const

/* ── Main component ──────────────────────────────────────────────── */

export function MemoryFeatureSection() {
  return (
    <section id="memory" className="w-full px-6 py-16 lg:px-12 lg:py-24">
      <SectionRail label="// SECTION: SUBSTRATE_FLAGSHIP" step="004" />

      {/* Title block with LIVE indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-pixel text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground select-none">
            THE SUBSTRATE STARTS WITH MEMORY
          </h2>
          <span className="flex items-center gap-1.5 shrink-0">
            <motion.span
              className="block w-2 h-2 rounded-full bg-[#ea580c]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#ea580c] uppercase">
              LIVE
            </span>
          </span>
        </div>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
          Every model decision gets remembered. Every reasoning chain is traversable.
        </p>
      </motion.div>

      {/* Cognitive Graph SVG */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-10 border-2 border-foreground p-6"
      >
        <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Cognitive Graph — Causal Memory
        </span>
        <CognitiveGraph />
      </motion.div>

      {/* Memory Capacity component (compact mode) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="mb-4"
      >
        <MemoryCapacity compact={true} />
      </motion.div>

      {/* Animated stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.15, ease }}
        className="flex flex-wrap items-center gap-6 mb-10 border-2 border-foreground px-5 py-4"
      >
        {[
          { target: 147, suffix: " MCP tools", label: "147 MCP tools" },
          { target: 16, suffix: " query types", label: "16 query types" },
        ].map((stat, i) => (
          <span
            key={stat.label}
            className="text-sm font-mono font-semibold tracking-tight text-foreground"
          >
            <CountUp target={stat.target} suffix={stat.suffix} />
          </span>
        ))}
        <span className="text-sm font-mono font-semibold tracking-tight text-[#ea580c]">
          .amem format
        </span>
      </motion.div>

      {/* Integration callout — step-by-step flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="border-2 border-foreground p-6 mb-10"
      >
        <p className="text-sm font-mono font-bold uppercase tracking-tight mb-5">
          How Memory Serves the Models
        </p>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease }}
              className="border-l-2 border-[#ea580c] pl-4 py-2"
            >
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-mono font-bold text-[#ea580c] tracking-widest shrink-0 mt-0.5">
                  STEP {step.num}
                </span>
                <span className="text-xs font-mono text-muted-foreground leading-relaxed">
                  {step.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-[10px] font-mono text-muted-foreground/60 leading-relaxed">
          Nothing was forgotten. Nothing was hallucinated.
        </p>
      </motion.div>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
      >
        <a
          href="https://github.com/agentralabs/agentic-memory"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-0 bg-foreground text-background text-sm font-mono tracking-wider uppercase"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
            <Star size={16} strokeWidth={2} className="text-background" />
          </span>
          <span className="px-5 py-2.5">Star on GitHub</span>
        </a>

        <a
          href="/docs/memory"
          className="group flex items-center gap-0 border border-foreground bg-background text-foreground text-sm font-mono tracking-wider uppercase"
        >
          <span className="flex items-center justify-center w-10 h-10 border-r border-foreground">
            <FileText size={16} strokeWidth={2} />
          </span>
          <span className="px-5 py-2.5">Read the Papers</span>
        </a>

        <a
          href="/scenarios"
          className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors px-4 py-2.5"
        >
          <Layers size={14} strokeWidth={2} />
          <span>See All Scenarios</span>
        </a>
      </motion.div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Star, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"

const ease = [0.22, 1, 0.36, 1] as const

/* ── Cognitive graph SVG — simplified, breathing ────────────────── */

function CognitiveGraph() {
  return (
    <svg viewBox="0 0 480 260" fill="none" className="w-full h-full">
      {/* Edges */}
      <line x1="100" y1="80" x2="240" y2="130" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
      <line x1="140" y1="200" x2="240" y2="130" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
      <line x1="380" y1="180" x2="240" y2="130" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
      <line x1="380" y1="60" x2="240" y2="130" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
      <line x1="240" y1="130" x2="300" y2="230" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" />

      {/* Edge labels */}
      <text x="160" y="95" textAnchor="middle" className="font-mono" fontSize="7" fill="currentColor" opacity="0.3">CAUSED_BY</text>
      <text x="178" y="172" textAnchor="middle" className="font-mono" fontSize="7" fill="currentColor" opacity="0.3">CAUSED_BY</text>
      <text x="320" y="145" textAnchor="middle" className="font-mono" fontSize="7" fill="currentColor" opacity="0.3">CAUSED_BY</text>
      <text x="320" y="85" textAnchor="middle" className="font-mono" fontSize="7" fill="#ea580c" opacity="0.5">SUPERSEDES</text>

      {/* Fact nodes */}
      <circle cx="100" cy="80" r="18" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      <text x="100" y="83" textAnchor="middle" className="font-mono" fontSize="7" fill="currentColor" opacity="0.5">FACT</text>

      <circle cx="140" cy="200" r="18" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      <text x="140" y="203" textAnchor="middle" className="font-mono" fontSize="7" fill="currentColor" opacity="0.5">FACT</text>

      <circle cx="380" cy="180" r="18" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      <text x="380" y="183" textAnchor="middle" className="font-mono" fontSize="7" fill="currentColor" opacity="0.5">FACT</text>

      {/* Correction node */}
      <circle cx="380" cy="60" r="20" fill="currentColor" fillOpacity="0.06" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
      <text x="380" y="57" textAnchor="middle" className="font-mono" fontSize="6.5" fill="#ea580c" opacity="0.6">CORRECT</text>
      <text x="380" y="67" textAnchor="middle" className="font-mono" fontSize="6.5" fill="#ea580c" opacity="0.6">-ION</text>

      {/* Central DECISION node — the hero */}
      <circle cx="240" cy="130" r="32" fill="#ea580c" fillOpacity="0.15" stroke="#ea580c" strokeWidth="2" />
      <circle cx="240" cy="130" r="26" fill="#ea580c" />
      <text x="240" y="127" textAnchor="middle" className="font-mono" fontSize="8" fill="white" fontWeight="700">DECI</text>
      <text x="240" y="137" textAnchor="middle" className="font-mono" fontSize="8" fill="white" fontWeight="700">SION</text>

      {/* Inference node */}
      <circle cx="300" cy="230" r="16" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" />
      <text x="300" y="233" textAnchor="middle" className="font-mono" fontSize="6.5" fill="currentColor" opacity="0.4">INFER</text>
    </svg>
  )
}

/* ── Animated count-up ─────────────────────────────────────────── */

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
      setCount(Math.round(t * t * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target])

  return (
    <motion.span onViewportEnter={() => setStarted(true)} viewport={{ once: true }}>
      {count}{suffix}
    </motion.span>
  )
}

/* ── Main component ────────────────────────────────────────────── */

export function MemoryFeatureSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="memory" className="w-full px-6 py-20 lg:px-12 lg:py-28">
      <SectionRail label="// SECTION: SUBSTRATE_FLAGSHIP" step="004" />

      {/* ── Hero split: Graph left + Copy right ── */}
      <div className="flex flex-col lg:flex-row gap-0 border-2 border-foreground">
        {/* LEFT: Cognitive Graph */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="w-full lg:w-1/2 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground bg-foreground/[0.03] p-6 lg:p-8 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
              cognitive.graph
            </span>
            <span className="flex items-center gap-1.5">
              <motion.span
                className="block w-1.5 h-1.5 bg-[#ea580c]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#ea580c] uppercase">live</span>
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[200px]">
            <CognitiveGraph />
          </div>
          <p className="mt-4 text-[10px] font-mono text-muted-foreground/60 leading-relaxed">
            Every decision traces back to the facts that caused it. Corrections link to what they replaced. Truth has a history.
          </p>
        </motion.div>

        {/* RIGHT: Copy + Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between"
        >
          <div>
            <h2 className="font-pixel text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground select-none">
              MEMORY
            </h2>
            <p className="mt-4 text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Most AI memory is retrieval over flattened text. AgenticMemory is graph cognition — nodes for what the agent learned, edges for why things connect, traversal for reasoning history.
            </p>
            <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
              16 query types. 6 event types. One portable .amem file per agent brain. No cloud database. No vector service. Memory-mappable, offline-capable, and designed for 20 years.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-0 border-2 border-foreground">
            <div className="px-3 py-3 border-r border-foreground">
              <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">MCP Tools</p>
              <p className="text-2xl font-mono font-bold mt-1"><CountUp target={147} /></p>
            </div>
            <div className="px-3 py-3 border-r border-foreground">
              <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">Query Types</p>
              <p className="text-2xl font-mono font-bold mt-1"><CountUp target={16} /></p>
            </div>
            <div className="px-3 py-3">
              <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">Format</p>
              <p className="text-2xl font-mono font-bold text-[#ea580c] mt-1">.amem</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/agentralabs/agentic-memory"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-0 bg-foreground text-background text-[10px] font-mono tracking-wider uppercase"
            >
              <span className="flex items-center justify-center w-8 h-8 bg-[#ea580c]">
                <Star size={12} className="text-background" />
              </span>
              <span className="px-4 py-2">Star on GitHub</span>
            </a>
            <a
              href="/publications"
              className="flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground"
            >
              <FileText size={12} />
              Read the Papers
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Expandable deep dive ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        className="mt-4"
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full border-2 border-foreground p-4 flex items-center justify-between hover:bg-foreground/[0.03] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
              Deep Dive: Query Engine, Event Types, Memory Pipeline
            </span>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground"
          >
            <ArrowRight size={14} className="rotate-90" />
          </motion.span>
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, ease }}
            className="border-2 border-t-0 border-foreground p-6 overflow-hidden"
          >
            <div className="max-w-4xl">
              {/* Import the full MemoryCapacity content here */}
              <MemoryCapacityInline />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── Integration flow ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="mt-8 border-2 border-foreground p-6"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
          How Memory Serves the Models
        </span>
        <div className="mt-5 flex flex-col lg:flex-row gap-4">
          {[
            { step: "01", text: "Solen recommends changing suppliers" },
            { step: "02", text: "Memory stores the reasoning chain — 3 facts, 2 decisions, 1 inference" },
            { step: "03", text: "6 months later: \"why did we switch?\" — the chain is intact" },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.5, ease }}
              className="flex-1 border-l-2 border-[#ea580c] pl-4"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#ea580c] font-bold">
                STEP {s.step}
              </span>
              <p className="mt-1 text-xs font-mono text-muted-foreground leading-relaxed">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-[10px] font-mono text-muted-foreground/60 italic">
          Nothing was forgotten. Nothing was hallucinated.
        </p>
      </motion.div>
    </section>
  )
}

/* ── Inline Memory Capacity (for expandable section) ─────────── */

import { MemoryCapacity } from "@/components/memory-capacity"

function MemoryCapacityInline() {
  return <MemoryCapacity compact={false} />
}

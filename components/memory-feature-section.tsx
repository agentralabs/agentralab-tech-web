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
      {/* Brain folds — subtle gyri background curves */}
      <path d="M160 80 Q200 60 240 75 Q280 90 300 70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" fill="none" />
      <path d="M140 110 Q180 95 220 105 Q260 115 290 100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" fill="none" />
      <path d="M130 140 Q170 130 210 140 Q250 150 280 135" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" fill="none" />
      <path d="M150 165 Q190 155 230 165 Q270 175 300 160" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" fill="none" />
      <path d="M165 190 Q200 180 235 190 Q265 198 285 185" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" fill="none" />

      {/* Brain outline — left-facing profile, anatomical silhouette */}
      <path
        d="M280 45 Q310 50 330 70 Q350 95 345 125 Q340 155 320 175 Q300 195 280 210 Q260 225 235 235 Q210 240 190 235 Q165 228 150 215 Q130 200 120 180 Q110 155 115 130 Q120 105 135 85 Q150 65 175 52 Q200 40 230 40 Q255 40 280 45 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeOpacity="0.9"
      />

      {/* Cerebellum bump */}
      <path
        d="M150 215 Q135 220 128 210 Q120 198 120 180"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeOpacity="0.6"
      />

      {/* Central fissure dividing frontal/parietal */}
      <path d="M240 52 Q235 90 230 130" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" fill="none" />

      {/* Lateral fissure dividing temporal */}
      <path d="M175 130 Q210 140 260 135" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" fill="none" />

      {/* Neural pathway: Frontal to Decision zone */}
      <path d="M200 75 Q210 90 225 100 Q240 108 255 100" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
      {/* Junction nodes on frontal pathway */}
      <circle cx="200" cy="75" r="2.5" fill="#ea580c" fillOpacity="0.8" />
      <circle cx="225" cy="100" r="3" fill="#ea580c" fillOpacity="0.9" />
      <circle cx="255" cy="100" r="2" fill="#ea580c" fillOpacity="0.7" />

      {/* Neural pathway: Temporal to Memory zone */}
      <path d="M185 170 Q200 160 220 165 Q240 170 255 160" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      {/* Junction nodes on temporal pathway */}
      <circle cx="185" cy="170" r="2.5" fill="#ea580c" fillOpacity="0.8" />
      <circle cx="220" cy="165" r="2.5" fill="#ea580c" fillOpacity="0.7" />
      <circle cx="255" cy="160" r="2" fill="#ea580c" fillOpacity="0.6" />

      {/* Neural pathway: Connecting frontal to temporal (CAUSED_BY link) */}
      <path d="M225 100 Q218 125 215 140 Q212 155 220 165" stroke="#ea580c" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 3" fill="none" />
      {/* Mid-junction spark */}
      <circle cx="215" cy="140" r="2" fill="#ea580c" fillOpacity="0.6" />

      {/* Neural pathway: Occipital branch */}
      <path d="M290 110 Q310 130 315 155 Q318 175 300 190" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" fill="none" />
      <circle cx="290" cy="110" r="2" fill="#ea580c" fillOpacity="0.5" />
      <circle cx="315" cy="155" r="2" fill="#ea580c" fillOpacity="0.4" />
      <circle cx="300" cy="190" r="2" fill="#ea580c" fillOpacity="0.5" />

      {/* Neural pathway: Brainstem descending */}
      <path d="M185 170 Q170 190 160 210 Q155 220 160 230" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" fill="none" />
      <circle cx="160" cy="210" r="1.5" fill="#ea580c" fillOpacity="0.4" />

      {/* DECISION label — frontal area */}
      <rect x="165" y="62" width="52" height="14" rx="2" fill="#ea580c" fillOpacity="0.15" />
      <text x="191" y="72" textAnchor="middle" className="font-mono" fontSize="7" fill="#ea580c" fontWeight="700" opacity="0.8">DECISION</text>

      {/* MEMORY label — temporal area */}
      <rect x="157" y="177" width="45" height="14" rx="2" fill="#ea580c" fillOpacity="0.12" />
      <text x="179" y="187" textAnchor="middle" className="font-mono" fontSize="7" fill="#ea580c" fontWeight="700" opacity="0.7">MEMORY</text>

      {/* CAUSED_BY label along connecting pathway */}
      <text x="198" y="135" textAnchor="middle" className="font-mono" fontSize="6" fill="#ea580c" opacity="0.5" transform="rotate(-75 198 135)">CAUSED_BY</text>

      {/* Additional spark dots at key junctions */}
      <circle cx="225" cy="100" r="4.5" fill="none" stroke="#ea580c" strokeWidth="0.8" strokeOpacity="0.3" />
      <circle cx="220" cy="165" r="4" fill="none" stroke="#ea580c" strokeWidth="0.8" strokeOpacity="0.25" />
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
          className="w-full border-2 border-foreground p-5 lg:p-6 flex items-center justify-between hover:bg-foreground/[0.03] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
              Deep Dive: Query Engine, Event Types, Memory Pipeline
            </span>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground flex items-center justify-center w-8 h-8 border border-foreground/20 rounded-full group-hover:border-foreground/40 transition-colors"
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
        className="mt-8 border-2 border-foreground p-6 lg:p-8"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
          How Memory Serves the Models
        </span>
        <div className="mt-5 flex flex-col lg:flex-row gap-6">
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

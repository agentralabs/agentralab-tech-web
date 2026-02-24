"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const ease = [0.22, 1, 0.36, 1] as const

function StatusLine() {
  const [surface, setSurface] = useState("0.0")

  useEffect(() => {
    const interval = setInterval(() => {
      setSurface((Math.random() * 40 + 20).toFixed(1))
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground uppercase font-mono">
      <span className="h-1.5 w-1.5 bg-[#ea580c]" />
      <span>live surface: {surface} active operations</span>
    </div>
  )
}

function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

interface ModuleCard {
  id: string
  frame: string
  value: string
  period: string
  tag: string | null
  description: string
  summary: string
  deepSummary: { lead: string; body: string }[]
  cta: string
  href: string
  scenarioHref: string
  highlighted: boolean
}

const MODULES: ModuleCard[] = [
  {
    id: "agentic-memory",
    frame: "PROJECTS",
    value: "AgenticMemory",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "Your agents forget everything between sessions. AgenticMemory gives them a persistent brain that remembers, corrects, and reasons across conversations.",
    summary:
      "Every fact, decision, and correction is stored as a typed node in a graph — linked by causality and traversable across sessions. Portable .amem files work with any MCP-compatible client.",
    deepSummary: [
      {
        lead: "Cognitive Atom:",
        body: "The memory unit is the cognitive event, so every session yields typed nodes linked to why they were created and what they changed.",
      },
      {
        lead: "Truth Evolution:",
        body: "Corrections supersede prior beliefs, contradictions remain visible, and causality stays traversable across sessions.",
      },
      {
        lead: "16-Query Brain:",
        body: "Traversal, temporal diffs, impact analysis, reasoning gaps, and belief revision run on graph structure instead of flat retrieval.",
      },
      {
        lead: "Asynchronous Formation:",
        body: "Memory writes happen off the response path, so context quality compounds without increasing interaction latency.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-memory",
    scenarioHref: "/projects/scenarios/agentic-memory",
    highlighted: false,
  },
  {
    id: "agentic-vision",
    frame: "PROJECTS",
    value: "AgenticVision",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "Your agents can't see across sessions. AgenticVision gives them persistent visual memory — capture, compare, diff, and search screenshots over time.",
    summary:
      "Every image is embedded with CLIP, stored in a portable .avis file, and queryable by time, content, or visual similarity. Agents can diff UI states, track regressions, and link visual evidence to memory nodes.",
    deepSummary: [
      {
        lead: "Web Cartography:",
        body: "Agents map full domains into queryable graphs through HTTP-first extraction rather than page-by-page browser loops.",
      },
      {
        lead: "Direct Actions:",
        body: "The runtime discovers and executes underlying action surfaces for search, form, and transactional workflows.",
      },
      {
        lead: "Three Directions:",
        body: "Web Compiler, Collective Graph, and Temporal Intelligence compound into a persistent web intelligence layer.",
      },
      {
        lead: "Portable Visual Memory:",
        body: ".avis artifacts remain usable across sessions and MCP clients while preserving timeline continuity.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-vision",
    scenarioHref: "/projects/scenarios/agentic-vision",
    highlighted: true,
  },
  {
    id: "agentic-codebase",
    frame: "PROJECTS",
    value: "AgenticCodebase",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "Your agents grep blindly through files. AgenticCodebase compiles repositories into navigable concept graphs with impact analysis and breakage prediction.",
    summary:
      "Compile any repo into a portable .acb graph. Query symbols, trace dependencies, detect hidden coupling, and predict which changes will break downstream code — before they ship.",
    deepSummary: [
      {
        lead: "Concept Navigation:",
        body: "Semantic compilation turns repositories into concept graphs so architecture is navigated as intentions, not syntax fragments.",
      },
      {
        lead: "Impact Awareness:",
        body: "Before edits land, agents traverse callers, tests, contracts, and downstream paths to expose breakage risk.",
      },
      {
        lead: "Collective Intelligence:",
        body: "Dependencies arrive with pattern knowledge, common failure signatures, and mitigation behavior from ecosystem use.",
      },
      {
        lead: "Code Prophecy:",
        body: "Temporal drift, hidden coupling, and failure trajectories are modeled so migrations can be staged safely.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-codebase",
    scenarioHref: "/projects/scenarios/agentic-codebase",
    highlighted: false,
  },
]

function ModuleGlyph({ id, highlighted }: { id: ModuleCard["id"]; highlighted: boolean }) {
  const baseClass = highlighted ? "text-background/85" : "text-foreground"
  const accentClass = highlighted ? "text-[#fb923c]" : "text-[#ea580c]"

  if (id === "agentic-memory") {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticMemory glyph">
        <circle cx="20" cy="20" r="6" className={accentClass} fill="currentColor" />
        <circle cx="60" cy="16" r="5" className={baseClass} fill="currentColor" />
        <circle cx="96" cy="30" r="6" className={accentClass} fill="currentColor" />
        <circle cx="36" cy="54" r="6" className={baseClass} fill="currentColor" />
        <circle cx="82" cy="58" r="5" className={baseClass} fill="currentColor" />
        <path d="M20 20L60 16L96 30L82 58L36 54L20 20Z" className={baseClass} stroke="currentColor" strokeWidth="2" />
        <path d="M60 16L36 54M96 30L36 54" className={accentClass} stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  if (id === "agentic-vision") {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticVision glyph">
        <ellipse cx="60" cy="40" rx="44" ry="22" className={baseClass} stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="40" r="12" className={accentClass} stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="40" r="4" className={accentClass} fill="currentColor" />
        <path d="M18 40H6M114 40h-12M60 6v12M60 74V62" className={baseClass} stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticCodebase glyph">
      <path d="M24 20L10 40L24 60" className={baseClass} stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M96 20L110 40L96 60" className={baseClass} stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <rect x="42" y="20" width="36" height="40" className={baseClass} stroke="currentColor" strokeWidth="2" />
      <path d="M50 32H70M50 40H70M50 48H64" className={accentClass} stroke="currentColor" strokeWidth="2" />
      <circle cx="78" cy="20" r="3" className={accentClass} fill="currentColor" />
      <circle cx="90" cy="32" r="3" className={accentClass} fill="currentColor" />
      <path d="M78 20L90 32L78 44" className={baseClass} stroke="currentColor" strokeWidth="2" />
      <circle cx="78" cy="44" r="3" className={accentClass} fill="currentColor" />
    </svg>
  )
}

function ModuleCardView({ module, index }: { module: ModuleCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease }}
      className={`flex flex-col h-full min-h-[760px] ${
        module.highlighted
          ? "border-2 border-foreground bg-foreground text-background"
          : "border-2 border-foreground bg-background text-foreground"
      }`}
    >
      <div
        className={`flex items-center justify-between px-5 py-3 border-b-2 ${
          module.highlighted ? "border-background/20" : "border-foreground"
        }`}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono">{module.frame}</span>
        <div className="flex items-center gap-2">
          {module.tag && (
            <span className="bg-[#ea580c] text-background text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono">
              {module.tag}
            </span>
          )}
          <span className="text-[10px] tracking-[0.2em] font-mono opacity-50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="px-5 pt-6 pb-4">
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-3xl lg:text-4xl font-mono font-bold tracking-tight">{module.value}</span>
          <span
            className={`text-xs font-mono tracking-widest uppercase ${
              module.highlighted ? "text-background/50" : "text-muted-foreground"
            }`}
          >
            {module.period}
          </span>
        </div>
        <p
          className={`text-xs font-mono mt-3 leading-relaxed ${
            module.highlighted ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          {module.description}
        </p>
      </div>

      <div
        className={`flex-1 px-5 py-4 border-t-2 ${
          module.highlighted ? "border-background/20" : "border-foreground"
        }`}
      >
        <p
          className={`text-xs font-mono leading-relaxed ${
            module.highlighted ? "text-background/80" : "text-muted-foreground"
          }`}
        >
          {module.summary}
        </p>
        <div className={`mt-4 pt-3 border-t ${module.highlighted ? "border-background/20" : "border-border"} flex flex-col gap-3`}>
          {module.deepSummary.map((line) => (
            <p
              key={`${module.id}-${line.lead}`}
              className={`text-xs font-mono leading-relaxed ${
                module.highlighted ? "text-background/70" : "text-muted-foreground"
              }`}
            >
              <strong>{line.lead}</strong> {line.body}
            </p>
          ))}
        </div>

        <div
          className={`mt-4 border-2 ${
            module.highlighted ? "border-background/20 bg-background/5" : "border-foreground"
          }`}
        >
          <div
            className={`px-3 py-2 border-b ${
              module.highlighted ? "border-background/20" : "border-border"
            } flex items-center justify-between`}
          >
            <span
              className={`text-[10px] tracking-[0.15em] uppercase font-mono ${
                module.highlighted ? "text-background/60" : "text-muted-foreground"
              }`}
            >
              module.glyph
            </span>
            <span
              className={`text-[10px] tracking-[0.15em] uppercase font-mono ${
                module.highlighted ? "text-background/50" : "text-muted-foreground"
              }`}
            >
              {module.value}
            </span>
          </div>
          <div className="px-3 py-2">
            <ModuleGlyph id={module.id} highlighted={module.highlighted} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 flex flex-col gap-2">
        <Link
          href={module.scenarioHref}
          className={`group w-full flex items-center justify-center gap-0 text-xs font-mono tracking-wider uppercase transition-colors ${
            module.highlighted
              ? "border-2 border-background/30 text-background hover:bg-background/10"
              : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
          }`}
        >
          <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
            <Eye size={14} strokeWidth={2} className="text-background" />
          </span>
          <span className="flex-1 py-2.5">SEE IN ACTION</span>
        </Link>
        <motion.a
          href={module.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`group w-full flex items-center justify-center gap-0 text-xs font-mono tracking-wider uppercase ${
            module.highlighted
              ? "bg-background text-foreground"
              : "bg-foreground text-background"
          }`}
        >
          <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
            <ArrowRight size={14} strokeWidth={2} className="text-background" />
          </span>
          <span className="flex-1 py-2.5">{module.cta}</span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export function PricingSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: ECOSYSTEM_MODULES"}
        </span>
        <div className="flex-1 border-t border-border" />
        <BlinkDot />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          006
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground text-balance">
            Explore active components
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
            This open-source lab delivers AgenticMemory, AgenticVision, and AgenticCodebase as interoperable runtime
            components for persistent reasoning, browserless web intelligence, and semantic code navigation via MCP.
          </p>
        </div>
        <StatusLine />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {MODULES.map((module, i) => (
          <ModuleCardView key={module.id} module={module} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease }}
        className="flex items-center gap-3 mt-6"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {
            "* Open-source lab note: AgenticMemory turns memory into graph navigation, AgenticVision turns the web into a queryable memory surface, and AgenticCodebase turns codebases into predictive concept graphs."
          }
        </span>
        <div className="flex-1 border-t border-border" />
      </motion.div>
    </section>
  )
}

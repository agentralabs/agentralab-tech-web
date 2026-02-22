"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const ease = [0.22, 1, 0.36, 1] as const

interface Paper {
  title: string
  project: "AgenticMemory" | "AgenticVision" | "AgenticCodebase"
  type: string
  summary: string
  pdf: string
  source: string
}

const PAPERS: Paper[] = [
  {
    title: "AgenticMemory: A Binary Graph Format for Persistent, Portable, and Navigable AI Agent Memory",
    project: "AgenticMemory",
    type: "Paper I",
    summary: "Defines a portable binary graph format for persistent AI-agent memory.",
    pdf: "https://github.com/agentralabs/agentic-memory/blob/main/paper/paper-i-format/agenticmemory-paper.pdf",
    source: "https://github.com/agentralabs/agentic-memory/blob/main/paper/paper-i-format/agenticmemory-paper.tex",
  },
  {
    title: "AgenticMemory II: Nine Cognitive Query Types for Graph-Structured Agent Memory",
    project: "AgenticMemory",
    type: "Paper II",
    summary: "Extends memory with cognitive query capabilities and expanded retrieval logic.",
    pdf: "https://github.com/agentralabs/agentic-memory/blob/main/paper/paper-ii-query-expansion/agenticmemory-query-expansion.pdf",
    source:
      "https://github.com/agentralabs/agentic-memory/blob/main/paper/paper-ii-query-expansion/agenticmemory-query-expansion.tex",
  },
  {
    title: "AgenticMemory MCP: Bridging Persistent Cognitive Graph Memory to LLM Agents via the Model Context Protocol",
    project: "AgenticMemory",
    type: "Paper III",
    summary: "Connects persistent memory infrastructure to agent tooling through MCP.",
    pdf: "https://github.com/agentralabs/agentic-memory/blob/main/paper/paper-iii-mcp-server/agentic-memory-mcp-paper.pdf",
    source:
      "https://github.com/agentralabs/agentic-memory/blob/main/paper/paper-iii-mcp-server/agentic-memory-mcp-paper.tex",
  },
  {
    title: "Cortex: Rapid Web Cartography for AI Agents via Structured Data Extraction and Binary Graph Navigation",
    project: "AgenticVision",
    type: "Paper I",
    summary: "Describes rapid web cartography and structured extraction for agent workflows.",
    pdf: "https://github.com/agentralabs/agentic-vision/blob/main/publication/paper-i-cortex/cortex-paper.pdf",
    source: "https://github.com/agentralabs/agentic-vision/blob/main/publication/paper-i-cortex/cortex-paper.tex",
  },
  {
    title: "AgenticVision-MCP: Persistent Visual Memory for AI Agents via the Model Context Protocol",
    project: "AgenticVision",
    type: "Paper II",
    summary: "Formalizes persistent visual memory workflows delivered through MCP interfaces.",
    pdf: "https://github.com/agentralabs/agentic-vision/blob/main/publication/paper-ii-agentic-vision-mcp/agentic-vision-mcp-paper.pdf",
    source:
      "https://github.com/agentralabs/agentic-vision/blob/main/publication/paper-ii-agentic-vision-mcp/agentic-vision-mcp-paper.tex",
  },
  {
    title: "AgenticCodebase: A Semantic Code Compiler for Navigable, Predictive, and Collective Code Intelligence",
    project: "AgenticCodebase",
    type: "Paper I",
    summary: "Introduces semantic code compilation for navigable and predictive code intelligence.",
    pdf: "https://github.com/agentralabs/codebase/blob/main/paper/paper-i-semantic-compiler/agenticcodebase-paper.pdf",
    source:
      "https://github.com/agentralabs/codebase/blob/main/paper/paper-i-semantic-compiler/agenticcodebase-paper.tex",
  },
]

function SectionRail({ label, step }: { label: string; step: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease }}
      className="flex items-center gap-4 mb-8"
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{label}</span>
      <div className="flex-1 border-t border-border" />
      <span className="h-1.5 w-1.5 bg-[#ea580c]" />
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{step}</span>
    </motion.div>
  )
}

function PaperCard({ paper, index }: { paper: Paper; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease }}
      className="border-b border-border py-4 last:border-b-0"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">{paper.project}</span>
        <span className="h-1 w-1 bg-[#ea580c]" />
        <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">{paper.type}</span>
      </div>
      <h3 className="mt-2 text-sm lg:text-base font-mono font-bold leading-relaxed">{paper.title}</h3>
      <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">{paper.summary}</p>
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <a
          href={paper.pdf}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-0 bg-foreground text-background text-[10px] font-mono tracking-wider uppercase"
        >
          <span className="flex items-center justify-center w-8 h-8 bg-[#ea580c]">
            <ArrowRight size={12} strokeWidth={2} className="text-background" />
          </span>
          <span className="px-4 py-2">Read PDF</span>
        </a>
        <a
          href={paper.source}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground"
        >
          View Source (TeX)
        </a>
      </div>
    </motion.article>
  )
}

function GroupBlock({ project, step }: { project: Paper["project"]; step: string }) {
  const papers = PAPERS.filter((paper) => paper.project === project)

  return (
    <section className="w-full px-6 pb-14 lg:px-12">
      <SectionRail label={`// SECTION: ${project.toUpperCase()}_PAPERS`} step={step} />
      <div className="border-2 border-foreground">
        <div className="px-5 py-3 border-b-2 border-foreground flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">archive.index</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{project}</span>
        </div>
        <div className="px-5 py-2">
          {papers.map((paper, index) => (
            <PaperCard key={paper.title} paper={paper} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function PublicationsPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: PUBLICATIONS_INDEX" step="013" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="border-2 border-foreground p-6 lg:p-8"
          >
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">
              Publications and technical papers
            </h1>
            <p className="mt-4 max-w-3xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Research corpus for AgenticMemory, AgenticVision, and AgenticCodebase. Each paper documents core
              architecture decisions, data formats, and MCP integration pathways.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-foreground">
              <div className="px-4 py-3 border-b-2 sm:border-b-0 sm:border-r-2 border-foreground">
                <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">Total Papers</p>
                <p className="text-2xl font-mono font-bold">6</p>
              </div>
              <div className="px-4 py-3 border-b-2 sm:border-b-0 sm:border-r-2 border-foreground">
                <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">Projects</p>
                <p className="text-2xl font-mono font-bold">3</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">Open Access</p>
                <p className="text-2xl font-mono font-bold">100%</p>
              </div>
            </div>
          </motion.div>
        </section>

        <GroupBlock project="AgenticMemory" step="014" />
        <GroupBlock project="AgenticVision" step="015" />
        <GroupBlock project="AgenticCodebase" step="016" />

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: RESEARCH_DIRECTION" step="017" />
          <div className="border-2 border-foreground">
            <div className="px-5 py-3 border-b-2 border-foreground">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                ongoing.research
              </span>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="border-2 border-foreground p-4">
                <h3 className="text-sm font-mono font-bold uppercase">Web Compiler</h3>
                <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
                  Compile mapped websites into typed APIs so agents import domains as libraries instead of browsing
                  page-by-page workflows.
                </p>
              </div>
              <div className="border-2 border-foreground p-4">
                <h3 className="text-sm font-mono font-bold uppercase">Collective Graph</h3>
                <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
                  Delta-sharing architecture where each mapped site can reduce duplicate remapping and give new agents
                  warm-start context.
                </p>
              </div>
              <div className="border-2 border-foreground p-4">
                <h3 className="text-sm font-mono font-bold uppercase">Temporal Intelligence</h3>
                <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
                  Historical delta stacks for pattern detection, trend modeling, predictive alerts, and web-state
                  memory over time.
                </p>
              </div>
            </div>
            <div className="px-5 py-4 border-t-2 border-foreground flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
                Open to research collaboration and sponsorship support.
              </span>
              <a
                href="mailto:contact@agentralabs.tech"
                className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground"
              >
                contact@agentralabs.tech
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

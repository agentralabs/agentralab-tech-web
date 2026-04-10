"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Star } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { ModelDetail } from "@/components/model-detail"
import { MemoryCapacity } from "@/components/memory-capacity"
import { SUBSTRATE_PROJECTS } from "@/lib/substrate"
import { CollaborationCtaSection } from "@/components/collaboration-cta-section"

const ease = [0.22, 1, 0.36, 1] as const

export default function ProjectsPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: ECOSYSTEM_PROJECTS" step="009" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="border-2 border-foreground p-6 lg:p-8"
          >
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">
              The Agentra Stack
            </h1>
            <p className="mt-4 max-w-3xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Domain-specialist models on open-source infrastructure. Every decision auditable. Reasoning, substrate, and settlement — three layers, one stack.
            </p>
          </motion.div>
        </section>

        {/* Models */}
        <section id="models" className="w-full px-6 pb-14 lg:px-12">
          <SectionRail label="// SECTION: REASONING_LAYER" step="010" />
          <div className="mb-4">
            <h2 className="text-xl lg:text-2xl font-mono font-bold uppercase tracking-tight">Reasoning Layer</h2>
            <p className="mt-2 text-xs font-mono text-muted-foreground">Domain-specialist open-weight fine-tunes. Apache 2.0.</p>
          </div>
          <ModelDetail />
        </section>

        {/* Memory */}
        <section id="memory" className="w-full px-6 pb-14 lg:px-12">
          <SectionRail label="// SECTION: SUBSTRATE_FLAGSHIP" step="011" />
          <div className="mb-4">
            <h2 className="text-xl lg:text-2xl font-mono font-bold uppercase tracking-tight">
              The Substrate Starts With Memory
            </h2>
            <p className="mt-2 text-xs font-mono text-muted-foreground">
              Every model decision gets remembered. Every reasoning chain is traversable.
            </p>
          </div>
          <div className="border-2 border-foreground">
            <div className="flex flex-col lg:flex-row">
              {/* Sidebar */}
              <div className="w-full lg:w-[220px] border-b-2 lg:border-b-0 lg:border-r-2 border-foreground p-4 flex flex-col gap-3">
                <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">active.project</p>
                <h3 className="text-xl font-mono font-bold uppercase">AgenticMemory</h3>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  Persistent cognitive graph memory for cross-session reasoning continuity.
                </p>
                <div className="text-[10px] font-mono text-muted-foreground space-y-1 mt-2">
                  <p>147 MCP tools</p>
                  <p>Portable artifact: .amem</p>
                </div>
                <a href="https://github.com/agentralabs/agentic-memory" target="_blank" rel="noreferrer"
                  className="mt-3 flex items-center gap-0 bg-foreground text-background text-[10px] font-mono tracking-wider uppercase">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#ea580c]">
                    <ArrowRight size={12} className="text-background" />
                  </span>
                  <span className="px-4 py-2">View Repo</span>
                </a>
                <a href="https://github.com/agentralabs/agentic-memory" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground">
                  <Star size={12} /> Star on GitHub
                </a>
              </div>
              {/* Right: Memory deep dive */}
              <div className="flex-1 p-4">
                <MemoryCapacity compact={false} />
              </div>
            </div>
          </div>
          {/* Integration callout */}
          <div className="mt-4 border-2 border-foreground p-4">
            <p className="text-sm font-mono font-bold uppercase tracking-tight">How Memory Serves The Models</p>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
              Solen recommends changing suppliers. Memory stores the reasoning chain — 3 facts, 2 decisions, 1 inference. Six months later, when someone asks "why did we switch?", the chain is traversable. Nothing was forgotten. Nothing was hallucinated.
            </p>
          </div>
        </section>

        {/* Substrate Directory */}
        <section className="w-full px-6 pb-14 lg:px-12">
          <SectionRail label="// SECTION: SUBSTRATE_DIRECTORY" step="012" />
          <div className="border-2 border-foreground">
            <div className="px-5 py-3 border-b-2 border-foreground flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">substrate directory</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">18 MIT</span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-[50px_1fr_80px_80px_50px] border-b border-foreground">
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">#</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Project</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Artifact</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Tools</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground"></span>
                </div>
                {SUBSTRATE_PROJECTS.map((p, i) => (
                  <div
                    key={p.key}
                    className={`grid grid-cols-[50px_1fr_80px_80px_50px] border-b border-border last:border-b-0 ${
                      p.tier === "flagship" ? "border-l-2 border-l-[#ea580c]" : ""
                    } ${p.tier === "utility" ? "text-muted-foreground/60" : ""}`}
                  >
                    <span className="px-3 py-2 text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`px-3 py-2 text-xs font-mono ${p.tier === "flagship" ? "font-bold" : ""}`}>{p.name}</span>
                    <span className="px-3 py-2 text-xs font-mono text-muted-foreground">{p.artifact}</span>
                    <span className="px-3 py-2 text-xs font-mono text-muted-foreground">{p.toolCount}</span>
                    <a href={p.repo} target="_blank" rel="noreferrer" className="px-3 py-2 text-xs font-mono hover:text-[#ea580c]">
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 py-3 border-t border-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
                All open source. MIT licensed. Published on crates.io, PyPI, npm.
              </span>
            </div>
          </div>
        </section>

        {/* Hydra */}
        <section className="w-full px-6 pb-14 lg:px-12">
          <SectionRail label="// SECTION: SHOWCASE" step="013" />
          <div className="border-2 border-foreground">
            <div className="px-5 py-3 border-b-2 border-foreground flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Hydra</span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">showcase</span>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm font-mono font-bold uppercase">The living proof that the stack composes.</p>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                68 Rust crates. Persistent memory via AgenticMemory. Self-writing genome. Constitutional governance via AgenticContract.
                When Hydra needs to reason about supply chain, it calls Solen. When it needs finance, it calls Verac. The first customer of the entire stack.
              </p>
              <a href="https://github.com/agentralabs/hydra" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1 border border-foreground px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors">
                View on GitHub <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </section>

        {/* Settlement */}
        <section className="w-full px-6 pb-14 lg:px-12">
          <SectionRail label="// SECTION: SETTLEMENT_LAYER" step="014" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border-2 border-foreground p-4">
              <h3 className="text-base font-mono font-bold uppercase tracking-tight">XAP Protocol</h3>
              <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
                Six-primitive open economic protocol for autonomous agent commerce. 115 validation tests. Draft v0.2. MIT.
              </p>
              <a href="https://github.com/agentra-commerce/xap-protocol" target="_blank" rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">
                View Repo <ArrowUpRight size={12} />
              </a>
            </div>
            <div className="border-2 border-foreground p-4">
              <h3 className="text-base font-mono font-bold uppercase tracking-tight">Verity Engine</h3>
              <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
                Open truth engine. 5 Rust crates. Deterministic replay of every settlement decision. MIT.
              </p>
              <a href="https://github.com/agentra-commerce/verity-engine" target="_blank" rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">
                View Repo <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </section>

        <CollaborationCtaSection />
      </main>
      <Footer />
    </div>
  )
}

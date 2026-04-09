"use client"

import { ArrowRight, Star, FileText, Layers } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"
import { MemoryCapacity } from "@/components/memory-capacity"

const ease = [0.22, 1, 0.36, 1] as const

export function MemoryFeatureSection() {
  return (
    <section id="memory" className="w-full px-6 py-16 lg:px-12 lg:py-24">
      <SectionRail label="// SECTION: SUBSTRATE_FLAGSHIP" step="004" />

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-10"
      >
        <h2 className="font-pixel text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground mb-3 select-none">
          THE SUBSTRATE STARTS WITH MEMORY
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
          Every model decision gets remembered. Every reasoning chain is traversable.
        </p>
      </motion.div>

      {/* Memory Capacity component (compact mode) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="mb-10"
      >
        <MemoryCapacity compact={true} />
      </motion.div>

      {/* Integration callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="border-2 border-foreground p-6 mb-10"
      >
        <p className="text-sm font-mono font-bold uppercase tracking-tight mb-3">
          How Memory Serves the Models
        </p>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed max-w-3xl">
          Solen recommends changing suppliers. Memory stores the reasoning chain — 3 facts, 2 decisions,
          1 inference. Six months later, when someone asks &ldquo;why did we switch?&rdquo;, the chain is
          traversable. Nothing was forgotten. Nothing was hallucinated.
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

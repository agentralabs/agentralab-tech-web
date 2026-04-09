"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"

const ease = [0.22, 1, 0.36, 1] as const

export function HydraSection() {
  return (
    <section className="w-full px-6 pb-14 lg:px-12" aria-label="Showcase">
      <SectionRail label="// SECTION: SHOWCASE" step="007" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground bg-foreground text-background"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-background/20">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">
            Hydra
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-background/60">
            Showcase
          </span>
        </div>

        {/* Body */}
        <div className="px-4 py-5 lg:px-6 lg:py-6 space-y-4">
          <p className="text-sm font-mono font-semibold leading-relaxed">
            The living proof that the stack composes.
          </p>

          <p className="text-xs font-mono text-background/70 leading-relaxed max-w-3xl">
            68 Rust crates. Persistent memory via AgenticMemory. Self-writing genome.
            Constitutional governance via AgenticContract. Planning via AgenticPlanning.
          </p>

          <p className="text-xs font-mono text-background/70 leading-relaxed max-w-3xl">
            When Hydra needs to reason about supply chain, it calls Solen. When it needs finance,
            it calls Verac. The first customer of the entire stack.
          </p>

          <div className="pt-2">
            <a
              href="https://github.com/agentralabs/hydra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-background/40 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.14em] hover:bg-background hover:text-foreground transition-colors"
            >
              View on GitHub
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

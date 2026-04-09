"use client"

import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"

const ease = [0.22, 1, 0.36, 1] as const

function Connector({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center py-3">
      <div className="w-px h-6 bg-foreground" />
      <span className="text-[10px] font-mono text-muted-foreground tracking-wider py-1.5">{text}</span>
      <div className="w-px h-6 bg-foreground" />
    </div>
  )
}

export function StackDiagramSection() {
  return (
    <section className="w-full px-6 py-16 lg:px-12 lg:py-24">
      <SectionRail label="// SECTION: THE_STACK" step="002" />

      <div className="max-w-3xl mx-auto flex flex-col items-stretch">
        {/* Layer 1: Reasoning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="border-2 border-foreground p-5"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Layer 1
          </p>
          <p className="text-sm font-mono font-bold uppercase tracking-tight mb-1">
            Reasoning
          </p>
          <p className="text-sm font-mono text-[#ea580c] tracking-[0.15em] mb-2">
            Solen &middot; Verac &middot; Axiom
          </p>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Domain-specialist Gemma 4 fine-tunes. Apache 2.0.
          </p>
        </motion.div>

        {/* Connector 1 */}
        <Connector text="outputs reasoning + calibrated recommendation" />

        {/* Layer 2: Substrate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="border-2 border-foreground p-5"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Layer 2
          </p>
          <p className="text-sm font-mono font-bold uppercase tracking-tight mb-1">
            Substrate
          </p>
          <div className="flex items-center gap-3 mb-2">
            <span className="border-l-2 border-[#ea580c] pl-2 text-sm font-mono font-bold">
              AgenticMemory
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              and 17 open-source sisters
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Persistent memory, identity, governance. MIT.
          </p>
        </motion.div>

        {/* Connector 2 */}
        <Connector text="produces a governed action with provenance" />

        {/* Layer 3: Settlement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="border-2 border-foreground p-5"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Layer 3
          </p>
          <p className="text-sm font-mono font-bold uppercase tracking-tight mb-1">
            Settlement
          </p>
          <p className="text-sm font-mono text-[#ea580c] tracking-[0.15em] mb-2">
            XAP Protocol &middot; Verity Engine
          </p>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Deterministic replay. Auditable. MIT.
          </p>
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-12 text-xl sm:text-2xl lg:text-3xl font-pixel text-foreground text-center leading-snug select-none"
        >
          The only stack where a domain-specialist AI can make decisions a regulator can audit.
        </motion.blockquote>
      </div>
    </section>
  )
}

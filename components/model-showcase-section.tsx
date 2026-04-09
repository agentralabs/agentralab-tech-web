"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"
import { MODELS, TRAINING_CATEGORIES } from "@/lib/models"

const ease = [0.22, 1, 0.36, 1] as const

export function ModelShowcaseSection() {
  return (
    <section id="models" className="w-full px-6 py-16 lg:px-12 lg:py-24">
      <SectionRail label="// SECTION: MODELS" step="003" />

      {/* Model cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
        {MODELS.map((model, i) => (
          <motion.div
            key={model.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="border-2 border-foreground p-5 flex flex-col"
          >
            <p className="text-xl font-mono font-bold uppercase tracking-tight mb-1">
              {model.name}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {model.domain}
            </p>

            <div className="border-t border-border pt-3 mb-3">
              <p className="text-xs font-mono text-muted-foreground">
                Powers: <span className="text-foreground font-bold">{model.powers}</span>
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                Base: {model.base} &middot; License: {model.license}
              </p>
            </div>

            <p className="text-xs font-mono text-muted-foreground leading-relaxed flex-1 mb-4">
              {model.description}
            </p>

            <a
              href={model.hfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ea580c] hover:text-foreground transition-colors mt-auto"
            >
              <ArrowRight size={14} strokeWidth={2} />
              <span>View on HuggingFace</span>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Specialist argument */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="border-2 border-foreground p-6"
      >
        <p className="text-sm font-mono font-bold uppercase tracking-tight mb-3">
          The Specialist Argument
        </p>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed mb-5 max-w-3xl">
          Nobody hires a generalist lawyer to argue a patent case. These models are trained on reasoning
          processes, not questions and answers.
        </p>

        <div className="flex flex-wrap gap-2">
          {TRAINING_CATEGORIES.map((cat) => (
            <span
              key={cat.name}
              className="border border-foreground px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

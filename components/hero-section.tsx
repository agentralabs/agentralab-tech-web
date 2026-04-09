"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  return (
    <section className="relative w-full px-6 pt-6 pb-16 lg:px-12 lg:pt-10 lg:pb-24">
      <div className="flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="font-pixel text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-foreground mb-2 select-none"
        >
          DOMAIN AI THAT REASONS.
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="font-pixel text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-foreground mb-6 select-none"
          aria-hidden="true"
        >
          INFRASTRUCTURE THAT REMEMBERS.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="text-sm lg:text-base text-foreground max-w-2xl mb-3 leading-relaxed font-mono font-bold"
        >
          Your AI guesses. Ours reasons like a 30-year domain expert — and remembers every decision it ever made.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42, ease }}
          className="text-xs lg:text-sm text-muted-foreground max-w-2xl mb-3 leading-relaxed font-mono"
        >
          Three domain-specialist models. Open-source substrate. Auditable settlement.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48, ease }}
          className="text-sm lg:text-base text-[#ea580c] font-mono tracking-[0.3em] font-bold mb-8"
        >
          SOLEN &middot; VERAC &middot; AXIOM
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <motion.a
            href="#models"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-0 bg-foreground text-background text-sm font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
              <ArrowRight size={16} strokeWidth={2} className="text-background" />
            </span>
            <span className="px-5 py-2.5">Meet the Models</span>
          </motion.a>

          <motion.a
            href="/docs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-0 border border-foreground bg-background text-foreground text-sm font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-10 h-10 border-r border-foreground">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
            <span className="px-5 py-2.5">Run Quickstart</span>
          </motion.a>

          <motion.a
            href="/partners"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease }}
            className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors px-4 py-2.5"
          >
            Collaborate
          </motion.a>
        </div>
      </div>
    </section>
  )
}

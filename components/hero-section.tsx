"use client"

import { WorkflowDiagram } from "@/components/workflow-diagram"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { QuickstartTerminalPane } from "@/components/quickstart-terminal-pane"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  return (
    <section className="relative w-full px-12 pt-6 pb-12 lg:px-24 lg:pt-10 lg:pb-16">
      <div className="flex flex-col items-center text-center">
        {/* Top headline: DEPLOY. SCALE. -- Geist Pixel Grid */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground mb-2 select-none"
        >
          REMEMBER. SEE. PROVE.
        </motion.h1>

        {/* Central Workflow Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="w-full max-w-2xl my-4 lg:my-6"
        >
          <WorkflowDiagram />
        </motion.div>

        {/* Bottom headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground mb-4 select-none"
          aria-hidden="true"
        >
          UNDERSTAND.
        </motion.h1>

        {/* Pain-point hook */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="text-sm lg:text-base text-foreground max-w-2xl mb-2 leading-relaxed font-mono font-bold"
        >
          Your AI forgets you exist. Ours remembers for 20 years.
        </motion.p>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52, ease }}
          className="text-xs lg:text-sm text-muted-foreground max-w-2xl mb-2 leading-relaxed font-mono"
        >
          Seven open-source systems. Seven file formats. Forever yours.
        </motion.p>

        {/* File format strip */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.56, ease }}
          className="text-xs text-[#ea580c] font-mono tracking-[0.3em] mb-6"
        >
          .amem &middot; .avis &middot; .acb &middot; .aid &middot; .atime &middot; .acon &middot; .acomm
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <motion.a
            href="#quickstart-pane"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-0 bg-foreground text-background text-sm font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
              <motion.span
                className="inline-flex"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowRight size={16} strokeWidth={2} className="text-background" />
              </motion.span>
            </span>
            <span className="px-5 py-2.5">Run Quickstart</span>
          </motion.a>

          <motion.a
            href="/partners"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.68, ease }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-0 border border-foreground bg-background text-foreground text-sm font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-10 h-10 border-r border-foreground bg-background">
              <ArrowRight size={16} strokeWidth={2} className="text-foreground" />
            </span>
            <span className="px-5 py-2.5">Collaborate</span>
          </motion.a>
        </div>

        <QuickstartTerminalPane />
      </div>
    </section>
  )
}

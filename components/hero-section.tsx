"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

/* ------------------------------------------------------------------ */
/*  Floating mesh — 10 small dots that drift slowly behind the hero   */
/* ------------------------------------------------------------------ */
const meshDots = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: 2 + (i % 3),                         // 2-4 px
  left: `${8 + i * 9}%`,                     // spread across width
  top: `${10 + ((i * 17) % 70)}%`,           // pseudo-random vertical
  opacity: 0.15 + (i % 3) * 0.07,            // 0.15 - 0.29
  duration: 5 + (i % 4) * 1.5,               // 5 - 9.5 s
  delay: i * 0.4,
  drift: 14 + (i % 5) * 4,                   // y-travel 14-30 px
}))

function FloatingMesh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {meshDots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-current"
          style={{
            width: d.size,
            height: d.size,
            left: d.left,
            top: d.top,
            opacity: d.opacity,
          }}
          animate={{ y: [0, -d.drift, 0] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Staggered character reveal for "SOLEN . VERAC . AXIOM"           */
/* ------------------------------------------------------------------ */
const modelText = "SOLEN \u00B7 VERAC \u00B7 AXIOM"

const charContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.48 },
  },
}

const charVariant = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
export function HeroSection() {
  return (
    <section className="relative w-full px-6 pt-6 pb-16 lg:px-12 lg:pt-10 lg:pb-24 overflow-hidden">
      {/* background mesh */}
      <FloatingMesh />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* headline 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="font-pixel text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-foreground mb-2 select-none"
        >
          DOMAIN AI THAT REASONS.
        </motion.h1>

        {/* pulsing orange dot between headlines */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.12, ease }}
          className="h-2 w-2 rounded-full bg-[#ea580c] animate-blink my-1"
          aria-hidden
        />

        {/* headline 2 */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="font-pixel text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-foreground mb-6 select-none"
          aria-hidden="true"
        >
          INFRASTRUCTURE THAT REMEMBERS.
        </motion.h1>

        {/* hook */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="text-sm lg:text-base text-foreground max-w-2xl mb-3 leading-relaxed font-mono font-bold"
        >
          Your AI guesses. Ours reasons like a 30-year domain expert — and remembers every decision it ever made.
        </motion.p>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42, ease }}
          className="text-xs lg:text-sm text-muted-foreground max-w-2xl mb-3 leading-relaxed font-mono"
        >
          Three domain-specialist models. Open-source infrastructure. Every decision verifiable.
        </motion.p>

        {/* animated line under subtitle */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="h-px w-full max-w-2xl bg-foreground/20 origin-left mb-4"
          aria-hidden
        />

        {/* staggered model names */}
        <motion.p
          variants={charContainer}
          initial="hidden"
          animate="visible"
          className="text-sm lg:text-base text-[#ea580c] font-mono tracking-[0.3em] font-bold mb-8 select-none"
          aria-label={modelText}
        >
          {modelText.split("").map((ch, i) => (
            <motion.span key={i} variants={charVariant} className="inline-block">
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.p>

        {/* CTAs — all three in the same frame style */}
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-0 border border-foreground bg-background text-foreground text-sm font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-10 h-10 border-r border-foreground">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
            <span className="px-5 py-2.5">Collaborate</span>
          </motion.a>
        </div>

        {/* Compact terminal pane — models + memory commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="w-full max-w-3xl mt-10 border-2 border-foreground"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-foreground bg-foreground/[0.03]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
            </div>
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
              quickstart.terminal
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-foreground text-background p-4 font-mono text-xs leading-relaxed space-y-3 max-h-[200px] overflow-y-auto">
            <div>
              <span className="text-[#ea580c]">{"# Install AgenticMemory"}</span>
              <p className="text-background/70 mt-1">{">"} curl -fsSL https://agentralabs.tech/install/memory | bash</p>
            </div>
            <div>
              <span className="text-[#ea580c]">{"# Run Solen (supply chain reasoning)"}</span>
              <p className="text-background/70 mt-1">{">"} ollama run agentralabs/solen-e4b</p>
            </div>
            <div>
              <span className="text-[#ea580c]">{"# Run Verac (financial reasoning)"}</span>
              <p className="text-background/70 mt-1">{">"} ollama run agentralabs/verac-e4b</p>
            </div>
            <div>
              <span className="text-[#ea580c]">{"# Check memory status"}</span>
              <p className="text-background/70 mt-1">{">"} agentra status --session and agentra doctor</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

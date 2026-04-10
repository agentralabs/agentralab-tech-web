"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { SectionRail } from "@/components/section-rail"
import { useEffect, useRef, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

/* ------------------------------------------------------------------ */
/*  Inline SVG icons (small, monochrome)                              */
/* ------------------------------------------------------------------ */

/** Open book with lightbulb — knowledge + insight */
function IconBrain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {/* Left page */}
      <path d="M5 32 L5 12 Q5 10 7 10 L18 10 L18 32 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Right page */}
      <path d="M35 32 L35 12 Q35 10 33 10 L22 10 L22 32 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Spine */}
      <line x1="20" y1="10" x2="20" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Text lines on left page */}
      <line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="8" y1="20" x2="15" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="8" y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      {/* Lightbulb above book */}
      <circle cx="20" cy="5" r="3.5" stroke="#ea580c" strokeWidth="1.3" fill="none" />
      <line x1="18.5" y1="8.5" x2="21.5" y2="8.5" stroke="#ea580c" strokeWidth="1" />
      {/* Light rays */}
      <line x1="20" y1="0" x2="20" y2="1" stroke="#ea580c" strokeWidth="0.8" opacity="0.6" />
      <line x1="15" y1="3" x2="16" y2="3.8" stroke="#ea580c" strokeWidth="0.8" opacity="0.6" />
      <line x1="25" y1="3" x2="24" y2="3.8" stroke="#ea580c" strokeWidth="0.8" opacity="0.6" />
      <line x1="14.5" y1="6.5" x2="15.5" y2="6" stroke="#ea580c" strokeWidth="0.8" opacity="0.5" />
      <line x1="25.5" y1="6.5" x2="24.5" y2="6" stroke="#ea580c" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

/** Three stacked layers — infrastructure strata */
function IconSubstrate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {/* Top layer */}
      <rect x="4" y="4" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Middle layer with data dots */}
      <rect x="4" y="16" width="32" height="8" rx="2" stroke="#ea580c" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="20" r="1" fill="#ea580c" fillOpacity="0.6" />
      <circle cx="18" cy="20" r="1" fill="#ea580c" fillOpacity="0.6" />
      <circle cx="24" cy="20" r="1" fill="#ea580c" fillOpacity="0.6" />
      <circle cx="30" cy="20" r="1" fill="#ea580c" fillOpacity="0.4" />
      {/* Bottom layer */}
      <rect x="4" y="28" width="32" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Connecting lines between layers */}
      <line x1="10" y1="12" x2="10" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <line x1="30" y1="12" x2="30" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <line x1="10" y1="24" x2="10" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <line x1="30" y1="24" x2="30" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    </svg>
  )
}

/** Magnifying glass over checkmark — verification */
function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {/* Magnifying glass circle */}
      <circle cx="17" cy="17" r="11" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Magnifying glass handle */}
      <line x1="25" y1="25" x2="36" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Checkmark inside lens */}
      <polyline points="10,17 15,22 24,12" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated connector lines that draw in top-to-bottom               */
/* ------------------------------------------------------------------ */
function AnimatedConnector({ text, delay }: { text: string; delay: number }) {
  return (
    <div className="flex flex-col items-center py-4">
      <motion.div
        className="w-px bg-foreground origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay, ease }}
        style={{ height: 24 }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
        className="text-[10px] font-mono text-muted-foreground tracking-wider py-1.5"
      >
        {text}
      </motion.span>
      <motion.div
        className="w-px bg-foreground origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: delay + 0.4, ease }}
        style={{ height: 24 }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Counter that ticks up                                             */
/* ------------------------------------------------------------------ */
function TickingCounter({ to, duration = 2.4 }: { to: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  // We use a simple requestAnimationFrame approach
  useEffect(() => {
    if (started.current) return
    started.current = true
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [to, duration])

  return (
    <span className="tabular-nums animate-pulse">
      {display.toLocaleString()}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Layer card with pulsing left border and icon                      */
/* ------------------------------------------------------------------ */
function LayerCard({
  layerNum,
  title,
  borderColor,
  icon,
  delay,
  children,
}: {
  layerNum: string
  title: string
  borderColor: string
  icon: React.ReactNode
  delay: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
      className="relative border-2 border-foreground p-5 lg:p-6 overflow-hidden"
    >
      {/* animated pulsing left border accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: borderColor }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex items-start gap-5">
        {/* icon in MODULE.GLYPH-style container */}
        <div className="shrink-0 mt-1">
          <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-muted-foreground block mb-1.5">
            LAYER.ICON
          </span>
          <div className="border border-foreground p-2.5 bg-background/50 w-12 h-12 flex items-center justify-center text-muted-foreground">
            {icon}
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
            {layerNum}
          </p>
          <p className="text-sm font-mono font-bold uppercase tracking-tight mb-1">
            {title}
          </p>
          {children}
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Stack diagram                                                     */
/* ------------------------------------------------------------------ */
export function StackDiagramSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12 lg:py-28">
      <SectionRail label="// SECTION: THE_STACK" step="002" />

      <div className="max-w-3xl mx-auto flex flex-col items-stretch gap-0">
        {/* Layer 1: Reasoning */}
        <LayerCard
          layerNum="Layer 1"
          title="Reasoning"
          borderColor="#ea580c"
          icon={<IconBrain className="w-full h-full" />}
          delay={0}
        >
          <p className="text-sm font-mono text-[#ea580c] tracking-[0.15em] mb-2">
            Solen &middot; Verac &middot; Axiom
          </p>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Domain-specialist open-weight fine-tunes. Apache 2.0.
          </p>
        </LayerCard>

        {/* Connector 1 */}
        <AnimatedConnector text="outputs reasoning + calibrated recommendation" delay={0.15} />

        {/* Layer 2: Substrate */}
        <LayerCard
          layerNum="Layer 2"
          title="Substrate"
          borderColor="hsl(var(--muted-foreground))"
          icon={<IconSubstrate className="w-full h-full" />}
          delay={0.1}
        >
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
        </LayerCard>

        {/* Connector 2 */}
        <AnimatedConnector text="produces a governed action with provenance" delay={0.3} />

        {/* Layer 3: Verification */}
        <LayerCard
          layerNum="Layer 3"
          title="Verification"
          borderColor="hsl(var(--muted-foreground))"
          icon={<IconShield className="w-full h-full" />}
          delay={0.2}
        >
          <p className="text-sm font-mono text-[#ea580c] tracking-[0.15em] mb-2">
            XAP Protocol &middot; Verity Engine
          </p>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Deterministic replay. Every decision verifiable. MIT.
          </p>
        </LayerCard>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="mt-8 text-center"
        >
          <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-1">
            Decisions verified
          </p>
          <p className="text-2xl sm:text-3xl font-pixel text-foreground">
            <TickingCounter to={1247} />
          </p>
        </motion.div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-12 border-2 border-foreground p-6 lg:p-8"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-muted-foreground block mb-4">
            MODULE.THESIS
          </span>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-pixel text-foreground text-center leading-snug select-none">
            The only stack where a domain-specialist AI can make decisions a regulator can audit.
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

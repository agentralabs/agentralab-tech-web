"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { SectionRail } from "@/components/section-rail"
import { useEffect, useRef, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

/* ------------------------------------------------------------------ */
/*  Inline SVG icons (small, monochrome)                              */
/* ------------------------------------------------------------------ */

/** Three connected nodes — neural / reasoning */
function IconBrain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <circle cx="14" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="8.5" x2="7.5" y2="19.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="14" y1="8.5" x2="20.5" y2="19.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="8.5" y1="22" x2="19.5" y2="22" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/** Hexagonal nodes — substrate / memory graph */
function IconSubstrate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <polygon points="14,3 24,9 24,19 14,25 4,19 4,9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="14" y1="3" x2="14" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="4" y1="9" x2="24" y2="19" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="24" y1="9" x2="4" y2="19" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

/** Shield + check — verification */
function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <path d="M14 3 L24 8 L24 16 C24 21 19 25 14 26 C9 25 4 21 4 16 L4 8 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <polyline points="9,14 12.5,18 19,10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated connector lines that draw in top-to-bottom               */
/* ------------------------------------------------------------------ */
function AnimatedConnector({ text, delay }: { text: string; delay: number }) {
  return (
    <div className="flex flex-col items-center py-3">
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
      className="relative border-2 border-foreground p-5 overflow-hidden"
    >
      {/* animated pulsing left border accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: borderColor }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex items-start gap-4">
        {/* icon */}
        <div className="shrink-0 mt-1 w-7 h-7 text-muted-foreground">
          {icon}
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
    <section className="w-full px-6 py-16 lg:px-12 lg:py-24">
      <SectionRail label="// SECTION: THE_STACK" step="002" />

      <div className="max-w-3xl mx-auto flex flex-col items-stretch">
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

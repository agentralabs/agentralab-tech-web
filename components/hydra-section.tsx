"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"

const ease = [0.22, 1, 0.36, 1] as const

/* ── Hydra network SVG ───────────────────────────────────────────── */

const centralNode = { cx: 160, cy: 160, r: 32 }

const branches = [
  { label: "Memory", cx: 60, cy: 60, r: 16 },
  { label: "Identity", cx: 270, cy: 50, r: 16 },
  { label: "Planning", cx: 280, cy: 160, r: 16 },
  { label: "Contract", cx: 260, cy: 260, r: 16 },
  { label: "Cognition", cx: 50, cy: 200, r: 12 },
  { label: "Veritas", cx: 120, cy: 280, r: 12 },
  { label: "Comm", cx: 50, cy: 130, r: 10 },
  { label: "Time", cx: 220, cy: 290, r: 10 },
] as const

const secondaryNodes = [
  { cx: 30, cy: 30, r: 5 },
  { cx: 100, cy: 20, r: 4 },
  { cx: 300, cy: 100, r: 5 },
  { cx: 310, cy: 200, r: 4 },
  { cx: 300, cy: 300, r: 5 },
  { cx: 20, cy: 260, r: 4 },
] as const

function HydraNetworkSVG() {
  return (
    <motion.svg
      viewBox="0 0 320 320"
      fill="none"
      className="w-full max-w-xs mx-auto lg:mx-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Edges from center to branches */}
      {branches.map((b, i) => (
        <motion.line
          key={b.label}
          x1={centralNode.cx}
          y1={centralNode.cy}
          x2={b.cx}
          y2={b.cy}
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.25}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.5, delay: 0.4 + i * 0.08, ease },
            },
          }}
        />
      ))}

      {/* Secondary connectors */}
      {secondaryNodes.map((sn, i) => {
        const nearest = branches.reduce((a, b) =>
          Math.hypot(b.cx - sn.cx, b.cy - sn.cy) < Math.hypot(a.cx - sn.cx, a.cy - sn.cy) ? b : a
        )
        return (
          <motion.line
            key={`sec-${i}`}
            x1={nearest.cx}
            y1={nearest.cy}
            x2={sn.cx}
            y2={sn.cy}
            stroke="currentColor"
            strokeWidth={0.5}
            strokeOpacity={0.15}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.3, delay: 1.0 + i * 0.05, ease },
              },
            }}
          />
        )
      })}

      {/* Secondary dots */}
      {secondaryNodes.map((sn, i) => (
        <motion.circle
          key={`snd-${i}`}
          cx={sn.cx}
          cy={sn.cy}
          r={sn.r}
          fill="currentColor"
          fillOpacity={0.1}
          stroke="currentColor"
          strokeWidth={0.5}
          strokeOpacity={0.2}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.3, delay: 1.0 + i * 0.05, ease },
            },
          }}
        />
      ))}

      {/* Branch nodes */}
      {branches.map((b, i) => (
        <motion.g
          key={b.label}
          variants={{
            hidden: { opacity: 0, scale: 0.4 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: 0.2 + i * 0.08, ease },
            },
          }}
          style={{ originX: `${b.cx}px`, originY: `${b.cy}px` }}
        >
          <circle
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill="currentColor"
            fillOpacity={0.08}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeOpacity={0.4}
          />
          <text
            x={b.cx}
            y={b.cy + 3}
            textAnchor="middle"
            className="font-mono fill-current"
            fontSize={7}
            fontWeight={600}
            opacity={0.7}
          >
            {b.label}
          </text>
        </motion.g>
      ))}

      {/* Central node — Hydra */}
      <motion.g
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, delay: 0.1, ease },
          },
        }}
        style={{ originX: `${centralNode.cx}px`, originY: `${centralNode.cy}px` }}
      >
        <circle
          cx={centralNode.cx}
          cy={centralNode.cy}
          r={centralNode.r}
          fill="#ea580c"
        />
        {/* Pulse ring */}
        <motion.circle
          cx={centralNode.cx}
          cy={centralNode.cy}
          r={centralNode.r}
          fill="none"
          stroke="#ea580c"
          strokeWidth={1.5}
          animate={{
            r: [centralNode.r, centralNode.r + 12],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <text
          x={centralNode.cx}
          y={centralNode.cy + 4}
          textAnchor="middle"
          className="font-mono"
          fontSize={11}
          fontWeight={700}
          fill="#fff"
        >
          HYDRA
        </text>
      </motion.g>
    </motion.svg>
  )
}

/* ── Stat blocks ─────────────────────────────────────────────────── */

const stats = [
  { value: "68", label: "CRATES" },
  { value: "SELF-WRITING", label: "GENOME" },
  { value: "CONSTITUTIONAL", label: "GOVERNANCE" },
] as const

/* ── Main component ──────────────────────────────────────────────── */

export function HydraSection() {
  return (
    <section className="w-full px-6 pb-14 lg:px-12" aria-label="Showcase">
      <SectionRail label="// SECTION: SHOWCASE" step="007" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground"
      >
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row">
          {/* LEFT — SVG visualization (40%) */}
          <div className="lg:w-[40%] bg-background p-6 lg:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-foreground">
            <HydraNetworkSVG />
          </div>

          {/* RIGHT — Text content (60%) */}
          <div className="lg:w-[60%] bg-foreground text-background">
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
              <motion.p
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="text-sm font-mono font-semibold leading-relaxed"
              >
                The living proof that the stack composes.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                className="text-xs font-mono text-background/70 leading-relaxed max-w-3xl"
              >
                68 Rust crates. Persistent memory via AgenticMemory. Self-writing genome.
                Constitutional governance via AgenticContract. Planning via AgenticPlanning.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease }}
                className="text-xs font-mono text-background/70 leading-relaxed max-w-3xl"
              >
                When Hydra needs to reason about supply chain, it calls Solen. When it needs finance,
                it calls Verac. The first customer of the entire stack.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5, ease }}
                className="pt-2"
              >
                <a
                  href="https://github.com/agentralabs/hydra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-background/40 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.14em] hover:bg-background hover:text-foreground transition-colors"
                >
                  View on GitHub
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stat blocks at bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-foreground">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease }}
              className={`px-4 py-4 bg-background text-foreground text-center ${
                i < 2 ? "border-b sm:border-b-0 sm:border-r border-foreground" : ""
              }`}
            >
              <span className="block text-lg font-mono font-bold tracking-tight text-[#ea580c]">
                {stat.value}
              </span>
              <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const PARTNERS_ROW1 = [
  "AGENTICMEMORY",
  "AGENTICVISION",
  "AGENTICCODEBASE",
  "AGENTICIDENTITY",
  "AGENTICTIME",
  "AGENTICCONTRACT",
  "MCP NATIVE",
  "OPEN SOURCE",
  "RESEARCH LAB",
  "PARTNERSHIPS",
  "SPONSORSHIP",
  "PUBLICATIONS",
  "GITHUB",
]

const PARTNERS_ROW2 = [
  "AGENTICCOMM",
  "AGENTICPLANNING",
  "MCP NATIVE",
  "OPEN SOURCE",
  "RESEARCH LAB",
  "PARTNERSHIPS",
  "SPONSORSHIP",
  "PUBLICATIONS",
  "GITHUB",
]

function LogoBlock({ name, glitch }: { name: string; glitch: boolean }) {
  return (
    <div
      className={`flex items-center justify-center px-8 py-4 border-r-2 border-foreground shrink-0 ${
        glitch ? "animate-glitch" : ""
      }`}
    >
      <span className="text-sm font-mono tracking-[0.15em] uppercase text-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function GlitchMarquee() {
  const glitchIndices1 = [2, 5]
  const glitchIndices2 = [0, 3]

  return (
    <section className="w-full py-16 px-6 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {"// CLIENTS: MCP_ECOSYSTEM"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">008</span>
      </motion.div>

      {/* Marquee row 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="overflow-hidden border-2 border-foreground"
      >
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {[...PARTNERS_ROW1, ...PARTNERS_ROW1].map((name, i) => (
            <LogoBlock
              key={`r1-${name}-${i}`}
              name={name}
              glitch={glitchIndices1.includes(i % PARTNERS_ROW1.length)}
            />
          ))}
        </div>
      </motion.div>

      {/* Marquee row 2 — starts with AGENTICCOMM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="overflow-hidden border-2 border-t-0 border-foreground"
      >
        <div className="flex animate-marquee-reverse" style={{ width: "max-content" }}>
          {[...PARTNERS_ROW2, ...PARTNERS_ROW2].map((name, i) => (
            <LogoBlock
              key={`r2-${name}-${i}`}
              name={name}
              glitch={glitchIndices2.includes(i % PARTNERS_ROW2.length)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

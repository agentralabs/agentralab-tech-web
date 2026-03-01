"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

interface FileCard {
  ext: string
  name: string
  desc: string
  size: string
}

const FILES: FileCard[] = [
  { ext: ".amem", name: "AgenticMemory", desc: "Every conversation. Every decision. Every preference.", size: "~1-2 GB / 20 yr" },
  { ext: ".avis", name: "AgenticVision", desc: "Every page you saw. Every change. Visual evidence.", size: "~5-8 GB / 20 yr" },
  { ext: ".acb", name: "AgenticCodebase", desc: "Every project. Semantic graphs. Zero hallucination.", size: "~2-3 GB / 20 yr" },
  { ext: ".aid", name: "AgenticIdentity", desc: "Signed receipts. Earned trust. Unbroken continuity.", size: "~0.5-1 GB / 20 yr" },
  { ext: ".atime", name: "AgenticTime", desc: "Deadlines. Schedules. Decay models. Temporal reasoning.", size: "~0.5-1 GB / 20 yr" },
  { ext: ".acon", name: "AgenticContract", desc: "Policies. Risk limits. Approvals. Self-healing governance.", size: "~0.5-1 GB / 20 yr" },
  { ext: ".acomm", name: "AgenticComm", desc: "Channels. Messages. Subscriptions. Structured coordination.", size: "~0.5-1 GB / 20 yr" },
  { ext: ".aplan", name: "AgenticPlanning", desc: "Goals. Decisions. Commitments. Strategic reasoning.", size: "~0.5-1 GB / 20 yr" },
]

/* Border classes for 8 items in grid-cols-1 / sm:grid-cols-2 / lg:grid-cols-4 */
const FILE_BORDERS = [
  "border-b sm:border-r border-foreground",                        // 0: .amem
  "border-b lg:border-r border-foreground",                        // 1: .avis
  "border-b sm:border-r border-foreground",                        // 2: .acb
  "border-b border-foreground",                                    // 3: .aid
  "border-b lg:border-b-0 sm:border-r border-foreground",         // 4: .atime
  "border-b lg:border-b-0 lg:border-r border-foreground",         // 5: .acon
  "border-b sm:border-b-0 sm:border-r border-foreground",         // 6: .acomm
  "",                                                              // 7: .aplan
]

function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

export function AStarFilesSection() {
  return (
    <section className="w-full px-6 py-16 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: THE_FILES"}
        </span>
        <div className="flex-1 border-t border-border" />
        <BlinkDot />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          002
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-10"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground mb-3">
          Your Agent&apos;s Mind. One Folder. Forever Yours.
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-lg">
          Twenty years from now, you&apos;ll open a new AI tool.
          You&apos;ll drag in a folder. Your agent will know you.
        </p>
      </motion.div>

      {/* File cards grid — 4 columns on lg, 2 rows of 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-foreground">
        {FILES.map((file, i) => (
          <motion.div
            key={file.ext}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease }}
            className={`p-5 flex flex-col gap-3 ${FILE_BORDERS[i]}`}
          >
            <span className="text-2xl font-mono font-bold text-[#ea580c]">{file.ext}</span>
            <span className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">{file.name}</span>
            <span className="text-xs font-mono text-muted-foreground leading-relaxed">{file.desc}</span>
            <span className="text-[10px] font-mono text-muted-foreground mt-auto">{file.size}</span>
          </motion.div>
        ))}
      </div>

      {/* Value proposition */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="border border-border p-5">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ea580c] mb-2">Retention</h4>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            20 years of your agent&apos;s cognitive history. Portable. User-owned. Works offline forever.
          </p>
        </div>
        <div className="border border-border p-5">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ea580c] mb-2">Enrichment</h4>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Load these files into ANY model — Claude, GPT, Llama, local. The files make any model YOUR agent.
          </p>
        </div>
        <div className="border border-border p-5">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground mb-2">~10-15 GB</h4>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            20 years of memory, vision, code, identity, time, governance, communication, and planning. Fits on your phone. Backs up like photos.
          </p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-xs font-mono text-muted-foreground mt-6 text-center"
      >
        The model is commodity. The files are value.
      </motion.p>
    </section>
  )
}

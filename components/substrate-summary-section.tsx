"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"
import { SUBSTRATE_PROJECTS, type SubstrateTier } from "@/lib/substrate"

const ease = [0.22, 1, 0.36, 1] as const

function tierStyles(tier: SubstrateTier) {
  switch (tier) {
    case "flagship":
      return "font-semibold"
    case "core":
      return ""
    case "standard":
      return "text-muted-foreground"
    case "utility":
      return "text-muted-foreground/60 text-[9px]"
  }
}

export function SubstrateSummarySection() {
  const mainProjects = SUBSTRATE_PROJECTS.filter((p) => p.tier !== "utility")
  const utilityProjects = SUBSTRATE_PROJECTS.filter((p) => p.tier === "utility")

  return (
    <section className="w-full px-6 pb-14 lg:px-12" aria-label="Substrate Directory">
      <SectionRail label="// SECTION: SUBSTRATE_DIRECTORY" step="005" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground bg-background"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-foreground">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
            Substrate Directory
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            18 MIT
          </span>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[2rem_1fr_5rem_3rem_2rem] gap-2 px-4 py-2 border-b border-border text-[10px] font-mono tracking-[0.14em] uppercase text-muted-foreground">
          <span>#</span>
          <span>Project</span>
          <span>Artifact</span>
          <span>Tools</span>
          <span />
        </div>

        {/* Main rows */}
        {mainProjects.map((project, i) => (
          <div
            key={project.key}
            className={`grid grid-cols-[2rem_1fr_5rem_3rem_2rem] gap-2 px-4 py-1.5 border-b border-border/40 items-center font-mono text-xs ${tierStyles(project.tier)} ${
              project.tier === "flagship" ? "border-l-2 border-l-[#ea580c]" : ""
            }`}
          >
            <span className="text-[10px] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{project.name}</span>
            <span className="text-[10px] text-muted-foreground">{project.artifact}</span>
            <span className="text-[10px]">{project.toolCount}</span>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ea580c] transition-colors"
              aria-label={`${project.name} repository`}
            >
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        ))}

        {/* Utility divider */}
        <div className="border-t border-foreground/20 mx-4" />

        {/* Utility rows */}
        {utilityProjects.map((project, i) => (
          <div
            key={project.key}
            className={`grid grid-cols-[2rem_1fr_5rem_3rem_2rem] gap-2 px-4 py-1 border-b border-border/20 items-center font-mono ${tierStyles(project.tier)}`}
          >
            <span className="text-[10px] text-muted-foreground/40">
              {String(mainProjects.length + i + 1).padStart(2, "0")}
            </span>
            <span>{project.name}</span>
            <span className="text-[10px] text-muted-foreground/40">{project.artifact}</span>
            <span className="text-[10px]">{project.toolCount}</span>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ea580c] transition-colors"
              aria-label={`${project.name} repository`}
            >
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        ))}

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-foreground/20">
          <span className="text-[10px] font-mono text-muted-foreground">
            All open source. MIT licensed. Published on crates.io, PyPI, npm.
          </span>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.14em] uppercase hover:text-[#ea580c] transition-colors"
          >
            Explore All Projects
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

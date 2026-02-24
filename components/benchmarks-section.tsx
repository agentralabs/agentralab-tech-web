"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

interface BenchmarkRow {
  operation: string
  latency: string
  sister: string
}

const BENCHMARKS: BenchmarkRow[] = [
  { operation: "Memory: Causal chain traversal", latency: "< 1 ms", sister: "memory" },
  { operation: "Memory: Semantic search (100K nodes)", latency: "< 10 ms", sister: "memory" },
  { operation: "Vision: Capture + embed + store", latency: "~ 47 ms", sister: "vision" },
  { operation: "Vision: Diff comparison", latency: "< 1 ms", sister: "vision" },
  { operation: "Codebase: Symbol lookup", latency: "14.3 \u00b5s", sister: "codebase" },
  { operation: "Codebase: Impact analysis", latency: "1.46 \u00b5s", sister: "codebase" },
  { operation: "Codebase: Index access", latency: "9.7 ns", sister: "codebase" },
]

const SCALE_ROWS = [
  { metric: "100K node graph", value: "< 50 MB disk" },
  { metric: "Memory-mapped access", value: "Zero parse time" },
  { metric: "MCP response p99", value: "< 100 ms" },
]

function sisterColor(sister: string) {
  return sister === "memory"
    ? "text-[#ea580c]"
    : sister === "vision"
      ? "text-[#fb923c]"
      : "text-[#ea580c]"
}

export function BenchmarksSection() {
  return (
    <section className="w-full px-6 py-16 lg:px-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: BENCHMARKS"}
        </span>
        <div className="flex-1 border-t border-border" />
        <BlinkDot />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          003
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-10"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground mb-3">
          Speed that doesn&apos;t compromise
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
          Real benchmarks. Real hardware. Apple Silicon, Criterion.rs, release builds.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-foreground bg-foreground text-background">
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Operation</span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Latency</span>
        </div>

        {BENCHMARKS.map((row, i) => (
          <motion.div
            key={row.operation}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4, ease }}
            className={`flex items-center justify-between px-5 py-3 ${
              i < BENCHMARKS.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="text-xs font-mono text-foreground">{row.operation}</span>
            <span className={`text-xs font-mono font-bold ${sisterColor(row.sister)}`}>
              {row.latency}
            </span>
          </motion.div>
        ))}

        <div className="border-t-2 border-foreground">
          {SCALE_ROWS.map((row, i) => (
            <div
              key={row.metric}
              className={`flex items-center justify-between px-5 py-3 ${
                i < SCALE_ROWS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-xs font-mono text-muted-foreground">{row.metric}</span>
              <span className="text-xs font-mono font-bold text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className="mt-6 flex justify-end"
      >
        <Link
          href="/docs/en/vision-benchmarks"
          className="group inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[#ea580c] hover:underline"
        >
          View Full Benchmark Reports
          <ArrowRight size={12} strokeWidth={2} />
        </Link>
      </motion.div>
    </section>
  )
}

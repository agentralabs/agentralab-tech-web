"use client"

import { ArrowRight, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"
import { MODELS, TRAINING_CATEGORIES } from "@/lib/models"

const ease = [0.22, 1, 0.36, 1] as const

/* ── SVG Glyphs ── */

function SolenGlyph() {
  return (
    <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Supply chain nodes */}
      <circle cx="30" cy="70" r="12" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      <circle cx="90" cy="30" r="10" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      <circle cx="90" cy="110" r="10" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      <circle cx="150" cy="50" r="11" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      <circle cx="150" cy="90" r="11" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      <circle cx="210" cy="70" r="12" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      {/* Directional arrows / flow lines */}
      <line x1="42" y1="65" x2="78" y2="35" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" markerEnd="url(#arrowSolen)" />
      <line x1="42" y1="75" x2="78" y2="105" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" markerEnd="url(#arrowSolen)" />
      <line x1="100" y1="35" x2="138" y2="48" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" markerEnd="url(#arrowSolen)" />
      <line x1="100" y1="105" x2="138" y2="92" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" markerEnd="url(#arrowSolen)" />
      <line x1="161" y1="55" x2="198" y2="67" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" markerEnd="url(#arrowSolen)" />
      <line x1="161" y1="85" x2="198" y2="73" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" markerEnd="url(#arrowSolen)" />
      {/* Cross link */}
      <line x1="95" y1="40" x2="145" y2="82" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="text-muted-foreground" />
      {/* Node fills */}
      <circle cx="30" cy="70" r="4" fill="#ea580c" />
      <circle cx="210" cy="70" r="4" fill="#ea580c" />
      <defs>
        <marker id="arrowSolen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
        </marker>
      </defs>
    </svg>
  )
}

function VeracGlyph() {
  return (
    <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Stacked ledger rectangles */}
      <rect x="30" y="15" width="180" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      <rect x="30" y="47" width="180" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      <rect x="30" y="79" width="180" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      <rect x="30" y="111" width="180" height="24" rx="1" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
      {/* Checkmarks */}
      <path d="M42,26 L47,31 L55,22" stroke="#ea580c" strokeWidth="1.5" fill="none" />
      <path d="M42,58 L47,63 L55,54" stroke="#ea580c" strokeWidth="1.5" fill="none" />
      <path d="M42,90 L47,95 L55,86" stroke="#ea580c" strokeWidth="1.5" fill="none" />
      <path d="M42,122 L47,127 L55,118" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" fill="none" className="text-muted-foreground" />
      {/* Balance lines */}
      <line x1="70" y1="27" x2="130" y2="27" stroke="currentColor" strokeWidth="0.75" className="text-muted-foreground" />
      <line x1="140" y1="27" x2="195" y2="27" stroke="currentColor" strokeWidth="0.75" className="text-muted-foreground" />
      <line x1="70" y1="59" x2="130" y2="59" stroke="currentColor" strokeWidth="0.75" className="text-muted-foreground" />
      <line x1="140" y1="59" x2="195" y2="59" stroke="currentColor" strokeWidth="0.75" className="text-muted-foreground" />
      <line x1="70" y1="91" x2="130" y2="91" stroke="currentColor" strokeWidth="0.75" className="text-muted-foreground" />
      <line x1="140" y1="91" x2="195" y2="91" stroke="currentColor" strokeWidth="0.75" className="text-muted-foreground" />
      <line x1="70" y1="123" x2="130" y2="123" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" className="text-muted-foreground" />
      {/* Separator ticks */}
      <line x1="135" y1="22" x2="135" y2="32" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
      <line x1="135" y1="54" x2="135" y2="64" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
      <line x1="135" y1="86" x2="135" y2="96" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
    </svg>
  )
}

function AxiomGlyph() {
  return (
    <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Axes */}
      <line x1="30" y1="125" x2="220" y2="125" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      <line x1="30" y1="10" x2="30" y2="125" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {/* Candlesticks */}
      <line x1="55" y1="30" x2="55" y2="90" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <rect x="49" y="45" width="12" height="25" fill="#ea580c" />
      <line x1="85" y1="50" x2="85" y2="110" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <rect x="79" y="55" width="12" height="30" stroke="currentColor" strokeWidth="1" className="text-foreground" fill="none" />
      <line x1="115" y1="25" x2="115" y2="80" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <rect x="109" y="30" width="12" height="30" fill="#ea580c" />
      <line x1="145" y1="40" x2="145" y2="100" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <rect x="139" y="60" width="12" height="25" stroke="currentColor" strokeWidth="1" className="text-foreground" fill="none" />
      <line x1="175" y1="20" x2="175" y2="75" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <rect x="169" y="25" width="12" height="28" fill="#ea580c" />
      <line x1="205" y1="35" x2="205" y2="95" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <rect x="199" y="40" width="12" height="30" fill="#ea580c" />
      {/* Trend line */}
      <polyline
        points="55,55 85,70 115,40 145,65 175,32 205,48"
        stroke="#ea580c"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 2"
      />
      {/* Secondary trend */}
      <polyline
        points="55,75 85,85 115,60 145,80 175,55 205,65"
        stroke="currentColor"
        strokeWidth="0.75"
        className="text-muted-foreground"
        fill="none"
      />
    </svg>
  )
}

const GLYPH_MAP: Record<string, () => React.JSX.Element> = {
  solen: SolenGlyph,
  verac: VeracGlyph,
  axiom: AxiomGlyph,
}

const DEEP_SUMMARIES: Record<string, { bullets: { lead: string; body: string }[] }> = {
  solen: {
    bullets: [
      { lead: "Clarification-first reasoning", body: "Tells you exactly what it needs to know and why, before it answers. Reasons through incomplete data with calibrated confidence." },
      { lead: "Domain saturation", body: "Trained on nothing but supply chain — every research paper, every SEC filing, every court case where a supply chain failure ended in litigation." },
      { lead: "Powers Nexus Planner", body: "The reasoning engine behind Nexus Planner, Agentra Labs' supply chain intelligence surface." },
    ],
  },
  verac: {
    bullets: [
      { lead: "On-premise by design", body: "Every invoice, every reconciliation, every settlement decision stays inside your infrastructure. Nothing leaves. Data residency is not optional." },
      { lead: "Bank-grade trust model", body: "On-premise financial reasoning. The condition under which bank adoption becomes possible." },
      { lead: "Powers ZexRail", body: "The reasoning engine behind ZexRail, multi-rail payment settlement with real-time reconciliation." },
    ],
  },
  axiom: {
    bullets: [
      { lead: "Consequence reasoning", body: "Reasons forward to second and third order effects before recommending action. Does not chase correlations." },
      { lead: "Missing-data awareness", body: "Identifies what is missing before answering. Calibrated confidence over false precision." },
      { lead: "Standalone deployment", body: "Runs independently of the Agentra product stack. Plug into any trading infrastructure via standard APIs." },
    ],
  },
}

/* ── StatusLine ── */

function StatusLine() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="flex items-center gap-3 mb-8"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ea580c]" />
      </span>
      <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
        live surface: 3 domain-specialist models &middot; active operations
      </span>
    </motion.div>
  )
}

/* ── Main Section ── */

export function ModelShowcaseSection() {
  return (
    <section id="models" className="w-full px-6 py-16 lg:px-12 lg:py-24">
      <SectionRail label="// SECTION: MODELS" step="003" />
      <StatusLine />

      {/* Model cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
        {MODELS.map((model, i) => {
          const Glyph = GLYPH_MAP[model.key]
          const summary = DEEP_SUMMARIES[model.key]
          const stepLabel = String(i + 1).padStart(2, "0")

          return (
            <motion.div
              key={model.key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              className="border-2 border-foreground flex flex-col min-h-[760px]"
            >
              {/* ── Header bar ── */}
              <div className="flex items-center justify-between px-5 py-3 border-b-2 border-foreground">
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
                  MODELS
                </span>
                <div className="flex items-center gap-3">
                  <span className="bg-[#ea580c] text-white text-[9px] tracking-[0.15em] uppercase font-mono px-2.5 py-1">
                    IN TRAINING
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
                    {stepLabel}/{String(MODELS.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* ── Model name + domain ── */}
              <div className="px-5 pt-6 pb-4">
                <h3 className="text-3xl lg:text-4xl font-mono font-bold uppercase tracking-tight leading-none">
                  {model.name}
                  <span className="text-muted-foreground font-normal"> / {model.domain.toUpperCase()}</span>
                </h3>
              </div>

              {/* ── Rich description ── */}
              <div className="px-5 pb-4">
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  {model.description}
                </p>
              </div>

              {/* ── Divider ── */}
              <div className="mx-5 border-t border-border" />

              {/* ── Deep summary bullets ── */}
              {summary && (
                <div className="px-5 pt-4 pb-4 space-y-3">
                  {summary.bullets.map((b, j) => (
                    <div key={j} className="flex gap-2">
                      <span className="text-[#ea580c] text-[10px] mt-0.5 shrink-0">&mdash;</span>
                      <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                        <span className="text-foreground font-bold">{b.lead}.</span>{" "}
                        {b.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ── SVG Glyph ── */}
              <div className="px-5 mt-auto pb-2">
                <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-muted-foreground block mb-2">
                  MODULE.GLYPH
                </span>
                <div className="border border-border p-4 bg-background/50">
                  {Glyph && <Glyph />}
                </div>
              </div>

              {/* ── Footer CTAs ── */}
              <div className="flex items-center justify-between px-5 py-4 border-t-2 border-foreground mt-4">
                <button className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-foreground hover:text-[#ea580c] transition-colors">
                  <Eye size={12} strokeWidth={2} />
                  <span>See Scenarios</span>
                </button>
                <a
                  href={model.hfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#ea580c] hover:text-foreground transition-colors"
                >
                  <span>View on HuggingFace</span>
                  <ArrowRight size={12} strokeWidth={2} />
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── Specialist argument panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="border-2 border-foreground p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="h-1.5 w-1.5 bg-[#ea580c]" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
            The Specialist Argument
          </span>
        </div>

        <p className="text-sm font-mono font-bold uppercase tracking-tight mb-1 max-w-3xl">
          Nobody hires a generalist lawyer to argue a patent case.
        </p>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          These models are trained on reasoning processes, not questions and answers.
          Domain saturation produces specialists that think inside a field — not chatbots
          that have read about it.
        </p>

        <div className="flex flex-wrap gap-2">
          {TRAINING_CATEGORIES.map((cat) => (
            <motion.span
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease }}
              className="border border-foreground px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:bg-foreground hover:text-background transition-colors cursor-default"
              title={cat.detail}
            >
              {cat.name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

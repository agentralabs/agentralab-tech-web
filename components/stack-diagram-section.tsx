"use client"

import { motion } from "framer-motion"
import { SectionRail } from "@/components/section-rail"

const ease = [0.22, 1, 0.36, 1] as const

/* ── The Stack as one large ascending SVG illustration ──────────── */

function StackSVG() {
  return (
    <svg viewBox="0 0 900 480" fill="none" className="w-full" aria-label="The Agentra Stack — three ascending layers">
      {/* ── Step 3 (top-right): Verification ── */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        {/* Platform */}
        <rect x="580" y="40" width="300" height="140" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="580" y="40" width="300" height="28" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="2" />
        <text x="596" y="58" className="font-mono" fontSize="9" fill="currentColor" opacity="0.4" letterSpacing="2">LAYER 03 · VERIFICATION</text>

        {/* Content */}
        <text x="596" y="92" className="font-mono" fontSize="13" fill="currentColor" fontWeight="700" letterSpacing="1">XAP Protocol</text>
        <text x="596" y="110" className="font-mono" fontSize="13" fill="currentColor" fontWeight="700" letterSpacing="1">Verity Engine</text>
        <text x="596" y="135" className="font-mono" fontSize="9" fill="currentColor" opacity="0.4">Deterministic replay.</text>
        <text x="596" y="148" className="font-mono" fontSize="9" fill="currentColor" opacity="0.4">Every decision verifiable. MIT.</text>

        {/* Magnifying glass + checkmark icon */}
        <circle cx="840" cy="110" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
        <line x1="854" y1="124" x2="868" y2="138" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
        <polyline points="832,110 838,116 850,104" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      {/* ── Step 2 (middle): Substrate ── */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
      >
        {/* Platform */}
        <rect x="290" y="180" width="300" height="160" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="290" y="180" width="300" height="28" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="2" />
        <text x="306" y="198" className="font-mono" fontSize="9" fill="currentColor" opacity="0.4" letterSpacing="2">LAYER 02 · SUBSTRATE</text>

        {/* Memory highlight */}
        <rect x="306" y="222" width="130" height="24" fill="#ea580c" fillOpacity="0.1" stroke="#ea580c" strokeWidth="1.5" />
        <text x="316" y="238" className="font-mono" fontSize="11" fill="#ea580c" fontWeight="700">AgenticMemory</text>

        {/* Other sisters as small blocks */}
        <rect x="306" y="256" width="54" height="14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        <text x="312" y="266" className="font-mono" fontSize="6" fill="currentColor" opacity="0.35">Vision</text>
        <rect x="366" y="256" width="54" height="14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        <text x="372" y="266" className="font-mono" fontSize="6" fill="currentColor" opacity="0.35">Codebase</text>
        <rect x="426" y="256" width="54" height="14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        <text x="432" y="266" className="font-mono" fontSize="6" fill="currentColor" opacity="0.35">Identity</text>
        <rect x="486" y="256" width="54" height="14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        <text x="492" y="266" className="font-mono" fontSize="6" fill="currentColor" opacity="0.35">+14 more</text>

        <text x="306" y="298" className="font-mono" fontSize="9" fill="currentColor" opacity="0.4">Persistent memory, identity, governance.</text>
        <text x="306" y="311" className="font-mono" fontSize="9" fill="currentColor" opacity="0.4">18 systems. MIT licensed.</text>

        {/* Brain icon */}
        <ellipse cx="545" cy="270" rx="18" ry="22" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.15" />
        <path d="M535 260 Q540 250 545 258 Q550 250 555 260" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
        <path d="M532 270 Q540 275 545 268 Q550 275 558 270" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
        <circle cx="545" cy="265" r="2" fill="#ea580c" fillOpacity="0.6" />
      </motion.g>

      {/* ── Step 1 (bottom-left): Reasoning ── */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
      >
        {/* Platform */}
        <rect x="20" y="320" width="300" height="140" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="20" y="320" width="300" height="28" fill="#ea580c" fillOpacity="0.06" stroke="currentColor" strokeWidth="2" />
        <text x="36" y="338" className="font-mono" fontSize="9" fill="#ea580c" opacity="0.7" letterSpacing="2">LAYER 01 · REASONING</text>

        {/* Model names */}
        <text x="36" y="372" className="font-mono" fontSize="16" fill="#ea580c" fontWeight="700" letterSpacing="2">SOLEN</text>
        <text x="36" y="394" className="font-mono" fontSize="16" fill="#ea580c" fontWeight="700" letterSpacing="2">VERAC</text>
        <text x="36" y="416" className="font-mono" fontSize="16" fill="#ea580c" fontWeight="700" letterSpacing="2">AXIOM</text>

        <text x="160" y="372" className="font-mono" fontSize="8" fill="currentColor" opacity="0.35">Supply Chain</text>
        <text x="160" y="394" className="font-mono" fontSize="8" fill="currentColor" opacity="0.35">Finance</text>
        <text x="160" y="416" className="font-mono" fontSize="8" fill="currentColor" opacity="0.35">Markets</text>

        <text x="36" y="444" className="font-mono" fontSize="9" fill="currentColor" opacity="0.4">Domain-specialist fine-tunes. Apache 2.0.</text>
      </motion.g>

      {/* ── Ascending connectors (the staircase risers) ── */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
      >
        {/* Step 1 → Step 2: rising line */}
        <path d="M320 390 L320 340 L290 340 L290 310" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="6 4" opacity="0.25" />
        <motion.circle cx="290" cy="310" r="3" fill="#ea580c" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />

        {/* Step 2 → Step 3: rising line */}
        <path d="M590 260 L590 210 L580 210 L580 180" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="6 4" opacity="0.25" />
        <motion.circle cx="580" cy="180" r="3" fill="#ea580c" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} />

        {/* Flow labels along the risers */}
        <text x="330" y="365" className="font-mono" fontSize="7" fill="currentColor" opacity="0.3" transform="rotate(-90, 330, 365)">reasoning + recommendation</text>
        <text x="598" y="205" className="font-mono" fontSize="7" fill="currentColor" opacity="0.3" transform="rotate(-90, 598, 205)">governed action</text>
      </motion.g>

      {/* ── Subtle step shadows (depth) ── */}
      <rect x="25" y="460" width="300" height="4" fill="currentColor" fillOpacity="0.04" />
      <rect x="295" y="340" width="300" height="4" fill="currentColor" fillOpacity="0.04" />
      <rect x="585" y="180" width="300" height="4" fill="currentColor" fillOpacity="0.04" />
    </svg>
  )
}

/* ── Main component ──────────────────────────────────────────────── */

export function StackDiagramSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12 lg:py-28">
      <SectionRail label="// SECTION: THE_STACK" step="002" />

      {/* The stack as a single bordered illustration */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="border-2 border-foreground p-6 lg:p-10"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            architecture.overview
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            3 layers &middot; 1 stack
          </span>
        </div>

        <StackSVG />

        {/* Pull quote below */}
        <div className="mt-8 border-t border-foreground/20 pt-6">
          <p className="text-sm lg:text-base font-mono text-foreground leading-relaxed max-w-3xl">
            The only stack where a domain-specialist AI can make decisions a regulator can audit.
          </p>
          <p className="mt-2 text-[10px] font-mono text-muted-foreground tracking-[0.15em] uppercase">
            Reasoning &rarr; Substrate &rarr; Verification
          </p>
        </div>
      </motion.div>
    </section>
  )
}

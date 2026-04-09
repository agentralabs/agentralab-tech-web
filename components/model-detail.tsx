"use client"

import { useState } from "react"
import { ArrowRight, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MODELS, TRAINING_CATEGORIES } from "@/lib/models"

const ease = [0.22, 1, 0.36, 1] as const

export function ModelDetail() {
  const [active, setActive] = useState(0)
  const model = MODELS[active]

  return (
    <div className="border-2 border-foreground">
      {/* Tab row */}
      <div className="flex flex-wrap gap-0 border-b-2 border-foreground">
        {MODELS.map((m, i) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-xs font-mono tracking-[0.12em] uppercase transition-colors ${
              i === active
                ? "bg-foreground text-background"
                : "hover:bg-foreground/5 text-foreground"
            }`}
          >
            {m.name}
          </button>
        ))}
        <div className="flex-1 flex items-center justify-end px-4">
          <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">
            {model.domain} | {model.license}
          </span>
        </div>
      </div>

      {/* Content: sidebar + panels */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-[220px] border-b-2 lg:border-b-0 lg:border-r-2 border-foreground p-4 flex flex-col gap-3">
          <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">active.model</p>
          <h3 className="text-xl font-mono font-bold uppercase">{model.name}</h3>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">{model.domain}</p>
          <div className="text-[10px] font-mono text-muted-foreground space-y-1 mt-2">
            <p><span className="uppercase tracking-wider">Powers:</span> {model.powers}</p>
            <p><span className="uppercase tracking-wider">Base:</span> {model.base}</p>
            <p><span className="uppercase tracking-wider">License:</span> {model.license}</p>
          </div>
          <a
            href={model.hfUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center gap-0 bg-foreground text-background text-[10px] font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-8 h-8 bg-[#ea580c]">
              <ArrowRight size={12} className="text-background" />
            </span>
            <span className="px-4 py-2">View on HuggingFace</span>
          </a>
          <a
            href={`/projects/scenarios/${model.key}`}
            className="flex items-center gap-0 border border-foreground text-[10px] font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-8 h-8 border-r border-foreground">
              <Eye size={12} />
            </span>
            <span className="px-4 py-2">See Scenarios</span>
          </a>
        </div>

        {/* Right panels */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="border-2 border-foreground p-4">
            <p className="text-sm font-mono font-bold uppercase tracking-tight">Why Domain Models Beat Generalists</p>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">{model.description}</p>
          </div>

          <div className="border-2 border-foreground p-4">
            <p className="text-sm font-mono font-bold uppercase tracking-tight">The Six Training Categories</p>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
              Standard models are trained on questions and answers. These models are trained on reasoning processes.
            </p>
            <div className="mt-3 border border-foreground overflow-hidden">
              {TRAINING_CATEGORIES.map((cat) => (
                <div key={cat.name} className="px-3 py-2 text-xs font-mono text-muted-foreground border-b border-border last:border-b-0">
                  <span className="font-bold text-foreground">{cat.name}</span> — {cat.detail}
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-foreground p-4">
            <p className="text-sm font-mono font-bold uppercase tracking-tight">The Calibration Layer</p>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
              Every answer includes three things: how certain this answer is given the inputs provided, which input — if wrong by 20% — most changes the result, and what to verify before acting on the recommendation.
            </p>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed italic">
              A calculator gives you a number. A senior advisor tells you how much to trust it.
            </p>
          </div>

          <div className="border-2 border-foreground p-4">
            <p className="text-sm font-mono font-bold uppercase tracking-tight">{model.keyCapability}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, ArrowLeft } from "lucide-react"
import Link from "next/link"

import type { ScenarioGroup } from "@/data/scenarios-memory"
import { MEMORY_HERO, MEMORY_SCENARIOS } from "@/data/scenarios-memory"
import { VISION_HERO, VISION_SCENARIOS } from "@/data/scenarios-vision"
import { CODEBASE_HERO, CODEBASE_SCENARIOS } from "@/data/scenarios-codebase"
import { IDENTITY_HERO, IDENTITY_SCENARIOS } from "@/data/scenarios-identity"
import { TIME_HERO, TIME_SCENARIOS } from "@/data/scenarios-time"
import { CONTRACT_HERO, CONTRACT_SCENARIOS } from "@/data/scenarios-contract"
import { COMM_HERO, COMM_SCENARIOS } from "@/data/scenarios-comm"
import * as SC from "@/components/scenario-content"

const ease = [0.22, 1, 0.36, 1] as const

/* ── Map scenario IDs to their rich JSX content ── */

const CONTENT_MAP: Record<string, () => React.ReactNode> = {
  // Memory
  "caused-by": () => <SC.CausedByContent />,
  "supersedes-resolve": () => <SC.SupersedesContent />,
  "cognitive-event-types": () => <SC.CognitiveTypesContent />,
  "cross-session": () => <SC.CrossSessionContent />,
  "semantic-search": () => <SC.SemanticSearchContent />,
  "hybrid-search": () => <SC.HybridSearchContent />,
  "temporal-queries": () => <SC.TemporalQueriesContent />,
  "pattern-queries": () => <SC.PatternQueriesContent />,
  "causal-analysis": () => <SC.CausalAnalysisContent />,
  "memory-quality": () => <SC.MemoryQualityContent />,
  "contradiction-detection": () => <SC.ContradictionContent />,
  "budget-policy": () => <SC.BudgetPolicyContent />,
  "privacy-redaction": () => <SC.PrivacyRedactionContent />,
  "runtime-sync": () => <SC.RuntimeSyncContent />,
  // Vision
  "avis-format": () => <SC.AvisFormatContent />,
  "vision-query": () => <SC.VisionQueryContent />,
  "vision-capture": () => <SC.VisionCaptureContent />,
  "ui-state-blindness": () => <SC.UiBlindnessContent />,
  "vision-compare": () => <SC.VisionCompareContent />,
  "vision-diff": () => <SC.VisionDiffContent />,
  "vision-similar": () => <SC.VisionSimilarContent />,
  "quality-score": () => <SC.QualityScoreContent />,
  "vision-health": () => <SC.VisionHealthContent />,
  "vision-link": () => <SC.VisionLinkContent />,
  "non-text-signal": () => <SC.NonTextSignalContent />,
  "parameter-safety": () => <SC.ParameterSafetyContent />,
  // Codebase
  "impact-edges": () => <SC.ImpactEdgesContent />,
  "called-by-calls": () => <SC.CalledByContent />,
  "tests-edges": () => <SC.TestsEdgesContent />,
  "contains-edges": () => <SC.ContainsEdgesContent />,
  "couples-with": () => <SC.CouplesWithContent />,
  "prophecy": () => <SC.ProphecyContent />,
  "stability-scoring": () => <SC.StabilityScoringContent />,
  "change-velocity": () => <SC.ChangeVelocityContent />,
  "concept-edges": () => <SC.ConceptEdgesContent />,
  "symbol-lookup": () => <SC.SymbolLookupContent />,
  "type-hierarchy": () => <SC.TypeHierarchyContent />,
  "ffi-binds": () => <SC.FfiBindsContent />,
  "multi-language": () => <SC.MultiLanguageContent />,
  "pattern-sharing": () => <SC.PatternSharingContent />,
  "common-mistake-detection": () => <SC.CommonMistakeContent />,
  "library-guidance": () => <SC.LibraryGuidanceContent />,
  "acb-gate": () => <SC.AcbGateContent />,
  "acb-budget": () => <SC.AcbBudgetContent />,
  "test-gap": () => <SC.TestGapContent />,
  "health-diagnostics": () => <SC.HealthDiagnosticsContent />,
  // Identity
  "identity-anchors": () => <SC.IdentityAnchorsContent />,
  "action-receipts": () => <SC.ActionReceiptsContent />,
  "receipt-chains": () => <SC.ReceiptChainsContent />,
  "key-derivation": () => <SC.KeyDerivationContent />,
  "trust-grants": () => <SC.TrustGrantsContent />,
  "trust-delegation": () => <SC.TrustDelegationContent />,
  "trust-revocation": () => <SC.TrustRevocationContent />,
  "receipt-verification": () => <SC.ReceiptVerificationContent />,
  "multi-llm-portability": () => <SC.MultiLlmPortabilityContent />,
  "aid-file-format": () => <SC.AidFileFormatContent />,
  "encrypted-at-rest": () => <SC.EncryptedAtRestContent />,
  "identity-parameter-safety": () => <SC.IdentityParameterSafetyContent />,
  // Time
  "deadlines": () => <SC.DeadlinesContent />,
  "schedules": () => <SC.SchedulesContent />,
  "sequences": () => <SC.SequencesContent />,
  "duration-estimates": () => <SC.DurationEstimatesContent />,
  "decay-models": () => <SC.DecayModelsContent />,
  "time-slots": () => <SC.TimeSlotsContent />,
  "conflict-detection": () => <SC.ConflictDetectionContent />,
  "timeline-forks": () => <SC.TimelineForksContent />,
  "temporal-debt": () => <SC.TemporalDebtContent />,
  "chrono-gravity": () => <SC.ChronoGravityContent />,
  "temporal-anomalies": () => <SC.TemporalAnomaliesContent />,
  "atime-format": () => <SC.AtimeFormatContent />,
  "ghost-writer": () => <SC.GhostWriterContent />,
  "multi-llm": () => <SC.MultiLlmContent />,
  // Contract
  "policy-engine": () => <SC.PolicyEngineContent />,
  "risk-limits": () => <SC.RiskLimitsContent />,
  "approval-workflows": () => <SC.ApprovalWorkflowsContent />,
  "obligation-tracking": () => <SC.ObligationTrackingContent />,
  "violation-detection": () => <SC.ViolationDetectionContent />,
  "conditional-execution": () => <SC.ConditionalExecutionContent />,
  "contract-signing": () => <SC.ContractSigningContent />,
  "self-healing-contracts": () => <SC.SelfHealingContractsContent />,
  "smart-escalation": () => <SC.SmartEscalationContent />,
  "violation-archaeology": () => <SC.ViolationArchaeologyContent />,
  "temporal-contracts": () => <SC.TemporalContractsContent />,
  "acon-format": () => <SC.AconFormatContent />,
  "contract-multi-llm": () => <SC.ContractMultiLlmContent />,
  // Comm
  "channel-topology": () => <SC.ChannelTopologyContent />,
  "typed-messages": () => <SC.TypedMessagesContent />,
  "delivery-semantics": () => <SC.DeliverySemanticsContent />,
  "session-coordination": () => <SC.SessionCoordinationContent />,
  "search-and-history": () => <SC.SearchAndHistoryContent />,
  "portable-artifact": () => <SC.PortableArtifactContent />,
}

const ALL_TOGETHER_MAP: Record<string, () => React.ReactNode> = {
  "agentic-memory": () => <SC.MemoryAllTogetherContent />,
  "agentic-vision": () => <SC.VisionAllTogetherContent />,
  "agentic-codebase": () => <SC.CodebaseAllTogetherContent />,
  "agentic-identity": () => <SC.IdentityAllTogetherContent />,
  "agentic-time": () => <SC.TimeAllTogetherContent />,
  "agentic-contract": () => <SC.ContractAllTogetherContent />,
  "agentic-comm": () => <SC.CommAllTogetherContent />,
}

const ALL_TOGETHER_PLAIN: Record<string, string> = {
  "agentic-memory":
    "This is the difference between an amnesiac firefighter who forgets each blaze and a seasoned veteran who remembers every incident, knows which patterns repeat, and gets faster with every call. AgenticMemory turns throwaway conversations into compounding institutional intelligence.",
  "agentic-vision":
    "This is the difference between a developer who says \"something looks off\" and one who says \"here's the before screenshot, here's the after, here are the three regions that changed, and here's exactly when it broke.\" AgenticVision turns visual debugging from guesswork into forensics.",
  "agentic-codebase":
    "This is the difference between refactoring with a flashlight and refactoring with floodlights. AgenticCodebase doesn't just understand the code you're changing — it understands everything connected to it, everything that changed with it, and everything that might break because of it.",
  "agentic-identity":
    "This is the difference between trusting a log entry and holding a signed receipt. AgenticIdentity doesn't just record what happened — it cryptographically proves which agent acted, who authorized it, and that nobody tampered with the record. Every action has a signature. Every delegation has a scope. Every audit trail is tamper-evident.",
  "agentic-time":
    "This is the difference between an agent that says \"this weekend\" and one that says \"Sunday 02:00-06:00 UTC is your only 4-hour window, the PERT estimate is 3.5h, and every day of delay adds 1.4x compounding cost.\" AgenticTime turns vague temporal reasoning into precise scheduling with deadlines, decay models, and timeline fork analysis.",
  "agentic-contract":
    "This is the difference between an agent that acts first and asks forgiveness later, and one that checks policies, respects risk limits, routes approvals, and tracks obligations before taking action. AgenticContract turns ungoverned agent behavior into auditable, policy-compliant operations with self-healing governance that learns from every violation.",
  "agentic-comm":
    "This is the difference between agents that pass unstructured text files around hoping the other agent reads them, and agents that communicate through named channels with ordered messages, subscriptions, search, and broadcast — all in one portable file. AgenticComm turns ad-hoc agent coordination into structured, searchable, replayable communication.",
}

function getConfig(sister: string) {
  switch (sister) {
    case "agentic-vision":
      return { hero: VISION_HERO, groups: VISION_SCENARIOS, repo: "https://github.com/agentralabs/agentic-vision" }
    case "agentic-codebase":
      return { hero: CODEBASE_HERO, groups: CODEBASE_SCENARIOS, repo: "https://github.com/agentralabs/agentic-codebase" }
    case "agentic-identity":
      return { hero: IDENTITY_HERO, groups: IDENTITY_SCENARIOS, repo: "https://github.com/agentralabs/agentic-identity" }
    case "agentic-time":
      return { hero: TIME_HERO, groups: TIME_SCENARIOS, repo: "https://github.com/agentralabs/agentic-time" }
    case "agentic-contract":
      return { hero: CONTRACT_HERO, groups: CONTRACT_SCENARIOS, repo: "https://github.com/agentralabs/agentic-contract" }
    case "agentic-comm":
      return { hero: COMM_HERO, groups: COMM_SCENARIOS, repo: "https://github.com/agentralabs/agentic-comm" }
    default:
      return { hero: MEMORY_HERO, groups: MEMORY_SCENARIOS, repo: "https://github.com/agentralabs/agentic-memory" }
  }
}

/* ── Individual capability accordion tile ── */

function ScenarioTile({
  id,
  title,
  hook,
  plainTerms,
  index,
}: {
  id: string
  title: string
  hook: string
  plainTerms: string
  index: number
}) {
  const [open, setOpen] = useState(false)
  const contentFn = CONTENT_MAP[id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease }}
      className="border-2 border-foreground bg-background"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 group"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-mono font-bold uppercase tracking-tight text-foreground">
            {title}
          </p>
          <p className="mt-1.5 text-xs font-mono text-muted-foreground leading-relaxed">
            {hook}
          </p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease }}
          className="mt-1 shrink-0"
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border">
              {/* Rich formatted content */}
              {contentFn ? contentFn() : null}

              {/* In plain terms */}
              <div className="mt-5 border-l-2 border-[#ea580c] pl-4 py-2">
                <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#ea580c] mb-1">
                  In plain terms
                </p>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  {plainTerms}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Main exported page component ── */

export function ScenarioPageView({ sister }: { sister: string }) {
  const { hero, groups, repo } = getConfig(sister)
  const allTogetherFn = ALL_TOGETHER_MAP[sister]
  const allTogetherPlain = ALL_TOGETHER_PLAIN[sister]
  const totalCapabilities = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <div className="w-full">
      {/* ── Back link ── */}
      <section className="w-full px-6 pt-6 lg:px-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} />
          Back to Projects
        </Link>
      </section>

      {/* ── Hero ── */}
      <section className="w-full px-6 pt-6 pb-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            {"// SECTION: CAPABILITY_SCENARIOS"}
          </span>
          <div className="flex-1 border-t border-border" />
          <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            012
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="border-2 border-foreground p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#ea580c] text-background text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono">
              SCENARIOS
            </span>
            <span className="text-[10px] tracking-[0.15em] font-mono text-muted-foreground uppercase">
              {hero.artifact} artifact
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-3xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="flex items-center gap-6 mt-6">
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
              {totalCapabilities} capabilities
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
              Click to explore each
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── Capability groups ── */}
      {groups.map((group, gi) => {
        let idx = 0
        for (let g = 0; g < gi; g++) idx += groups[g].items.length

        return (
          <section key={group.label} className="w-full px-6 pb-10 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                {group.label}
              </span>
              <div className="flex-1 border-t border-border" />
              <span className="text-[10px] tracking-[0.2em] font-mono text-muted-foreground">
                {group.items.length}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0">
              {group.items.map((item, i) => (
                <ScenarioTile
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  hook={item.hook}
                  plainTerms={item.plainTerms}
                  index={idx + i}
                />
              ))}
            </div>
          </section>
        )
      })}

      {/* ── All Together Now ── */}
      {allTogetherFn && (
        <section className="w-full px-6 pb-16 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#ea580c] font-mono">
              All Together Now
            </span>
            <div className="flex-1 border-t border-[#ea580c]/30" />
            <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease }}
            className="border-2 border-[#ea580c]/40 bg-foreground/[0.02] p-6 lg:p-8"
          >
            {allTogetherFn()}

            {/* In plain terms */}
            {allTogetherPlain && (
              <div className="mt-6 border-l-2 border-[#ea580c] pl-4 py-2">
                <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#ea580c] mb-1">
                  In plain terms
                </p>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  {allTogetherPlain}
                </p>
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <motion.a
              href={repo}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase"
            >
              <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
                <ArrowRight size={14} strokeWidth={2} className="text-background" />
              </span>
              <span className="flex-1 py-2.5 px-6">View Repo</span>
            </motion.a>
            <Link
              href="/projects"
              className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-foreground text-xs font-mono tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Explore Capacity Surface
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

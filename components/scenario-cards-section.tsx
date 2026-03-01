"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

interface Scenario {
  question: string
  without: string
  withLabel: string
  withResponse: string
  href: string
}

const SCENARIOS: Scenario[] = [
  {
    question: '"Why did you recommend Python last week?"',
    without: '"I don\'t have access to previous conversations."',
    withLabel: "WITH AGENTICMEMORY",
    withResponse:
      '"I recommended Python because: (1) your team has no Rust experience [fact from session 12], (2) deadline was two weeks [fact from session 12], (3) existing codebase is Python [fact from session 8]. Three facts. One chain."',
    href: "/projects/scenarios/agentic-memory",
  },
  {
    question: '"The checkout button stopped working yesterday"',
    without: '"I can\'t see your UI. Can you describe what\'s happening?"',
    withLabel: "WITH AGENTICVISION",
    withResponse:
      '"Comparing captures from Tuesday vs Wednesday: the button moved 12px left, z-index dropped to 10, and a new modal overlay now covers it. CSS change in commit af7c2 caused this. Quality score: 0.94."',
    href: "/projects/scenarios/agentic-vision",
  },
  {
    question: '"Refactor the payment flow for multiple currencies"',
    without:
      'Agent greps for "payment." Finds 150 files. Edits some. Hopes tests catch what it missed.',
    withLabel: "WITH AGENTICCODEBASE",
    withResponse:
      '"Before I write code: 23 callers need updates. audit_log has 91% co-change coupling with no test coverage. The Stripe wrapper assumes USD at the FFI layer. Stability score: 0.41. Want a migration plan first?"',
    href: "/projects/scenarios/agentic-codebase",
  },
  {
    question: '"Which agent authorized that production deployment?"',
    without:
      'No agent identity exists. API keys are shared. Logs show a token was used but not which agent acted or why.',
    withLabel: "WITH AGENTICIDENTITY",
    withResponse:
      '"Agent deploy-bot-7 (anchor a3f8...c2) signed receipt #1847 at 14:32:07 UTC. Trust grant from ops-lead (anchor 91b2...e4) scoped to deploy:staging,deploy:prod with 24h TTL. Full receipt chain: 3 hops, all signatures valid."',
    href: "/projects/scenarios/agentic-identity",
  },
  {
    question: '"When can we schedule the database migration without conflicts?"',
    without:
      'Agent has no concept of time. It suggests "this weekend" without checking existing schedules, deadlines, or team availability.',
    withLabel: "WITH AGENTICTIME",
    withResponse:
      '"Analyzing temporal state: 3 hard deadlines within 7 days, 2 recurring schedules overlap Saturday. Available 4-hour window: Sunday 02:00-06:00 UTC. PERT estimate for migration: optimistic 2h, expected 3.5h, pessimistic 6h. Temporal debt on deferred schema changes: 1.4x compounding. Recommend the Sunday window with rollback sequence pre-staged."',
    href: "/projects/scenarios/agentic-time",
  },
  {
    question: '"Can this agent deploy to production without approval?"',
    without:
      'No governance layer exists. The agent has the API key, so it deploys. No policy check, no risk limit, no approval workflow. Hope nothing breaks.',
    withLabel: "WITH AGENTICCONTRACT",
    withResponse:
      '"Policy check: deploy:production requires approval from ops-lead. Risk limit: 3/5 daily deployments used (budget limit). Obligation: post-deploy monitoring required within 30 minutes. Auto-creating approval request #47 with smart escalation to on-call approver. Estimated approval likelihood: 87% based on prior patterns."',
    href: "/projects/scenarios/agentic-contract",
  },
  {
    question: '"How do I coordinate three agents working on the same feature?"',
    without:
      'Agents write to shared text files. Messages are unstructured. No ordering guarantee. No subscriptions. One agent overwrites another\'s output.',
    withLabel: "WITH AGENTICCOMM",
    withResponse:
      '"Created channel #feature-auth with 3 subscribers. Task message sent to planner agent, acknowledged in 40ms. Worker agent subscribed to task channel, received assignment with typed payload. Status broadcast sent to all: 2/3 subtasks complete. Full message history searchable in .acomm artifact."',
    href: "/projects/scenarios/agentic-comm",
  },
]

function ScenarioCard({ scenario, index }: { scenario: Scenario; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease }}
      className="border-2 border-foreground bg-background"
    >
      <div className="px-5 py-4 border-b-2 border-foreground">
        <p className="text-sm font-mono font-bold text-foreground">{scenario.question}</p>
      </div>

      <div className="px-5 py-4 border-b border-border">
        <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">
          WITHOUT
        </span>
        <p className="text-xs font-mono text-muted-foreground mt-2 leading-relaxed italic">
          {scenario.without}
        </p>
      </div>

      <div className="px-5 py-4">
        <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-[#ea580c]">
          {scenario.withLabel}
        </span>
        <p className="text-xs font-mono text-foreground mt-2 leading-relaxed">
          {scenario.withResponse}
        </p>
      </div>

      <div className="px-5 pb-4">
        <Link
          href={scenario.href}
          className="group inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[#ea580c] hover:underline"
        >
          Read Full Scenario
          <ArrowRight size={12} strokeWidth={2} />
        </Link>
      </div>
    </motion.div>
  )
}

export function ScenarioCardsSection() {
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
          {"// SECTION: LIVE_SCENARIOS"}
        </span>
        <div className="flex-1 border-t border-border" />
        <BlinkDot />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          002
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
          See what changes
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-lg">
          These aren&apos;t feature lists. These are before-and-after scenarios showing how agents
          behave with and without the Agentra stack.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCENARIOS.map((scenario, i) => (
          <ScenarioCard key={scenario.withLabel} scenario={scenario} index={i} />
        ))}
      </div>
    </section>
  )
}

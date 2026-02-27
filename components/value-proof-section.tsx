import Link from "next/link"

const proofCards = [
  {
    id: "memory",
    title: "AgenticMemory",
    kicker: "Long-horizon memory that stays usable",
    claim:
      "With budget policy and rollup, teams can target multi-year continuity instead of losing context every quarter.",
    proof: [
      "2 GB over 20 years is about 287 KB/day budget",
      "2 GB over 18 years is about 319 KB/day budget",
      "safe/full/off capture modes let teams tune depth vs growth",
    ],
    href: "/docs/en/memory-experience-with-vs-without",
  },
  {
    id: "codebase",
    title: "AgenticCodebase",
    kicker: "Release risk triage before merge",
    claim:
      "Instead of manual guessing, teams get ranked risk and explicit reasons for where to harden first.",
    proof: [
      "prophecy/test-gap/hotspots/coupling expose fragile units",
      "acb gate supports CI policy enforcement",
      "graph artifacts stay portable across teams and tools",
    ],
    href: "/docs/en/codebase-experience-with-vs-without",
  },
  {
    id: "vision",
    title: "AgenticVision",
    kicker: "Visual incidents become queryable",
    claim:
      "When logs are not enough, teams can capture, query, OCR, diff, and link visual state through MCP workflows.",
    proof: [
      "MCP visual surface includes capture/query/ocr/diff tools",
      "runtime validation is available from the vision REPL",
      "budget policy controls long-term visual storage growth",
    ],
    href: "/docs/en/vision-experience-with-vs-without",
  },
] as const

const identityCard = {
  id: "identity",
  title: "AgenticIdentity",
  kicker: "Every agent action gets a signed receipt",
  claim:
    "API keys are shared secrets with no audit trail. AgenticIdentity gives every agent a cryptographic anchor so every action is signed, scoped, and verifiable.",
  proof: [
    "Ed25519 identity anchors are deterministic and portable",
    "trust grants scope delegation with TTL and revocation",
    "signed receipt chains form tamper-evident audit trails",
  ],
  href: "/docs/en/identity-experience-with-vs-without",
} as const

const timeCard = {
  id: "time",
  title: "AgenticTime",
  kicker: "Deadlines and schedules become queryable state",
  claim:
    "Agents have no clock. They suggest \"this weekend\" without checking calendars, conflicts, or compounding debt. AgenticTime gives every agent temporal reasoning so scheduling decisions are grounded in real constraints.",
  proof: [
    "5 entity types: Duration, Deadline, Schedule, Sequence, Decay",
    "PERT estimation with optimistic/expected/pessimistic bounds",
    "temporal debt models track compounding cost of deferred work",
  ],
  href: "/docs/en/time-experience-with-vs-without",
} as const

export function ValueProofSection() {
  return (
    <section className="w-full px-6 py-16 lg:px-12" aria-label="Proof of value">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: PROOF_OF_VALUE"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">003A</span>
      </div>

      <div className="border-2 border-foreground p-5 lg:p-6 mb-6 bg-background">
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance">
          Why teams switch to the Agentra Systems
        </h2>
        <p className="mt-3 text-sm font-mono text-muted-foreground leading-relaxed max-w-4xl">
          These systems are built for one outcome: less repeated work, fewer blind releases, and faster incident
          resolution. The links below show real with-vs-without simulations with commands, tradeoffs, and practical
          operating limits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-foreground">
        {proofCards.map((card, idx) => (
          <article
            key={card.id}
            className={
              "p-5 lg:p-6 border-foreground bg-background " +
              (idx < proofCards.length - 1 ? "border-b-2 lg:border-b-0 lg:border-r-2" : "")
            }
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{card.kicker}</p>
            <h3 className="mt-2 text-xl font-mono font-bold tracking-tight">{card.title}</h3>
            <p className="mt-3 text-sm font-mono text-muted-foreground leading-relaxed">{card.claim}</p>

            <ul className="mt-4 space-y-2">
              {card.proof.map((item) => (
                <li key={item} className="text-xs font-mono text-muted-foreground leading-relaxed">
                  <span className="text-[#ea580c]">■</span> {item}
                </li>
              ))}
            </ul>

            <Link
              href={card.href}
              className="mt-5 inline-flex items-center gap-2 border border-foreground px-3 py-2 text-[11px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors"
            >
              Read full proof
            </Link>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-t-0 border-foreground">
        <article className="p-5 lg:p-6 border-foreground bg-background border-b-2 lg:border-b-0 lg:border-r-2">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{identityCard.kicker}</p>
          <h3 className="mt-2 text-xl font-mono font-bold tracking-tight">{identityCard.title}</h3>
          <p className="mt-3 text-sm font-mono text-muted-foreground leading-relaxed">{identityCard.claim}</p>

          <ul className="mt-4 space-y-2">
            {identityCard.proof.map((item) => (
              <li key={item} className="text-xs font-mono text-muted-foreground leading-relaxed">
                <span className="text-[#ea580c]">■</span> {item}
              </li>
            ))}
          </ul>

          <Link
            href={identityCard.href}
            className="mt-5 inline-flex items-center gap-2 border border-foreground px-3 py-2 text-[11px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors"
          >
            Read full proof
          </Link>
        </article>
        <article className="p-5 lg:p-6 border-foreground bg-background">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{timeCard.kicker}</p>
          <h3 className="mt-2 text-xl font-mono font-bold tracking-tight">{timeCard.title}</h3>
          <p className="mt-3 text-sm font-mono text-muted-foreground leading-relaxed">{timeCard.claim}</p>

          <ul className="mt-4 space-y-2">
            {timeCard.proof.map((item) => (
              <li key={item} className="text-xs font-mono text-muted-foreground leading-relaxed">
                <span className="text-[#ea580c]">■</span> {item}
              </li>
            ))}
          </ul>

          <Link
            href={timeCard.href}
            className="mt-5 inline-flex items-center gap-2 border border-foreground px-3 py-2 text-[11px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors"
          >
            Read full proof
          </Link>
        </article>
      </div>
    </section>
  )
}

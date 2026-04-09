interface QueryRow {
  id: number
  query: string
  answer: string
  status: string
}

const MEMORY_ENGINE: QueryRow[] = [
  { id: 1, query: "Traversal", answer: "Why did I decide this?", status: "Operational" },
  { id: 2, query: "Pattern", answer: "Show me all decisions from last week", status: "Operational" },
  { id: 3, query: "Temporal", answer: "What changed between session 5 and 20?", status: "Operational" },
  { id: 4, query: "Causal / Impact", answer: "What breaks if this fact is wrong?", status: "Operational" },
  { id: 5, query: "Similarity", answer: "What else do I know about this topic?", status: "Operational" },
  { id: 6, query: "Context", answer: "Give me everything around this node", status: "Operational" },
  { id: 7, query: "Resolve", answer: "What is the current truth?", status: "Operational" },
  { id: 8, query: "BM25 Text Search", answer: "Find memories containing these words", status: "Operational" },
  { id: 9, query: "Hybrid Search", answer: "BM25 + vector fused ranking", status: "Operational" },
  { id: 10, query: "Graph Centrality", answer: "What are my foundational beliefs?", status: "Operational" },
  { id: 11, query: "Shortest Path", answer: "How are these concepts connected?", status: "Operational" },
  { id: 12, query: "Belief Revision", answer: "If I learn X, what breaks?", status: "Operational" },
  { id: 13, query: "Reasoning Gaps", answer: "Where am I guessing?", status: "Operational" },
  { id: 14, query: "Analogical", answer: "Have I solved something like this before?", status: "Operational" },
  { id: 15, query: "Consolidation", answer: "Clean and strengthen my brain", status: "Operational" },
  { id: 16, query: "Drift Detection", answer: "How has my understanding shifted?", status: "Operational" },
]

const EVENT_TYPES = [
  "FACT \u2014 learned truth about user, system, or world state.",
  "DECISION \u2014 selected action and why it was chosen.",
  "INFERENCE \u2014 synthesized conclusion from multiple events.",
  "CORRECTION \u2014 explicit update that supersedes prior belief.",
  "SKILL \u2014 procedural pattern for execution in context.",
  "EPISODE \u2014 compressed session-level meaning summary.",
]

/**
 * Full AgenticMemory deep-dive panels.
 * Used on both the homepage (compact=true shows fewer panels) and projects page (compact=false shows all).
 */
export function MemoryCapacity({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Memory Is Not Search</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Most systems treat memory as retrieval over flattened text chunks. AgenticMemory treats memory as graph
          cognition: nodes for what the agent learned or decided, edges for why those events connect, and traversal for
          reasoning history.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Atom: Cognitive Event</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          The smallest memory unit is a cognitive event, not a transcript chunk: FACT, DECISION, INFERENCE,
          CORRECTION, SKILL, and EPISODE. Each event is written with confidence, timestamps, access dynamics, feature
          vectors, and direct edge references for O(1) node access.
        </p>
        <div className="mt-3 border border-foreground overflow-hidden">
          {EVENT_TYPES.map((row) => (
            <div key={row} className="px-3 py-2 text-xs font-mono text-muted-foreground border-b border-border last:border-b-0">
              {row}
            </div>
          ))}
        </div>
      </div>

      {!compact && (
        <div className="border-2 border-foreground p-4">
          <p className="text-sm font-mono font-bold uppercase tracking-tight">Edges Make It A Brain</p>
          <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
            Relationship edges encode causality and truth evolution: CAUSED_BY, SUPPORTS, CONTRADICTS, SUPERSEDES,
            RELATED_TO, PART_OF, TEMPORAL_NEXT. This preserves why decisions happened and what changed over time.
          </p>
        </div>
      )}

      {!compact && (
        <div className="border-2 border-foreground p-4">
          <p className="text-sm font-mono font-bold uppercase tracking-tight">One File, Memory-Mappable</p>
          <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
            {`\`.amem\``} is a binary graph file with header, node table, edge table, content block, vectors, and indexes.
            It is memory-mappable, portable, and query-ready without external databases or managed vector services.
          </p>
        </div>
      )}

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Full Query Engine</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Querying is navigation, not blind similarity. The engine supports traversal, temporal diffing, causal impact,
          contradiction resolution, pattern recall, and structural gap detection.
        </p>
      </div>

      <div className="border-2 border-foreground overflow-hidden">
        <div className="grid grid-cols-[70px_1fr_1fr_140px] border-b-2 border-foreground">
          <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">#</span>
          <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Query Type</span>
          <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">What It Answers</span>
          <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Status</span>
        </div>
        {MEMORY_ENGINE.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[70px_1fr_1fr_140px] border-b border-border last:border-b-0"
          >
            <span className="px-3 py-2 text-xs font-mono">{row.id}</span>
            <span className="px-3 py-2 text-xs font-mono">{row.query}</span>
            <span className="px-3 py-2 text-xs font-mono text-muted-foreground">{row.answer}</span>
            <span className="px-3 py-2 text-xs font-mono text-[#ea580c]">{row.status}</span>
          </div>
        ))}
      </div>

      {!compact && (
        <>
          <div className="border-2 border-foreground p-4">
            <p className="text-sm font-mono font-bold uppercase tracking-tight">Memory Formation Pipeline</p>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
              After each interaction the system extracts events, links them to existing cognition, updates confidence and
              decay, writes an EPISODE compression node, and incrementally refreshes indexes. Memory formation runs
              asynchronously so response latency remains stable.
            </p>
          </div>

          <div className="border-2 border-foreground p-4">
            <p className="text-sm font-mono font-bold uppercase tracking-tight">Portable Agent Brain</p>
            <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
              Your {`\`.amem\``} travels across agents and environments. Knowledge continuity belongs to you, not to a single
              assistant vendor. Any compatible runtime can mount the same cognitive history with causal context intact.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

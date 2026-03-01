export interface ScenarioItem {
  id: string
  title: string
  hook: string
  plainTerms: string
  content: React.ReactNode
}

export interface ScenarioGroup {
  label: string
  items: ScenarioItem[]
}

export const COMM_HERO = {
  title: "AgenticComm",
  subtitle:
    "What happens when AI agents coordinate through structured channels with typed messages, acknowledgments, and replayable history in one portable file?",
  artifact: ".acomm",
}

export const COMM_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Core Communication",
    items: [
      {
        id: "channel-topology",
        title: "Channel Topology",
        hook: "Direct, group, broadcast, and pub/sub channels in one runtime",
        plainTerms:
          "Agents do not need ad-hoc sockets or one-off message files. They join named channels with explicit topology and clear participant boundaries.",
        content: null,
      },
      {
        id: "typed-messages",
        title: "Typed Message Flow",
        hook: "Commands, queries, responses, notifications, and acknowledgments",
        plainTerms:
          "Message type provides operational intent. A command can require acknowledgment, a query can require a response, and notifications can be fire-and-forget.",
        content: null,
      },
      {
        id: "delivery-semantics",
        title: "Delivery Semantics",
        hook: "Ordering, acknowledgments, retries, and dead-letter handling",
        plainTerms:
          "Communication behavior is explicit and testable. Agents can reason about at-least-once delivery and replay without hidden state.",
        content: null,
      },
    ],
  },
  {
    label: "Runtime Operations",
    items: [
      {
        id: "session-coordination",
        title: "Session Coordination",
        hook: "Start/end session boundaries with contextual logging",
        plainTerms:
          "Communication actions are linked to session lifecycle so operators can audit exactly what happened and why a flow took a given path.",
        content: null,
      },
      {
        id: "search-and-history",
        title: "Search and History",
        hook: "Fast retrieval by channel, time, sender, or content pattern",
        plainTerms:
          "Teams can reconstruct the path to a production decision without relying on transient chat windows or cloud logs.",
        content: null,
      },
      {
        id: "portable-artifact",
        title: ".acomm Artifact Portability",
        hook: "One file carries channels, messages, indexes, and integrity checks",
        plainTerms:
          "The communication layer stays portable across environments and models. Copy the file, and the coordination context moves with it.",
        content: null,
      },
    ],
  },
]

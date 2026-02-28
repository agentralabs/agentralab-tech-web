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

export const TIME_HERO = {
  title: "AgenticTime",
  subtitle: "What happens when an AI agent can reason about deadlines, schedules, sequences, duration estimates, and temporal decay — all in a single portable file?",
  artifact: ".atime",
}

export const TIME_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Core Temporal Modelling",
    items: [
      {
        id: "deadlines",
        title: "Deadline Tracking",
        hook: "Hard and soft deadlines with consequences — the agent knows what's overdue before you do.",
        plainTerms:
          "Deadline tracking gives the agent a built-in clock with teeth. Each deadline carries a type (hard or soft), a consequence if missed, and automatic status transitions. The agent doesn't just remember due dates — it understands the blast radius of missing them.",
        content: null,
      },
      {
        id: "schedules",
        title: "Recurring Schedules",
        hook: "Daily, weekly, cron-style recurrence with priority levels and conflict detection.",
        plainTerms:
          "Recurring schedules turn the agent into a calendar that thinks. It models daily standups, weekly reviews, and custom cron patterns, detects conflicts before they happen, and reschedules gracefully when priorities shift.",
        content: null,
      },
      {
        id: "sequences",
        title: "Step Sequences",
        hook: "Ordered multi-step workflows with automatic advancement and status tracking.",
        plainTerms:
          "Step sequences give the agent a recipe book with built-in progress tracking. Each step knows whether it's pending, active, completed, or skipped. The agent advances through workflows methodically, never losing its place even across sessions.",
        content: null,
      },
      {
        id: "duration-estimates",
        title: "PERT Duration Estimates",
        hook: "Three-point estimation (optimistic, expected, pessimistic) using the PERT model.",
        plainTerms:
          "Duration estimates use the PERT model — the same technique NASA uses for project planning. Give the agent an optimistic, expected, and pessimistic duration, and it calculates a weighted average that accounts for uncertainty without ignoring best-case or worst-case scenarios.",
        content: null,
      },
    ],
  },
  {
    label: "Temporal Intelligence",
    items: [
      {
        id: "decay-models",
        title: "Temporal Decay",
        hook: "Exponential, linear, and step-function decay — values that fade over time like real-world relevance.",
        plainTerms:
          "Temporal decay models the way information loses relevance over time. A breaking news alert decays exponentially, a quarterly report decays in steps, and a grocery list decays linearly. The agent knows which facts are still fresh and which have gone stale.",
        content: null,
      },
      {
        id: "time-slots",
        title: "Available Time Slots",
        hook: "Query engine that finds free windows across overlapping schedules and deadlines.",
        plainTerms:
          "Time slot queries let the agent find open windows in a crowded calendar. It considers all active schedules, upcoming deadlines, and in-progress sequences to find the gaps where new work can actually fit — like a personal assistant who's read every calendar.",
        content: null,
      },
      {
        id: "conflict-detection",
        title: "Schedule Conflict Detection",
        hook: "Automatic detection of overlapping schedules and deadline collisions.",
        plainTerms:
          "Conflict detection catches scheduling collisions before they cause problems. When two meetings overlap or a deadline falls during a blocked-out period, the agent raises a flag immediately — no more double-booking or impossible timelines.",
        content: null,
      },
    ],
  },
  {
    label: "Temporal Advanced Tools",
    items: [
      {
        id: "timeline-forks",
        title: "Timeline Forks",
        hook: "Branch-and-explore temporal reasoning — what-if analysis for time-sensitive decisions.",
        plainTerms:
          "Timeline forks let the agent explore alternate futures without committing. Like a chess player thinking several moves ahead, the agent can branch a timeline, simulate different scheduling decisions, and compare outcomes before choosing the best path.",
        content: null,
      },
      {
        id: "temporal-debt",
        title: "Temporal Debt",
        hook: "Compound interest on deferred work — the agent calculates the true cost of procrastination.",
        plainTerms:
          "Temporal debt models the hidden cost of putting things off. Like financial debt that accrues interest, deferred tasks grow more expensive over time. The agent tracks the compounding penalty and recommends payoff strategies before the debt becomes unmanageable.",
        content: null,
      },
      {
        id: "chrono-gravity",
        title: "Chrono-Gravity",
        hook: "Urgent deadlines pull nearby tasks into their orbit — automatic priority warping.",
        plainTerms:
          "Chrono-gravity models how approaching deadlines distort the priority landscape. As a critical deadline gets closer, it pulls related tasks into a tighter orbit, automatically escalating their urgency. The agent doesn't just track deadlines — it feels their gravitational pull.",
        content: null,
      },
      {
        id: "temporal-anomalies",
        title: "Temporal Anomaly Detection",
        hook: "Impossible timelines, phantom deadlines, and temporal paradoxes caught automatically.",
        plainTerms:
          "Anomaly detection catches temporal impossibilities — deadlines before their start dates, sequences that loop forever, schedules that conflict with their own recurrence patterns. The agent flags these paradoxes before they corrupt downstream reasoning.",
        content: null,
      },
    ],
  },
  {
    label: "File Format and Portability",
    items: [
      {
        id: "atime-format",
        title: ".atime Binary Format",
        hook: "One portable file containing all temporal state — deadlines, schedules, sequences, decay models.",
        plainTerms:
          "The .atime file is a portable temporal brain. It stores all deadlines, schedules, sequences, duration estimates, and decay models in a single binary file with BLAKE3 checksums. Copy it to another machine, and the agent's entire temporal context comes with it.",
        content: null,
      },
      {
        id: "ghost-writer",
        title: "Ghost Writer Sync",
        hook: "5-second background sync to Claude, Cursor, Windsurf, and Cody memory directories.",
        plainTerms:
          "The Ghost Writer runs in the background, syncing temporal state to IDE memory directories every 5 seconds. Your deadlines and schedules are always available to whichever AI assistant you're using — Claude, Cursor, Windsurf, or Cody — without any manual export.",
        content: null,
      },
      {
        id: "multi-llm",
        title: "Multi-LLM Portability",
        hook: "The same .atime artifact works across Claude, GPT, Gemini, and any MCP-compatible runtime.",
        plainTerms:
          "Multi-LLM portability means your temporal reasoning isn't locked to one AI vendor. The same .atime file works with Claude today and GPT tomorrow. Your deadlines, schedules, and temporal models belong to your workflow, not your platform.",
        content: null,
      },
    ],
  },
]

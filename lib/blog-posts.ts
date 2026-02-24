export interface BlogPostSection {
  heading: string
  paragraphs: string[]
  command?: string
  imageSrc?: string
  imageAlt?: string
  imageCaption?: string
}

export interface BlogPost {
  slug: string
  title: string
  dateIso: string
  category: "Showcase" | "Research" | "Ecosystem"
  excerpt: string
  readTime: string
  tags: string[]
  sections: BlogPostSection[]
  links: { label: string; href: string }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "showcase-2026-02-20",
    title: "What Teams Are Building with Agentra",
    dateIso: "2026-02-20",
    category: "Showcase",
    excerpt:
      "A practical roundup of how teams use AgenticMemory, AgenticVision, and AgenticCodebase in real operations.",
    readTime: "6 min read",
    tags: ["Showcase", "MCP", "Operations"],
    sections: [
      {
        heading: "Why this matters for teams",
        paragraphs: [
          "Most teams do not fail from lack of model output. They fail from context resets, weak change visibility, and missing operational continuity.",
          "Agentra addresses this by combining persistent memory, visual runtime state, and semantic code intelligence into one usable operating surface.",
        ],
      },
      {
        heading: "Live runtime snapshot: code risk before merge",
        paragraphs: [
          "This command queries semantic graph intelligence to identify where a code change is likely to create risk before deployment.",
        ],
        command:
          "acb query project.acb prophecy --limit 5\nacb query project.acb impact --unit-id 42 --depth 3",
        imageSrc: "/images/blog/showcase-2026-02-20/codebase-query.png",
        imageAlt: "AgenticCodebase runtime output showing query results",
        imageCaption: "AgenticCodebase runtime query output captured from a live CLI session.",
      },
      {
        heading: "Live runtime snapshot: memory continuity",
        paragraphs: [
          "Teams use persistent `.amem` artifacts to carry decisions, constraints, and operational context across sessions and tools.",
        ],
        command:
          "amem add team.amem decision \"Use merge-only MCP config updates\" --session 7 --confidence 0.88\namem search team.amem \"MCP config\"",
        imageSrc: "/images/blog/showcase-2026-02-20/memory-add-search.png",
        imageAlt: "AgenticMemory runtime output showing add and search operations",
        imageCaption: "AgenticMemory runtime output from a real add + search workflow.",
      },
      {
        heading: "Live runtime snapshot: visual validation",
        paragraphs: [
          "When logs are not enough, teams run visual capture/query workflows to detect UI drift and track state changes over time.",
        ],
        command:
          "agentic-vision-mcp\n# then use vision_capture + vision_query from MCP client",
        imageSrc: "/images/blog/showcase-2026-02-20/vision-runtime.png",
        imageAlt: "AgenticVision runtime output from visual workflow session",
        imageCaption: "AgenticVision runtime output from a live visual memory workflow.",
      },
      {
        heading: "What teams learn after month one",
        paragraphs: [
          "Early adoption patterns are consistent: teams start with one urgent workflow, then quickly realize the bigger gain comes from standardizing how decisions are captured, reviewed, and reused across shifts.",
          "The strongest operators stop treating assistants as isolated prompts. They treat them as operational participants with memory boundaries, escalation rules, and measurable outputs tied to cycle time, rework rate, and decision quality.",
          "The most expensive failures are rarely model failures. They are coordination failures: missing assumptions, unclear ownership, and no durable record of why a call was made under pressure.",
        ],
      },
      {
        heading: "Where this moves next",
        paragraphs: [
          "The next frontier is governance at runtime: policy-aware execution, auditable context transfer, and automatic checks before high-impact actions. This is where teams move from \"faster responses\" to dependable operations.",
          "Expect the stack to converge around three capabilities: persistent operational memory, graph-level code and process impact analysis, and visual-state verification for workflows where logs are insufficient.",
          "Teams that win here are not just shipping faster. They are reducing operational ambiguity, shortening recovery time after incidents, and turning institutional knowledge into a reusable system instead of a fragile human bottleneck.",
        ],
      },
    ],
    links: [
      { label: "Explore docs", href: "/docs" },
      { label: "View showcase", href: "/showcase" },
      { label: "Open GitHub org", href: "https://github.com/agentralabs" },
      { label: "Contact Agentra", href: "mailto:contact@agentralabs.tech" },
    ],
  },
  {
    slug: "ecosystem-2026-02-24",
    title: "What Agentra Is Building Right Now",
    dateIso: "2026-02-24",
    category: "Ecosystem",
    excerpt:
      "A clear look at where Agentra is investing today, why it matters in day-to-day operations, and what this shift means for teams running real systems.",
    readTime: "8 min read",
    tags: ["Ecosystem", "Platform", "Operations"],
    sections: [
      {
        heading: "The problem Agentra is focused on",
        paragraphs: [
          "Most teams are not blocked by model output alone. They are blocked by handoffs: context gets lost between tools, assumptions go undocumented, and decisions become hard to reproduce when the next shift picks up.",
          "Agentra is being built to reduce that operational gap. The platform combines persistent memory, code-level impact reasoning, and visual-state checks so teams can move from isolated responses to durable workflows.",
          "The practical objective is straightforward: fewer avoidable resets, clearer ownership under pressure, and decisions that remain explainable after the moment has passed.",
        ],
      },
      {
        heading: "What is active in the platform",
        paragraphs: [
          "At runtime, the core stack is centered around three sister systems: AgenticMemory for continuity, AgenticCodebase for semantic code intelligence, and AgenticVision for evidence-driven visual checks.",
          "Across the operator surface, CLI and TUI behavior is being tightened so status, takeover state, and control boundaries are visible without guesswork.",
          "At the integration layer, current work is focused on predictable MCP behavior across clients and environments, so deployment does not depend on fragile client-specific setup paths.",
        ],
      },
      {
        heading: "What this changes for teams",
        paragraphs: [
          "Teams adopting this model usually shift from prompt-by-prompt usage to workflow-by-workflow execution. Value moves from a single good answer to repeatable operating behavior.",
          "In practice, that tends to improve continuity, incident response speed, and cross-functional accountability because the same context is visible to engineers, operators, and reviewers.",
          "The upside is not only velocity. It is lower ambiguity, stronger operational trust, and fewer expensive misalignments when multiple systems and people need to converge quickly.",
        ],
      },
      {
        heading: "Current priorities",
        paragraphs: [
          "Current engineering focus is runtime reliability: better health diagnostics, safer automation defaults, and predictable behavior across terminal and desktop environments.",
          "Documentation is being treated as part of product quality, not a post-release artifact. The aim is to make workflows understandable to new operators while staying technically rigorous for advanced users.",
          "Each release cycle is therefore biased toward stability, integration consistency, and field-ready workflows that can survive real production constraints.",
        ],
      },
      {
        heading: "What to watch next",
        paragraphs: [
          "The next layer is governance at runtime: policy-aware execution and clearer audit trails for actions that influence planning, data quality, or deployment outcomes.",
          "You should also expect tighter coupling between memory records, code-impact analysis, and visual verification so multi-step decisions are backed by evidence rather than recollection.",
          "Finally, migration and operations tooling will continue to harden so updates become easier to validate, safer to roll back, and more trustworthy across environments.",
        ],
      },
    ],
    links: [
      { label: "Explore docs", href: "/docs" },
      { label: "Read releases", href: "/releases" },
      { label: "Open GitHub org", href: "https://github.com/agentralabs" },
      { label: "Contact Agentra", href: "mailto:contact@agentralabs.tech" },
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

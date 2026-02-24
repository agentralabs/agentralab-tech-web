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
        heading: "Weekly cadence and what comes next",
        paragraphs: [
          "This blog now follows a weekly editorial cadence: one practical post per week focused on real workflows, field outcomes, and operating lessons.",
          "Release notes stay in GitHub Releases. The website blog remains a readable public narrative for teams, institutions, and sponsors.",
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
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

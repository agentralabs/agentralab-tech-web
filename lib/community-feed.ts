import { cache } from "react"
import {
  featuredFeedback,
  integrationEntries,
  showcaseEntries,
  type FeedbackEntry,
  type FeedbackType,
  type IntegrationEntry,
  type ShowcaseEntry,
} from "@/lib/community"

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"
const OWNER = process.env.GITHUB_DISCUSSIONS_OWNER ?? "agentralabs"
const REPO = process.env.GITHUB_DISCUSSIONS_REPO ?? ".github"
const DISCUSSION_LIMIT = Number(process.env.GITHUB_DISCUSSIONS_LIMIT ?? "40")
const STRICT_CATEGORY_ROUTING = (process.env.GITHUB_DISCUSSIONS_STRICT_CATEGORY_ROUTING ?? "1") !== "0"
const FEEDBACK_CATEGORY_SLUGS = parseSlugList(process.env.GITHUB_FEEDBACK_CATEGORY_SLUGS ?? "feedback")
const SHOWCASE_CATEGORY_SLUGS = parseSlugList(process.env.GITHUB_SHOWCASE_CATEGORY_SLUGS ?? "showcase")
const INTEGRATION_CATEGORY_SLUGS = parseSlugList(process.env.GITHUB_INTEGRATIONS_CATEGORY_SLUGS ?? "integrations")

interface GitHubDiscussionNode {
  id: string
  title: string
  url: string
  createdAt: string
  bodyText: string
  category?: {
    name: string
    slug: string
  } | null
  author?: {
    login: string
    url: string
  } | null
}

interface CommunityFeed {
  source: "github" | "fallback"
  repoPath: string
  feedback: FeedbackEntry[]
  showcase: ShowcaseEntry[]
  integrations: IntegrationEntry[]
}

const DISCUSSIONS_QUERY = `
query RepoDiscussions($owner: String!, $repo: String!, $limit: Int!) {
  repository(owner: $owner, name: $repo) {
    discussions(first: $limit, orderBy: { field: UPDATED_AT, direction: DESC }) {
      nodes {
        id
        title
        url
        createdAt
        bodyText
        category {
          name
          slug
        }
        author {
          login
          url
        }
      }
    }
  }
}
`

function summarize(text: string, max = 180): string {
  const compact = text.replace(/\s+/g, " ").trim()
  if (!compact) return ""
  if (compact.length <= max) return compact
  return `${compact.slice(0, max - 1).trim()}...`
}

function parseSlugList(raw: string): string[] {
  return raw
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
}

function nodeCategorySlug(node: GitHubDiscussionNode): string {
  return (node.category?.slug ?? "").toLowerCase().trim()
}

function matchesAnyCategory(node: GitHubDiscussionNode, allowedSlugs: string[]): boolean {
  const slug = nodeCategorySlug(node)
  return !!slug && allowedSlugs.includes(slug)
}

function detectProject(text: string): "AgenticMemory" | "AgenticVision" | "AgenticCodebase" | "AgenticIdentity" | "AgenticTime" | "AgenticContract" | "AgenticComm" | "AgenticPlanning" {
  const lower = text.toLowerCase()
  if (lower.includes("planning") || lower.includes("strategy") || lower.includes(".aplan") || lower.includes("goal")) return "AgenticPlanning"
  if (lower.includes("comm") || lower.includes("channel") || lower.includes(".acomm") || lower.includes("messaging")) return "AgenticComm"
  if (lower.includes("contract") || lower.includes("governance") || lower.includes(".acon") || lower.includes("policy engine")) return "AgenticContract"
  if (lower.includes("time") || lower.includes("temporal") || lower.includes(".atime") || lower.includes("schedule")) return "AgenticTime"
  if (lower.includes("identity") || lower.includes("trust") || lower.includes(".aid") || lower.includes("receipt")) return "AgenticIdentity"
  if (lower.includes("vision") || lower.includes("cortex") || lower.includes(".avis")) return "AgenticVision"
  if (lower.includes("codebase") || lower.includes("acb") || lower.includes("semantic code")) return "AgenticCodebase"
  return "AgenticMemory"
}

function detectRuntime(text: string): IntegrationEntry["runtime"] {
  const lower = text.toLowerCase()
  if (lower.includes("mcp")) return "MCP"
  if (lower.includes("python") || lower.includes("pip")) return "Python"
  if (lower.includes("rust") || lower.includes("cargo")) return "Rust"
  if (lower.includes("rest") || lower.includes("http")) return "REST"
  return "CLI"
}

function detectIntegrationStatus(text: string): IntegrationEntry["status"] {
  const lower = text.toLowerCase()
  if (lower.includes("production") || lower.includes("live")) return "Production"
  if (lower.includes("pilot") || lower.includes("beta")) return "Pilot"
  return "Community"
}

function detectFeedbackType(text: string): FeedbackType {
  const lower = text.toLowerCase()
  if (lower.includes("bug")) return "Bug Report"
  if (lower.includes("feature") || lower.includes("request")) return "Feature Request"
  if (lower.includes("integration") || lower.includes("deploy")) return "Integration Win"
  if (lower.includes("docs") || lower.includes("documentation")) return "Docs"
  return "General"
}

function looksLikeFeedback(node: GitHubDiscussionNode): boolean {
  if (matchesAnyCategory(node, FEEDBACK_CATEGORY_SLUGS)) return true
  if (STRICT_CATEGORY_ROUTING) return false

  const category = `${node.category?.name ?? ""} ${node.category?.slug ?? ""}`.toLowerCase()
  const blob = `${node.title} ${node.bodyText}`.toLowerCase()
  return category.includes("feedback") || blob.includes("feedback") || blob.includes("bug") || blob.includes("request")
}

function looksLikeShowcase(node: GitHubDiscussionNode): boolean {
  if (matchesAnyCategory(node, SHOWCASE_CATEGORY_SLUGS)) return true
  if (STRICT_CATEGORY_ROUTING) return false

  const category = `${node.category?.name ?? ""} ${node.category?.slug ?? ""}`.toLowerCase()
  const blob = `${node.title} ${node.bodyText}`.toLowerCase()
  return category.includes("showcase") || category.includes("use-case") || blob.includes("built with") || blob.includes("using agentic")
}

function looksLikeIntegration(node: GitHubDiscussionNode): boolean {
  if (matchesAnyCategory(node, INTEGRATION_CATEGORY_SLUGS)) return true
  if (STRICT_CATEGORY_ROUTING) return false

  const category = `${node.category?.name ?? ""} ${node.category?.slug ?? ""}`.toLowerCase()
  const blob = `${node.title} ${node.bodyText}`.toLowerCase()
  return category.includes("integration") || blob.includes("mcp") || blob.includes("integration") || blob.includes("plugin")
}

function toFeedbackEntry(node: GitHubDiscussionNode): FeedbackEntry {
  const text = `${node.title} ${node.bodyText}`
  return {
    id: `gh-fb-${node.id}`,
    project: detectProject(text),
    type: detectFeedbackType(text),
    quote: summarize(node.bodyText, 220) || node.title,
    author: node.author?.login ?? "GitHub User",
    role: "Community",
    sourceLabel: "GitHub Discussion",
    sourceUrl: node.url,
    dateIso: node.createdAt.slice(0, 10),
  }
}

function toShowcaseEntry(node: GitHubDiscussionNode): ShowcaseEntry {
  const text = `${node.title} ${node.bodyText}`
  const project = detectProject(text)
  return {
    id: `gh-sc-${node.id}`,
    title: node.title,
    team: node.author?.login ?? "Community Team",
    summary: summarize(node.bodyText, 170) || "Community deployment writeup.",
    stack: [project, detectRuntime(text)],
    links: [{ label: "Discussion", href: node.url }],
    tags: ["Community", project.replace("Agentic", "")],
  }
}

function toIntegrationEntry(node: GitHubDiscussionNode): IntegrationEntry {
  const text = `${node.title} ${node.bodyText}`
  return {
    id: `gh-int-${node.id}`,
    name: node.title,
    status: detectIntegrationStatus(text),
    description: summarize(node.bodyText, 150) || "Integration report from community thread.",
    runtime: detectRuntime(text),
    project: detectProject(text),
    link: node.url,
  }
}

async function fetchGithubDiscussions(): Promise<GitHubDiscussionNode[]> {
  const token = process.env.AGENTRA_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/vnd.github+json",
        "user-agent": "agentralabs-tech-web",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        query: DISCUSSIONS_QUERY,
        variables: {
          owner: OWNER,
          repo: REPO,
          limit: DISCUSSION_LIMIT,
        },
      }),
      next: { revalidate: 600 },
    })

    if (!response.ok) return []

    const data = (await response.json()) as {
      data?: {
        repository?: {
          discussions?: {
            nodes?: GitHubDiscussionNode[]
          }
        }
      }
      errors?: unknown[]
    }

    if (data.errors?.length) return []

    return data.data?.repository?.discussions?.nodes ?? []
  } catch {
    return []
  }
}

export const getCommunityFeed = cache(async (): Promise<CommunityFeed> => {
  const nodes = await fetchGithubDiscussions()

  if (!nodes.length) {
    return {
      source: "fallback",
      repoPath: `${OWNER}/${REPO}`,
      feedback: featuredFeedback,
      showcase: showcaseEntries,
      integrations: integrationEntries,
    }
  }

  const feedback = nodes.filter(looksLikeFeedback).slice(0, 9).map(toFeedbackEntry)
  const showcase = nodes.filter(looksLikeShowcase).slice(0, 9).map(toShowcaseEntry)
  const integrations = nodes.filter(looksLikeIntegration).slice(0, 12).map(toIntegrationEntry)

  return {
    source: "github",
    repoPath: `${OWNER}/${REPO}`,
    feedback: feedback.length ? feedback : featuredFeedback,
    showcase: showcase.length ? showcase : showcaseEntries,
    integrations: integrations.length ? integrations : integrationEntries,
  }
})

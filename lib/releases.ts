import { cache } from "react"

const GITHUB_API_URL = "https://api.github.com"

const DEFAULT_RELEASE_REPOS = [
  "agentralabs/agentic-memory",
  "agentralabs/agentic-vision",
  "agentralabs/agentic-codebase",
  "agentralabs/agentic-comm",
  "agentralabs/agentic-contract",
  "agentralabs/agentic-identity",
  "agentralabs/agentic-time",
  "agentralabs/agentralab-tech-web",
  "agentralabs/agentralabs-tech",
]

const RELEASE_LIMIT_PER_REPO = Number(process.env.GITHUB_RELEASES_PER_REPO ?? "5")
const RELEASE_REVALIDATE_SECONDS = Number(process.env.GITHUB_RELEASES_REVALIDATE_SECS ?? "900")

interface GithubReleaseResponse {
  id: number
  html_url: string
  tag_name: string
  name: string | null
  body: string | null
  draft: boolean
  prerelease: boolean
  published_at: string | null
  created_at: string
}

interface GithubRepoResponse {
  html_url: string
  full_name: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
}

export interface ReleaseItem {
  id: string
  repoPath: string
  repoName: string
  repoUrl: string
  url: string
  tagName: string
  title: string
  summary: string
  detailedNotes: string[]
  publishedAt: string
  prerelease: boolean
}

export interface RepoReleaseSummary {
  repoPath: string
  repoName: string
  repoUrl: string
  stars: number
  forks: number
  openIssues: number
  releases: ReleaseItem[]
}

export interface ReleasesFeed {
  source: "github" | "fallback"
  generatedAt: string
  repos: RepoReleaseSummary[]
  latest: ReleaseItem[]
  totalStars: number
  totalForks: number
}

function parseRepoPaths(raw: string | undefined): string[] {
  const source = raw?.trim()
  if (!source) return DEFAULT_RELEASE_REPOS
  const values = source
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
  return values.length ? values : DEFAULT_RELEASE_REPOS
}

function repoNameFromPath(repoPath: string): string {
  const [_owner, repo = repoPath] = repoPath.split("/")
  return repo
}

function releaseSummary(body: string | null | undefined): string {
  if (!body) return "Release notes available on GitHub."
  const compact = body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("- ["))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
  if (!compact) return "Release notes available on GitHub."
  return compact.length > 180 ? `${compact.slice(0, 177).trim()}...` : compact
}

function markdownToPlain(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function extractParagraphsFromBody(body: string): string[] {
  const blocks = body
    .split(/\n{2,}/)
    .map((block) => markdownToPlain(block))
    .filter((block) => block.length >= 80)
    .filter((block) => !/^[\-\*\+\d\.\s]+$/.test(block))

  return blocks.slice(0, 3)
}

function extractBullets(body: string): string[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-*+]\s+/.test(line) || /^\d+\.\s+/.test(line))
    .map((line) => line.replace(/^[-*+]\s+/, "").replace(/^\d+\.\s+/, ""))
    .map((line) => markdownToPlain(line))
    .filter((line) => line.length > 12)
    .slice(0, 8)
}

function releaseDetailNotes(body: string | null): string[] {
  if (!body) return ["No detailed notes were published in this release body. Open GitHub for full metadata."]
  const paragraphs = extractParagraphsFromBody(body)
  if (paragraphs.length) return paragraphs.slice(0, 3)
  const bullets = extractBullets(body)
  if (bullets.length) return bullets.slice(0, 3)
  return ["Release notes are available on GitHub. Open the release page for full details."]
}

function githubHeaders(): Record<string, string> {
  const token = process.env.AGENTRA_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN
  return {
    accept: "application/vnd.github+json",
    "user-agent": "agentralabs-tech-web",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  }
}

async function fetchRepoMetadata(repoPath: string): Promise<GithubRepoResponse | null> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${repoPath}`, {
      headers: githubHeaders(),
      next: { revalidate: RELEASE_REVALIDATE_SECONDS },
    })
    if (!response.ok) return null
    return (await response.json()) as GithubRepoResponse
  } catch {
    return null
  }
}

async function fetchRepoReleases(repoPath: string): Promise<GithubReleaseResponse[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${repoPath}/releases?per_page=${RELEASE_LIMIT_PER_REPO}`,
      {
        headers: githubHeaders(),
        next: { revalidate: RELEASE_REVALIDATE_SECONDS },
      },
    )
    if (!response.ok) return []
    const payload = (await response.json()) as GithubReleaseResponse[]
    return payload.filter((item) => !item.draft)
  } catch {
    return []
  }
}

async function collectRepoSummary(repoPath: string): Promise<RepoReleaseSummary | null> {
  const [repoMeta, repoReleases] = await Promise.all([
    fetchRepoMetadata(repoPath),
    fetchRepoReleases(repoPath),
  ])

  if (!repoMeta && !repoReleases.length) return null

  const repoUrl = repoMeta?.html_url ?? `https://github.com/${repoPath}`
  const repoName = repoMeta?.full_name ?? repoPath
  const releases: ReleaseItem[] = repoReleases.map((release) => {
    const publishedAt = release.published_at ?? release.created_at
    const detailedNotes = releaseDetailNotes(release.body)
    return {
      id: `${repoPath}-${release.id}`,
      repoPath,
      repoName: repoNameFromPath(repoName),
      repoUrl,
      url: release.html_url,
      tagName: release.tag_name,
      title: release.name?.trim() || release.tag_name,
      summary: releaseSummary(release.body),
      detailedNotes,
      publishedAt,
      prerelease: release.prerelease,
    }
  })

  return {
    repoPath,
    repoName: repoNameFromPath(repoName),
    repoUrl,
    stars: repoMeta?.stargazers_count ?? 0,
    forks: repoMeta?.forks_count ?? 0,
    openIssues: repoMeta?.open_issues_count ?? 0,
    releases,
  }
}

function fallbackFeed(repoPaths: string[]): ReleasesFeed {
  const repos = repoPaths.map((repoPath) => ({
    repoPath,
    repoName: repoNameFromPath(repoPath),
    repoUrl: `https://github.com/${repoPath}`,
    stars: 0,
    forks: 0,
    openIssues: 0,
    releases: [] as ReleaseItem[],
  }))

  return {
    source: "fallback",
    generatedAt: new Date().toISOString(),
    repos,
    latest: [],
    totalStars: 0,
    totalForks: 0,
  }
}

export const getReleasesFeed = cache(async (): Promise<ReleasesFeed> => {
  const repoPaths = parseRepoPaths(process.env.GITHUB_RELEASE_REPOS)
  const summaries = (
    await Promise.all(repoPaths.map((repoPath) => collectRepoSummary(repoPath)))
  ).filter((value): value is RepoReleaseSummary => value !== null)

  if (!summaries.length) return fallbackFeed(repoPaths)

  const latest = summaries
    .flatMap((repo) => repo.releases)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return {
    source: "github",
    generatedAt: new Date().toISOString(),
    repos: summaries,
    latest: latest.slice(0, 12),
    totalStars: summaries.reduce((sum, repo) => sum + repo.stars, 0),
    totalForks: summaries.reduce((sum, repo) => sum + repo.forks, 0),
  }
})

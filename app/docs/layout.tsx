import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Manrope } from "next/font/google"
import { cookies } from "next/headers"
import { getDocsSource } from "@/lib/source"
import { DocsSidebarNav } from "@/components/docs-sidebar-nav"
import { DocsTopControls } from "@/components/docs-top-controls"
import { DOCS_LANGUAGE_COOKIE, docsUi, localizeDocsLabel, normalizeDocsLanguage } from "@/lib/docs-i18n"
import "./docs.css"

interface DocsRouteLayoutProps {
  children: ReactNode
}

interface DocsNavItem {
  href: string
  label: string
  description?: string
}

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--docs-font-sans",
})

const SUFFIX_ORDER = [
  "how-to",
  "agentra-runtime-operations-update",
  "server-runtime-auth-artifact-sync",
  "docs",
  "overview",
  "quickstart",
  "installation",
  "command-surface",
  "runtime-install-sync",
  "integration-guide",
  "concepts",
  "api-reference",
  "file-format",
  "rust-api",
  "benchmarks",
  "faq",
  "limitations",
  "guide",
  "feedback-and-community",
  "system-architecture",
  "use-case-playbooks",
]

const suffixOrderMap = new Map(SUFFIX_ORDER.map((value, index) => [value, index]))

function titleFor(url: string, title?: string) {
  if (title) return title
  const value = url.split("/").filter(Boolean).pop() ?? "docs"
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function slugFromUrl(url: string) {
  return url.replace(/^\/docs\/?/, "") || "index"
}

function suffixForPrefix(slug: string, prefix: string) {
  if (!slug.startsWith(prefix)) return ""
  return slug.slice(prefix.length)
}

function sortOverviewGroup(items: DocsNavItem[]) {
  return [...items].sort((a, b) => {
    const aSlug = slugFromUrl(a.href)
    const bSlug = slugFromUrl(b.href)

    if (aSlug === "index") return -1
    if (bSlug === "index") return 1
    return aSlug.localeCompare(bSlug)
  })
}

function sortPrefixedGroup(items: DocsNavItem[], prefix: string, orderedSuffixes: string[] = SUFFIX_ORDER) {
  const rankMap = new Map(orderedSuffixes.map((value, index) => [value, index]))

  return [...items].sort((a, b) => {
    const aSlug = slugFromUrl(a.href)
    const bSlug = slugFromUrl(b.href)

    const aSuffix = suffixForPrefix(aSlug, prefix)
    const bSuffix = suffixForPrefix(bSlug, prefix)

    const aRank = rankMap.has(aSuffix) ? rankMap.get(aSuffix)! : Number.POSITIVE_INFINITY
    const bRank = rankMap.has(bSuffix) ? rankMap.get(bSuffix)! : Number.POSITIVE_INFINITY

    if (aRank !== bRank) return aRank - bRank
    return aSlug.localeCompare(bSlug)
  })
}

export default async function DocsRouteLayout({ children }: DocsRouteLayoutProps) {
  const cookieStore = await cookies()
  const language = normalizeDocsLanguage(cookieStore.get(DOCS_LANGUAGE_COOKIE)?.value)
  const ui = docsUi(language)
  const docsSource = getDocsSource(language)

  const allItems: DocsNavItem[] = docsSource
    .getPages()
    .filter((page) => page.url.startsWith("/docs"))
    .map((page) => ({
      href: page.url,
      label: localizeDocsLabel(titleFor(page.url, page.data.title), language),
      description: typeof page.data.description === "string" ? page.data.description : undefined,
    }))

  const groupedPrefixes = ["workspace-", "memory-", "codebase-", "vision-", "feedback-", "architecture-", "playbooks-"]

  const overviewItems = sortOverviewGroup(
    allItems.filter((item) => {
      const slug = slugFromUrl(item.href)
      if (slug === "index") return true
      return !groupedPrefixes.some((prefix) => slug.startsWith(prefix))
    }),
  )
  const workspaceItems = sortPrefixedGroup(
    allItems.filter((item) => slugFromUrl(item.href).startsWith("workspace-")),
    "workspace-",
    ["how-to", "agentra-runtime-operations-update", "server-runtime-auth-artifact-sync"],
  )
  const memoryItems = sortPrefixedGroup(
    allItems.filter((item) => slugFromUrl(item.href).startsWith("memory-")),
    "memory-",
  )
  const codebaseItems = sortPrefixedGroup(
    allItems.filter((item) => slugFromUrl(item.href).startsWith("codebase-")),
    "codebase-",
  )
  const visionItems = sortPrefixedGroup(
    allItems.filter((item) => slugFromUrl(item.href).startsWith("vision-")),
    "vision-",
  )
  const feedbackItems = sortPrefixedGroup(
    allItems.filter((item) => slugFromUrl(item.href).startsWith("feedback-")),
    "feedback-",
    ["community"],
  )
  const architectureItems = sortPrefixedGroup(
    allItems.filter((item) => slugFromUrl(item.href).startsWith("architecture-")),
    "architecture-",
    ["system"],
  )
  const playbookItems = sortPrefixedGroup(
    allItems.filter((item) => slugFromUrl(item.href).startsWith("playbooks-")),
    "playbooks-",
    ["use-cases"],
  )

  const orderedItems = [
    ...overviewItems,
    ...workspaceItems,
    ...memoryItems,
    ...codebaseItems,
    ...visionItems,
    ...feedbackItems,
    ...architectureItems,
    ...playbookItems,
  ]

  const hrefSet = new Set(orderedItems.map((item) => item.href))

  const navGroups = [
    {
      label: localizeDocsLabel("Overview", language),
      items: overviewItems,
      defaultOpen: true,
    },
    {
      label: localizeDocsLabel("Workspace", language),
      items: workspaceItems,
      defaultOpen: true,
    },
    {
      label: localizeDocsLabel("AgenticMemory", language),
      items: memoryItems,
      defaultOpen: true,
    },
    {
      label: localizeDocsLabel("AgenticCodebase", language),
      items: codebaseItems,
      defaultOpen: true,
    },
    {
      label: localizeDocsLabel("AgenticVision", language),
      items: visionItems,
      defaultOpen: true,
    },
    {
      label: localizeDocsLabel("Feedback and Community", language),
      items: feedbackItems,
      defaultOpen: true,
    },
    {
      label: localizeDocsLabel("System Architecture", language),
      items: architectureItems,
      defaultOpen: true,
    },
    {
      label: localizeDocsLabel("Use-Case Playbooks", language),
      items: playbookItems,
      defaultOpen: true,
    },
  ].filter((group) => group.items.length > 0)

  return (
    <div className={`docs-shell ${manrope.variable}`}>
      <header className="docs-topbar">
        <Link href="/docs" className="docs-brand">
          <span className="docs-brand-mark">
            <Image
              src="/images/agentra-logo-current.svg"
              alt="Agentra Labs"
              width={24}
              height={24}
              priority
            />
          </span>
          <span className="docs-brand-copy">
            <span className="docs-brand-title">{ui.docsTitle}</span>
            <span className="docs-brand-subtitle">{ui.docsSubtitle}</span>
          </span>
        </Link>
        <nav className="docs-topnav">
          <Link href="/docs">{ui.nav.docs}</Link>
          {hrefSet.has("/docs/memory-docs") ? <Link href="/docs/memory-docs">{localizeDocsLabel("AgenticMemory", language)}</Link> : null}
          {hrefSet.has("/docs/codebase-docs") ? <Link href="/docs/codebase-docs">{localizeDocsLabel("AgenticCodebase", language)}</Link> : null}
          {hrefSet.has("/docs/vision-docs") ? <Link href="/docs/vision-docs">{localizeDocsLabel("AgenticVision", language)}</Link> : null}
        </nav>
        <DocsTopControls language={language} items={orderedItems} />
        <div className="docs-top-links">
          <a className="docs-top-link docs-top-link-ghost" href="https://agentralabs.tech" target="_blank" rel="noreferrer">
            {ui.links.website}
          </a>
          <a className="docs-top-link docs-top-link-solid" href="https://github.com/agentralabs" target="_blank" rel="noreferrer">
            {ui.links.github}
          </a>
        </div>
      </header>

      <div className="docs-frame">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-head">
            <p className="docs-sidebar-title">{ui.sidebarTitle}</p>
            <p className="docs-sidebar-subtitle">{ui.sidebarSubtitle}</p>
          </div>
          <DocsSidebarNav groups={navGroups} />
        </aside>
        <main className="docs-main">{children}</main>
      </div>
    </div>
  )
}

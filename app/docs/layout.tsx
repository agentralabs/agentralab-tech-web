import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Manrope } from "next/font/google"
import { cookies } from "next/headers"
import { getDocsSource } from "@/lib/source"
import { DocsSidebarNav } from "@/components/docs-sidebar-nav"
import { DocsTopControls } from "@/components/docs-top-controls"
import {
  DOCS_LANGUAGE_COOKIE,
  docsUi,
  localizeDocsHref,
  localizeDocsLabel,
  normalizeDocsLanguage,
} from "@/lib/docs-i18n"
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
  "new-sister-checklist",
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
  const raw = url.replace(/^\/docs\/?/, "") || "index"
  if (raw === "en" || raw === "zh") return "index"
  return raw.replace(/^(en|zh)\//, "") || "index"
}

function suffixForPrefix(slug: string, prefix: string) {
  if (!slug.startsWith(prefix)) return ""
  return slug.slice(prefix.length)
}

function prefixForSlug(slug: string) {
  const index = slug.indexOf("-")
  if (index <= 0) return ""
  return `${slug.slice(0, index)}-`
}

function toSisterGroupLabel(rawLabel: string, language: "en" | "zh") {
  if (language === "zh") {
    return rawLabel.replace(/\s*文档总览$/u, "").trim()
  }
  return rawLabel.replace(/\s*Docs$/i, "").trim()
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
      href: localizeDocsHref(page.url, language),
      label: localizeDocsLabel(titleFor(page.url, page.data.title), language),
      description: typeof page.data.description === "string" ? page.data.description : undefined,
    }))

  const reservedPrefixes = ["workspace-", "feedback-", "architecture-", "playbooks-"]
  const sisterPrefixOrder: string[] = []

  for (const item of allItems) {
    const slug = slugFromUrl(item.href)
    if (!slug.endsWith("-docs")) continue
    const prefix = slug.slice(0, -"docs".length)
    if (!prefix || reservedPrefixes.includes(prefix)) continue
    if (!sisterPrefixOrder.includes(prefix)) {
      sisterPrefixOrder.push(prefix)
    }
  }

  const groupedPrefixes = [...reservedPrefixes, ...sisterPrefixOrder]

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
    ["how-to", "new-sister-checklist", "agentra-runtime-operations-update", "server-runtime-auth-artifact-sync"],
  )
  const sisterGroups = sisterPrefixOrder
    .map((prefix) => {
      const items = sortPrefixedGroup(
        allItems.filter((item) => slugFromUrl(item.href).startsWith(prefix)),
        prefix,
      )
      if (items.length === 0) return null

      const landing = items.find((item) => slugFromUrl(item.href) === `${prefix}docs`)
      const derivedLabel = landing
        ? toSisterGroupLabel(landing.label, language)
        : localizeDocsLabel(
            prefix
              .replace(/-$/, "")
              .split("-")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(" "),
            language,
          )

      return {
        prefix,
        label: derivedLabel,
        items,
      }
    })
    .filter((group): group is { prefix: string; label: string; items: DocsNavItem[] } => group !== null)

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
    ...sisterGroups.flatMap((group) => group.items),
    ...feedbackItems,
    ...architectureItems,
    ...playbookItems,
  ]

  const hrefSet = new Set(orderedItems.map((item) => item.href))
  const hrefForSlug = (target: string) => orderedItems.find((item) => slugFromUrl(item.href) === target)?.href
  const apiReferenceHref =
    hrefForSlug("api-reference") ??
    hrefForSlug("memory-api-reference") ??
    hrefForSlug("codebase-api-reference") ??
    hrefForSlug("vision-api-reference")

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
    ...sisterGroups.map((group) => ({
      label: group.label,
      items: group.items,
      defaultOpen: true,
    })),
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
    <div className={`docs-shell docs-variant-aspen ${manrope.variable}`}>
      <header className="docs-topbar">
        <Link href={localizeDocsHref("/docs", language)} className="docs-brand">
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
          <Link href={localizeDocsHref("/docs", language)}>{localizeDocsLabel("Guides", language)}</Link>
          {apiReferenceHref ? <Link href={apiReferenceHref}>{localizeDocsLabel("API Reference", language)}</Link> : null}
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

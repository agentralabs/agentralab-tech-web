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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--docs-font-sans",
})

function titleFor(url: string, title?: string) {
  if (title) return title
  const value = url.split("/").filter(Boolean).pop() ?? "docs"
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export default async function DocsRouteLayout({ children }: DocsRouteLayoutProps) {
  const cookieStore = await cookies()
  const language = normalizeDocsLanguage(cookieStore.get(DOCS_LANGUAGE_COOKIE)?.value)
  const ui = docsUi(language)
  const docsSource = getDocsSource(language)

  const pages = docsSource
    .getPages()
    .filter((page) => page.url.startsWith("/docs") && page.url !== "/docs/design-doctrine")

  const curatedOrder = [
    "index",
    "quickstart",
    "installation",
    "integrations",
    "feedback",
    "operations-autonomic-and-backup",
    "server-runtime-auth-and-artifact-sync",
    "troubleshooting-matrix",
    "system-architecture",
    "use-case-playbooks",
    "ecosystem-canonical-contract",
    "security-and-data-boundaries",
    "benchmarks-and-methodology",
    "ecosystem-feature-reference",
    "workspace-how-to",
    "sister-docs-catalog",
  ]

  const pageBySlug = new Map(
    pages.map((page) => [page.url.replace(/^\/docs\/?/, "") || "index", page] as const),
  )

  const generatedReferenceSlugs = [...pageBySlug.keys()]
    .filter((slug) => /^(memory|codebase|vision)-/.test(slug))
    .sort((a, b) => a.localeCompare(b))

  const publishedOrder = [...curatedOrder, ...generatedReferenceSlugs]

  const orderedItems = publishedOrder.flatMap((slug) => {
    const page = pageBySlug.get(slug)
    if (!page) return []
    const baseLabel = titleFor(page.url, page.data.title)
    const description =
      typeof page.data.description === "string" ? page.data.description : undefined
    return [{
      href: page.url,
      label: localizeDocsLabel(baseLabel, language),
      description,
    }]
  })

  const navGroups = [
    {
      label: localizeDocsLabel("Get started", language),
      items: orderedItems.filter((item) =>
        [
          "/docs",
          "/docs/quickstart",
          "/docs/installation",
          "/docs/integrations",
          "/docs/feedback",
          "/docs/workspace-how-to",
        ].includes(item.href),
      ),
    },
    {
      label: localizeDocsLabel("Operations", language),
      items: orderedItems.filter((item) =>
        [
          "/docs/operations-autonomic-and-backup",
          "/docs/server-runtime-auth-and-artifact-sync",
          "/docs/troubleshooting-matrix",
        ].includes(item.href),
      ),
    },
    {
      label: localizeDocsLabel("Deep Dive", language),
      items: orderedItems.filter((item) =>
        [
          "/docs/system-architecture",
          "/docs/use-case-playbooks",
          "/docs/ecosystem-canonical-contract",
        ].includes(item.href),
      ),
    },
    {
      label: localizeDocsLabel("Security", language),
      items: orderedItems.filter((item) => item.href === "/docs/security-and-data-boundaries"),
    },
    {
      label: localizeDocsLabel("Performance", language),
      items: orderedItems.filter((item) => item.href === "/docs/benchmarks-and-methodology"),
    },
    {
      label: localizeDocsLabel("Reference", language),
      items: orderedItems.filter((item) =>
        [
          "/docs/ecosystem-feature-reference",
          "/docs/sister-docs-catalog",
          "/docs/memory-quickstart",
          "/docs/memory-concepts",
          "/docs/memory-integration-guide",
          "/docs/memory-faq",
          "/docs/memory-benchmarks",
          "/docs/memory-api-reference",
          "/docs/memory-file-format",
          "/docs/memory-rust-api",
          "/docs/codebase-quickstart",
          "/docs/codebase-concepts",
          "/docs/codebase-integration-guide",
          "/docs/codebase-faq",
          "/docs/codebase-benchmarks",
          "/docs/codebase-api-reference",
          "/docs/codebase-file-format",
          "/docs/vision-quickstart",
          "/docs/vision-concepts",
          "/docs/vision-integration-guide",
          "/docs/vision-faq",
          "/docs/vision-benchmarks",
          "/docs/vision-api-reference",
          "/docs/vision-limitations",
        ].includes(item.href),
      ),
    },
  ]

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
          <Link href="/docs/quickstart">{ui.nav.guides}</Link>
          <Link href="/docs/operations-autonomic-and-backup">{ui.nav.operations}</Link>
          <Link href="/docs/system-architecture">{ui.nav.architecture}</Link>
          <Link href="/docs/sister-docs-catalog">{ui.nav.reference}</Link>
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

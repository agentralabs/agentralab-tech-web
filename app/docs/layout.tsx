import type { ReactNode } from "react"
import Link from "next/link"
import { source } from "@/lib/source"
import { DocsSidebarNav } from "@/components/docs-sidebar-nav"
import "./docs.css"

interface DocsRouteLayoutProps {
  children: ReactNode
}

function titleFor(url: string, title?: string) {
  if (title) return title
  const value = url.split("/").filter(Boolean).pop() ?? "docs"
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export default function DocsRouteLayout({ children }: DocsRouteLayoutProps) {
  const pages = source
    .getPages()
    .filter((page) => page.url.startsWith("/docs") && page.url !== "/docs/design-doctrine")

  const publishedOrder = [
    "index",
    "quickstart",
    "installation",
    "integrations",
    "feedback",
    "ecosystem-feature-reference",
  ]

  const pageBySlug = new Map(
    pages.map((page) => [page.url.replace(/^\/docs\/?/, "") || "index", page] as const),
  )

  const orderedItems = publishedOrder.flatMap((slug) => {
    const page = pageBySlug.get(slug)
    if (!page) return []
    return [{ href: page.url, label: titleFor(page.url, page.data.title) }]
  })

  const navGroups = [
    {
      label: "Get started",
      items: orderedItems.filter((item) =>
        ["/docs", "/docs/quickstart", "/docs/installation", "/docs/integrations", "/docs/feedback"].includes(item.href),
      ),
    },
    {
      label: "Reference",
      items: orderedItems.filter((item) => item.href === "/docs/ecosystem-feature-reference"),
    },
  ]

  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <Link href="/docs" className="docs-brand">
          Agentra Labs Docs
        </Link>
        <nav className="docs-topnav">
          <Link href="/docs">Documentation</Link>
          <Link href="/docs/quickstart">Guides</Link>
          <Link href="/docs/ecosystem-feature-reference">API reference</Link>
        </nav>
        <div className="docs-top-search" role="search" aria-label="Search docs">
          <span>Search...</span>
          <kbd>⌘K</kbd>
        </div>
        <div className="docs-top-links">
          <a href="https://agentralabs.tech" target="_blank" rel="noreferrer">
            Website
          </a>
          <a href="https://github.com/agentralabs" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <div className="docs-frame">
        <aside className="docs-sidebar">
          <DocsSidebarNav groups={navGroups} />
        </aside>
        <main className="docs-main">{children}</main>
      </div>
    </div>
  )
}

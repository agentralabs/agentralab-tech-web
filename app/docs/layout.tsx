import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Manrope } from "next/font/google"
import { source } from "@/lib/source"
import { DocsSidebarNav } from "@/components/docs-sidebar-nav"
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
    "operations-autonomic-and-backup",
    "system-architecture",
    "use-case-playbooks",
    "troubleshooting-matrix",
    "security-and-data-boundaries",
    "benchmarks-and-methodology",
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
      label: "Operations",
      items: orderedItems.filter((item) =>
        ["/docs/operations-autonomic-and-backup", "/docs/troubleshooting-matrix"].includes(item.href),
      ),
    },
    {
      label: "Deep Dive",
      items: orderedItems.filter((item) =>
        ["/docs/system-architecture", "/docs/use-case-playbooks"].includes(item.href),
      ),
    },
    {
      label: "Security",
      items: orderedItems.filter((item) => item.href === "/docs/security-and-data-boundaries"),
    },
    {
      label: "Performance",
      items: orderedItems.filter((item) => item.href === "/docs/benchmarks-and-methodology"),
    },
    {
      label: "Reference",
      items: orderedItems.filter((item) => item.href === "/docs/ecosystem-feature-reference"),
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
            <span className="docs-brand-title">Agentra Labs Docs</span>
            <span className="docs-brand-subtitle">Public Documentation</span>
          </span>
        </Link>
        <nav className="docs-topnav">
          <Link href="/docs">Documentation</Link>
          <Link href="/docs/quickstart">Guides</Link>
          <Link href="/docs/operations-autonomic-and-backup">Operations</Link>
          <Link href="/docs/system-architecture">Architecture</Link>
          <Link href="/docs/ecosystem-feature-reference">API reference</Link>
        </nav>
        <div className="docs-top-search" role="search" aria-label="Search docs">
          <span>Search documentation...</span>
          <kbd>⌘K</kbd>
        </div>
        <div className="docs-top-links">
          <a className="docs-top-link docs-top-link-ghost" href="https://agentralabs.tech" target="_blank" rel="noreferrer">
            Website
          </a>
          <a className="docs-top-link docs-top-link-solid" href="https://github.com/agentralabs" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <div className="docs-frame">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-head">
            <p className="docs-sidebar-title">Docs Navigation</p>
            <p className="docs-sidebar-subtitle">Install, integrate, and run the Agentra ecosystem.</p>
          </div>
          <DocsSidebarNav groups={navGroups} />
        </aside>
        <main className="docs-main">{children}</main>
      </div>
    </div>
  )
}

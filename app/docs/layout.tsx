import type { ReactNode } from "react"
import Link from "next/link"
import { source } from "@/lib/source"
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
    .filter((page) => page.url.startsWith("/docs"))
    .sort((a, b) => a.url.localeCompare(b.url))

  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <Link href="/docs" className="docs-brand">
          Agentra Labs Docs
        </Link>
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
          <p className="docs-sidebar-label">Get started</p>
          <nav className="docs-sidebar-nav">
            {pages.map((page) => (
              <Link key={page.url} href={page.url}>
                {titleFor(page.url, page.data.title)}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="docs-main">{children}</main>
      </div>
    </div>
  )
}

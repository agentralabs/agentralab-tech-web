import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Manrope } from "next/font/google"
import { cookies } from "next/headers"
import { getDocsSource } from "@/lib/source"
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
  const orderedItems = docsSource
    .getPages()
    .filter((page) => page.url === "/docs")
    .map((page) => ({
      href: page.url,
      label: localizeDocsLabel(titleFor(page.url, page.data.title), language),
      description: typeof page.data.description === "string" ? page.data.description : undefined,
    }))

  const navGroups: Array<{ label: string; items: Array<{ href: string; label: string; description?: string }> }> = []

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
        <main className="docs-main docs-main-wide">{children}</main>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import type { ComponentType } from "react"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { createRelativeLink } from "fumadocs-ui/mdx"
import type { TOCItemType } from "fumadocs-core/toc"
import { getMDXComponents } from "@/mdx-components"
import { getDocsSource, source } from "@/lib/source"
import { DOCS_LANGUAGE_COOKIE, docsUi, localizeDocsLabel, normalizeDocsLanguage } from "@/lib/docs-i18n"

interface DocsPageProps {
  params: Promise<{ slug?: string[] }>
}

interface DocsPageData {
  title?: string
  description?: string
  body: ComponentType<{ components?: Record<string, unknown> }>
  toc?: TOCItemType[]
}

function tocTitleToText(value: unknown, language: "en" | "zh"): string {
  if (typeof value === "string" || typeof value === "number") {
    const label = String(value)
    return localizeDocsLabel(label, language)
  }

  if (Array.isArray(value)) {
    const joined = value.map((item) => tocTitleToText(item, language)).join("").trim()
    return localizeDocsLabel(joined, language)
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>
    const localized = language === "zh" ? record.zh : record.en
    if (localized != null) {
      const fromLocalized = tocTitleToText(localized, language)
      if (fromLocalized) return fromLocalized
    }

    if ("props" in record && record.props && typeof record.props === "object") {
      const props = record.props as Record<string, unknown>
      const fromChildren = tocTitleToText(props.children, language)
      if (fromChildren) return fromChildren
    }

    if ("children" in record) {
      const fromChildren = tocTitleToText(record.children, language)
      if (fromChildren) return fromChildren
    }

    if ("value" in record) {
      const fromValue = tocTitleToText(record.value, language)
      if (fromValue) return fromValue
    }

    if ("title" in record) {
      const fromTitle = tocTitleToText(record.title, language)
      if (fromTitle) return fromTitle
    }
  }

  return ""
}

function tocHrefToText(value: unknown): string {
  if (typeof value !== "string") return ""
  return value.startsWith("#") ? value : `#${value.replace(/^#*/, "")}`
}

export default async function Page({ params }: DocsPageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const language = normalizeDocsLanguage(cookieStore.get(DOCS_LANGUAGE_COOKIE)?.value)
  const ui = docsUi(language)
  const docsSource = getDocsSource(language)
  const page = docsSource.getPage(slug) ?? source.getPage(slug)
  if (!page) notFound()

  const data = page.data as DocsPageData
  const MDX = data.body
  const sectionLabel =
    page.url === "/docs/ecosystem-feature-reference" ? "Reference" :
    page.url === "/docs/operations-autonomic-and-backup" || page.url === "/docs/troubleshooting-matrix" ? "Operations" :
    page.url === "/docs/security-and-data-boundaries" ? "Security" :
    page.url === "/docs/benchmarks-and-methodology" ? "Performance" :
    page.url === "/docs/system-architecture" ? "Deep Dive" :
    page.url === "/docs/use-case-playbooks" ? "Playbooks" :
    "Get Started"

  return (
    <div className="docs-article-wrap">
      <article className="docs-article">
        <p className="docs-eyebrow">{localizeDocsLabel(sectionLabel, language)}</p>
        <h1>{data.title}</h1>
        {data.description ? <p className="docs-description">{data.description}</p> : null}
        <div className="docs-content">
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(docsSource, page),
            })}
          />
        </div>
      </article>

      <aside className="docs-toc" aria-label={ui.onThisPage}>
        <p className="docs-toc-label">{ui.onThisPage}</p>
        <nav>
          {(data.toc ?? [])
            .map((item) => ({
              href: tocHrefToText(item.url),
              label: tocTitleToText(item.title, language),
            }))
            .filter((item) => item.href && item.label)
            .map((item) => (
              <a key={`${item.href}-${item.label}`} href={item.href}>
                {item.label}
              </a>
            ))}
        </nav>
      </aside>
    </div>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params
  const cookieStore = await cookies()
  const language = normalizeDocsLanguage(cookieStore.get(DOCS_LANGUAGE_COOKIE)?.value)
  const docsSource = getDocsSource(language)
  const page = docsSource.getPage(slug) ?? source.getPage(slug)
  if (!page) notFound()
  const data = page.data as { title?: string; description?: string }

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: page.url },
  }
}

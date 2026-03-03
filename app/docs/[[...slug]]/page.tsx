import type { Metadata } from "next"
import type { ComponentType } from "react"
import { notFound } from "next/navigation"
import { createRelativeLink } from "fumadocs-ui/mdx"
import type { TOCItemType } from "fumadocs-core/toc"
import { getMDXComponents } from "@/mdx-components"
import { source } from "@/lib/source"
import { docsUi } from "@/lib/docs-i18n"

interface DocsPageProps {
  params: Promise<{ slug?: string[] }>
}

interface DocsPageData {
  title?: string
  description?: string
  body: ComponentType<{ components?: Record<string, unknown> }>
  toc?: TOCItemType[]
}

function tocTitleToText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value.map((item) => tocTitleToText(item)).join("").trim()
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>
    const localized = record.en
    if (localized != null) {
      const fromLocalized = tocTitleToText(localized)
      if (fromLocalized) return fromLocalized
    }

    if ("props" in record && record.props && typeof record.props === "object") {
      const props = record.props as Record<string, unknown>
      const fromChildren = tocTitleToText(props.children)
      if (fromChildren) return fromChildren
    }

    if ("children" in record) {
      const fromChildren = tocTitleToText(record.children)
      if (fromChildren) return fromChildren
    }

    if ("value" in record) {
      const fromValue = tocTitleToText(record.value)
      if (fromValue) return fromValue
    }

    if ("title" in record) {
      const fromTitle = tocTitleToText(record.title)
      if (fromTitle) return fromTitle
    }
  }

  return ""
}

function tocHrefToText(value: unknown): string {
  if (typeof value !== "string") return ""
  return value.startsWith("#") ? value : `#${value.replace(/^#*/, "")}`
}

function fallbackLabelFromHref(href: string): string {
  const normalized = href.replace(/^#/, "").trim()
  if (!normalized) return ""
  return normalized
    .split("-")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function isInvalidTocLabel(label: string): boolean {
  if (!label.trim()) return true
  if (/\[object object\]/i.test(label.trim())) return true
  return false
}

function parseDocsSlug(
  slug: string[] | undefined,
): { normalizedSlug: string[] | undefined } {
  if (!slug?.length) {
    return { normalizedSlug: slug }
  }

  const [first, ...rest] = slug
  // Strip locale prefix if present
  if (first === "en" || first === "zh") {
    return { normalizedSlug: rest.length ? rest : undefined }
  }

  return { normalizedSlug: slug }
}

export default async function Page({ params }: DocsPageProps) {
  const { slug: rawSlug } = await params
  const { normalizedSlug: slug } = parseDocsSlug(rawSlug)
  const ui = docsUi("en")
  const page = source.getPage(slug)
  if (!page) notFound()

  const data = page.data as DocsPageData
  const MDX = data.body
  const pageSlugRaw = page.url.replace(/^\/docs\/?/, "") || "index"
  const pageSlug =
    pageSlugRaw === "en"
      ? "index"
      : pageSlugRaw.replace(/^en\//, "") || "index"
  const sectionLabel =
    pageSlug.startsWith("workspace-") ? "Workspace" :
    pageSlug.startsWith("memory-") ? "AgenticMemory" :
    pageSlug.startsWith("codebase-") ? "AgenticCodebase" :
    pageSlug.startsWith("vision-") ? "AgenticVision" :
    pageSlug.startsWith("identity-") ? "AgenticIdentity" :
    pageSlug.startsWith("time-") ? "AgenticTime" :
    pageSlug.startsWith("contract-") ? "AgenticContract" :
    pageSlug.startsWith("comm-") ? "AgenticComm" :
    pageSlug.startsWith("planning-") ? "AgenticPlanning" :
    pageSlug.startsWith("feedback-") ? "Feedback and Community" :
    pageSlug.startsWith("architecture-") ? "System Architecture" :
    pageSlug.startsWith("playbooks-") ? "Use-Case Playbooks" :
    "Get Started"

  return (
    <div className="docs-article-wrap">
      <article className="docs-article">
        <p className="docs-eyebrow">{sectionLabel}</p>
        <h1>{data.title}</h1>
        {data.description ? <p className="docs-description">{data.description}</p> : null}
        <div className="docs-content">
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </div>
      </article>

      <aside className="docs-toc" aria-label={ui.onThisPage}>
        <p className="docs-toc-label">{ui.onThisPage}</p>
        <nav>
          {(data.toc ?? [])
            .map((item) => {
              const href = tocHrefToText(item.url)
              const rawLabel = tocTitleToText(item.title)
              const label = isInvalidTocLabel(rawLabel) ? fallbackLabelFromHref(href) : rawLabel
              return { href, label }
            })
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
  const { slug: rawSlug } = await params
  const { normalizedSlug: slug } = parseDocsSlug(rawSlug)
  const page = source.getPage(slug)
  if (!page) notFound()
  const data = page.data as { title?: string; description?: string }

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: page.url },
  }
}

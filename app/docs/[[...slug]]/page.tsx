import type { Metadata } from "next"
import type { ComponentType } from "react"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { createRelativeLink } from "fumadocs-ui/mdx"
import type { TOCItemType } from "fumadocs-core/toc"
import { getMDXComponents } from "@/mdx-components"
import { getDocsSource, source } from "@/lib/source"
import {
  DOCS_LANGUAGE_COOKIE,
  docsUi,
  localizeDocsHref,
  localizeDocsLabel,
  normalizeDocsLanguage,
} from "@/lib/docs-i18n"

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

function fallbackLabelFromHref(href: string, language: "en" | "zh"): string {
  const normalized = href.replace(/^#/, "").trim()
  if (!normalized) return ""
  const label = normalized
    .split("-")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
  return localizeDocsLabel(label, language)
}

function isInvalidTocLabel(label: string): boolean {
  if (!label.trim()) return true
  if (/\[object object\]/i.test(label.trim())) return true
  return false
}

function parseDocsLanguageFromSlug(
  slug: string[] | undefined,
  fallback: "en" | "zh",
): { language: "en" | "zh"; normalizedSlug: string[] | undefined } {
  if (!slug?.length) {
    return { language: fallback, normalizedSlug: slug }
  }

  const [first, ...rest] = slug
  if (first === "en" || first === "zh") {
    return {
      language: first,
      normalizedSlug: rest.length ? rest : undefined,
    }
  }

  return { language: fallback, normalizedSlug: slug }
}

export default async function Page({ params }: DocsPageProps) {
  const { slug: rawSlug } = await params
  const cookieStore = await cookies()
  const fallbackLanguage = normalizeDocsLanguage(cookieStore.get(DOCS_LANGUAGE_COOKIE)?.value)
  const { language, normalizedSlug: slug } = parseDocsLanguageFromSlug(rawSlug, fallbackLanguage)
  const ui = docsUi(language)
  const docsSource = getDocsSource(language)
  const page = docsSource.getPage(slug) ?? source.getPage(slug)
  if (!page) notFound()

  const data = page.data as DocsPageData
  const MDX = data.body
  const pageSlugRaw = page.url.replace(/^\/docs\/?/, "") || "index"
  const pageSlug =
    pageSlugRaw === "en" || pageSlugRaw === "zh"
      ? "index"
      : pageSlugRaw.replace(/^(en|zh)\//, "") || "index"
  const sectionLabel =
    pageSlug.startsWith("workspace-") ? "Workspace" :
    pageSlug.startsWith("memory-") ? "AgenticMemory" :
    pageSlug.startsWith("codebase-") ? "AgenticCodebase" :
    pageSlug.startsWith("vision-") ? "AgenticVision" :
    pageSlug.startsWith("feedback-") ? "Feedback and Community" :
    pageSlug.startsWith("architecture-") ? "System Architecture" :
    pageSlug.startsWith("playbooks-") ? "Use-Case Playbooks" :
    "Get Started"

  return (
    <div className="docs-article-wrap">
      <article className="docs-article">
        <p className="docs-eyebrow">{localizeDocsLabel(sectionLabel, language)}</p>
        <h1>{data.title ? localizeDocsLabel(data.title, language) : data.title}</h1>
        {data.description ? <p className="docs-description">{localizeDocsLabel(data.description, language)}</p> : null}
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
            .map((item) => {
              const href = tocHrefToText(item.url)
              const rawLabel = tocTitleToText(item.title, language)
              const label = isInvalidTocLabel(rawLabel) ? fallbackLabelFromHref(href, language) : rawLabel
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
  const cookieStore = await cookies()
  const fallbackLanguage = normalizeDocsLanguage(cookieStore.get(DOCS_LANGUAGE_COOKIE)?.value)
  const { language, normalizedSlug: slug } = parseDocsLanguageFromSlug(rawSlug, fallbackLanguage)
  const docsSource = getDocsSource(language)
  const page = docsSource.getPage(slug) ?? source.getPage(slug)
  if (!page) notFound()
  const data = page.data as { title?: string; description?: string }

  return {
    title: data.title ? localizeDocsLabel(data.title, language) : data.title,
    description: data.description ? localizeDocsLabel(data.description, language) : data.description,
    alternates: { canonical: localizeDocsHref(page.url, language) },
  }
}

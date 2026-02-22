import type { Metadata } from "next"
import type { ComponentType } from "react"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { createRelativeLink } from "fumadocs-ui/mdx"
import type { TOCItemType } from "fumadocs-core/toc"
import { getMDXComponents } from "@/mdx-components"
import { source } from "@/lib/source"
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

export default async function Page({ params }: DocsPageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const language = normalizeDocsLanguage(cookieStore.get(DOCS_LANGUAGE_COOKIE)?.value)
  const ui = docsUi(language)
  const page = source.getPage(slug)
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
              a: createRelativeLink(source, page),
            })}
          />
        </div>
      </article>

      <aside className="docs-toc" aria-label={ui.onThisPage}>
        <p className="docs-toc-label">{ui.onThisPage}</p>
        <nav>
          {(data.toc ?? []).map((item) => (
            <a key={item.url} href={item.url}>
              {localizeDocsLabel(String(item.title ?? ""), language)}
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
  const page = source.getPage(slug)
  if (!page) notFound()
  const data = page.data as { title?: string; description?: string }

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: page.url },
  }
}

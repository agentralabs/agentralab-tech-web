export const DOCS_LANGUAGE_COOKIE = "agentra_docs_lang"
export const DOCS_LANGUAGE_STORAGE = "agentra_docs_lang"

export type DocsLanguage = "en"

export function normalizeDocsLanguage(_value: string | undefined | null): DocsLanguage {
  return "en"
}

export function stripDocsLocalePrefix(path: string): string {
  return path.replace(/^\/docs\/en(?=\/|$)/, "/docs")
}

export function localizeDocsHref(href: string, _lang: DocsLanguage): string {
  if (!href.startsWith("/docs")) return href
  const normalized = stripDocsLocalePrefix(href)
  const suffix = normalized.slice("/docs".length)
  return `/docs/en${suffix}`
}

export function localizeDocsLabel(label: string, _lang: DocsLanguage): string {
  return label
}

export function docsUi(_lang: DocsLanguage) {
  return {
    docsTitle: "Agentra Labs Docs",
    docsSubtitle: "Public Documentation",
    sidebarTitle: "Docs Navigation",
    sidebarSubtitle: "Install, integrate, and run the Agentra ecosystem.",
    searchPlaceholder: "Search documentation...",
    searchLabel: "Search docs",
    closeSearch: "Close search",
    noSearchResults: "No matching pages.",
    onThisPage: "On this page",
    nav: {
      docs: "Documentation",
      guides: "Guides",
      operations: "Operations",
      architecture: "Architecture",
      reference: "API reference",
    },
    links: {
      website: "Website",
      github: "GitHub",
    },
  }
}

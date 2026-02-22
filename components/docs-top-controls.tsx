"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import {
  DOCS_LANGUAGE_COOKIE,
  DOCS_LANGUAGE_STORAGE,
  type DocsLanguage,
  docsUi,
  normalizeDocsLanguage,
} from "@/lib/docs-i18n"

interface SearchItem {
  href: string
  label: string
  description?: string
}

interface DocsTopControlsProps {
  language: DocsLanguage
  items: SearchItem[]
}

export function DocsTopControls({ language, items }: DocsTopControlsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [lang, setLang] = useState<DocsLanguage>(language)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const copy = docsUi(lang)

  useEffect(() => {
    setLang(language)
  }, [language])

  useEffect(() => {
    const saved = normalizeDocsLanguage(localStorage.getItem(DOCS_LANGUAGE_STORAGE))
    if (saved !== language) {
      setLanguage(saved)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!searchOpen) return
    searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setSearchOpen((open) => !open)
        return
      }

      if (event.key === "Escape") {
        setSearchOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function normalizePathForLanguage(path: string): string {
    return path.replace(/^\/docs\/(?:en|zh)(?=\/|$)/, "/docs")
  }

  function setLanguage(next: DocsLanguage) {
    const currentPath = pathname || "/docs"
    const normalizedPath = normalizePathForLanguage(currentPath)
    if (next === lang && normalizedPath === currentPath) return

    setLang(next)
    setSearchOpen(false)
    localStorage.setItem(DOCS_LANGUAGE_STORAGE, next)
    document.cookie = `${DOCS_LANGUAGE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`
    const query = searchParams.toString()
    const target = query ? `${normalizedPath}?${query}` : normalizedPath
    window.location.assign(target)
  }

  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return items

    return items.filter((item) => {
      const haystack = `${item.label} ${item.description ?? ""} ${item.href}`.toLowerCase()
      return haystack.includes(term)
    })
  }, [items, query])

  return (
    <>
      <button
        type="button"
        className="docs-top-search"
        aria-label={copy.searchLabel}
        onClick={() => setSearchOpen(true)}
      >
        <span>{copy.searchPlaceholder}</span>
        <kbd>⌘/Ctrl K</kbd>
      </button>

      <div className="docs-lang-toggle" aria-label="Language toggle">
        <button
          type="button"
          data-active={lang === "en" ? "true" : "false"}
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
        <button
          type="button"
          data-active={lang === "zh" ? "true" : "false"}
          onClick={() => setLanguage("zh")}
        >
          中文
        </button>
      </div>

      {searchOpen ? (
        <div className="docs-search-overlay" role="dialog" aria-modal="true" aria-label={copy.searchLabel}>
          <button
            type="button"
            className="docs-search-backdrop"
            aria-label={copy.closeSearch}
            onClick={() => setSearchOpen(false)}
          />
          <div className="docs-search-panel">
            <input
              ref={searchInputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="docs-search-input"
              placeholder={copy.searchPlaceholder}
            />
            <div className="docs-search-results">
              {filteredItems.length === 0 ? (
                <p className="docs-search-empty">{copy.noSearchResults}</p>
              ) : (
                filteredItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="docs-search-item"
                    onClick={() => {
                      setSearchOpen(false)
                      setQuery("")
                    }}
                  >
                    <span className="docs-search-item-title">{item.label}</span>
                    {item.description ? (
                      <span className="docs-search-item-description">{item.description}</span>
                    ) : null}
                    <span className="docs-search-item-href">{item.href}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

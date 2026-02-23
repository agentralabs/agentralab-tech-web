"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  type DocsLanguage,
  docsUi,
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
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const copy = docsUi(language)

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

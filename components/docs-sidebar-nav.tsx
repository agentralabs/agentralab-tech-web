"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type { CSSProperties } from "react"

interface DocsNavItem {
  href: string
  label: string
}

interface DocsNavGroup {
  label: string
  items: DocsNavItem[]
  defaultOpen?: boolean
}

interface DocsSidebarNavProps {
  groups: DocsNavGroup[]
}

export function DocsSidebarNav({ groups }: DocsSidebarNavProps) {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      groups.map((group) => {
        const hasActive = group.items.some((item) => item.href === pathname)
        return [group.label, group.defaultOpen ?? hasActive]
      }),
    ),
  )

  const palette = [
    { accent: "#0f766e", soft: "#f0fdfa", softBorder: "#99f6e4" },
    { accent: "#0369a1", soft: "#f0f9ff", softBorder: "#bae6fd" },
    { accent: "#475569", soft: "#f8fafc", softBorder: "#cbd5e1" },
    { accent: "#1d4ed8", soft: "#eff6ff", softBorder: "#bfdbfe" },
    { accent: "#0e7490", soft: "#ecfeff", softBorder: "#a5f3fc" },
    { accent: "#64748b", soft: "#f8fafc", softBorder: "#cbd5e1" },
  ]

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev }
      for (const group of groups) {
        const hasActive = group.items.some((item) => item.href === pathname)
        if (hasActive) {
          next[group.label] = true
        } else if (next[group.label] == null) {
          next[group.label] = group.defaultOpen ?? false
        }
      }
      return next
    })
  }, [groups, pathname])

  return (
    <div className="docs-sidebar-groups">
      {groups.map((group, index) => {
        const hasActive = group.items.some((item) => item.href === pathname)
        const open = openGroups[group.label] ?? (group.defaultOpen ?? hasActive)
        const swatch = palette[index % palette.length]
        const groupStyle = {
          "--group-accent": swatch.accent,
          "--group-soft": swatch.soft,
          "--group-soft-border": swatch.softBorder,
        } as CSSProperties

        return (
          <section
            key={group.label}
            className="docs-sidebar-group"
            data-open={open ? "true" : "false"}
            style={groupStyle}
          >
            <button
              type="button"
              className="docs-sidebar-summary"
              aria-expanded={open}
              onClick={() => {
                setOpenGroups((prev) => ({
                  ...prev,
                  [group.label]: !open,
                }))
              }}
            >
              <span className="docs-sidebar-label-row">
                <span className="docs-sidebar-label">{group.label}</span>
                <span className="docs-sidebar-count">{group.items.length}</span>
              </span>
              <span className="docs-sidebar-chevron" aria-hidden="true">▾</span>
            </button>
            <div className="docs-sidebar-nav-wrap">
              <nav className="docs-sidebar-nav">
                {group.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} data-active={active ? "true" : "false"}>
                      <span className="docs-sidebar-link-label">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </section>
        )
      })}
    </div>
  )
}

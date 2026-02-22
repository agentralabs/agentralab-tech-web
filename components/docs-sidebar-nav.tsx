"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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

  return (
    <div className="docs-sidebar-groups">
      {groups.map((group) => {
        const hasActive = group.items.some((item) => item.href === pathname)
        const open = group.defaultOpen ?? hasActive

        return (
          <details key={group.label} className="docs-sidebar-group" open={open}>
            <summary className="docs-sidebar-summary">
              <span className="docs-sidebar-label-row">
                <span className="docs-sidebar-label">{group.label}</span>
                <span className="docs-sidebar-count">{group.items.length}</span>
              </span>
              <span className="docs-sidebar-chevron" aria-hidden="true">▾</span>
            </summary>
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
          </details>
        )
      })}
    </div>
  )
}

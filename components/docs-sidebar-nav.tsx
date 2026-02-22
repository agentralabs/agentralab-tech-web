"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

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
  const activeGroupLabel = useMemo(
    () => groups.find((group) => group.items.some((item) => item.href === pathname))?.label,
    [groups, pathname],
  )
  const initialOpenLabel =
    activeGroupLabel ??
    groups.find((group) => group.defaultOpen)?.label ??
    groups[0]?.label ??
    ""
  const [openLabel, setOpenLabel] = useState<string>(initialOpenLabel)

  useEffect(() => {
    if (activeGroupLabel) {
      setOpenLabel(activeGroupLabel)
      return
    }

    setOpenLabel(initialOpenLabel)
  }, [activeGroupLabel, initialOpenLabel])

  return (
    <div className="docs-sidebar-groups">
      {groups.map((group) => {
        const open = openLabel === group.label

        return (
          <section key={group.label} className="docs-sidebar-group" data-open={open ? "true" : "false"}>
            <button
              type="button"
              className="docs-sidebar-summary"
              aria-expanded={open}
              onClick={() => setOpenLabel((current) => (current === group.label ? "" : group.label))}
            >
              <span className="docs-sidebar-label">{group.label}</span>
              <span className="docs-sidebar-chevron" aria-hidden="true">▾</span>
            </button>
            <div className="docs-sidebar-nav-wrap">
              <nav className="docs-sidebar-nav">
                {group.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} data-active={active ? "true" : "false"}>
                      {item.label}
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

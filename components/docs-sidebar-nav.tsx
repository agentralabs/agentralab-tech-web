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
}

interface DocsSidebarNavProps {
  groups: DocsNavGroup[]
}

export function DocsSidebarNav({ groups }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className="docs-sidebar-groups">
      {groups.map((group) => (
        <section key={group.label} className="docs-sidebar-group">
          <p className="docs-sidebar-label">{group.label}</p>
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
        </section>
      ))}
    </div>
  )
}

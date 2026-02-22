"use client"

import { useMemo, useState } from "react"
import { DocsCopyButton } from "@/components/docs-copy-button"

export interface CommandTabItem {
  label: string
  code: string
  description?: string
}

interface CommandTabsProps {
  title: string
  description?: string
  items: CommandTabItem[]
}

export function CommandTabs({ title, description, items }: CommandTabsProps) {
  const safeItems = useMemo(() => items.filter((item) => item.label && item.code), [items])
  const [activeIndex, setActiveIndex] = useState(0)

  if (safeItems.length === 0) return null

  const selected = safeItems[Math.min(activeIndex, safeItems.length - 1)]
  const content = selected.code.trim()

  return (
    <div className="docs-command docs-command-tabs" role="region" aria-label={title}>
      <div className="docs-command-head">
        <div>
          <p className="docs-command-title">{title}</p>
          {description ? <p className="docs-command-description">{description}</p> : null}
        </div>
      </div>

      <div className="docs-command-tabbar" role="tablist" aria-label={`${title} channels`}>
        {safeItems.map((item, index) => (
          <button
            key={`${item.label}-${index}`}
            type="button"
            role="tab"
            aria-selected={selected === item}
            className="docs-command-tab"
            data-active={selected === item ? "true" : "false"}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="docs-code-shell">
        <DocsCopyButton value={content} />
        <pre className="docs-command-code"><code>{content}</code></pre>
      </div>
      {selected.description ? <p className="docs-command-tab-description">{selected.description}</p> : null}
    </div>
  )
}

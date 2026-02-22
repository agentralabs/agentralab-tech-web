"use client"

import { useEffect, useState } from "react"

function readProgress(): number {
  const root = document.documentElement
  const scrollable = root.scrollHeight - window.innerHeight
  if (scrollable <= 0) return 0
  return Math.max(0, Math.min(100, (window.scrollY / scrollable) * 100))
}

export function DocsReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => setProgress(readProgress())
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div className="docs-reading-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  )
}

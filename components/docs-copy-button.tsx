"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy, History, Sparkles } from "lucide-react"

interface DocsCopyButtonProps {
  value: string
  className?: string
}

async function writeToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.setAttribute("readonly", "true")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  textarea.style.pointerEvents = "none"
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}

export function DocsCopyButton({ value, className }: DocsCopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const onCopy = async () => {
    if (!value.trim()) return
    try {
      await writeToClipboard(value)
      setCopied(true)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={className ?? "docs-copy-actions"}>
      <span className="docs-copy-icon docs-copy-icon-passive" title="Command history">
        <History size={14} />
      </span>
      <button
        type="button"
        className="docs-copy-button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        title={copied ? "Copied" : "Copy"}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <span className="docs-copy-icon docs-copy-icon-passive" title="Enhance">
        <Sparkles size={14} />
      </span>
    </div>
  )
}

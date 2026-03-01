"use client"

import { useEffect, useState } from "react"

const LOG_LINES = [
  "> Booting Agentic ecosystem...",
  "> Loading AgenticMemory: ~/.brain.amem",
  "> Loading AgenticVision: ~/.vision.avis",
  "> Loading AgenticCodebase: project.acb",
  "> Loading AgenticIdentity: ~/.agent.aid",
  "> Loading AgenticTime: ~/.schedule.atime",
  "> Loading AgenticContract: ~/.governance.acon",
  "> Loading AgenticComm: ~/.channels.acomm",
  "> Loading AgenticPlanning: ~/.strategy.aplan",
  "> Initializing Cortex cartography runtime...",
  "> No-browser acquisition: ACTIVE",
  "> Advanced action execution: ACTIVE",
  "> Gateway surface: MCP + REST + plug",
  "> Framework adapters: READY",
  "> Docker + package channels: READY",
  "> WebMCP integration: READY",
  "> Live dashboard telemetry: READY",
  "> Compiler + collective + temporal: READY",
  "> AgenticMemory ready: 16 queries",
  "> AgenticVision ready: 10 tools",
  "> AgenticCodebase ready: 24 queries",
  "> AgenticIdentity ready: 12 tools",
  "> AgenticTime ready: 15 tools",
  "> AgenticContract ready: 21 tools",
  "> AgenticComm ready: 17 tools",
  "> AgenticPlanning ready: 13 tools",
  "> Linking memory <-> vision",
  "> Linking memory <-> codebase",
  "> Linking identity <-> contract",
  "> Linking comm <-> memory",
  "> Linking planning <-> memory",
  "> Cross-session recall: ENABLED",
  "> Visual continuity: ENABLED",
  "> Semantic impact tracing: ENABLED",
  "> Cryptographic trust: ENABLED",
  "> Temporal reasoning: ENABLED",
  "> Policy governance: ENABLED",
  "> Structured communication: ENABLED",
  "> Strategic planning: ENABLED",
  "> MCP transport: STDIO ONLINE",
  "> --------- STACK READY ---------",
]

export function TerminalCard() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        const next = prev + 1
        if (next >= LOG_LINES.length) {
          setLines([])
          return 0
        }
        setLines((l) => [...l.slice(-8), LOG_LINES[next]])
        return next
      })
    }, 600)

    // Add first line
    setLines([LOG_LINES[0]])

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2">
        <span className="h-2 w-2 bg-[#ea580c]" />
        <span className="h-2 w-2 bg-foreground" />
        <span className="h-2 w-2 border border-foreground" />
        <span className="ml-auto text-[10px] tracking-widest text-muted-foreground uppercase">
          stack.init.log
        </span>
      </div>
      <div className="flex-1 bg-foreground p-4 overflow-hidden">
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <span
              key={`${currentLine}-${i}`}
              className="text-xs text-background font-mono block"
              style={{ opacity: i === lines.length - 1 ? 1 : 0.6 }}
            >
              {line}
            </span>
          ))}
          <span className="text-xs text-[#ea580c] font-mono animate-blink">{"_"}</span>
        </div>
      </div>
    </div>
  )
}

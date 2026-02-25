"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react"

type ProjectKey = "AgenticMemory" | "AgenticVision" | "AgenticCodebase" | "AgenticIdentity"
type CommandType = "GLOBAL" | "RUST" | "MCP" | "PYTHON" | "NPM"
type ModeType = "LOCAL" | "MCP"

interface CommandEntry {
  command: string
  note: string
}

const PROJECTS: ProjectKey[] = ["AgenticMemory", "AgenticVision", "AgenticCodebase", "AgenticIdentity"]
const COMMAND_TYPES: CommandType[] = ["GLOBAL", "RUST", "MCP", "PYTHON", "NPM"]

const COMMANDS: Record<ProjectKey, Record<CommandType, CommandEntry[]>> = {
  AgenticMemory: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/memory | bash",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/memory/desktop | bash",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/memory/terminal | bash",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/memory/server | bash",
        note: "Server profile: installs binaries only for remote hosts and service-style environments. Then run agentra server preflight.",
      },
      {
        command: "pip install amem-installer && amem-install install --auto",
        note: "Auto-connects memory to compatible MCP clients.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-memory agentic-memory-mcp",
        note: "Installs core graph engine and MCP server binaries.",
      },
      {
        command: "amem create ~/.brain.amem",
        note: "Creates a portable cognitive memory artifact.",
      },
    ],
    MCP: [
      {
        command: "agentic-memory-mcp --memory ~/.brain.amem serve",
        note: "Serves .amem memory to MCP-compatible assistants.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-brain",
        note: "Installs Python bindings for graph memory workflows.",
      },
      {
        command: "pip install agentic-brain[all]",
        note: "Installs provider integrations for extended memory pipelines.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/memory",
        note: "WASM-based memory SDK for Node.js and browser environments.",
      },
    ],
  },
  AgenticVision: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/vision | bash",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/vision/desktop | bash",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/vision/terminal | bash",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/vision/server | bash",
        note: "Server profile: installs binaries only for remote hosts and service-style environments. Then run agentra server preflight.",
      },
      {
        command: "cargo install agentic-vision-mcp",
        note: "Installs the Vision MCP server binary from crates.io.",
      },
    ],
    RUST: [
      {
        command: "cargo add agentic-vision",
        note: "Adds the core vision library crate to your Rust project.",
      },
      {
        command: "cargo install agentic-vision-mcp",
        note: "Installs the MCP bridge binary for desktop/client integrations.",
      },
    ],
    MCP: [
      {
        command: "agentic-vision-mcp --vision ~/.vision.avis serve",
        note: "Serves .avis visual memory to desktop clients.",
      },
      {
        command: "agentic-vision-mcp --vision ~/.vision.avis validate",
        note: "Validates integrity of the local visual artifact.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-vision",
        note: "Installs Python bindings for visual memory capture and query workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/vision",
        note: "WASM-based vision SDK for Node.js and browser environments.",
      },
    ],
  },
  AgenticCodebase: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/codebase | bash",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/codebase/desktop | bash",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/codebase/terminal | bash",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/codebase/server | bash",
        note: "Server profile: installs binaries only for remote hosts and service-style environments. Then run agentra server preflight.",
      },
      {
        command: "cargo install agentic-codebase",
        note: "Installs acb and acb-mcp for semantic code workflows.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-codebase",
        note: "Installs both acb CLI and acb-mcp from crates.io.",
      },
      {
        command: "acb compile ./my-project -o project.acb",
        note: "Compiles repository structure into a portable semantic graph.",
      },
      {
        command: "acb query project.acb impact --unit-id 42 --depth 5",
        note: "Runs impact analysis with dependency traversal.",
      },
    ],
    MCP: [
      {
        command: "acb-mcp serve",
        note: "Starts MCP stdio transport for code intelligence tools.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-codebase",
        note: "Installs Python bindings for semantic code graph analysis workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/codebase",
        note: "WASM-based codebase SDK for Node.js and browser environments.",
      },
    ],
  },
  AgenticIdentity: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/identity | bash",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/identity/desktop | bash",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/identity/terminal | bash",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/identity/server | bash",
        note: "Server profile: installs binaries only for remote hosts and service-style environments. Set AGENTIC_TOKEN for auth gate.",
      },
      {
        command: "cargo install agentic-identity-cli agentic-identity-mcp",
        note: "Installs aid CLI and agentic-identity-mcp from crates.io.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-identity-cli agentic-identity-mcp",
        note: "Installs both aid CLI and identity MCP server from crates.io.",
      },
      {
        command: "aid init --name my-agent",
        note: "Creates a new Ed25519 identity anchor with a portable .aid artifact.",
      },
      {
        command: "aid sign --receipt action.json",
        note: "Signs an action receipt with the agent's private key.",
      },
    ],
    MCP: [
      {
        command: "agentic-identity-mcp serve",
        note: "Starts MCP stdio transport for identity, trust, and receipt tools.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-identity",
        note: "Installs Python bindings for identity anchor and receipt workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/identity",
        note: "WASM-based identity SDK for Node.js and browser environments.",
      },
    ],
  },
}

const ease = [0.22, 1, 0.36, 1] as const

export function QuickstartTerminalPane() {
  const [projectIndex, setProjectIndex] = useState(0)
  const [commandType, setCommandType] = useState<CommandType>("GLOBAL")
  const [copyState, setCopyState] = useState<string | null>(null)
  const [mode, setMode] = useState<ModeType>("LOCAL")

  const project = PROJECTS[projectIndex]
  const entries = COMMANDS[project][commandType]

  const modeCopy = useMemo(() => {
    if (mode === "LOCAL") {
      return "Local mode keeps .amem, .avis, .acb, and .aid as portable files under your control. After install, run: agentra status --session and agentra doctor."
    }
    return "MCP mode exposes the same .amem, .avis, .acb, and .aid artifacts to MCP clients. Restart your MCP host/client after install to reload config."
  }, [mode])

  const unsupportedNote = `No official ${commandType} commands documented for ${project} yet.`

  const copyCommand = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyState(value)
      setTimeout(() => setCopyState(null), 1100)
    } catch {
      setCopyState(null)
    }
  }

  return (
    <motion.div
      id="quickstart-pane"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.25, ease }}
      className="w-full max-w-4xl mt-8 border-2 border-foreground text-left"
    >
      <div className="border-b-2 border-foreground px-4 py-2 flex items-center justify-between gap-4">
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          quickstart.terminal
        </span>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            {PROJECTS.slice(0, 3).map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setProjectIndex(index)}
                className={`px-2 py-1 text-[10px] font-mono tracking-[0.15em] uppercase border ${
                  index === projectIndex
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border hover:border-foreground"
                }`}
                aria-pressed={index === projectIndex}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {PROJECTS.slice(3).map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setProjectIndex(index + 3)}
                className={`px-2 py-1 text-[10px] font-mono tracking-[0.15em] uppercase border ${
                  index + 3 === projectIndex
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border hover:border-foreground"
                }`}
                aria-pressed={index + 3 === projectIndex}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b-2 border-foreground px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {COMMAND_TYPES.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setCommandType(tab)}
              className={`px-2 py-1 text-[10px] tracking-[0.15em] uppercase font-mono border ${
                tab === commandType
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:border-foreground"
              }`}
              aria-pressed={tab === commandType}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setProjectIndex((projectIndex - 1 + PROJECTS.length) % PROJECTS.length)}
            className="h-7 w-7 border border-foreground flex items-center justify-center"
            aria-label="Previous project"
          >
            <ArrowLeft size={12} />
          </button>
          <button
            type="button"
            onClick={() => setProjectIndex((projectIndex + 1) % PROJECTS.length)}
            className="h-7 w-7 border border-foreground flex items-center justify-center"
            aria-label="Next project"
          >
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="bg-foreground text-background">
        <div className="border-b border-background/20 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
          </div>
          <span className="text-[10px] tracking-[0.15em] uppercase text-background/60 font-mono">
            {project}.{commandType.toLowerCase()}
          </span>
        </div>

        <div className="px-4 py-4 min-h-[230px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${project}-${commandType}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
              className="flex flex-col gap-3"
            >
              {entries.length === 0 ? (
                <div className="text-xs font-mono text-background/75">
                  <p>{`> ${unsupportedNote}`}</p>
                  <p className="italic text-background/60 mt-1">
                    {`Use GLOBAL/RUST/MCP flows for ${project} in current release.`}
                  </p>
                </div>
              ) : (
                entries.map((entry, index) => (
                  <motion.div
                    key={entry.command}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2, ease }}
                    className="border border-background/20 px-3 py-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <code className="text-xs font-mono text-background">{`> ${entry.command}`}</code>
                      <button
                        type="button"
                        onClick={() => copyCommand(entry.command)}
                        className="shrink-0 h-6 px-2 border border-background/30 text-[10px] tracking-[0.12em] uppercase font-mono text-background/70 hover:text-background"
                      >
                        <span className="inline-flex items-center gap-1">
                          {copyState === entry.command ? <Check size={10} /> : <Copy size={10} />}
                          {copyState === entry.command ? "COPIED" : "COPY"}
                        </span>
                      </button>
                    </div>
                    <p className="text-[11px] font-mono italic text-background/60 mt-1">{entry.note}</p>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t-2 border-foreground px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            {(["LOCAL", "MCP"] as ModeType[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`px-2 py-1 text-[10px] tracking-[0.15em] uppercase font-mono border ${
                  mode === item
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border hover:border-foreground"
                }`}
              >
                {item} MODE
              </button>
            ))}
          </div>
          <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-mono">
            .amem / .avis / .acb / .aid
          </span>
        </div>
        <p className="text-xs font-mono text-muted-foreground mt-2">{modeCopy}</p>
      </div>
    </motion.div>
  )
}

"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react"

type ProjectKey = "AgenticMemory" | "AgenticVision" | "AgenticCodebase" | "AgenticIdentity" | "AgenticTime" | "AgenticContract" | "AgenticComm" | "AgenticPlanning" | "AgenticCognition" | "AgenticReality"
type CommandType = "GLOBAL" | "RUST" | "MCP" | "PYTHON" | "NPM"
type ModeType = "LOCAL" | "MCP"

interface CommandEntry {
  command: string
  note: string
}

const PROJECTS: ProjectKey[] = ["AgenticMemory", "AgenticVision", "AgenticCodebase", "AgenticIdentity", "AgenticTime", "AgenticContract", "AgenticComm", "AgenticPlanning", "AgenticCognition", "AgenticReality"]
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
        command: "cargo install agentic-memory-cli agentic-memory-mcp",
        note: "Installs the amem CLI plus MCP server from crates.io.",
      },
      {
        command: "amem init ~/.brain.amem",
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
        command: "cargo install agentic-vision-cli agentic-vision-mcp",
        note: "Installs avis CLI and the Vision MCP server from crates.io.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-vision-cli agentic-vision-mcp",
        note: "Installs avis CLI plus MCP bridge binaries.",
      },
      {
        command: "cargo add agentic-vision",
        note: "Adds the core vision library crate to your Rust project.",
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
        command: "cargo install agentic-codebase-cli agentic-codebase-mcp",
        note: "Installs acb CLI plus codebase MCP server binaries.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-codebase-cli agentic-codebase-mcp",
        note: "Installs both acb CLI and codebase MCP server from crates.io.",
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
        command: "agentic-codebase-mcp serve",
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
  AgenticTime: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/time | bash",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/time/desktop | bash",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/time/terminal | bash",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/time/server | bash",
        note: "Server profile: installs binaries only for remote hosts and service-style environments.",
      },
      {
        command: "cargo install agentic-time-cli agentic-time-mcp",
        note: "Installs atime CLI and agentic-time-mcp from crates.io.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-time-cli agentic-time-mcp",
        note: "Installs both atime CLI and time MCP server from crates.io.",
      },
      {
        command: "atime init ~/.schedule.atime",
        note: "Creates a portable temporal reasoning artifact.",
      },
      {
        command: "atime add deadline --label 'DB migration' --due 2026-03-15T06:00:00Z",
        note: "Adds a deadline entity to the temporal store.",
      },
    ],
    MCP: [
      {
        command: "agentic-time-mcp --time ~/.schedule.atime serve",
        note: "Starts MCP stdio transport for temporal reasoning tools.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-time",
        note: "Installs Python bindings for temporal reasoning and scheduling workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/time",
        note: "WASM-based time SDK for Node.js and browser environments.",
      },
    ],
  },
  AgenticContract: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/contract | bash",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/contract/desktop | bash",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/contract/terminal | bash",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/contract/server | bash",
        note: "Server profile: installs binaries only for remote hosts and service-style environments.",
      },
      {
        command: "cargo install agentic-contract-cli agentic-contract-mcp",
        note: "Installs acon CLI and agentic-contract-mcp from crates.io.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-contract-cli agentic-contract-mcp",
        note: "Installs both acon CLI and contract MCP server from crates.io.",
      },
      {
        command: "acon init ~/.governance.acon",
        note: "Creates a portable governance artifact with default policies.",
      },
      {
        command: "acon policy add --label 'deploy-approval' --action require-approval --scope global",
        note: "Adds a policy requiring approval for deployment actions.",
      },
    ],
    MCP: [
      {
        command: "agentic-contract-mcp --contract ~/.governance.acon serve",
        note: "Starts MCP stdio transport for policy and governance tools.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-contract",
        note: "Installs Python bindings for policy engine and governance workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/contract",
        note: "WASM-based contract SDK for Node.js and browser environments.",
      },
    ],
  },
  AgenticComm: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/comm | bash",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/comm/desktop | bash",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/comm/terminal | bash",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/comm/server | bash",
        note: "Server profile: installs binaries only for remote hosts and service-style environments.",
      },
      {
        command: "cargo install agentic-comm-cli agentic-comm-mcp",
        note: "Installs acomm CLI and agentic-comm-mcp from crates.io.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-comm-cli agentic-comm-mcp",
        note: "Installs both acomm CLI and comm MCP server from crates.io.",
      },
      {
        command: "acomm init ~/.channels.acomm",
        note: "Creates a portable communication artifact with default channels.",
      },
      {
        command: "acomm channel create --name general --type group",
        note: "Creates a named group channel for multi-agent coordination.",
      },
    ],
    MCP: [
      {
        command: "agentic-comm-mcp --comm ~/.channels.acomm serve",
        note: "Starts MCP stdio transport for communication and channel tools.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-comm",
        note: "Installs Python bindings for structured agent communication workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/comm",
        note: "WASM-based comm SDK for Node.js and browser environments.",
      },
    ],
  },
  AgenticPlanning: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/planning | bash",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/planning/desktop | bash",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/planning/terminal | bash",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/planning/server | bash",
        note: "Server profile: installs binaries only for remote hosts and service-style environments.",
      },
      {
        command: "cargo install agentic-planning-cli agentic-planning-mcp",
        note: "Installs aplan CLI and agentic-planning-mcp from crates.io.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-planning-cli agentic-planning-mcp",
        note: "Installs both aplan CLI and planning MCP server from crates.io.",
      },
      {
        command: "aplan init ~/.strategy.aplan",
        note: "Creates a portable strategic planning artifact.",
      },
      {
        command: "aplan goal add --label 'Ship v2.0' --horizon long",
        note: "Adds a persistent goal to the planning store.",
      },
    ],
    MCP: [
      {
        command: "agentic-planning-mcp --planning ~/.strategy.aplan serve",
        note: "Starts MCP stdio transport for strategic planning tools.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-planning",
        note: "Installs Python bindings for strategic planning and goal management workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/planning",
        note: "WASM-based planning SDK for Node.js and browser environments.",
      },
    ],
  },
  AgenticCognition: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/cognition | sh",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/cognition/desktop | sh",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/cognition/terminal | sh",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/cognition/server | sh",
        note: "Server profile: installs binaries only for remote hosts and service-style environments.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-cognition-cli",
        note: "Installs the acog CLI from crates.io.",
      },
      {
        command: "acog init ~/.mirror.acog",
        note: "Creates a portable cognitive user-model artifact.",
      },
    ],
    MCP: [
      {
        command: "acog-mcp --storage ~/.agentic/cognition",
        note: "Starts MCP stdio transport for cognition and user-modeling tools.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-cognition",
        note: "Installs Python bindings for longitudinal user modeling workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/cognition",
        note: "WASM-based cognition SDK for Node.js and browser environments.",
      },
    ],
  },
  AgenticReality: {
    GLOBAL: [
      {
        command: "curl -fsSL https://agentralabs.tech/install/reality | sh",
        note: "Default desktop profile (backward-compatible): installs binaries and auto-merges MCP config for common clients when detected (Claude, Cursor, VS Code, Codex, Windsurf).",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/reality/desktop | sh",
        note: "Explicit desktop profile with MCP auto-merge for common desktop clients.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/reality/terminal | sh",
        note: "Terminal profile: installs binaries only, no desktop config writes.",
      },
      {
        command: "curl -fsSL https://agentralabs.tech/install/reality/server | sh",
        note: "Server profile: installs binaries only for remote hosts and service-style environments.",
      },
    ],
    RUST: [
      {
        command: "cargo install agentic-reality-cli",
        note: "Installs the areal CLI from crates.io.",
      },
      {
        command: "areal init ~/.ground.areal",
        note: "Creates a portable existential grounding artifact.",
      },
    ],
    MCP: [
      {
        command: "areal-mcp --storage ~/.agentic/reality",
        note: "Starts MCP stdio transport for reality grounding and deployment consciousness tools.",
      },
    ],
    PYTHON: [
      {
        command: "pip install agentic-reality",
        note: "Installs Python bindings for deployment consciousness and reality physics workflows.",
      },
    ],
    NPM: [
      {
        command: "npm install @agenticamem/reality",
        note: "WASM-based reality SDK for Node.js and browser environments.",
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
      return "Local mode keeps .amem, .avis, .acb, .aid, .atime, .acon, .acomm, .aplan, .acog, and .areal as portable files under your control. After install, run: agentra status --session and agentra doctor."
    }
    return "MCP mode exposes the same .amem, .avis, .acb, .aid, .atime, .acon, .acomm, .aplan, .acog, and .areal artifacts to MCP clients. Restart your MCP host/client after install to reload config."
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
            {PROJECTS.slice(3, 6).map((item, index) => (
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
          <div className="flex items-center gap-1">
            {PROJECTS.slice(6).map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setProjectIndex(index + 6)}
                className={`px-2 py-1 text-[10px] font-mono tracking-[0.15em] uppercase border ${
                  index + 6 === projectIndex
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border hover:border-foreground"
                }`}
                aria-pressed={index + 6 === projectIndex}
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
            .amem / .avis / .acb / .aid / .atime / .acon / .acomm / .aplan / .acog / .areal
          </span>
        </div>
        <p className="text-xs font-mono text-muted-foreground mt-2">{modeCopy}</p>
      </div>
    </motion.div>
  )
}

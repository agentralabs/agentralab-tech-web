import { NextRequest, NextResponse } from "next/server"

const TARGET_SCRIPTS: Record<string, string> = {
  memory: "https://raw.githubusercontent.com/agentralabs/agentic-memory/main/scripts/install.sh",
  "agentic-memory": "https://raw.githubusercontent.com/agentralabs/agentic-memory/main/scripts/install.sh",
  vision: "https://raw.githubusercontent.com/agentralabs/agentic-vision/main/scripts/install.sh",
  "agentic-vision": "https://raw.githubusercontent.com/agentralabs/agentic-vision/main/scripts/install.sh",
  codebase: "https://raw.githubusercontent.com/agentralabs/agentic-codebase/main/scripts/install.sh",
  "agentic-codebase": "https://raw.githubusercontent.com/agentralabs/agentic-codebase/main/scripts/install.sh",
  identity: "https://raw.githubusercontent.com/agentralabs/agentic-identity/main/scripts/install.sh",
  "agentic-identity": "https://raw.githubusercontent.com/agentralabs/agentic-identity/main/scripts/install.sh",
  time: "https://raw.githubusercontent.com/agentralabs/agentic-time/main/scripts/install.sh",
  "agentic-time": "https://raw.githubusercontent.com/agentralabs/agentic-time/main/scripts/install.sh",
}

const VALID_PROFILES = new Set(["desktop", "terminal", "server"])

function resolveScript(target: string): string | undefined {
  return TARGET_SCRIPTS[target.toLowerCase()]
}

function renderWrapper(scriptUrl: string, profile: string): string {
  return `#!/usr/bin/env bash
set -euo pipefail

SCRIPT_URL=${JSON.stringify(scriptUrl)}
PROFILE=${JSON.stringify(profile)}

if ! command -v curl >/dev/null 2>&1; then
  echo "Error: curl is required but not installed." >&2
  exit 1
fi

curl -fsSL "$SCRIPT_URL" | bash -s -- --profile="$PROFILE" "$@"
`
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ target: string; profile: string }> }
) {
  const { target, profile } = await params
  const scriptUrl = resolveScript(target)
  const normalizedProfile = profile.toLowerCase()

  if (!scriptUrl) {
    return NextResponse.json(
      {
        error: "Unknown installer target",
        supported: ["memory", "vision", "codebase", "identity", "time"],
      },
      { status: 404 }
    )
  }

  if (!VALID_PROFILES.has(normalizedProfile)) {
    return NextResponse.json(
      {
        error: "Unknown install profile",
        supported: ["desktop", "terminal", "server"],
      },
      { status: 404 }
    )
  }

  return new NextResponse(renderWrapper(scriptUrl, normalizedProfile), {
    status: 200,
    headers: {
      "content-type": "text/x-shellscript; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  })
}

export async function HEAD(
  _request: NextRequest,
  { params }: { params: Promise<{ target: string; profile: string }> }
) {
  const { target, profile } = await params
  const scriptUrl = resolveScript(target)
  const normalizedProfile = profile.toLowerCase()

  if (!scriptUrl || !VALID_PROFILES.has(normalizedProfile)) {
    return new NextResponse(null, { status: 404 })
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      "cache-control": "public, max-age=300",
    },
  })
}

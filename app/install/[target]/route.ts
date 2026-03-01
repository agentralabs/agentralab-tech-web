import { NextRequest, NextResponse } from "next/server"

const INSTALL_TARGETS: Record<string, string> = {
  memory: "https://raw.githubusercontent.com/agentralabs/agentic-memory/main/scripts/install.sh",
  "agentic-memory": "https://raw.githubusercontent.com/agentralabs/agentic-memory/main/scripts/install.sh",
  vision: "https://raw.githubusercontent.com/agentralabs/agentic-vision/main/scripts/install.sh",
  "agentic-vision": "https://raw.githubusercontent.com/agentralabs/agentic-vision/main/scripts/install.sh",
  codebase: "https://raw.githubusercontent.com/agentralabs/agentic-codebase/main/scripts/install.sh",
  "agentic-codebase": "https://raw.githubusercontent.com/agentralabs/agentic-codebase/main/scripts/install.sh",
  comm: "https://raw.githubusercontent.com/agentralabs/agentic-comm/main/scripts/install.sh",
  "agentic-comm": "https://raw.githubusercontent.com/agentralabs/agentic-comm/main/scripts/install.sh",
  identity: "https://raw.githubusercontent.com/agentralabs/agentic-identity/main/scripts/install.sh",
  "agentic-identity": "https://raw.githubusercontent.com/agentralabs/agentic-identity/main/scripts/install.sh",
  time: "https://raw.githubusercontent.com/agentralabs/agentic-time/main/scripts/install.sh",
  "agentic-time": "https://raw.githubusercontent.com/agentralabs/agentic-time/main/scripts/install.sh",
  contract: "https://raw.githubusercontent.com/agentralabs/agentic-contract/main/scripts/install.sh",
  "agentic-contract": "https://raw.githubusercontent.com/agentralabs/agentic-contract/main/scripts/install.sh",
  planning: "https://raw.githubusercontent.com/agentralabs/agentic-planning/main/scripts/install.sh",
  "agentic-planning": "https://raw.githubusercontent.com/agentralabs/agentic-planning/main/scripts/install.sh",
}

function resolveTarget(target: string): string | undefined {
  return INSTALL_TARGETS[target.toLowerCase()]
}

function withCacheBust(scriptUrl: string, request: NextRequest): string {
  const url = new URL(scriptUrl)
  const externalNonce = request.nextUrl.searchParams.get("v")
    ?? request.nextUrl.searchParams.get("ts")
    ?? Date.now().toString()
  url.searchParams.set("v", externalNonce)
  return url.toString()
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ target: string }> }
) {
  const { target } = await params
  const scriptUrl = resolveTarget(target)
  const profile = request.nextUrl.searchParams.get("profile")?.toLowerCase()

  if (!scriptUrl) {
    return NextResponse.json(
      {
        error: "Unknown installer target",
        supported: ["memory", "vision", "codebase", "comm", "identity", "time", "contract", "planning"],
      },
      { status: 404 }
    )
  }

  if (profile && ["desktop", "terminal", "server"].includes(profile)) {
    const url = new URL(`/install/${target}/${profile}`, request.url)
    return NextResponse.redirect(url, 307)
  }

  return NextResponse.redirect(withCacheBust(scriptUrl, request), 307)
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ target: string }> }
) {
  const { target } = await params
  const scriptUrl = resolveTarget(target)
  const profile = request.nextUrl.searchParams.get("profile")?.toLowerCase()

  if (!scriptUrl) {
    return new NextResponse(null, { status: 404 })
  }

  if (profile && ["desktop", "terminal", "server"].includes(profile)) {
    return new NextResponse(null, { status: 200 })
  }

  return NextResponse.redirect(withCacheBust(scriptUrl, request), 307)
}

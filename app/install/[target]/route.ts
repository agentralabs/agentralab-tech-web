import { NextRequest, NextResponse } from "next/server"

const INSTALL_TARGETS: Record<string, string> = {
  memory: "https://raw.githubusercontent.com/agentralabs/agentic-memory/main/scripts/install.sh",
  "agentic-memory": "https://raw.githubusercontent.com/agentralabs/agentic-memory/main/scripts/install.sh",
  vision: "https://raw.githubusercontent.com/agentralabs/agentic-vision/main/scripts/install.sh",
  "agentic-vision": "https://raw.githubusercontent.com/agentralabs/agentic-vision/main/scripts/install.sh",
  codebase: "https://raw.githubusercontent.com/agentralabs/codebase/main/scripts/install.sh",
  "agentic-codebase": "https://raw.githubusercontent.com/agentralabs/codebase/main/scripts/install.sh",
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
  _request: NextRequest,
  { params }: { params: Promise<{ target: string }> }
) {
  const { target } = await params
  const scriptUrl = resolveTarget(target)

  if (!scriptUrl) {
    return NextResponse.json(
      {
        error: "Unknown installer target",
        supported: ["memory", "vision", "codebase"],
      },
      { status: 404 }
    )
  }

  return NextResponse.redirect(withCacheBust(scriptUrl, _request), 307)
}

export async function HEAD(
  _request: NextRequest,
  { params }: { params: Promise<{ target: string }> }
) {
  const { target } = await params
  const scriptUrl = resolveTarget(target)

  if (!scriptUrl) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.redirect(withCacheBust(scriptUrl, _request), 307)
}

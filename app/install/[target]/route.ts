import { NextResponse } from "next/server"

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

export async function GET(
  _request: Request,
  { params }: { params: { target: string } }
) {
  const { target } = params
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

  return NextResponse.redirect(scriptUrl, 307)
}

export async function HEAD(
  _request: Request,
  { params }: { params: { target: string } }
) {
  const { target } = params
  const scriptUrl = resolveTarget(target)

  if (!scriptUrl) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.redirect(scriptUrl, 307)
}

import { NextResponse } from "next/server"

const body = `AGENTRA LABS INSTALL ENDPOINTS

Default install commands (desktop profile):

curl -fsSL https://agentralabs.tech/install/memory | bash
curl -fsSL https://agentralabs.tech/install/vision | bash
curl -fsSL https://agentralabs.tech/install/codebase | bash
curl -fsSL https://agentralabs.tech/install/identity | bash

Environment-specific install commands:

# Desktop MCP clients (Claude Desktop/Code auto-merge)
curl -fsSL https://agentralabs.tech/install/memory/desktop | bash
curl -fsSL https://agentralabs.tech/install/vision/desktop | bash
curl -fsSL https://agentralabs.tech/install/codebase/desktop | bash
curl -fsSL https://agentralabs.tech/install/identity/desktop | bash

# Terminal/local CLI only (no config writes)
curl -fsSL https://agentralabs.tech/install/memory/terminal | bash
curl -fsSL https://agentralabs.tech/install/vision/terminal | bash
curl -fsSL https://agentralabs.tech/install/codebase/terminal | bash
curl -fsSL https://agentralabs.tech/install/identity/terminal | bash

# Remote/server host (no desktop config writes)
curl -fsSL https://agentralabs.tech/install/memory/server | bash
curl -fsSL https://agentralabs.tech/install/vision/server | bash
curl -fsSL https://agentralabs.tech/install/codebase/server | bash
curl -fsSL https://agentralabs.tech/install/identity/server | bash

Optional feedback:
https://agentralabs.tech/feedback
`

export async function GET() {
  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  })
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "cache-control": "public, max-age=300",
    },
  })
}

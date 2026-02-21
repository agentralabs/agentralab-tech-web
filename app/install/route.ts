import { NextResponse } from "next/server"

const body = `AGENTRA LABS INSTALL ENDPOINTS

Use one of the following commands:

curl -fsSL https://agentralabs.tech/install/memory | bash
curl -fsSL https://agentralabs.tech/install/vision | bash
curl -fsSL https://agentralabs.tech/install/codebase | bash
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

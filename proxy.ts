import { NextRequest, NextResponse } from "next/server"

const DOCS_LANGUAGE_COOKIE = "agentra_docs_lang"
const DOCS_ROOT = "/docs"

function splitDocsPath(pathname: string): {
  localeInPath?: "en"
  remainder: string
} {
  if (pathname === DOCS_ROOT) {
    return { remainder: "" }
  }

  if (!pathname.startsWith(`${DOCS_ROOT}/`)) {
    return { remainder: "" }
  }

  const segments = pathname.slice(`${DOCS_ROOT}/`.length).split("/")
  const first = segments[0]

  if (first === "en") {
    const rest = segments.slice(1).join("/")
    return {
      localeInPath: "en",
      remainder: rest ? `/${rest}` : "",
    }
  }

  // Redirect any old /docs/zh/... URLs to /docs/en/...
  if (first === "zh") {
    const rest = segments.slice(1).join("/")
    return {
      remainder: rest ? `/${rest}` : "",
    }
  }

  const tail = pathname.slice(DOCS_ROOT.length)
  return { remainder: tail || "" }
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request
  if (!nextUrl.pathname.startsWith(DOCS_ROOT)) {
    return NextResponse.next()
  }

  const { localeInPath, remainder } = splitDocsPath(nextUrl.pathname)

  if (localeInPath === "en") {
    return NextResponse.next()
  }

  // Redirect bare /docs, /docs/zh/..., or any non-locale path to /docs/en/...
  const redirectUrl = nextUrl.clone()
  redirectUrl.pathname = `${DOCS_ROOT}/en${remainder}`
  redirectUrl.searchParams.delete("lang")

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(DOCS_LANGUAGE_COOKIE, "en", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return response
}

export const config = {
  matcher: ["/docs/:path*"],
}

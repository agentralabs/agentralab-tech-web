import { NextRequest, NextResponse } from "next/server"

const DOCS_LANGUAGE_COOKIE = "agentra_docs_lang"
const DOCS_ROOT = "/docs"
const LOCALES = new Set(["en", "zh"])

function normalizeLanguage(value: string | undefined): "en" | "zh" {
  return value === "zh" ? "zh" : "en"
}

function splitDocsPath(pathname: string): {
  localeInPath?: "en" | "zh"
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

  if (LOCALES.has(first)) {
    const rest = segments.slice(1).join("/")
    return {
      localeInPath: first as "en" | "zh",
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

  const requestedLang = normalizeLanguage(nextUrl.searchParams.get("lang") ?? undefined)
  const cookieValue = request.cookies.get(DOCS_LANGUAGE_COOKIE)?.value
  const cookieLang = normalizeLanguage(cookieValue)
  const { localeInPath, remainder } = splitDocsPath(nextUrl.pathname)

  if (localeInPath) {
    if (cookieLang !== localeInPath) {
      const redirectUrl = nextUrl.clone()
      const response = NextResponse.redirect(redirectUrl)
      response.cookies.set(DOCS_LANGUAGE_COOKIE, localeInPath, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      })
      return response
    }

    return NextResponse.next()
  }

  const targetLang = nextUrl.searchParams.has("lang") ? requestedLang : "en"
  const redirectUrl = nextUrl.clone()
  redirectUrl.pathname = `${DOCS_ROOT}/${targetLang}${remainder}`
  redirectUrl.searchParams.delete("lang")

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(DOCS_LANGUAGE_COOKIE, targetLang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return response
}

export const config = {
  matcher: ["/docs/:path*"],
}

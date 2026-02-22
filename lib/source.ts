import { docs, docsZh } from "../.source/server"
import { loader } from "fumadocs-core/source"
import type { DocsLanguage } from "@/lib/docs-i18n"

const sourceEn = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})

const sourceZh = loader({
  baseUrl: "/docs",
  source: docsZh.toFumadocsSource(),
})

export function getDocsSource(language: DocsLanguage) {
  return language === "zh" ? sourceZh : sourceEn
}

export const source = sourceEn

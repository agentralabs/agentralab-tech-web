import { docs } from "../.source/server"
import { loader } from "fumadocs-core/source"
import type { DocsLanguage } from "@/lib/docs-i18n"

const sourceEn = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})

export function getDocsSource(_language: DocsLanguage) {
  return sourceEn
}

export const source = sourceEn

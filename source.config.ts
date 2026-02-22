import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export const docs = defineDocs({
  dir: "docs/ecosystem/en",
})

export const docsZh = defineDocs({
  dir: "docs/ecosystem/zh",
})

export default defineConfig({
  mdxOptions: {},
})

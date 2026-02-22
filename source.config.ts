import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export const docs = defineDocs({
  dir: "docs/public",
})

export const docsZh = defineDocs({
  dir: "docs/public-zh",
})

export default defineConfig({
  mdxOptions: {},
})

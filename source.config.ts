import { defineConfig, defineDocs } from "fumadocs-mdx/config"

export const docs = defineDocs({
  dir: "docs/public",
})

export default defineConfig({
  mdxOptions: {},
})

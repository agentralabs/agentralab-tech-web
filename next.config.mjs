import path from "node:path"
import { fileURLToPath } from "node:url"
import { createMDX } from "fumadocs-mdx/next"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
}

export default withMDX(nextConfig)

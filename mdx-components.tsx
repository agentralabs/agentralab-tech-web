import type { MDXComponents } from "mdx/types"
import { Callout, CliOutput, Command } from "@/components/docs-mdx"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Callout,
    Command,
    CliOutput,
    ...components,
  }
}

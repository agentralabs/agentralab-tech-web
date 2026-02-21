import type { MDXComponents } from "mdx/types"
import { Callout, CliOutput, Command, FeatureCard, FeatureGrid, Step, Steps } from "@/components/docs-mdx"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Callout,
    Command,
    CliOutput,
    FeatureGrid,
    FeatureCard,
    Steps,
    Step,
    ...components,
  }
}

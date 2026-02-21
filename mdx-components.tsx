import type { MDXComponents } from "mdx/types"
import {
  Callout,
  CliOutput,
  Command,
  CommandTabsBlock,
  FeatureCard,
  FeatureGrid,
  Step,
  Steps,
} from "@/components/docs-mdx"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Callout,
    Command,
    CommandTabs: CommandTabsBlock,
    CliOutput,
    FeatureGrid,
    FeatureCard,
    Steps,
    Step,
    ...components,
  }
}

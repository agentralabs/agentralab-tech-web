import type { MDXComponents } from "mdx/types"
import type { ImgHTMLAttributes, HTMLAttributes, ReactNode } from "react"
import {
  Callout,
  CliOutput,
  Command,
  CommandTabsBlock,
  FeatureCard,
  FeatureGrid,
  Hint,
  Note,
  Step,
  Steps,
} from "@/components/docs-mdx"
import { DocsCopyButton } from "@/components/docs-copy-button"

type MdxImageSrc = string | { src?: string } | undefined

function MdxImage({
  src,
  alt = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src?: MdxImageSrc }) {
  const resolvedSrc =
    typeof src === "string" ? src : src && typeof src === "object" ? src.src : undefined

  if (!resolvedSrc) return null

  return <img {...props} src={resolvedSrc} alt={alt} />
}

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map((part) => textFromNode(part)).join("")
  if (!node || typeof node !== "object") return ""

  const value = node as unknown as Record<string, unknown>

  if ("props" in value && value.props && typeof value.props === "object") {
    const props = value.props as Record<string, unknown>
    return textFromNode(props.children as ReactNode)
  }

  if ("children" in value) return textFromNode(value.children as ReactNode)
  if ("value" in value && typeof value.value === "string") return value.value
  return ""
}

function MdxPre({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLPreElement> & { children?: ReactNode }) {
  const content = textFromNode(children ?? "").trim()

  return (
    <div className="docs-code-shell">
      <DocsCopyButton value={content} />
      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  )
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Callout,
    Command,
    CommandTabs: CommandTabsBlock,
    CliOutput,
    FeatureGrid,
    FeatureCard,
    Note,
    Hint,
    Steps,
    Step,
    img: MdxImage,
    pre: MdxPre,
    ...components,
  }
}

import type { MDXComponents } from "mdx/types"
import { Children, cloneElement, isValidElement } from "react"
import type { ImgHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from "react"
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

type AutoCalloutType = "info" | "tip" | "success" | "warning" | "note" | "hint"

function resolveAutoCalloutType(label: string): AutoCalloutType | null {
  const normalized = label.trim().toLowerCase()
  if (!normalized) return null
  if (["note", "notes", "说明", "注意", "注", "备注"].includes(normalized)) return "note"
  if (["hint", "tip", "tips", "提示", "技巧"].includes(normalized)) return "hint"
  if (["warning", "warn", "警告", "告警"].includes(normalized)) return "warning"
  if (["success", "成功", "通过"].includes(normalized)) return "success"
  if (["info", "信息"].includes(normalized)) return "info"
  return null
}

function parseBlockquoteCallout(children: ReactNode): {
  type: AutoCalloutType
  title: string
  content: ReactNode
} | null {
  const blockChildren = Children.toArray(children)
  if (!blockChildren.length) return null

  const firstParagraph = blockChildren[0]
  if (!isValidElement(firstParagraph) || firstParagraph.type !== "p") return null

  const paragraphChildren = Children.toArray(
    (firstParagraph.props as { children?: ReactNode }).children ?? null,
  )
  if (!paragraphChildren.length) return null

  const firstToken = paragraphChildren[0]
  if (!isValidElement(firstToken) || firstToken.type !== "strong") return null

  const strongText = textFromNode((firstToken.props as { children?: ReactNode }).children).trim()
  const title = strongText.replace(/[:：]\s*$/, "")
  const type = resolveAutoCalloutType(title)
  if (!type) return null

  const firstParagraphRemainder = paragraphChildren.slice(1)
  if (typeof firstParagraphRemainder[0] === "string") {
    firstParagraphRemainder[0] = firstParagraphRemainder[0].replace(/^\s*[:：-]\s*/, "")
  }

  const normalizedChildren = [...blockChildren]
  if (firstParagraphRemainder.length) {
    normalizedChildren[0] = cloneElement(
      firstParagraph as ReactElement<{ children?: ReactNode }>,
      undefined,
      firstParagraphRemainder,
    )
  } else {
    normalizedChildren.shift()
  }

  return {
    type,
    title,
    content: normalizedChildren.length === 1 ? normalizedChildren[0] : normalizedChildren,
  }
}

function MdxBlockquote({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLQuoteElement> & { children?: ReactNode }) {
  const parsed = parseBlockquoteCallout(children ?? null)
  if (parsed) {
    return (
      <Callout type={parsed.type} title={parsed.title}>
        {parsed.content}
      </Callout>
    )
  }

  return (
    <blockquote className={className} {...props}>
      {children}
    </blockquote>
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
    blockquote: MdxBlockquote,
    ...components,
  }
}

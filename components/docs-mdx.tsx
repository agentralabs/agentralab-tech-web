import type { ReactNode } from "react"
import {
  BookOpen,
  Brain,
  CircleCheckBig,
  Code2,
  Eye,
  Gauge,
  GitBranch,
  Globe,
  Info,
  Lightbulb,
  LucideIcon,
  Network,
  Search,
  Shield,
  Terminal,
  TriangleAlert,
  Wrench,
} from "lucide-react"
import { CommandTabs, type CommandTabItem } from "@/components/docs-command-tabs"
import { DocsCopyButton } from "@/components/docs-copy-button"

type CalloutType = "info" | "tip" | "success" | "warning" | "note" | "hint"

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

interface CommandProps {
  title: string
  description?: string
  code: string
}

interface CommandTabsProps {
  title: string
  description?: string
  items: CommandTabItem[]
}

interface CliOutputProps {
  title?: string
  output: string
}

interface FeatureGridProps {
  children: ReactNode
}

interface FeatureCardProps {
  title: string
  description: string
  icon?:
    | "brain"
    | "eye"
    | "code"
    | "network"
    | "search"
    | "gauge"
    | "globe"
    | "git"
    | "book"
    | "shield"
    | "wrench"
  href?: string
}

interface StepsProps {
  children: ReactNode
}

interface StepProps {
  number: number
  title: string
  children: ReactNode
}

const ICONS: Record<NonNullable<FeatureCardProps["icon"]>, LucideIcon> = {
  brain: Brain,
  eye: Eye,
  code: Code2,
  network: Network,
  search: Search,
  gauge: Gauge,
  globe: Globe,
  git: GitBranch,
  book: BookOpen,
  shield: Shield,
  wrench: Wrench,
}

function lineTone(line: string): "ok" | "info" | "warn" | "plain" {
  const trimmed = line.trimStart()
  if (trimmed.startsWith("[ok]") || trimmed.startsWith("✓")) return "ok"
  if (trimmed.startsWith("[info]") || trimmed.startsWith(">")) return "info"
  if (trimmed.startsWith("[warn]") || trimmed.startsWith("!")) return "warn"
  return "plain"
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const icon =
    type === "tip" || type === "hint" ? <Lightbulb size={16} /> :
    type === "success" ? <CircleCheckBig size={16} /> :
    type === "warning" ? <TriangleAlert size={16} /> :
    <Info size={16} />

  const resolvedTitle =
    title ??
    (type === "hint" || type === "tip" ? "Hint" :
    type === "success" ? "Success" :
    type === "warning" ? "Warning" :
    "Note")

  return (
    <div className={`docs-callout docs-callout-${type}`}>
      <div className="docs-callout-title">{icon}<span>{resolvedTitle}</span></div>
      <div className="docs-callout-body">{children}</div>
    </div>
  )
}

export function Note({ title = "Note", children }: Omit<CalloutProps, "type">) {
  return (
    <Callout type="note" title={title}>
      {children}
    </Callout>
  )
}

export function Hint({ title = "Hint", children }: Omit<CalloutProps, "type">) {
  return (
    <Callout type="hint" title={title}>
      {children}
    </Callout>
  )
}

export function Command({ title, description, code }: CommandProps) {
  const content = code.trim()

  return (
    <div className="docs-command">
      <div className="docs-command-head">
        <div>
          <p className="docs-command-title">{title}</p>
          {description ? <p className="docs-command-description">{description}</p> : null}
        </div>
      </div>
      <div className="docs-code-shell">
        <DocsCopyButton value={content} />
        <pre className="docs-command-code"><code>{content}</code></pre>
      </div>
    </div>
  )
}

export function CommandTabsBlock({ title, description, items }: CommandTabsProps) {
  return <CommandTabs title={title} description={description} items={items} />
}

export function CliOutput({ title = "CLI Output", output }: CliOutputProps) {
  const content = output.trim()
  const lines = content.split("\n")

  return (
    <div className="docs-cli">
      <p className="docs-cli-title"><Terminal size={14} /> {title}</p>
      <div className="docs-code-shell">
        <DocsCopyButton value={content} />
        <pre>
          {lines.map((line, index) => (
            <div key={`${index}-${line}`} className={`docs-cli-line docs-cli-line-${lineTone(line)}`}>
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export function FeatureGrid({ children }: FeatureGridProps) {
  return <div className="docs-feature-grid">{children}</div>
}

export function FeatureCard({ title, description, icon = "book", href }: FeatureCardProps) {
  const Icon = ICONS[icon]
  const content = (
    <>
      <span className="docs-feature-icon">
        <Icon size={16} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  )

  if (href) {
    return (
      <a className="docs-feature-card" href={href}>
        {content}
      </a>
    )
  }

  return <article className="docs-feature-card">{content}</article>
}

export function Steps({ children }: StepsProps) {
  return <div className="docs-steps">{children}</div>
}

export function Step({ number, title, children }: StepProps) {
  return (
    <section className="docs-step">
      <div className="docs-step-marker">{number}</div>
      <div className="docs-step-content">
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    </section>
  )
}

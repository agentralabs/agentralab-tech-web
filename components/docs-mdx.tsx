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

type CalloutType = "info" | "tip" | "success" | "warning"

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
    type === "tip" ? <Lightbulb size={16} /> :
    type === "success" ? <CircleCheckBig size={16} /> :
    type === "warning" ? <TriangleAlert size={16} /> :
    <Info size={16} />

  return (
    <div className={`docs-callout docs-callout-${type}`}>
      <div className="docs-callout-title">{icon}<span>{title ?? "Note"}</span></div>
      <div className="docs-callout-body">{children}</div>
    </div>
  )
}

export function Command({ title, description, code }: CommandProps) {
  return (
    <div className="docs-command">
      <div className="docs-command-head">
        <div>
          <p className="docs-command-title">{title}</p>
          {description ? <p className="docs-command-description">{description}</p> : null}
        </div>
      </div>
      <pre className="docs-command-code"><code>{code.trim()}</code></pre>
    </div>
  )
}

export function CliOutput({ title = "CLI Output", output }: CliOutputProps) {
  const lines = output.trim().split("\n")

  return (
    <div className="docs-cli">
      <p className="docs-cli-title"><Terminal size={14} /> {title}</p>
      <pre>
        {lines.map((line, index) => (
          <div key={`${index}-${line}`} className={`docs-cli-line docs-cli-line-${lineTone(line)}`}>
            {line}
          </div>
        ))}
      </pre>
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

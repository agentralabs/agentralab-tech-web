import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { source } from "@/lib/source"

interface DocsRouteLayoutProps {
  children: ReactNode
}

export default function DocsRouteLayout({ children }: DocsRouteLayoutProps) {
  return (
    <div className="docs-clean min-h-screen bg-white text-black">
      <DocsLayout
        tree={source.getPageTree()}
        nav={{
          title: <span className="font-semibold tracking-tight">Agentra Labs Docs</span>,
          transparentMode: "none",
        }}
        links={[
          { text: "Get Started", url: "/docs", active: "nested-url", on: "nav" },
          { text: "Reference", url: "/docs/ecosystem-feature-reference", active: "nested-url", on: "nav" },
          { text: "Integrations", url: "/docs/integrations", active: "nested-url", on: "nav" },
          { text: "Website", url: "https://agentralabs.tech", on: "nav" },
        ]}
        sidebar={{ defaultOpenLevel: 1, collapsible: false }}
        searchToggle={{ enabled: true }}
        themeSwitch={{ enabled: false }}
        githubUrl="https://github.com/agentralabs/agentralab-tech-web"
      >
        {children}
      </DocsLayout>
    </div>
  )
}

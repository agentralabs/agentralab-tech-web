import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { source } from "@/lib/source"

interface DocsRouteLayoutProps {
  children: ReactNode
}

export default function DocsRouteLayout({ children }: DocsRouteLayoutProps) {
  return (
    <div className="docs-clean min-h-screen bg-white text-black font-sans">
      <DocsLayout
        tree={source.getPageTree()}
        nav={{
          title: <span className="font-semibold tracking-tight">Agentra Labs Docs</span>,
        }}
        links={[
          { text: "Website", url: "https://www.agentralabs.tech", external: true },
          { text: "GitHub", url: "https://github.com/agentralabs", external: true },
        ]}
        githubUrl="https://github.com/agentralabs/agentralab-tech-web"
      >
        {children}
      </DocsLayout>
    </div>
  )
}

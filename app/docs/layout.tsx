import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { SectionRail } from "@/components/section-rail"
import { source } from "@/lib/source"

interface DocsRouteLayoutProps {
  children: ReactNode
}

export default function DocsRouteLayout({ children }: DocsRouteLayoutProps) {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main className="w-full px-6 pt-10 pb-14 lg:px-12">
        <SectionRail label="// SECTION: DOCS_SYSTEM" step="030" />
        <section className="border-2 border-foreground">
          <DocsLayout
            tree={source.getPageTree()}
            nav={{
              title: <span className="font-mono text-xs uppercase tracking-[0.14em]">Agentra Docs</span>,
            }}
            links={[
              { text: "Projects", url: "/projects", active: "nested-url" },
              { text: "Publications", url: "/publications", active: "nested-url" },
              { text: "Feedback", url: "/feedback", active: "nested-url" },
            ]}
            githubUrl="https://github.com/agentralabs/agentralabs-tech-web"
          >
            {children}
          </DocsLayout>
        </section>
      </main>
      <Footer />
    </div>
  )
}

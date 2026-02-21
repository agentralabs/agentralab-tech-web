import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { submissionLinks } from "@/lib/community"
import { getCommunityFeed } from "@/lib/community-feed"

export const metadata: Metadata = {
  title: "Integrations",
  description: "Integration directory for Agentra Labs: MCP, CLI, Python, Rust, and REST surfaces.",
  alternates: { canonical: "/integrations" },
}

export default async function IntegrationsPage() {
  const feed = await getCommunityFeed()
  const entries = feed.integrations

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: INTEGRATION_INDEX" step="022" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Integration Directory</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Track production and pilot integrations across desktop clients, terminal workflows, and service runtimes.
            </p>
            <a
              href={submissionLinks.integrationForm}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex bg-foreground text-background text-[10px] font-mono tracking-wider uppercase"
            >
              <span className="px-4 py-2">Submit Integration</span>
            </a>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: ACTIVE_MATRIX" step="023" />
          <div className="border-2 border-foreground overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[860px]">
                <div className="grid grid-cols-[160px_140px_140px_1fr_160px] border-b-2 border-foreground">
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Integration</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Project</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Runtime</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Description</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Status</span>
                </div>
                {entries.map((entry) => (
                  <div key={entry.id} className="grid grid-cols-[160px_140px_140px_1fr_160px] border-b border-border last:border-b-0">
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-3 text-xs font-mono hover:text-[#ea580c]"
                    >
                      {entry.name}
                    </a>
                    <span className="px-3 py-3 text-xs font-mono">{entry.project}</span>
                    <span className="px-3 py-3 text-xs font-mono text-muted-foreground">{entry.runtime}</span>
                    <span className="px-3 py-3 text-xs font-mono text-muted-foreground leading-relaxed">{entry.description}</span>
                    <span className="px-3 py-3 text-xs font-mono text-[#ea580c]">{entry.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { CommunityRoutingTable } from "@/components/community-routing-table"
import { featuredFeedback, showcaseEntries, integrationEntries } from "@/lib/community"

export const metadata: Metadata = {
  title: "Community",
  description: "Feedback, showcases, and integration directory for the Agentra Labs ecosystem.",
  alternates: { canonical: "/community" },
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen dot-grid-bg bg-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: COMMUNITY" step="018" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Community</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Feedback, showcases, and integrations from the Agentra ecosystem. Public signal drives roadmap and recognition.
            </p>
          </div>
        </section>

        {/* Showcase */}
        <section className="w-full px-6 pb-14 lg:px-12">
          <SectionRail label="// SECTION: SHOWCASE" step="019" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Hydra pinned */}
            <article className="border-2 border-foreground p-4 border-l-[#ea580c] border-l-2">
              <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#ea580c]">Agentra Labs</p>
              <h2 className="mt-2 text-base font-mono font-bold uppercase tracking-tight">Hydra</h2>
              <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
                Living digital entity. 68 Rust crates. Proves the full stack composes — memory, identity, planning, governance.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="border border-foreground px-2 py-1 text-[10px] font-mono uppercase tracking-wider">AgenticMemory</span>
                <span className="border border-foreground px-2 py-1 text-[10px] font-mono uppercase tracking-wider">Rust</span>
              </div>
            </article>
            {showcaseEntries.map((entry) => (
              <article key={entry.id} className="border-2 border-foreground p-4">
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-muted-foreground">{entry.team}</p>
                <h2 className="mt-2 text-base font-mono font-bold uppercase tracking-tight">{entry.title}</h2>
                <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{entry.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.stack.map((item) => (
                    <span key={item} className="border border-foreground px-2 py-1 text-[10px] font-mono uppercase tracking-wider">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <section className="w-full px-6 pb-14 lg:px-12">
          <SectionRail label="// SECTION: FEEDBACK_WALL" step="020" />
          <div className="border-2 border-foreground">
            <div className="px-5 py-3 border-b-2 border-foreground">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">verified.signal</span>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {featuredFeedback.map((entry) => (
                <article key={entry.id} className="border-2 border-foreground p-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">{entry.project}</span>
                    <span className="h-1 w-1 bg-[#ea580c]" />
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#ea580c]">{entry.type}</span>
                  </div>
                  <p className="mt-3 text-xs font-mono leading-relaxed">&quot;{entry.quote}&quot;</p>
                  <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">{entry.author}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">{entry.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="w-full px-6 pb-14 lg:px-12">
          <SectionRail label="// SECTION: INTEGRATIONS" step="021" />
          <div className="border-2 border-foreground overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-[140px_140px_100px_1fr_120px] border-b-2 border-foreground">
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Integration</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Project</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Runtime</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Description</span>
                  <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Status</span>
                </div>
                {integrationEntries.map((entry) => (
                  <div key={entry.id} className="grid grid-cols-[140px_140px_100px_1fr_120px] border-b border-border last:border-b-0">
                    <a href={entry.link} target="_blank" rel="noreferrer" className="px-3 py-3 text-xs font-mono hover:text-[#ea580c]">{entry.name}</a>
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

        <CommunityRoutingTable step="022" />
      </main>
      <Footer />
    </div>
  )
}

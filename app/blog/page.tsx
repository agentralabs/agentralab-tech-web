import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { CommunityRoutingTable } from "@/components/community-routing-table"
import { blogEntries } from "@/lib/community"
import { getLabLogEntries } from "@/lib/lab-log"

export const metadata: Metadata = {
  title: "Blog",
  description: "Release notes, research commentary, showcase roundups, and ecosystem updates from Agentra Labs.",
  alternates: { canonical: "/blog" },
}

export default async function BlogPage() {
  const labLogEntries = await getLabLogEntries(8)
  const generatedPosts = labLogEntries.map((entry) => ({
    id: entry.slug,
    kind: "generated" as const,
    dateIso: entry.dateIso,
    category: "Blog",
    title: entry.title.replace(/^Lab Log/i, "Blog Update"),
    summary: entry.summary,
    notes: entry.notes,
    sources: entry.sources,
  }))

  const curatedPosts = blogEntries.map((entry) => ({
    id: entry.slug,
    kind: "curated" as const,
    dateIso: entry.dateIso,
    category: entry.category,
    title: entry.title,
    summary: entry.summary,
    cta: entry.cta,
  }))

  const allPosts = [...generatedPosts, ...curatedPosts].sort(
    (a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime(),
  )

  return (
    <div className="min-h-screen dot-grid-bg bg-white">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: BLOG" step="028" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Blog</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Public notes on releases, ecosystem decisions, user signal, and research direction. Automated posts are
              published every 4-5 days.
            </p>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: ENTRY_INDEX" step="029" />
          <div className="border-2 border-foreground divide-y divide-border">
            {allPosts.map((entry) => (
              <article key={entry.id} className="p-5 lg:p-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{entry.dateIso}</span>
                  <span className="h-1 w-1 bg-[#ea580c]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#ea580c]">{entry.category}</span>
                </div>
                <h2 className="mt-2 text-base lg:text-lg font-mono font-bold uppercase tracking-tight">{entry.title}</h2>
                <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{entry.summary}</p>

                {entry.kind === "generated" ? (
                  <>
                    <div className="mt-3 space-y-2">
                      {entry.notes.slice(0, 2).map((note, index) => (
                        <p key={`${entry.id}-note-${index}`} className="text-[11px] font-mono text-muted-foreground leading-relaxed">
                          {note}
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 border border-foreground/30 p-3">
                      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">Sources</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {entry.sources.map((source) => (
                          <a
                            key={`${entry.id}-${source.href}`}
                            href={source.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                          >
                            {source.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={entry.cta.href}
                    target={entry.cta.href.startsWith("http") ? "_blank" : undefined}
                    rel={entry.cta.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-4 inline-block text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
                  >
                    {entry.cta.label}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
        <CommunityRoutingTable step="033" />
      </main>
      <Footer />
    </div>
  )
}

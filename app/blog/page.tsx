import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { blogEntries } from "@/lib/community"

export const metadata: Metadata = {
  title: "Blog",
  description: "Release notes, research commentary, showcase roundups, and ecosystem updates from Agentra Labs.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: LAB_LOG" step="028" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Lab Blog</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Public notes on releases, ecosystem decisions, user signal, and research direction.
            </p>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: ENTRY_INDEX" step="029" />
          <div className="border-2 border-foreground divide-y divide-border">
            {blogEntries.map((entry) => (
              <article key={entry.slug} className="p-5 lg:p-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{entry.dateIso}</span>
                  <span className="h-1 w-1 bg-[#ea580c]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#ea580c]">{entry.category}</span>
                </div>
                <h2 className="mt-2 text-base lg:text-lg font-mono font-bold uppercase tracking-tight">{entry.title}</h2>
                <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{entry.summary}</p>
                <a
                  href={entry.cta.href}
                  target={entry.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={entry.cta.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-4 inline-block text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  {entry.cta.label}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

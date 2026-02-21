import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { submissionLinks } from "@/lib/community"
import { getCommunityFeed } from "@/lib/community-feed"

export const metadata: Metadata = {
  title: "Showcase",
  description: "Public showcase of what teams are building with AgenticMemory, AgenticVision, and AgenticCodebase.",
  alternates: { canonical: "/showcase" },
}

export default async function ShowcasePage() {
  const feed = await getCommunityFeed()
  const entries = feed.showcase

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: BUILD_SHOWCASE" step="020" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">What Teams Build</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Public deployments, workflow wins, and integration outcomes from the Agentra ecosystem. Every listed
              entry is user-submitted and reviewed before publication.
            </p>
            <a
              href={submissionLinks.showcaseForm}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex bg-foreground text-background text-[10px] font-mono tracking-wider uppercase"
            >
              <span className="px-4 py-2">Submit Your Build</span>
            </a>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: DEPLOYMENT_FEED" step="021" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {entries.map((entry) => (
              <article key={entry.id} className="border-2 border-foreground p-4">
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-muted-foreground">{entry.team}</p>
                <h2 className="mt-2 text-base font-mono font-bold uppercase tracking-tight">{entry.title}</h2>
                <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{entry.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.stack.map((item) => (
                    <span
                      key={item}
                      className="border border-foreground px-2 py-1 text-[10px] font-mono uppercase tracking-wider"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  {entry.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="mt-4 border-t border-border pt-3 flex items-center gap-2 flex-wrap">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-[#ea580c]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

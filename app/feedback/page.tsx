import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { CommunityRoutingTable } from "@/components/community-routing-table"
import { submissionLinks } from "@/lib/community"
import { getCommunityFeed } from "@/lib/community-feed"

export const metadata: Metadata = {
  title: "Feedback",
  description: "Public feedback loop for Agentra Labs projects with moderation and showcase publication flow.",
  alternates: { canonical: "/feedback" },
}

export default async function FeedbackPage() {
  const feed = await getCommunityFeed()
  const entries = feed.feedback

  return (
    <div className="min-h-screen dot-grid-bg bg-white">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: FEEDBACK_LOOP" step="018" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Feedback Channel</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Feedback drives roadmap, recognition, and partner trust. We collect public signal, moderate it, and
              publish validated outcomes across memory, vision, and code intelligence surfaces.
            </p>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border-2 border-foreground p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">Submit feedback</p>
                <ul className="mt-3 space-y-2 text-xs font-mono text-muted-foreground leading-relaxed">
                  <li>1. Open Discord channel.</li>
                  <li>2. Select project and category.</li>
                  <li>3. Add reproducible details and environment notes.</li>
                  <li>4. Use email for escalations requiring private context.</li>
                </ul>
                <a
                  href={submissionLinks.feedbackForm}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex bg-foreground text-background text-[10px] font-mono tracking-wider uppercase"
                >
                  <span className="px-4 py-2">Open Discord</span>
                </a>
              </div>
              <div className="border-2 border-foreground p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">Live channels</p>
                <div className="mt-3 border border-foreground bg-foreground text-background p-3 text-xs font-mono space-y-1">
                  <p>{"> Discord: https://discord.gg/agentralabs"}</p>
                  <p>{"> X: https://x.com/agentralab"}</p>
                  <p>{"> Email: contact@agentralabs.tech"}</p>
                </div>
                <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
                  Keep it optional and explicit. No forced telemetry. No hidden prompts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: PUBLIC_FEEDBACK_WALL" step="019" />
          <div className="border-2 border-foreground">
            <div className="px-5 py-3 border-b-2 border-foreground flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">verified.signal</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                {feed.source === "github" ? `live: ${feed.repoPath}` : "fallback: curated"}
              </span>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {entries.map((entry) => (
                <article key={entry.id} className="border-2 border-foreground p-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">{entry.project}</span>
                    <span className="h-1 w-1 bg-[#ea580c]" />
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#ea580c]">{entry.type}</span>
                  </div>
                  <p className="mt-3 text-xs font-mono leading-relaxed">"{entry.quote}"</p>
                  <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">{entry.author}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">{entry.role}</p>
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
                  >
                    {entry.sourceLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <CommunityRoutingTable step="030" />
      </main>
      <Footer />
    </div>
  )
}

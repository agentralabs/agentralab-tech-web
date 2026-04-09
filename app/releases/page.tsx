import type { Metadata } from "next"
import { ArrowUpRight, Github, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { getReleasesFeed } from "@/lib/releases"

export const metadata: Metadata = {
  title: "Releases",
  description: "Live release stream and repository traction metrics for AGENTRA LABS projects.",
  alternates: { canonical: "/releases" },
}

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value))
  } catch {
    return value
  }
}

function formatNumber(value: number): string {
  return Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value)
}

export default async function ReleasesPage() {
  const feed = await getReleasesFeed()

  return (
    <div className="min-h-screen dot-grid-bg bg-white">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-12 lg:px-12">
          <SectionRail label="// SECTION: RELEASE_STREAM" step="035" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Releases</h1>
                <p className="mt-3 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                  Official release index for Agentra Labs — models, substrate, and settlement.
                </p>
              </div>
              <a
                href="https://github.com/agentralabs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-foreground px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors"
              >
                <Github size={14} />
                Open GitHub Org
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-4">
              <div className="border border-foreground p-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Source</p>
                <p className="mt-1 text-xs font-mono uppercase">{feed.source}</p>
              </div>
              <div className="border border-foreground p-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Tracked Repos</p>
                <p className="mt-1 text-xs font-mono uppercase">{feed.repos.length}</p>
              </div>
              <div className="border border-foreground p-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Total Stars</p>
                <p className="mt-1 text-xs font-mono uppercase">{formatNumber(feed.totalStars)}</p>
              </div>
              <div className="border border-foreground p-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">Total Forks</p>
                <p className="mt-1 text-xs font-mono uppercase">{formatNumber(feed.totalForks)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-6 pb-12 lg:px-12">
          <SectionRail label="// SECTION: MODEL_RELEASES" step="035a" />
          <div className="border-2 border-foreground p-5">
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              Model releases in preparation. Solen, Verac, and Axiom will appear here upon HuggingFace publication.
            </p>
          </div>
        </section>

        <section className="w-full px-6 pb-12 lg:px-12">
          <SectionRail label="// SECTION: LATEST_DROPS" step="036" />
          <div className="border-2 border-foreground p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Latest Releases</p>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
              {feed.latest.slice(0, 9).map((item) => (
                <article
                  key={item.id}
                  className="border border-foreground p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">{item.repoName}</p>
                    {item.prerelease ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em] text-[#ea580c]">
                        <Sparkles size={11} />
                        Prerelease
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-xs font-mono font-bold uppercase tracking-[0.08em]">{item.tagName}</p>
                  <p className="mt-1 text-xs font-mono leading-relaxed">{item.title}</p>
                  <p className="mt-3 text-[11px] font-mono leading-relaxed text-muted-foreground">{item.summary}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-[10px] font-mono uppercase tracking-[0.14em]">{formatDate(item.publishedAt)}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em] hover:text-[#ea580c]"
                    >
                      Open Release
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: REPO_TRACKS" step="037" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {feed.repos.map((repo) => (
              <article key={repo.repoPath} className="border-2 border-foreground p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-mono font-bold uppercase tracking-[0.08em]">{repo.repoName}</p>
                  <a
                    href={`${repo.repoUrl}/releases`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                  >
                    Release Page
                    <ArrowUpRight size={12} />
                  </a>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-mono uppercase tracking-[0.12em]">
                  <div className="border border-foreground p-2">
                    <p className="text-muted-foreground">Stars</p>
                    <p className="mt-1">{formatNumber(repo.stars)}</p>
                  </div>
                  <div className="border border-foreground p-2">
                    <p className="text-muted-foreground">Forks</p>
                    <p className="mt-1">{formatNumber(repo.forks)}</p>
                  </div>
                  <div className="border border-foreground p-2">
                    <p className="text-muted-foreground">Issues</p>
                    <p className="mt-1">{formatNumber(repo.openIssues)}</p>
                  </div>
                </div>

                <div className="mt-3 border border-foreground">
                  {repo.releases.length ? (
                    repo.releases.slice(0, 5).map((release) => (
                      <details
                        key={release.id}
                        className="border-b border-border last:border-b-0 group"
                      >
                        <summary className="list-none cursor-pointer px-3 py-2 text-xs font-mono hover:bg-foreground hover:text-background">
                          <span className="font-bold">{release.tagName}</span>
                          {" "}
                          <span className="text-muted-foreground group-hover:text-background">{release.title}</span>
                          <span className="float-right text-[10px] uppercase tracking-[0.12em]">{formatDate(release.publishedAt)}</span>
                        </summary>
                        <div className="px-3 pb-3 space-y-2 border-t border-border">
                          <p className="pt-2 text-[11px] font-mono leading-relaxed text-muted-foreground">
                            {release.summary}
                          </p>
                          <a
                            href={release.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em] hover:text-[#ea580c]"
                          >
                            Open Full Notes
                            <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </details>
                    ))
                  ) : (
                    <p className="px-3 py-3 text-xs font-mono text-muted-foreground">No public releases found for this repository yet.</p>
                  )}
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

import { ArrowUpRight, Megaphone } from "lucide-react"
import { getReleasesFeed } from "@/lib/releases"

function formatReleaseDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
      new Date(value),
    )
  } catch {
    return value
  }
}

export async function HomeReleaseStrip() {
  const feed = await getReleasesFeed()
  const latest = feed.latest.slice(0, 3)

  return (
    <section className="w-full px-6 pb-8 lg:px-12">
      <div className="border-2 border-foreground bg-background p-4 lg:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <Megaphone size={15} />
            <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-muted-foreground">
              Release Broadcast
            </span>
          </div>
          <div className="text-[10px] font-mono tracking-[0.14em] uppercase text-muted-foreground">
            {feed.source === "github" ? "live: github releases" : "fallback: github unavailable"}
          </div>
        </div>

        {latest.length ? (
          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {latest.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="border border-foreground p-3 transition-colors hover:bg-foreground hover:text-background"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">{item.repoName}</p>
                <p className="mt-1 text-xs font-mono font-bold uppercase tracking-[0.08em]">{item.tagName}</p>
                <p className="mt-1 text-[11px] font-mono leading-relaxed">{item.title}</p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.14em]">
                  <span>{formatReleaseDate(item.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1">
                    Open
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-4 border border-foreground p-3 text-xs font-mono text-muted-foreground">
            No public release records available yet. Open the releases page for repo-level details.
          </div>
        )}
      </div>
    </section>
  )
}

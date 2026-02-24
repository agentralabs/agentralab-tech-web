import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { CommunityRoutingTable } from "@/components/community-routing-table"
import { blogPosts } from "@/lib/blog-posts"

export const metadata: Metadata = {
  title: "Blog",
  description: "Weekly editorial posts on real workflows, outcomes, and applied lessons from the Agentra ecosystem.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  const allPosts = [...blogPosts].sort(
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
              Field notes on what teams are learning while running Agentra in production-like environments: what
              changed, what failed, what held up, and what others can reuse.
            </p>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: ENTRY_INDEX" step="029" />
          <div className="border-2 border-foreground divide-y divide-border">
            {allPosts.map((entry) => (
              <article key={entry.slug} className="p-5 lg:p-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{entry.dateIso}</span>
                  <span className="h-1 w-1 bg-[#ea580c]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#ea580c]">{entry.category}</span>
                </div>
                <h2 className="mt-2 text-base lg:text-lg font-mono font-bold uppercase tracking-tight">{entry.title}</h2>
                <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{entry.excerpt}</p>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{entry.readTime}</p>

                <Link
                  href={`/blog/${entry.slug}`}
                  className="mt-4 inline-block text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  Read post
                </Link>
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

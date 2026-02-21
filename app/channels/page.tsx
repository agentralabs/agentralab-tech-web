import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { communityChannels } from "@/lib/community"

export const metadata: Metadata = {
  title: "Channels",
  description: "Official community channels for support, feedback, research discussion, and ecosystem collaboration.",
  alternates: { canonical: "/channels" },
}

export default function ChannelsPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: COMMUNITY_CHANNELS" step="024" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Communication Channels</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Use the right channel for the right signal: support, roadmap, partnership, research, or showcase.
            </p>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: ROUTING_TABLE" step="025" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {communityChannels.map((channel) => (
              <article key={channel.name} className="border-2 border-foreground p-4">
                <h2 className="text-base font-mono font-bold uppercase tracking-tight">{channel.name}</h2>
                <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{channel.purpose}</p>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex bg-foreground text-background text-[10px] font-mono tracking-wider uppercase"
                >
                  <span className="px-4 py-2">{channel.primaryAction}</span>
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

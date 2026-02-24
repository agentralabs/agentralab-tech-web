import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { CommunityRoutingTable } from "@/components/community-routing-table"

export const metadata: Metadata = {
  title: "Partners",
  description: "Partnership, sponsorship, and research collaboration pathways for Agentra Labs.",
  alternates: { canonical: "/partners" },
}

const TRACKS = [
  {
    name: "Research Collaboration",
    detail: "Joint experiments, publication pathways, and reproducible benchmarking on agent infrastructure.",
  },
  {
    name: "Ecosystem Integration",
    detail: "MCP/client integration support for production teams using memory, vision, and code intelligence layers.",
  },
  {
    name: "Sponsorship",
    detail: "Open-source sustainability support for roadmap acceleration and public infrastructure maintenance.",
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen dot-grid-bg bg-white">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: PARTNER_DESK" step="026" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Partnerships and Sponsorships</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              We partner with teams operating real systems. If your work touches persistent memory, web perception,
              semantic code intelligence, or governance infrastructure, we can collaborate.
            </p>
            <div className="mt-5 inline-flex border-2 border-foreground text-foreground text-[10px] font-mono tracking-wider uppercase">
              <span className="px-4 py-2">Partner Intake By Review</span>
            </div>
            <p className="mt-3 text-xs font-mono text-muted-foreground">
              Submit your context and scope by email. We review institutional and sponsor collaboration requests on a
              rolling basis. For priority requests, use{" "}
              <a href="mailto:contact@agentralabs.tech" className="underline hover:text-foreground">
                contact@agentralabs.tech
              </a>.
            </p>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: COLLAB_TRACKS" step="027" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {TRACKS.map((track) => (
              <article key={track.name} className="border-2 border-foreground p-4">
                <h2 className="text-base font-mono font-bold uppercase tracking-tight">{track.name}</h2>
                <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{track.detail}</p>
              </article>
            ))}
          </div>
        </section>
        <CommunityRoutingTable step="034" />
      </main>
      <Footer />
    </div>
  )
}

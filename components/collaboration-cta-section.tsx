import Link from "next/link"
import { SectionRail } from "@/components/section-rail"

export function CollaborationCtaSection() {
  return (
    <section className="w-full px-6 pb-14 lg:px-12" aria-label="Collaboration">
      <SectionRail label="// SECTION: COLLABORATION_CTA" step="003B" />
      <div className="border-2 border-foreground p-5 lg:p-6 bg-background">
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance">
          Built for institutions and sponsors operating real systems
        </h2>
        <p className="mt-3 text-sm font-mono text-muted-foreground leading-relaxed max-w-4xl">
          We collaborate with research labs, enterprise engineering teams, and infrastructure sponsors building
          reliable long-lived agent systems. Our focus is continuity, governed execution, and audit-ready operations.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Link
            href="/partners"
            className="inline-flex items-center justify-center border border-foreground bg-foreground px-4 py-2 text-[11px] font-mono uppercase tracking-[0.14em] text-background hover:bg-background hover:text-foreground transition-colors"
          >
            Collaboration Tracks
          </Link>
          <a
            href="mailto:contact@agentralabs.tech"
            className="inline-flex items-center justify-center border border-foreground px-4 py-2 text-[11px] font-mono uppercase tracking-[0.14em] hover:bg-foreground hover:text-background transition-colors"
          >
            Contact Team
          </a>
        </div>
      </div>
    </section>
  )
}

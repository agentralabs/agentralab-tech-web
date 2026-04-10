import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StackDiagramSection } from "@/components/stack-diagram-section"
import { ModelShowcaseSection } from "@/components/model-showcase-section"
import { MemoryFeatureSection } from "@/components/memory-feature-section"
import { SubstrateSummarySection } from "@/components/substrate-summary-section"
import { ProofSection } from "@/components/proof-section"
import { HydraSection } from "@/components/hydra-section"
import { HomeReleaseStrip } from "@/components/home-release-strip"
import { CollaborationCtaSection } from "@/components/collaboration-cta-section"
import { CommunityRoutingTable } from "@/components/community-routing-table"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Agentra Labs trains domain-specific AI models (Solen, Verac, Axiom) and publishes the open-source infrastructure they run on. Persistent memory. Cryptographic identity. Every decision verifiable.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AGENTRA LABS | Domain-Specialist AI Models + Open Infrastructure",
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    title: "AGENTRA LABS | Domain-Specialist AI Models + Open Infrastructure",
    description: siteConfig.description,
  },
}

export default function Page() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <HeroSection />
        <StackDiagramSection />
        <ModelShowcaseSection />
        <MemoryFeatureSection />
        <SubstrateSummarySection />
        <ProofSection />
        <HydraSection />
        <HomeReleaseStrip />
        <CollaborationCtaSection />
        <CommunityRoutingTable step="017" />
      </main>
      <Footer />
    </div>
  )
}

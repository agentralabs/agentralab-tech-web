import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AStarFilesSection } from "@/components/astar-files-section"
import { ScenarioCardsSection } from "@/components/scenario-cards-section"
import { BenchmarksSection } from "@/components/benchmarks-section"
import { HomeReleaseStrip } from "@/components/home-release-strip"
import { ValueProofSection } from "@/components/value-proof-section"
import { CollaborationCtaSection } from "@/components/collaboration-cta-section"
import { FeatureGrid } from "@/components/feature-grid"
import { AboutSection } from "@/components/about-section"
import { PricingSection } from "@/components/pricing-section"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { Footer } from "@/components/footer"
import { CommunityRoutingTable } from "@/components/community-routing-table"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Your AI forgets you exist. Ours remembers for 20 years. Five open-source systems — AgenticMemory, AgenticVision, AgenticCodebase, AgenticIdentity, and AgenticTime. Five file formats. Forever yours. .amem .avis .acb .aid .atime",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AGENTRA LABS | Open-Source Agentic Infrastructure",
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    title: "AGENTRA LABS | Open-Source Agentic Infrastructure",
    description: siteConfig.description,
  },
}

export default function Page() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <HeroSection />
        <AStarFilesSection />
        <ScenarioCardsSection />
        <BenchmarksSection />
        <HomeReleaseStrip />
        <ValueProofSection />
        <CollaborationCtaSection />
        <FeatureGrid />
        <AboutSection />
        <PricingSection />
        <GlitchMarquee />
        <CommunityRoutingTable step="017" />
      </main>
      <Footer />
    </div>
  )
}

import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ValueProofSection } from "@/components/value-proof-section"
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
    "AGENTRA LABS builds open-source agentic infrastructure: AgenticMemory for long-horizon memory retention, AgenticVision for queryable visual operations, and AgenticCodebase for semantic code risk intelligence.",
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
        <ValueProofSection />
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

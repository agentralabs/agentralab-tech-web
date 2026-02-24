import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionRail } from "@/components/section-rail"
import { PartnerIntakeForm } from "@/components/partner-intake-form"

export const metadata: Metadata = {
  title: "Partner Intake",
  description: "Submit collaboration context and scope for Agentra partnership and sponsorship review.",
  alternates: { canonical: "/partners/intake" },
}

export default function PartnerIntakePage() {
  return (
    <div className="min-h-screen dot-grid-bg bg-white">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-10 lg:px-12">
          <SectionRail label="// SECTION: PARTNER_INTAKE" step="026A" />
          <div className="border-2 border-foreground p-6 lg:p-8">
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">Partner Intake</h1>
            <p className="mt-4 max-w-4xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Share your operational context and intended collaboration scope. We review submissions on a rolling basis
              and respond directly to the contact listed in your intake.
            </p>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: INTAKE_FORM" step="026B" />
          <PartnerIntakeForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}


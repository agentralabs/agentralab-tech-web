"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const MODELS = [
  { label: "Solen", href: "https://huggingface.co/agentralabs/solen-e4b" },
  { label: "Verac", href: "https://huggingface.co/agentralabs/verac-e4b" },
  { label: "Axiom", href: "https://huggingface.co/agentralabs/axiom-e4b" },
]

const SUBSTRATE_PRIMARY = [
  { label: "AgenticMemory", href: "https://github.com/agentralabs/agentic-memory" },
  { label: "AgenticVision", href: "https://github.com/agentralabs/agentic-vision" },
  { label: "AgenticCodebase", href: "https://github.com/agentralabs/agentic-codebase" },
  { label: "AgenticIdentity", href: "https://github.com/agentralabs/agentic-identity" },
]

const SUBSTRATE_REST = [
  { label: "Time", href: "https://github.com/agentralabs/agentic-time" },
  { label: "Contract", href: "https://github.com/agentralabs/agentic-contract" },
  { label: "Comm", href: "https://github.com/agentralabs/agentic-comm" },
  { label: "Planning", href: "https://github.com/agentralabs/agentic-planning" },
  { label: "Cognition", href: "https://github.com/agentralabs/agentic-cognition" },
  { label: "Reality", href: "https://github.com/agentralabs/agentic-reality" },
  { label: "+ 8 more", href: "https://github.com/agentralabs" },
]

const SETTLEMENT = [
  { label: "XAP Protocol", href: "https://github.com/agentra-commerce/xap-protocol" },
  { label: "Verity Engine", href: "https://github.com/agentra-commerce/verity-engine" },
]

const SITE_LINKS = [
  { label: "Stack", href: "/projects" },
  { label: "Research", href: "/publications" },
  { label: "Docs", href: "/docs", newTab: true },
  { label: "Blog", href: "/blog" },
  { label: "Partners", href: "/partners" },
  { label: "Community", href: "/community" },
  { label: "Releases", href: "/releases" },
]

function FooterLink({ label, href, newTab, className }: { label: string; href: string; newTab?: boolean; className?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") || newTab ? "_blank" : undefined}
      rel={href.startsWith("http") || newTab ? "noreferrer" : undefined}
      className={`text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 ${className ?? ""}`}
    >
      {label}
    </a>
  )
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease }}
      className="w-full border-t-2 border-foreground px-6 py-8 lg:px-12"
    >
      <div className="flex flex-col gap-6">
        {/* Top: brand + layer groups */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-1 shrink-0">
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold text-foreground">
              AGENTRA LABS
            </span>
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
              {"(C) 2026 AGENTRA LABS"}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
              DOMAIN AI + OPEN INFRASTRUCTURE
            </span>
          </div>

          {/* Layer groups */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Models */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#ea580c] font-bold">Models</span>
              {MODELS.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>

            {/* Substrate */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground font-bold">Substrate</span>
              {SUBSTRATE_PRIMARY.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                {SUBSTRATE_REST.map((link) => (
                  <FooterLink key={link.label} {...link} className="text-[9px] text-muted-foreground/60" />
                ))}
              </div>
            </div>

            {/* Settlement + Showcase */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground font-bold">Settlement</span>
              {SETTLEMENT.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground font-bold mt-3">Showcase</span>
              <FooterLink label="Hydra" href="https://github.com/agentralabs/hydra" />
            </div>

            {/* Site */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground font-bold">Site</span>
              {SITE_LINKS.map((link) => (
                <FooterLink key={link.label} {...link} newTab={link.newTab} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pt-4 border-t border-border">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
            Open to research collaboration, model partnerships, and infrastructure sponsorship.
          </span>
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href="mailto:contact@agentralabs.tech"
              className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground"
            >
              contact@agentralabs.tech
            </a>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
              www.agentralabs.tech
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

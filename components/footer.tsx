"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const SITE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Docs", href: "/docs" },
  { label: "Feedback", href: "/feedback" },
  { label: "Showcase", href: "/showcase" },
  { label: "Integrations", href: "/integrations" },
  { label: "Blog", href: "/blog" },
  { label: "Partner", href: "/partners" },
]

const PROJECT_LINKS = [
  { label: "AgenticMemory", href: "https://github.com/agentralabs/agentic-memory" },
  { label: "AgenticVision", href: "https://github.com/agentralabs/agentic-vision" },
  { label: "AgenticCodebase", href: "https://github.com/agentralabs/codebase" },
  { label: "AgentraLabsWeb", href: "https://github.com/agentralabs/agentralab-tech-web" },
]

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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold text-foreground">
              AGENTRA LABS
            </span>
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
              {"(C) 2026 AGENTRA LABS | OPEN SOURCE AGENTIC LAB"}
            </span>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-5 flex-wrap">
              {SITE_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.03, duration: 0.35, ease }}
                  className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="w-full border-t border-border pt-3 flex items-center gap-5 flex-wrap">
              {PROJECT_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.35, ease }}
                  className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pt-4 border-t border-border">
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
            Open to feedback, showcases, integrations, partnerships, and research collaboration.
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

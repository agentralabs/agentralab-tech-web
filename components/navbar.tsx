"use client"

import { useState } from "react"
import { Cpu, Star, Tag, Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/lib/site"

const ease = [0.22, 1, 0.36, 1] as const

const NAV_LINKS = [
  { label: "MODELS", href: "/projects#models" },
  { label: "STACK", href: "/projects" },
]

const RESEARCH_LINKS = [
  { label: "Publications", href: "/publications" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [researchOpen, setResearchOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="w-full px-4 pt-4 lg:px-6 lg:pt-6 relative z-50"
    >
      <nav className="w-full border border-foreground/20 bg-background/80 backdrop-blur-sm px-6 py-3 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <Cpu size={16} strokeWidth={1.5} />
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold">
              AGENTRA LABS
            </span>
          </a>

          {/* Center nav — desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease }}
                className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}

            {/* Research dropdown */}
            <div className="relative">
              <button
                onClick={() => setResearchOpen(!researchOpen)}
                onBlur={() => setTimeout(() => setResearchOpen(false), 150)}
                className="flex items-center gap-1 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                RESEARCH
                <ChevronDown size={12} className={`transition-transform ${researchOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {researchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 border border-foreground bg-background min-w-[160px] z-50"
                  >
                    {RESEARCH_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block px-4 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/docs"
              className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              DOCS
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href="/releases"
              className="hidden lg:inline-flex items-center gap-1 border border-foreground px-2.5 py-1.5 text-[10px] font-mono tracking-[0.14em] uppercase hover:bg-foreground hover:text-background transition-colors"
              data-umami-event="navbar_releases_click"
            >
              <Tag size={12} />
              Releases
            </a>
            <a
              href={siteConfig.githubOrgUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1 border border-[#ea580c] bg-[#ea580c] px-2.5 py-1.5 text-[10px] font-mono tracking-[0.14em] uppercase text-background hover:bg-foreground hover:border-foreground transition-colors"
              data-umami-event="navbar_star_click"
            >
              <Star size={12} />
              Star on GitHub
            </a>
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              className="lg:hidden overflow-hidden border-t border-foreground/20 mt-3"
            >
              <div className="flex flex-col gap-0 py-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="px-2 py-1 text-[10px] font-mono tracking-widest uppercase text-muted-foreground/50 mt-2">
                  Research
                </div>
                {RESEARCH_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/docs"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground mt-2 border-t border-foreground/10 pt-3"
                >
                  DOCS
                </a>
                <a href="/partners" onClick={() => setMobileOpen(false)} className="px-2 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground">
                  PARTNERS
                </a>
                <a href="/community" onClick={() => setMobileOpen(false)} className="px-2 py-2.5 text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground">
                  COMMUNITY
                </a>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-foreground/10 px-2">
                  <a href="/releases" className="inline-flex items-center gap-1 border border-foreground px-2.5 py-1.5 text-[10px] font-mono tracking-[0.14em] uppercase hover:bg-foreground hover:text-background transition-colors">
                    <Tag size={12} />
                    Releases
                  </a>
                  <a href={siteConfig.githubOrgUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 border border-[#ea580c] bg-[#ea580c] px-2.5 py-1.5 text-[10px] font-mono tracking-[0.14em] uppercase text-background">
                    <Star size={12} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  )
}

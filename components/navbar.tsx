"use client"

import { Cpu, Star, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/lib/site"

export function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full px-4 pt-4 lg:px-6 lg:pt-6"
    >
      <nav className="w-full border border-foreground/20 bg-background/80 backdrop-blur-sm px-6 py-3 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <Cpu size={16} strokeWidth={1.5} />
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold">
              AGENTRA LABS
            </span>
          </motion.div>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "HOME", href: "/" },
              { label: "PROJECTS", href: "/projects" },
              { label: "PUBLICATIONS", href: "/publications" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right side: Releases + GitHub + Theme toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <motion.a
              href="/releases"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:inline-flex items-center gap-1 border border-foreground px-2.5 py-1.5 text-[10px] font-mono tracking-[0.14em] uppercase hover:bg-foreground hover:text-background transition-colors"
              data-umami-event="navbar_releases_click"
            >
              <Tag size={12} />
              Releases
            </motion.a>
            <motion.a
              href={siteConfig.githubOrgUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:inline-flex items-center gap-1 border border-[#ea580c] bg-[#ea580c] px-2.5 py-1.5 text-[10px] font-mono tracking-[0.14em] uppercase text-background hover:bg-foreground hover:border-foreground transition-colors"
              data-umami-event="navbar_star_click"
            >
              <Star size={12} />
              Star on GitHub
            </motion.a>
            <ThemeToggle />
          </motion.div>
        </div>
      </nav>
    </motion.div>
  )
}

<p align="center">
  <img src="assets/github-hero-pane.svg" alt="Agentra Labs Web hero pane" width="980">
</p>

<p align="center">
  <a href="https://agentralab-tech-web.vercel.app"><img src="https://img.shields.io/badge/Live-agentralabs.tech-ea580c?style=for-the-badge" alt="Live Site"></a>
  <a href="#stack"><img src="https://img.shields.io/badge/Next.js-15-111111?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"></a>
  <a href="#stack"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" alt="MIT License"></a>
</p>

<p align="center">
  <strong>Documentation site and developer portal for the Agentra ecosystem.</strong>
</p>

<p align="center">
  <a href="#local-development">Dev</a> · <a href="#docs-sync">Docs Sync</a> · <a href="#pages">Pages</a> · <a href="#linked-repositories">Repos</a>
</p>

---

<a name="stack"></a>

## Stack

- **Next.js** App Router + TypeScript
- **Tailwind CSS** + Framer Motion
- **Fumadocs** MDX documentation engine
- **Vercel** deployment

<a name="local-development"></a>

## Local Development

```bash
pnpm install
pnpm dev             # http://localhost:3000
```

Build and verify:

```bash
pnpm docs:sync       # sync ecosystem docs from canonical sources
pnpm lint            # tsc --noEmit
pnpm build           # production build
```

<a name="docs-sync"></a>

## Docs Sync

Ecosystem documentation is generated from canonical sources in the sister repos and the monorepo. The sync pipeline ensures the web site always matches the source of truth.

```bash
pnpm docs:sync          # regenerate docs from canonical sources
pnpm docs:sync:check    # strict mode — fails if docs are out of sync
```

Canonical sources: sister `docs/public/` directories + monorepo `docs/`.

## Automated Blog Publishing

Blog entries are generated from GitHub release/commit signals and published automatically every 4-5 days.

```bash
pnpm lablog:generate     # generate from signals
pnpm lablog:release      # sync from GitHub releases
```

Workflow: `.github/workflows/lab-log-autopublish.yml`

<a name="pages"></a>

## Pages

| Route | Content |
|-------|---------|
| `/` | Home |
| `/projects` | Projects overview |
| `/publications` | Research papers |
| `/docs` | Documentation hub (all five sisters) |
| `/integrations` | MCP client integration guides |
| `/showcase` | Community showcase |
| `/blog` | Lab log / blog |
| `/feedback` | Feedback |
| `/channels` | Community channels |
| `/partners` | Partners |
| `/install/[target]/[profile]` | Install route (desktop/terminal/server) |

<a name="linked-repositories"></a>

## Linked Repositories

| Sister | Repository | Artifact |
|--------|-----------|----------|
| AgenticMemory | [agentralabs/agentic-memory](https://github.com/agentralabs/agentic-memory) | `.amem` |
| AgenticVision | [agentralabs/agentic-vision](https://github.com/agentralabs/agentic-vision) | `.avis` |
| AgenticCodebase | [agentralabs/agentic-codebase](https://github.com/agentralabs/agentic-codebase) | `.acb` |
| AgenticIdentity | [agentralabs/agentic-identity](https://github.com/agentralabs/agentic-identity) | `.aid` |
| AgenticTime | [agentralabs/agentic-time](https://github.com/agentralabs/agentic-time) | `.atime` |

---

<p align="center">
  Built by <a href="https://agentralab-tech-web.vercel.app">Agentra Labs</a>
</p>

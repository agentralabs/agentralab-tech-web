# Agentra Labs Web

Official website for Agentra Labs (`agentralabs.tech`) built with Next.js and the internal Agentra design system.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Build and Verify

```bash
pnpm docs:sync
pnpm lint
pnpm build
```

## Deployment (Vercel)

This repo is prepared for Vercel deployment.

- `vercel.json` contains production routing headers
- metadata, sitemap, robots, and social cards are configured in `app/`

See:

- `docs/ecosystem/en/installation.mdx`
- `docs/ecosystem/en/integrations.mdx`
- `docs/ecosystem/en/server-runtime-auth-and-artifact-sync.mdx`

## Docs Sync Model

- Single source for web docs: `docs/ecosystem/*`
- Canonical ecosystem docs are synced in via `pnpm docs:sync`
- Drift check: `pnpm docs:sync:check`

## Pages

- `/` Home
- `/projects` Projects
- `/publications` Publications
- `/docs` Documentation Hub
- `/feedback` Feedback
- `/showcase` Showcase
- `/integrations` Integrations
- `/channels` Channels
- `/blog` Blog
- `/partners` Partners

## Linked Repositories

- AgenticMemory: <https://github.com/agentralabs/agentic-memory>
- AgenticVision: <https://github.com/agentralabs/agentic-vision>
- AgenticCodebase: <https://github.com/agentralabs/codebase>

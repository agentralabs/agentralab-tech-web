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
pnpm lint
pnpm build
```

## Deployment (Vercel)

This repo is prepared for Vercel deployment.

- `vercel.json` contains production routing headers
- metadata, sitemap, robots, and social cards are configured in `app/`

See:

- `docs/public/vercel-deployment.mdx`
- `docs/public/seo-checklist.mdx`

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

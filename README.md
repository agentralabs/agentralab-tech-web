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

## Automated Lab Log Publishing

Lab Log entries can be generated from GitHub release/commit signals and published automatically every 72 hours.

- Generator script: `scripts/generate-lab-log.mjs`
- Local run: `pnpm lablog:generate`
- GitHub release sync: `pnpm lablog:release`
- Output:
  - `content/lab-log/*.mdx`
  - `data/lab-log-index.json`
  - `data/lab-log-state.json`
- Optional manual signals file: `data/lab-log-manual.json`

Workflow:

- `.github/workflows/lab-log-autopublish.yml`
- Runs daily and publishes whenever the last publish is older than 72 hours.
- If unseen source events are below threshold, it publishes in carryover heartbeat mode (same cadence, lower-signal summary).
- Commits only when a new entry is generated.
- Every generated publish also creates a matching GitHub Release with business-structured notes.
- Quality gate is mandatory: 3 long-form paragraphs, highlight bullets, and source links are required.

Environment knobs:

- `LAB_LOG_REPO_SOURCES` comma-separated `owner/repo` list.
- `LAB_LOG_INTERVAL_HOURS` default `72`.
- `LAB_LOG_MIN_EVENTS` default `2`.
- `LAB_LOG_MAX_SIGNALS` default `6`.
- `LAB_LOG_FORCE=true` to bypass interval guard.
- `LAB_LOG_RELEASE_DRY_RUN=1` to print release body without creating a GitHub release.

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

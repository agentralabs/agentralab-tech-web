# Vercel Deployment Notes

## Runtime

- Framework: Next.js (App Router)
- Config file: `vercel.json`
- Security headers are defined in `vercel.json`.

## Required Steps

1. Import repo into Vercel.
2. Set production domain to `agentralabs.tech`.
3. Verify automatic HTTPS and redirect from `www` if applicable.
4. Confirm `robots.txt` and `sitemap.xml` resolve in production.
5. Re-run social card validation after each major content update.

## Post-Deploy Verification

- `https://agentralabs.tech/robots.txt`
- `https://agentralabs.tech/sitemap.xml`
- `https://agentralabs.tech/opengraph-image`
- `https://agentralabs.tech/twitter-image`

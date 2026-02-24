#!/usr/bin/env bash
set -euo pipefail

echo "[release-doc-readiness] lint"
pnpm lint

echo "[release-doc-readiness] docs sync + nav contract"
pnpm docs:sync:check

echo "[release-doc-readiness] public docs quality"
./scripts/check-public-docs.sh

echo "[release-doc-readiness] ready"

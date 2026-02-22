#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "[docs-sync-check] git is required"
  exit 1
fi

changed_files="$(git status --porcelain -- docs/ecosystem/en docs/ecosystem/zh | wc -l | tr -d ' ')"
if [ "${changed_files}" != "0" ]; then
  echo "[docs-sync-check] docs/ecosystem is out of sync with canonical sources."
  echo "[docs-sync-check] Run: pnpm docs:sync"
  git --no-pager status --short -- docs/ecosystem/en docs/ecosystem/zh
  exit 1
fi

echo "[docs-sync-check] docs sync is clean."

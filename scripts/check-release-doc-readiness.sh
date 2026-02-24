#!/usr/bin/env bash
set -euo pipefail

has_canonical_workspace() {
  local root="$1"
  [ -n "$root" ] &&
    [ -f "$root/docs/how-to.md" ] &&
    [ -d "$root/agentic-memory/docs/public" ] &&
    [ -d "$root/agentic-codebase/docs/public" ] &&
    [ -d "$root/agentic-vision/docs/public" ]
}

resolve_workspace_root() {
  if has_canonical_workspace "${AGENTRA_WORKSPACE_ROOT:-}"; then
    printf '%s\n' "${AGENTRA_WORKSPACE_ROOT}"
    return 0
  fi

  local sibling_root
  sibling_root="$(cd .. && pwd)"
  if has_canonical_workspace "$sibling_root"; then
    printf '%s\n' "$sibling_root"
    return 0
  fi

  printf '%s\n' ""
}

echo "[release-doc-readiness] lint"
pnpm lint

workspace_root="$(resolve_workspace_root)"
if [ -n "$workspace_root" ]; then
  echo "[release-doc-readiness] docs sync + nav contract (strict)"
  AGENTRA_WORKSPACE_ROOT="$workspace_root" pnpm docs:sync:check
else
  echo "[release-doc-readiness] docs sync + nav contract (fallback)"
  echo "[release-doc-readiness] canonical workspace not available; strict source sync skipped"
  node scripts/check-docs-nav-contract.mjs
fi

echo "[release-doc-readiness] public docs quality"
./scripts/check-public-docs.sh

echo "[release-doc-readiness] ready"

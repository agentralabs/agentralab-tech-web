#!/usr/bin/env bash
set -euo pipefail

has_canonical_workspace() {
  local root="$1"
  [ -n "$root" ] &&
    [ -f "$root/docs/how-to.md" ] &&
    [ -d "$root/agentic-memory/docs/public" ] &&
    [ -d "$root/agentic-codebase/docs/public" ] &&
    [ -d "$root/agentic-vision/docs/public" ] &&
    [ -d "$root/agentic-identity/docs/public" ]
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

  echo "[release-doc-readiness] canonical workspace not found."
  echo "[release-doc-readiness] Set AGENTRA_WORKSPACE_ROOT to the checked-out agentralabs-tech workspace."
  exit 1
}

echo "[release-doc-readiness] lint"
pnpm lint

workspace_root="$(resolve_workspace_root)"
echo "[release-doc-readiness] docs sync + nav contract (strict)"
AGENTRA_WORKSPACE_ROOT="$workspace_root" pnpm docs:sync:check

echo "[release-doc-readiness] public docs quality"
./scripts/check-public-docs.sh

echo "[release-doc-readiness] ready"

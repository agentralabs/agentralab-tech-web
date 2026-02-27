#!/usr/bin/env bash
set -euo pipefail

has_canonical_workspace() {
  local root="$1"
  [ -n "$root" ] &&
    [ -f "$root/docs/how-to.md" ] &&
    [ -d "$root/agentic-memory/docs/public" ] &&
    [ -d "$root/agentic-codebase/docs/public" ] &&
    [ -d "$root/agentic-vision/docs/public" ] &&
    [ -d "$root/agentic-identity/docs/public" ] &&
    [ -d "$root/agentic-time/docs/public" ]
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

  return 1
}

# ── 1. TypeScript lint ───────────────────────────────────────────────────────
echo "[release-doc-readiness] lint"
pnpm lint

# ── 2. Docs sync + nav contract (requires canonical workspace) ───────────────
# resolve_workspace_root must run OUTSIDE $(...) so that any error output
# is visible.  When the workspace is unavailable (e.g. in Web CI which only
# clones sister repos), skip these checks — they're covered separately by
# the Docs Sync Guardrails workflow.
if workspace_root="$(resolve_workspace_root)"; then
  echo "[release-doc-readiness] docs sync + nav contract (strict)"
  AGENTRA_WORKSPACE_ROOT="$workspace_root" pnpm docs:sync:check

  echo "[release-doc-readiness] public docs quality"
  ./scripts/check-public-docs.sh
else
  echo "[release-doc-readiness] canonical workspace not found — skipping docs sync + quality checks"
  echo "[release-doc-readiness] (these checks run separately in the Docs Sync Guardrails workflow)"
fi

echo "[release-doc-readiness] ready"

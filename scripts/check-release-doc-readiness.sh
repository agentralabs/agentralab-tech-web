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
echo "[release-doc-readiness] diagnostics:"
echo "  node: $(node --version)"
echo "  tsc: $(npx tsc --version 2>&1)"
echo "  cwd: $(pwd)"
echo "  .source/ files: $(ls .source/ 2>/dev/null | tr '\n' ' ' || echo 'MISSING')"
echo "  .next/ exists: $([ -d .next ] && echo yes || echo no)"
echo "  next-env.d.ts exists: $([ -f next-env.d.ts ] && echo yes || echo no)"

echo "[release-doc-readiness] running tsc --noEmit (direct, not via pnpm) ..."
tsc_out="$(mktemp)"
set +e
npx tsc --noEmit > "$tsc_out" 2>&1
tsc_exit=$?
set -e

if [ "$tsc_exit" -ne 0 ]; then
  echo "[release-doc-readiness] tsc FAILED with exit code $tsc_exit"
  echo "[release-doc-readiness] --- tsc output ($(wc -l < "$tsc_out") lines) ---"
  cat "$tsc_out"
  echo "[release-doc-readiness] --- end tsc output ---"
  echo "[release-doc-readiness] re-running with --extendedDiagnostics ..."
  npx tsc --noEmit --extendedDiagnostics 2>&1 | tail -80
  rm -f "$tsc_out"
  exit 1
fi
rm -f "$tsc_out"
echo "[release-doc-readiness] tsc passed"

workspace_root="$(resolve_workspace_root)"
echo "[release-doc-readiness] docs sync + nav contract (strict)"
AGENTRA_WORKSPACE_ROOT="$workspace_root" pnpm docs:sync:check

echo "[release-doc-readiness] public docs quality"
./scripts/check-public-docs.sh

echo "[release-doc-readiness] ready"

#!/usr/bin/env bash
set -euo pipefail

DOC_ROOT_EN="docs/ecosystem/en"
DOC_ROOT_ZH="docs/ecosystem/zh"

fail() {
  echo "[public-docs] ERROR: $*" >&2
  exit 1
}

scan_forbidden() {
  local pattern="$1"
  local message="$2"
  if grep -rn "$pattern" "$DOC_ROOT_EN" "$DOC_ROOT_ZH" >/tmp/public-docs-match.txt 2>/dev/null; then
    echo "[public-docs] Forbidden pattern: $message" >&2
    cat /tmp/public-docs-match.txt >&2
    fail "$message"
  fi
}

# Private machine paths and operator-local directories should never appear in public docs.
scan_forbidden "/Users/" "Found macOS user-local absolute path"
scan_forbidden "C:\\\\" "Found Windows absolute path"
scan_forbidden "/home/[A-Za-z0-9_-]+/" "Found Linux user-home absolute path"
scan_forbidden "/private/tmp/" "Found private temp path"
# Internal editorial markers should not be visible publicly.
scan_forbidden "\\(Synced\\)|（同步）" "Found internal sync marker in public title/content"
scan_forbidden "Generated page|Included sources|已同步来源|同步页面" "Found internal generation marker in public docs"

echo "[public-docs] OK"

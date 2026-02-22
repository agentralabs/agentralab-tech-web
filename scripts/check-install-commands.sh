#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

FILE="components/quickstart-terminal-pane.tsx"

find_fixed() {
  local pattern="$1"
  shift
  if command -v rg >/dev/null 2>&1; then
    rg -nF "$pattern" "$@"
  else
    grep -R -n -F -- "$pattern" "$@"
  fi
}

find_regex() {
  local pattern="$1"
  shift
  if command -v rg >/dev/null 2>&1; then
    rg -n "$pattern" "$@"
  else
    grep -R -n -E -- "$pattern" "$@"
  fi
}

require_literal() {
  local text="$1"
  if ! find_fixed "$text" "$FILE" >/dev/null; then
    fail "Missing required quickstart command/text: $text"
  fi
}

require_literal "curl -fsSL https://agentralabs.tech/install/memory | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/memory/desktop | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/memory/terminal | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/memory/server | bash"
require_literal "pip install amem-installer && amem-install install --auto"
require_literal "cargo install agentic-memory agentic-memory-mcp"

require_literal "curl -fsSL https://agentralabs.tech/install/vision | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/vision/desktop | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/vision/terminal | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/vision/server | bash"
require_literal "cargo install agentic-vision-mcp"
require_literal "cargo add agentic-vision"

require_literal "curl -fsSL https://agentralabs.tech/install/codebase | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/codebase/desktop | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/codebase/terminal | bash"
require_literal "curl -fsSL https://agentralabs.tech/install/codebase/server | bash"
require_literal "cargo install agentic-codebase"

if find_regex "cargo install agentic-vision agentic-vision-mcp" "$FILE" >/dev/null; then
  fail "Invalid vision command still present in quickstart component"
fi

# Ensure install route text still points to canonical domain commands.
find_fixed "curl -fsSL https://agentralabs.tech/install/memory | bash" app/install/route.ts >/dev/null || fail "install route missing memory command"
find_fixed "curl -fsSL https://agentralabs.tech/install/vision | bash" app/install/route.ts >/dev/null || fail "install route missing vision command"
find_fixed "curl -fsSL https://agentralabs.tech/install/codebase | bash" app/install/route.ts >/dev/null || fail "install route missing codebase command"
find_fixed "bash -s -- --profile=" "app/install/[target]/[profile]/route.ts" >/dev/null || fail "profile install route missing profile wrapper"

echo "Install command guardrails passed (web)."

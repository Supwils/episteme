#!/usr/bin/env bash
# Local mirror of CI `quality` + `build` (not Vercel deploy).
# Run on the committed tree you are about to push to main.
# Not a husky hook: production build + Lighthouse + Playwright are too
# heavy (and TBT too runner-sensitive) to block every local push.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

step() { printf '\n▶ %s\n' "$1"; }

step "Generated indexes are current"
pnpm gen-all
if [ -n "$(git status --porcelain)" ]; then
  git status --short
  git diff --exit-code || true
  echo "FAIL: pnpm gen-all left a dirty tree. Commit the generated files, then re-run."
  exit 1
fi

step "Quality (pnpm prepush)"
pnpm prepush

step "Production build"
pnpm build

step "SSG and ISR strategy"
pnpm audit-rendering

step "Bundle budget"
pnpm bundle-check -- --skip-build

# 3067 = pnpm dev, 3068 = Playwright smoke, 3000 = pnpm start (often occupied).
LH_PORT="${LH_PORT:-3069}"
LH_LOG="${TMPDIR:-/tmp}/episteme-predeploy-lh.log"

if command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$LH_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "FAIL: port $LH_PORT is already in use. Free it or set LH_PORT to an open port."
  exit 1
fi

step "Lighthouse performance budget (http://127.0.0.1:${LH_PORT})"
pnpm exec next start -p "$LH_PORT" >"$LH_LOG" 2>&1 &
server_pid=$!
cleanup_lh() { kill "$server_pid" 2>/dev/null || true; wait "$server_pid" 2>/dev/null || true; }
trap cleanup_lh EXIT

ready=0
for _ in $(seq 1 30); do
  if ! kill -0 "$server_pid" 2>/dev/null; then
    cat "$LH_LOG"
    echo "FAIL: next start exited before it accepted requests"
    exit 1
  fi
  if curl --fail --silent "http://127.0.0.1:${LH_PORT}" >/dev/null; then
    ready=1
    break
  fi
  sleep 1
done
if [ "$ready" != 1 ]; then
  cat "$LH_LOG"
  echo "FAIL: next start did not become ready on port $LH_PORT"
  exit 1
fi

LH_BASE="http://127.0.0.1:${LH_PORT}" pnpm lighthouse
cleanup_lh
trap - EXIT

step "Playwright production smoke"
CI=1 pnpm test:e2e:smoke

printf '\nPASS: local quality + build gates match CI. Safe to push main.\n'

#!/usr/bin/env bash
# ============================================================
#  zedxsec.com — one-command launcher (backend + frontend)
#  Usage:  ./start.sh
#  Stops both servers with a single Ctrl+C.
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND="$ROOT/backend"
FRONTEND="$ROOT/frontend"

# --- Backend: venv + deps + .env ---------------------------------
if [ ! -x "$BACKEND/.venv/bin/python" ]; then
  echo "[setup] creating backend virtualenv..."
  python3 -m venv "$BACKEND/.venv"
  "$BACKEND/.venv/bin/pip" install -q --upgrade pip
  "$BACKEND/.venv/bin/pip" install -q -r "$BACKEND/requirements.txt"
fi
[ -f "$BACKEND/.env" ] || cp "$BACKEND/.env.example" "$BACKEND/.env"

# --- Frontend: node deps -----------------------------------------
if [ ! -d "$FRONTEND/node_modules" ]; then
  echo "[setup] installing frontend dependencies..."
  ( cd "$FRONTEND" && npm install )
fi

# --- Launch both; kill both together on exit ---------------------
pids=()
cleanup() {
  echo
  echo "[stop] shutting down zedxsec.com..."
  for pid in "${pids[@]}"; do kill "$pid" 2>/dev/null || true; done
  wait 2>/dev/null || true
}
trap cleanup INT TERM EXIT

echo "[run] backend   ->  http://localhost:8000"
( cd "$BACKEND" && exec .venv/bin/python main.py ) &
pids+=($!)

echo "[run] frontend  ->  http://localhost:5173"
( cd "$FRONTEND" && exec npm run dev ) &
pids+=($!)

echo
echo "  ================================================"
echo "   zedxsec.com is up.  Open  http://localhost:5173"
echo "   Press Ctrl+C to stop both servers."
echo "  ================================================"
echo

# Wait for either process; if one dies, tear everything down.
wait -n 2>/dev/null || true
cleanup

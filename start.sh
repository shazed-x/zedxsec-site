#!/usr/bin/env bash
# ============================================================
#  zedxsec.com — one-command launcher (backend + frontend)
#
#  Usage:  ./start.sh
#
#  On a fresh machine this will AUTO-INSTALL anything missing
#  (Python 3 + venv, Node.js + npm) using the system package
#  manager, then create the venv, install all dependencies,
#  copy .env, and boot both servers. One Ctrl+C stops both.
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND="$ROOT/backend"
FRONTEND="$ROOT/frontend"

# ---------------------------------------------------------------
#  Privilege + package-manager detection
# ---------------------------------------------------------------
SUDO=""
if [ "$(id -u)" -ne 0 ] && command -v sudo >/dev/null 2>&1; then
  SUDO="sudo"
fi

PM=""
detect_pm() {
  if   command -v apt-get >/dev/null 2>&1; then PM=apt
  elif command -v dnf     >/dev/null 2>&1; then PM=dnf
  elif command -v yum     >/dev/null 2>&1; then PM=yum
  elif command -v pacman  >/dev/null 2>&1; then PM=pacman
  elif command -v zypper  >/dev/null 2>&1; then PM=zypper
  elif command -v apk     >/dev/null 2>&1; then PM=apk
  elif command -v brew    >/dev/null 2>&1; then PM=brew
  else PM=""
  fi
}

pm_install() {  # pm_install <pkg...>
  case "$PM" in
    apt)    $SUDO apt-get update -y && $SUDO apt-get install -y "$@" ;;
    dnf)    $SUDO dnf install -y "$@" ;;
    yum)    $SUDO yum install -y "$@" ;;
    pacman) $SUDO pacman -S --noconfirm "$@" ;;
    zypper) $SUDO zypper install -y "$@" ;;
    apk)    $SUDO apk add "$@" ;;
    brew)   brew install "$@" ;;
    *) echo "[error] No supported package manager found."
       echo "        Please install manually: $*"
       exit 1 ;;
  esac
}

need_pm() {
  detect_pm
  if [ -z "$PM" ]; then
    echo "[error] Could not detect a package manager to install '$1'."
    echo "        Install it manually and re-run ./start.sh"
    exit 1
  fi
}

# ---------------------------------------------------------------
#  Ensure Python 3 (with venv + pip)
# ---------------------------------------------------------------
ensure_python() {
  if command -v python3 >/dev/null 2>&1; then return; fi
  echo "[setup] Python 3 not found — installing..."
  need_pm "python3"
  case "$PM" in
    apt|zypper) pm_install python3 python3-venv python3-pip ;;
    dnf|yum)    pm_install python3 python3-pip ;;
    apk)        pm_install python3 py3-pip ;;
    pacman)     pm_install python ;;
    brew)       pm_install python ;;
  esac
}

# ---------------------------------------------------------------
#  Ensure Node.js + npm
# ---------------------------------------------------------------
ensure_node() {
  if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then return; fi
  echo "[setup] Node.js / npm not found — installing..."
  need_pm "nodejs"
  case "$PM" in
    apt|dnf|yum|zypper) pm_install nodejs npm ;;
    apk)                pm_install nodejs npm ;;
    pacman)             pm_install nodejs npm ;;
    brew)               pm_install node ;;
  esac
}

echo "[check] verifying prerequisites..."
ensure_python
ensure_node
echo "[check] python: $(command -v python3)  |  node: $(command -v node)  |  npm: $(command -v npm)"

# ---------------------------------------------------------------
#  Backend: virtualenv + deps + .env
# ---------------------------------------------------------------
if [ ! -x "$BACKEND/.venv/bin/python" ]; then
  echo "[setup] creating backend virtualenv..."
  if ! python3 -m venv "$BACKEND/.venv" 2>/dev/null; then
    # Debian/Ubuntu ship venv separately — install and retry.
    echo "[setup] python venv module missing — installing python3-venv..."
    need_pm "python3-venv"
    pm_install python3-venv
    python3 -m venv "$BACKEND/.venv"
  fi
  "$BACKEND/.venv/bin/pip" install -q --upgrade pip
  "$BACKEND/.venv/bin/pip" install -q -r "$BACKEND/requirements.txt"
fi
[ -f "$BACKEND/.env" ] || cp "$BACKEND/.env.example" "$BACKEND/.env"

# ---------------------------------------------------------------
#  Frontend: node deps
# ---------------------------------------------------------------
if [ ! -d "$FRONTEND/node_modules" ]; then
  echo "[setup] installing frontend dependencies..."
  ( cd "$FRONTEND" && npm install )
fi

# ---------------------------------------------------------------
#  Launch both; one Ctrl+C tears everything down
# ---------------------------------------------------------------
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

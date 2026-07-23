# zedxsec.com

Marketing site + lightweight API for the zedxsec cybersecurity collective.

## Stack

- **frontend/** - React 18, Vite, TailwindCSS, React Three Fiber, Framer Motion, lucide-react
- **backend/** - FastAPI, Pydantic v2, Uvicorn

## Quick start

### Option 1 — one command (recommended)

A single launcher boots **both** the backend and frontend:

```bash
./start.sh
```

Then open http://localhost:5173. Press `Ctrl+C` once to stop both servers.

On a fresh machine the script bootstraps everything for you — no manual setup:

- **Auto-installs missing prerequisites** (Python 3 + venv, Node.js + npm) via the
  system package manager. Supports `apt`, `dnf`/`yum`, `pacman`, `zypper`, `apk`,
  and Homebrew (`brew`). It will use `sudo` when needed.
- Creates the Python virtualenv and installs backend dependencies.
- Runs `npm install` for the frontend.
- Copies `backend/.env` from `.env.example`.

Already-installed steps are skipped, so subsequent runs start in ~1 second.

### Option 2 — run each service manually

In two terminals:

```bash
# 1. Backend  ->  http://localhost:8000
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

```bash
# 2. Frontend  ->  http://localhost:5173
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173.

## Design system

- Background: `#050505` (ink-950)
- Primary: Acid Green `#D4FF00`
- Accent: Cyber Cyan `#00E5FF`
- Display font: Unbounded
- Body font: JetBrains Mono

## Accessibility

The hero 3D scene is automatically replaced by a static gradient when the visitor's
OS exposes `prefers-reduced-motion: reduce`. All animations are short-circuited via
the same media query in `index.css`.

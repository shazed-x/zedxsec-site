# zedxsec.com

Marketing site + lightweight API for the zedxsec cybersecurity collective.

## Stack

- **frontend/** - React 18, Vite, TailwindCSS, React Three Fiber, Framer Motion, lucide-react
- **backend/** - FastAPI, Pydantic v2, Uvicorn

## Quick start

### Option 1 — one command (recommended)

A single launcher boots **both** the backend and frontend. On first run it also
creates the Python virtualenv, installs all dependencies, and copies `.env` for you.

```bash
./start.sh
```

Then open http://localhost:5173. Press `Ctrl+C` once to stop both servers.

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

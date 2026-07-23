# zedxsec.com

Marketing site + lightweight API for the zedxsec cybersecurity collective.

## Stack

- **frontend/** - React 18, Vite, TailwindCSS, React Three Fiber, Framer Motion, lucide-react
- **backend/** - FastAPI, Pydantic v2, Uvicorn

## Quick start

In two terminals:

```bash
# 1. Backend
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

```bash
# 2. Frontend
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

# zedxsec.com - Frontend

React + Vite + Tailwind + React Three Fiber.

## Run locally

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5173`. The Vite proxy forwards `/api/*` to
`http://localhost:8000` (FastAPI), so make sure the backend is running.

## Structure

- `src/components/` - page sections (Hero, Services, Work, About, Contact, Footer)
- `src/three/` - React Three Fiber scenes
- `src/hooks/` - shared hooks (e.g. `usePrefersReducedMotion`)
- `src/lib/api.js` - fetch wrapper for the backend

## Production build

```bash
npm run build
npm run preview
```

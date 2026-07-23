# zedxsec.com - Backend

FastAPI service powering the zedxsec.com site.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

API listens on `http://localhost:8000`.

## Endpoints

- `GET  /api/status`  - service status + timestamp
- `GET  /api/health`  - quick liveness probe
- `POST /api/contact` - accept contact form submissions

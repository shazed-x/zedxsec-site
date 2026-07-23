"""FastAPI backend for zedxsec.com.

Exposes a small JSON API consumed by the React frontend:
- GET  /api/status   - lightweight health check
- POST /api/contact  - accepts contact form submissions (logged in-memory)
"""
from __future__ import annotations

import logging
import os
from datetime import datetime, timezone
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("zedxsec")

app = FastAPI(
    title="zedxsec.com API",
    description="Backend services for the zedxsec cybersecurity agency site.",
    version="0.1.0",
)

# CORS - dev defaults; tighten via ALLOWED_ORIGINS env in production.
_origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
allowed_origins = [o.strip() for o in _origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class StatusResponse(BaseModel):
    status: str
    service: str
    timestamp: datetime


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=160)
    message: str = Field(..., min_length=10, max_length=4000)


class ContactResponse(BaseModel):
    ok: bool
    received_at: datetime
    reference: str


# Simple in-memory store. Swap for a real persistence layer when ready.
_contact_log: List[dict] = []


@app.get("/api/status", response_model=StatusResponse)
def get_status() -> StatusResponse:
    return StatusResponse(
        status="ok",
        service="zedxsec-api",
        timestamp=datetime.now(timezone.utc),
    )


@app.post(
    "/api/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_contact(payload: ContactRequest) -> ContactResponse:
    received_at = datetime.now(timezone.utc)
    reference = f"zx-{int(received_at.timestamp())}"

    entry = payload.model_dump()
    entry.update({"received_at": received_at.isoformat(), "reference": reference})
    _contact_log.append(entry)

    log.info("contact submission %s from %s", reference, payload.email)

    if len(_contact_log) > 1000:
        # Avoid unbounded memory growth in long-lived dev sessions.
        del _contact_log[:-1000]

    return ContactResponse(ok=True, received_at=received_at, reference=reference)


@app.get("/api/health")
def health() -> dict:
    return {"ok": True}


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

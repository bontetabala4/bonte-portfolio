from dotenv import load_dotenv

load_dotenv()  # charge backend/.env en local si présent — sans effet si absent (ex: en prod, où les variables sont définies directement sur l'hébergeur)

import os
import time

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from pydantic import BaseModel, Field

from data import PROFILE, STACK, PROJECTS, TIMELINE, EDUCATION
from ai import answer
from contact import is_valid_email, save_message, send_email

app = FastAPI(
    title="Portfolio API — Bonte Tabala Mangala",
    description="API du portfolio : profil, projets, parcours, et l'assistant ATLAS.",
    version="1.0.0",
)

allowed_origins = [
    origin.strip()
    for origin in os.environ.get(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=86400,
)

CONTACT_RATE_WINDOW_SECONDS = 60
CONTACT_RATE_MAX_REQUESTS = 5
CONTACT_RATE_LIMIT: dict[str, list[float]] = {}


class AskBody(BaseModel):
    question: str = Field(default="", max_length=500)


class ContactBody(BaseModel):
    name: str = Field(..., min_length=1, max_length=80)
    email: str = Field(..., min_length=3, max_length=254)
    subject: str = Field(..., min_length=1, max_length=120)
    message: str = Field(..., min_length=1, max_length=3000)


def check_contact_rate_limit(client_host: str) -> None:
    now = time.monotonic()
    cutoff = now - CONTACT_RATE_WINDOW_SECONDS
    hits = [hit for hit in CONTACT_RATE_LIMIT.get(client_host, []) if hit >= cutoff]
    if len(hits) >= CONTACT_RATE_MAX_REQUESTS:
        CONTACT_RATE_LIMIT[client_host] = hits
        raise HTTPException(status_code=429, detail="Trop de messages envoyés. Réessaie dans une minute.")
    hits.append(now)
    CONTACT_RATE_LIMIT[client_host] = hits


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/profile")
def get_profile():
    return PROFILE


@app.get("/api/stack")
def get_stack():
    return STACK


@app.get("/api/projects")
def get_projects():
    return PROJECTS


@app.get("/api/timeline")
def get_timeline():
    return TIMELINE


@app.get("/api/education")
def get_education():
    return EDUCATION


@app.post("/api/ai/ask")
def ask_atlas(body: AskBody):
    return answer(body.question)


@app.post("/api/contact")
def contact(body: ContactBody, request: Request):
    client_host = request.client.host if request.client else "unknown"
    check_contact_rate_limit(client_host)

    if not body.name.strip() or not body.subject.strip() or not body.message.strip():
        raise HTTPException(status_code=400, detail="Tous les champs sont requis.")
    if not is_valid_email(body.email):
        raise HTTPException(status_code=400, detail="Adresse email invalide.")

    entry = save_message(body.name, body.email, body.subject, body.message)
    emailed = send_email(entry)
    return {"status": "ok", "emailed": emailed}

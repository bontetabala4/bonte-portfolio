from dotenv import load_dotenv

load_dotenv()  # charge backend/.env en local si présent — sans effet si absent (ex: en prod, où les variables sont définies directement sur l'hébergeur)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from data import PROFILE, STACK, PROJECTS, TIMELINE, EDUCATION
from ai import answer
from contact import is_valid_email, save_message, send_email

app = FastAPI(
    title="Portfolio API — Bonte Tabala Mangala",
    description="API du portfolio : profil, projets, parcours, et l'assistant ATLAS.",
    version="1.0.0",
)

# En production, remplace "*" par le(s) domaine(s) réel(s) du front déployé.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskBody(BaseModel):
    question: str


class ContactBody(BaseModel):
    name: str
    email: str
    subject: str
    message: str


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
def contact(body: ContactBody):
    if not body.name.strip() or not body.subject.strip() or not body.message.strip():
        raise HTTPException(status_code=400, detail="Tous les champs sont requis.")
    if not is_valid_email(body.email):
        raise HTTPException(status_code=400, detail="Adresse email invalide.")

    entry = save_message(body.name, body.email, body.subject, body.message)
    emailed = send_email(entry)
    return {"status": "ok", "emailed": emailed}

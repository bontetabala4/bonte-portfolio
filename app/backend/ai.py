"""
ATLAS — assistant embarqué du portfolio.

Important, en toute transparence : ceci N'EST PAS un modèle de langage branché
sur une API IA externe. C'est un moteur de réponses par règles/mots-clés qui
interroge les données du portfolio (data.py) et retourne une réponse déjà
écrite, mise en forme façon "console futuriste". C'est volontairement léger
pour tourner sans dépendance ni clé d'API.

Pour brancher un vrai LLM plus tard : remplace la fonction `answer()` par un
appel à l'API Anthropic ou OpenAI, en gardant les mêmes données de contexte
(PROFILE, PROJECTS, STACK, TIMELINE) comme system prompt.
"""

import random
from data import PROFILE, PROJECTS, STACK, TIMELINE, EDUCATION

GREETINGS = ["salut", "bonjour", "hello", "hey", "yo", "bonsoir"]

BOOT_LINES = [
    "Systèmes de profil chargés.",
    "Index des projets synchronisé.",
    "Prêt à répondre.",
]


def _stack_summary() -> str:
    core = STACK["Front-end"][:3] + STACK["API & Back-end"][:3]
    return ", ".join(core[:6])


def _project_by_keyword(q: str):
    for p in PROJECTS:
        if p["id"].replace("-", "") in q or p["name"].lower().split(" ")[0].lower() in q:
            return p
    return None


def answer(question: str) -> dict:
    q = (question or "").strip().lower()

    if not q:
        return {"reply": "Signal vide reçu. Pose-moi une question sur le parcours, les projets ou la stack de Bonte.", "intent": "empty"}

    if any(g in q for g in GREETINGS):
        return {
            "reply": f"Bonjour. Je suis ATLAS, l'assistant embarqué de ce portfolio. Demande-moi les projets, la stack, le parcours ou comment contacter {PROFILE['name'].split(' ')[0]}.",
            "intent": "greeting",
        }

    if "contact" in q or "email" in q or "mail" in q or "téléphone" in q or "telephone" in q or "joindre" in q:
        return {
            "reply": f"Canal direct : {PROFILE['email']} · {PROFILE['phone']} · GitHub : {PROFILE['github']}",
            "intent": "contact",
        }

    if "stack" in q or "techno" in q or "langage" in q or "compétence" in q or "competence" in q:
        return {
            "reply": f"Cœur de stack : {_stack_summary()}. Détail complet disponible dans le module COMPÉTENCES.",
            "intent": "stack",
        }

    named_project = _project_by_keyword(q)
    if named_project:
        return {
            "reply": f"{named_project['name']} — {named_project['description']} Stack : {', '.join(named_project['stack'])}. Statut : {named_project['status']}.",
            "intent": "project_detail",
        }

    if "projet" in q or "travaux" in q or "réalisation" in q or "realisation" in q:
        names = ", ".join(p["name"].split(" — ")[0] for p in PROJECTS[:4])
        return {
            "reply": f"Quatre systèmes phares en archive : {names}. Demande le nom d'un projet pour le détail.",
            "intent": "project_list",
        }

    if "expérience" in q or "experience" in q or "parcours" in q or "stage" in q:
        latest = TIMELINE[0]
        return {
            "reply": f"Dernier poste enregistré : {latest['title']} — {latest['org']} ({latest['when']}). Chronologie complète dans le module PARCOURS.",
            "intent": "timeline",
        }

    if "formation" in q or "diplôme" in q or "diplome" in q or "étude" in q or "etude" in q:
        e = EDUCATION[0]
        return {
            "reply": f"{e['title']} — {e['org']} ({e['meta']}). Formations et certifications listées dans le module FORMATION.",
            "intent": "education",
        }

    if "qui es-tu" in q or "qui es tu" in q or "t'es qui" in q or "atlas" in q:
        return {
            "reply": "ATLAS : module de navigation du portfolio. Pas un grand modèle de langage — un guide par règles qui connaît ce document par cœur.",
            "intent": "self",
        }

    if "disponible" in q or "freelance" in q or "remote" in q or "recrut" in q:
        return {
            "reply": f"{PROFILE['name'].split(' ')[0]} est ouvert aux missions freelance et postes remote — full-stack, API, architecture de données. Contact : {PROFILE['email']}.",
            "intent": "availability",
        }

    return {
        "reply": random.choice([
            "Requête hors index. Essaie : \"projets\", \"stack\", \"parcours\" ou \"contact\".",
            "Je n'ai pas ça en archive. Demande-moi les projets, la stack ou comment contacter Bonte.",
        ]),
        "intent": "fallback",
    }

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
        return {
            "reply": "Je n'ai pas bien saisi votre question. Posez-moi une question sur le parcours de Bonte, ses projets récents ou ses technologies de prédilection.",
            "intent": "empty"
        }

    if any(g in q for g in GREETINGS):
        return {
            "reply": f"Bonjour et bienvenue ! Je suis ATLAS, l'assistant virtuel de ce portfolio. Je peux vous renseigner sur les réalisations de Bonte, sa stack technique ou ses disponibilités. Que souhaitez-vous savoir ?",
            "intent": "greeting",
        }

    if any(term in q for term in ["contact", "email", "mail", "téléphone", "telephone", "joindre", "ecrire"]):
        return {
            "reply": f"Vous pouvez joindre Bonte directement à {PROFILE['email']} ou par téléphone au {PROFILE['phone']}. Retrouvez également son travail sur GitHub ({PROFILE['github']}).",
            "intent": "contact",
        }

    if any(term in q for term in ["stack", "techno", "langage", "compétence", "competence", "outils"]):
        return {
            "reply": f"Côté technologies, Bonte s'appuie principalement sur {_stack_summary()}. Consultez l'onglet Compétences pour la vue d'ensemble complète.",
            "intent": "stack",
        }

    named_project = _project_by_keyword(q)
    if named_project:
        return {
            "reply": f"Concernant le projet {named_project['name']} : {named_project['description']} Il a été conçu avec {', '.join(named_project['stack'])} (Statut : {named_project['status']}).",
            "intent": "project_detail",
        }

    if any(term in q for term in ["projet", "travaux", "réalisation", "realisation", "portfolio"]):
        names = ", ".join(p["name"].split(" — ")[0] for p in PROJECTS[:4])
        return {
            "reply": f"Parmi ses réalisations notables, on retrouve notamment : {names}. N'hésitez pas à demander des précisions sur un projet précis ou visiter l'onglet Travaux !",
            "intent": "project_list",
        }

    if any(term in q for term in ["expérience", "experience", "parcours", "stage", "carriere"]):
        latest = TIMELINE[0]
        return {
            "reply": f"Dernièrement, Bonte a occupé le rôle de {latest['title']} chez {latest['org']} ({latest['when']}). Vous trouverez l'historique complet dans la section Parcours.",
            "intent": "timeline",
        }

    if any(term in q for term in ["formation", "diplôme", "diplome", "étude", "etude", "universite", "kadea"]):
        e = EDUCATION[0]
        return {
            "reply": f"Bonte est diplômé d'une {e['title']} délivrée par l'{e['org']} ({e['meta']}), complétée par diverses certifications techniques.",
            "intent": "education",
        }

    if any(term in q for term in ["qui es-tu", "qui es tu", "t'es qui", "atlas", "robot", "ia"]):
        return {
            "reply": "Je suis ATLAS, un assistant codé sur-mesure pour vous aider à explorer le profil et les compétences de Bonte sans vous perdre. Comment puis-je vous aider ?",
            "intent": "self",
        }

    if any(term in q for term in ["disponible", "freelance", "remote", "recrut", "embauche", "mission"]):
        return {
            "reply": f"Bonte est ouvert à de nouveaux défis : missions freelance, contrats ou opportunités en télétravail/remote (Full-Stack, API, bases de données). Contactez-le directement par email : {PROFILE['email']}.",
            "intent": "availability",
        }

    return {
        "reply": random.choice([
            "Je ne suis pas certain d'avoir la réponse précise à cette question. N'hésitez pas à interroger ATLAS sur les 'projets', la 'stack', le 'parcours' ou à contacter Bonte directement.",
            "Cette information n'est pas répertoriée dans mon index. Essayez avec un mot-clé comme 'projets', 'compétences' ou 'contact' !",
        ]),
        "intent": "fallback",
    }

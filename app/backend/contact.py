"""
Stockage simple des messages envoyés depuis le formulaire de contact.

Pas d'envoi d'email réel ici (ça demanderait des identifiants SMTP ou une clé
d'API d'un service comme Resend/SendGrid, que je ne peux pas générer pour
toi). Les messages sont simplement ajoutés à un fichier JSON local
(`messages.json`, à côté de ce fichier) que tu peux consulter, ou brancher
plus tard à un vrai envoi d'email — voir la note dans le README.
"""

import json
import re
from datetime import datetime, timezone
from pathlib import Path

MESSAGES_FILE = Path(__file__).parent / "messages.json"
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def is_valid_email(email: str) -> bool:
    return bool(EMAIL_RE.match(email.strip()))


def save_message(name: str, email: str, subject: str, message: str) -> dict:
    entry = {
        "name": name.strip(),
        "email": email.strip(),
        "subject": subject.strip(),
        "message": message.strip(),
        "received_at": datetime.now(timezone.utc).isoformat(),
    }

    existing = []
    if MESSAGES_FILE.exists():
        try:
            existing = json.loads(MESSAGES_FILE.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            existing = []

    existing.append(entry)
    MESSAGES_FILE.write_text(json.dumps(existing, indent=2, ensure_ascii=False), encoding="utf-8")
    return entry

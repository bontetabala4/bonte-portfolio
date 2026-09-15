"""
Gestion des messages du formulaire de contact :
1. sauvegarde locale dans messages.json (toujours, comme filet de sécurité)
2. envoi d'un vrai email via Gmail SMTP, si les identifiants sont configurés

Les identifiants Gmail viennent des variables d'environnement GMAIL_USER et
GMAIL_APP_PASSWORD (voir .env.example). Si elles ne sont pas définies,
l'envoi d'email est simplement ignoré (avec un message dans les logs) — le
message reste quand même sauvegardé dans messages.json.
"""

import json
import os
import re
import smtplib
import ssl
import tempfile
import threading
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

MESSAGES_FILE = Path(__file__).parent / "messages.json"
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
MESSAGE_FILE_LOCK = threading.Lock()

GMAIL_USER = os.environ.get("GMAIL_USER")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD")


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

    with MESSAGE_FILE_LOCK:
        existing = []
        if MESSAGES_FILE.exists():
            try:
                loaded = json.loads(MESSAGES_FILE.read_text(encoding="utf-8"))
                if isinstance(loaded, list):
                    existing = loaded
            except (json.JSONDecodeError, OSError):
                existing = []

        existing.append(entry)
        payload = json.dumps(existing, indent=2, ensure_ascii=False)
        with tempfile.NamedTemporaryFile(
            "w",
            encoding="utf-8",
            dir=MESSAGES_FILE.parent,
            delete=False,
            suffix=".tmp",
        ) as tmp:
            tmp.write(payload)
            tmp_path = Path(tmp.name)
        os.replace(tmp_path, MESSAGES_FILE)
    return entry


def send_email(entry: dict) -> bool:
    """Envoie l'entrée par email via Gmail SMTP. Retourne True si envoyé,
    False si les identifiants ne sont pas configurés ou si l'envoi échoue
    (dans ce cas, l'erreur est affichée dans les logs du serveur mais ne fait
    pas planter la requête — le message reste sauvegardé dans messages.json)."""

    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        print("[contact] GMAIL_USER / GMAIL_APP_PASSWORD non configurés — email non envoyé.")
        return False

    msg = MIMEMultipart()
    msg["From"] = GMAIL_USER
    msg["To"] = GMAIL_USER
    msg["Reply-To"] = entry["email"]
    msg["Subject"] = f"[Portfolio] {safe_header(entry['subject'])}"

    body = (
        f"Nouveau message depuis le formulaire de contact du portfolio.\n\n"
        f"Nom : {entry['name']}\n"
        f"Email : {entry['email']}\n"
        f"Sujet : {entry['subject']}\n\n"
        f"Message :\n{entry['message']}\n\n"
        f"---\nRéponds directement à cet email : il partira à {entry['email']}."
    )
    msg.attach(MIMEText(body, "plain", "utf-8"))

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.sendmail(GMAIL_USER, GMAIL_USER, msg.as_string())
        return True
    except Exception as exc:  # noqa: BLE001 — on log et on continue, l'email n'est pas critique
        print(f"[contact] Échec de l'envoi de l'email : {exc}")
        return False


def safe_header(value: str) -> str:
    return value.replace("\r", " ").replace("\n", " ").strip()

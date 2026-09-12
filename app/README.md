# Portfolio — Bonte Tabala Mangala

Portfolio en React (Vite + TypeScript + Tailwind + Framer Motion + React
Router) avec une API Python (FastAPI) et un assistant embarqué "ATLAS"
(moteur de réponses par règles, pas un LLM externe — voir `backend/ai.py`
pour brancher un vrai modèle plus tard).

Le site est **page par page** : chaque section (Accueil, Compétences,
Travaux, Parcours, Atlas, Contact) est une route séparée avec une transition
"warp" façon vaisseau entre les modules, et un pager Précédent/Suivant en bas
d'écran. Le routage utilise `HashRouter` (URLs du type `#/travaux`) pour que
le site fonctionne sans configuration serveur particulière, quel que soit
l'hébergeur statique.

Le front fonctionne **avec ou sans** le backend : si l'API n'est pas
joignable, il retombe automatiquement sur les données locales
(`frontend/src/data/content.ts`). Tu peux donc déployer uniquement le front
si tu veux aller vite, et ajouter le backend plus tard.

## Structure

```
app/
  frontend/
    src/pages/       Accueil, Compétences, Travaux, Parcours, Atlas, Contact
    src/components/  Hero, StackGrid, Projects, Timeline, Education, AIConsole...
    src/context/      données du portfolio partagées entre les pages
  backend/    FastAPI (profil, projets, parcours, assistant ATLAS)
  docker-compose.yml
```

## Lancer en local

### Backend (Python)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows : venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

L'API tourne sur http://localhost:8000 — doc interactive sur
http://localhost:8000/docs.

### Frontend (React)

```bash
cd frontend
npm install
cp .env.example .env          # VITE_API_URL=http://localhost:8000
npm run dev
```

L'app tourne sur http://localhost:5173.

> Si tu ne lances pas le backend, laisse `.env` absent ou vide :
> le front utilisera automatiquement les données locales.

## Avec Docker

```bash
docker compose up --build
```

Front sur http://localhost:5173, API sur http://localhost:8000.

## Déployer

**Frontend (statique)** — Vercel ou Netlify :
1. Connecte le dépôt, dossier racine `frontend/`.
2. Build command : `npm run build`, output : `dist`.
3. Ajoute la variable d'environnement `VITE_API_URL` = URL de ton backend déployé.

**Backend (FastAPI)** — Render, Railway ou Fly.io :
1. Connecte le dépôt, dossier racine `backend/`.
2. Build : `pip install -r requirements.txt`.
3. Start : `uvicorn main:app --host 0.0.0.0 --port $PORT`.
4. Une fois l'URL obtenue, mets-la dans `VITE_API_URL` côté frontend et
   redéploie le front (les variables Vite sont figées au build).
5. Dans `backend/main.py`, remplace `allow_origins=["*"]` par le domaine réel
   de ton frontend une fois en production.

## L'assistant ATLAS

`backend/ai.py` répond par mots-clés à partir des données du portfolio — pas
d'appel réseau, pas de clé API, ça marche tout de suite. Si tu veux un vrai
assistant conversationnel, remplace le corps de `answer()` par un appel à
l'API Anthropic ou OpenAI en donnant `PROFILE`, `PROJECTS`, `STACK` et
`TIMELINE` comme contexte système.

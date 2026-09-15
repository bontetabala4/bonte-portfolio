"""
Données du portfolio de Bonte Tabala Mangala.
Source unique de vérité, consommée par l'API et (via /api/*) par le front React.
"""

PROFILE = {
    "name": "Bonte Tabala Mangala",
    "role": "Développeur Full Stack — React · TypeScript · Node.js · PostgreSQL",
    "location": "Kinshasa (N'Sele), RD Congo",
    "email": "bontetabala4@gmail.com",
    "phone": "+243 995 608 233",
    "github": "https://github.com/bontetabala4",
    "linkedin": "https://linkedin.com/in/bonté-tabala-mangala",
    "summary": (
        "Ingénieur logiciel full stack spécialisé en React, TypeScript, Node.js/AdonisJS et PostgreSQL. "
        "Expérience concrète en conception d'API REST et d'applications métier (gestion de stock, badges professionnels, "
        "suivi en temps réel), de la modélisation de base de données jusqu'au déploiement. À l'aise en autonomie "
        "sur des projets freelance comme en équipe, ouvert aux opportunités de missions et postes remote."
    ),
}

STACK = {
    "Cœur de profil": ["React.js", "TypeScript", "Node.js", "AdonisJS", "PostgreSQL", "REST API"],
    "Front-end": ["Next.js", "Tailwind CSS", "Bootstrap", "HTML/CSS", "Figma", "Vite"],
    "Back-end & Données": ["Express.js", "Lucid ORM", "MySQL", "Authentication / Authorization", "RBAC", "Python / FastAPI"],
    "DevOps & Outils": ["Git / GitHub", "Docker", "Linux", "Postman"],
}

PROJECTS = [
    {
        "id": "gstock",
        "name": "GStock — Gestion de stock pharmaceutique",
        "client": "Agence Congolaise des Grands Travaux (ACGT)",
        "status": "EN PRODUCTION",
        "date": "Juil. 2026",
        "role": "Développeur Full Stack autonome",
        "context": "Application métier interne critique pour le suivi des stocks médicaux.",
        "description": (
            "Module complet de gestion de stock : entrées, sorties, fournisseurs et inventaires — avec implémentation "
            "d'une logique FEFO (First-Expired-First-Out) pour prioriser automatiquement les médicaments proches de leur péremption."
        ),
        "highlights": [
            "Conception et modélisation complète du schéma relationnel sous PostgreSQL.",
            "Algorithme d'ordonnancement des sorties basé sur les dates de péremption (FEFO).",
            "Interface utilisateur réactive en EJS / Bootstrap couplée à un backend Express.js robuste.",
            "Gestion rigoureuse des inventaires, alertes de réapprovisionnement et traçabilité fournisseurs."
        ],
        "stack": ["JavaScript", "Node.js", "Express.js", "PostgreSQL", "EJS", "Bootstrap"],
        "githubUrl": "https://github.com/bontetabala4",
    },
    {
        "id": "badges",
        "name": "Système de gestion des badges professionnels & QR",
        "client": "Agence Congolaise des Grands Travaux (ACGT)",
        "status": "EN PRODUCTION",
        "date": "Juin 2026",
        "role": "Développeur Full Stack",
        "context": "Système interne de sécurisation des accès et d'identification des agents de l'ACGT.",
        "description": (
            "Application de bout en bout couvrant la génération automatique de numéros de badge et de QR codes, "
            "la vérification par scan en temps réel, et l'impression de cartes professionnelles au format PVC."
        ),
        "highlights": [
            "Génération dynamique et sécurisée de QR codes encodant les métadonnées de l'agent.",
            "Module d'authentification et de validation instantanée par lecteur/scan QR.",
            "Mise en page vectorielle calibrée pour impression directe sur imprimantes PVC.",
            "Architecture propre sous AdonisJS avec typage strict TypeScript et PostgreSQL."
        ],
        "stack": ["AdonisJS", "TypeScript", "PostgreSQL", "Tailwind CSS", "Lucid ORM"],
        "githubUrl": "https://github.com/bontetabala4",
    },
    {
        "id": "qr-generator",
        "name": "QR Generator — Suivi de présence par QR Code",
        "client": "Projet freelance",
        "status": "LIVRÉ",
        "date": "Nov. 2025 – Jan. 2026",
        "role": "Lead Developer Full Stack",
        "context": "Solution SaaS de pointage numérique pour entreprises et établissements scolaires.",
        "description": (
            "Application web de pointage automatisé avec génération de QR codes uniques et tableau de bord "
            "en temps réel pour le suivi de l'historique des présences et des flux d'arrivées."
        ),
        "highlights": [
            "Système de pointage digital éliminant les feuilles d'émargement physiques.",
            "Dashboard analytique en temps réel : calcul automatique des retards et absences.",
            "API REST haute performance en Node.js garantissant des scans sans latence.",
            "Historique auditable et export des rapports de présence."
        ],
        "stack": ["Node.js", "PostgreSQL", "JavaScript", "REST API", "Tailwind CSS"],
        "githubUrl": "https://github.com/bontetabala4",
    },
    {
        "id": "twitter-clone",
        "name": "Twitter Clone — Plateforme sociale full stack",
        "client": "Kadea Academy",
        "status": "RÉALISÉ",
        "date": "Avr. 2025",
        "role": "Développeur Full Stack",
        "context": "Projet d'ingénierie logicielle simulant l'architecture complète d'un réseau social moderne.",
        "description": (
            "Reproduction des fonctionnalités clés de Twitter : publication de tweets, gestion des likes, "
            "commentaires, fil d'actualités en direct, authentification sécurisée et profils utilisateurs."
        ),
        "highlights": [
            "Gestion des sessions, authentification JWT et hashage de mots de passe.",
            "Relations complexes en base de données : followers, retweets, likes et threads de commentaires.",
            "Interface dynamique, responsive et soignée en React.js et Tailwind CSS.",
            "Endpoints API modulaires et optimisés pour le rafraîchissement des flux."
        ],
        "stack": ["React.js", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
        "githubUrl": "https://github.com/bontetabala4",
    },
    {
        "id": "kongowood-maps",
        "name": "Kongowood Maps",
        "client": "Projet personnel",
        "status": "EN CONSTRUCTION",
        "date": "En cours",
        "description": (
            "Plateforme de repérage de lieux de tournage en RD Congo, pensée pour "
            "s'étendre à l'Afrique centrale : carte interactive, fiches de lieux, "
            "recherche par filtres, espace privé pour les équipes de production."
        ),
        "stack": ["React", "Node.js", "PostgreSQL", "Cartographie"],
    },
    {
        "id": "hand-tech",
        "name": "Hand Tech",
        "client": "Projet personnel",
        "status": "EN CONSTRUCTION",
        "date": "En cours",
        "description": (
            "Système d'assistance technologique multi-composants : application "
            "mobile, API backend, service de reconnaissance par IA, et un volet "
            "matériel en cours d'étude."
        ),
        "stack": ["Flutter", "FastAPI", "Python / IA", "Docker"],
    },
    {
        "id": "qr-generator",
        "name": "QR Generator",
        "client": "Freelance",
        "status": "LIVRÉ",
        "date": "Nov. 2025 – Jan. 2026",
        "description": "Suivi automatisé des arrivées via QR code, tableau de bord en temps réel.",
        "stack": ["Node.js", "PostgreSQL"],
    },
    {
        "id": "weather-app",
        "name": "Application Météo",
        "client": "Freelance",
        "status": "LIVRÉ",
        "date": "Nov. 2025",
        "description": "Prévisions en temps réel via API météo, interface responsive multi-villes.",
        "stack": ["JavaScript", "API REST"],
    },
    {
        "id": "procv-builder",
        "name": "ProCV Builder",
        "client": "Freelance",
        "status": "LIVRÉ",
        "date": "Oct. 2025",
        "description": "Création de CV en ligne, exportable en PDF, front-end et back-end complets.",
        "stack": ["React", "Node.js"],
    },
    {
        "id": "ecommerce-dashboard",
        "name": "E-commerce Analytics Dashboard",
        "client": "Freelance",
        "status": "LIVRÉ",
        "date": "Sept. 2025",
        "description": "Tableau de bord interactif pour le suivi et l'analyse des ventes en ligne.",
        "stack": ["React", "Chart.js"],
    },
]

TIMELINE = [
    {"when": "Mai — Juil. 2026", "title": "Stage professionnel", "org": "Agence Congolaise des Grands Travaux (ACGT) — Kinshasa"},
    {"when": "Juin 2024 — Avr. 2025", "title": "Développement Web et Mobile", "org": "Kadea Academy, en partenariat avec Simplon — Kinshasa"},
    {"when": "Oct. — Nov. 2022", "title": "Stagiaire", "org": "OGEFREM — Kinshasa/Gombe"},
    {"when": "Oct. 2020 — Juil. 2023", "title": "Licence en Informatique de gestion", "org": "Université de Kinshasa, Faculté des Sciences"},
    {"when": "Sept. — Oct. 2020", "title": "Stagiaire", "org": "Ministère des Finances — Kinshasa/Gombe"},
    {"when": "Oct. 2017 — Juil. 2020", "title": "Graduat en Mathématiques et Informatique", "org": "Université de Kinshasa, Faculté des Sciences"},
]

EDUCATION = [
    {"title": "Licence en Informatique de gestion", "meta": "2020 — 2023", "org": "Université de Kinshasa, Faculté des Sciences"},
    {"title": "Développement Web et Mobile (Bac+2)", "meta": "2024 — 2025", "org": "Kadea Academy × Simplon"},
    {"title": "Python", "meta": "2026", "org": "Cisco Networking Academy & Python Institute"},
    {"title": "Certificat — Développeur Web", "meta": "Oct. 2025", "org": "Udemy"},
    {"title": "JavaScript & JavaScript Essentials 1", "meta": "2025", "org": "Cisco Networking Academy"},
    {"title": "Initiation au développement web", "meta": "2023", "org": "Kadea Boost"},
]

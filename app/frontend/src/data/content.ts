export type Project = {
  id: string;
  name: string;
  client: string;
  status: string;
  date: string;
  description: string;
  stack: string[];
};

export type TimelineItem = { when: string; title: string; org: string };
export type EducationItem = { title: string; meta: string; org: string };

export const PROFILE = {
  name: "Bonte Tabala Mangala",
  role: "Ingénieur logiciel — full-stack & architecture d'API",
  location: "Kinshasa / N'Sele, RD Congo",
  email: "bontetabala4@gmail.com",
  phone: "+243 995 608 233",
  github: "https://github.com/bontetabala4",
  summary:
    "Je conçois des systèmes pensés pour durer : schémas de données solides, API REST claires, interfaces réactives. Basé à Kinshasa, je construis aussi bien des outils métier pour de grandes structures que mes propres plateformes.",
};

export const STACK: Record<string, string[]> = {
  "Front-end": ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
  "API & Back-end": ["Node.js", "AdonisJS", "REST API", "Authentication / RBAC", "Python / FastAPI"],
  "Données": ["PostgreSQL", "MySQL", "Lucid ORM", "Modélisation SQL"],
  "Outils & Infra": ["Git / GitHub", "Docker", "Linux", "Postman"],
};

export const PROJECTS: Project[] = [
  {
    id: "gstock",
    name: "GStock — Gestion de stock pharmaceutique",
    client: "Agence Congolaise des Grands Travaux (ACGT)",
    status: "EN PRODUCTION",
    date: "Juil. 2026",
    description:
      "Module complet de gestion de stock : entrées, sorties, fournisseurs, inventaires — avec une logique FEFO pour prioriser automatiquement les médicaments proches de leur péremption.",
    stack: ["Node.js", "Express", "PostgreSQL", "EJS", "Bootstrap"],
  },
  {
    id: "badges",
    name: "Badges professionnels & QR",
    client: "Agence Congolaise des Grands Travaux (ACGT)",
    status: "EN PRODUCTION",
    date: "Juin 2026",
    description:
      "Application de gestion des badges des agents : génération automatique des numéros et QR codes, vérification par scan, impression de cartes professionnelles au format PVC.",
    stack: ["AdonisJS", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "kongowood-maps",
    name: "Kongowood Maps",
    client: "Projet personnel",
    status: "EN CONSTRUCTION",
    date: "En cours",
    description:
      "Plateforme de repérage de lieux de tournage en RD Congo, pensée pour s'étendre à l'Afrique centrale : carte interactive, fiches de lieux, recherche par filtres, espace privé pour les équipes de production.",
    stack: ["React", "Node.js", "PostgreSQL", "Cartographie"],
  },
  {
    id: "hand-tech",
    name: "Hand Tech",
    client: "Projet personnel",
    status: "EN CONSTRUCTION",
    date: "En cours",
    description:
      "Système d'assistance technologique multi-composants : application mobile, API backend, service de reconnaissance par IA, et un volet matériel en cours d'étude.",
    stack: ["Flutter", "FastAPI", "Python / IA", "Docker"],
  },
  {
    id: "qr-generator",
    name: "QR Generator",
    client: "Freelance",
    status: "LIVRÉ",
    date: "Nov. 2025 – Jan. 2026",
    description: "Suivi automatisé des arrivées via QR code, tableau de bord en temps réel.",
    stack: ["Node.js", "PostgreSQL"],
  },
  {
    id: "weather-app",
    name: "Application Météo",
    client: "Freelance",
    status: "LIVRÉ",
    date: "Nov. 2025",
    description: "Prévisions en temps réel via API météo, interface responsive multi-villes.",
    stack: ["JavaScript", "API REST"],
  },
  {
    id: "procv-builder",
    name: "ProCV Builder",
    client: "Freelance",
    status: "LIVRÉ",
    date: "Oct. 2025",
    description: "Création de CV en ligne, exportable en PDF, front-end et back-end complets.",
    stack: ["React", "Node.js"],
  },
  {
    id: "ecommerce-dashboard",
    name: "E-commerce Analytics Dashboard",
    client: "Freelance",
    status: "LIVRÉ",
    date: "Sept. 2025",
    description: "Tableau de bord interactif pour le suivi et l'analyse des ventes en ligne.",
    stack: ["React", "Chart.js"],
  },
];

export const TIMELINE: TimelineItem[] = [
  { when: "Mai — Juil. 2026", title: "Stage professionnel", org: "Agence Congolaise des Grands Travaux (ACGT) — Kinshasa" },
  { when: "Juin 2024 — Avr. 2025", title: "Développement Web et Mobile", org: "Kadea Academy, en partenariat avec Simplon — Kinshasa" },
  { when: "Oct. — Nov. 2022", title: "Stagiaire", org: "OGEFREM — Kinshasa/Gombe" },
  { when: "Oct. 2020 — Juil. 2023", title: "Licence en Informatique de gestion", org: "Université de Kinshasa, Faculté des Sciences" },
  { when: "Sept. — Oct. 2020", title: "Stagiaire", org: "Ministère des Finances — Kinshasa/Gombe" },
  { when: "Oct. 2017 — Juil. 2020", title: "Graduat en Mathématiques et Informatique", org: "Université de Kinshasa, Faculté des Sciences" },
];

export const EDUCATION: EducationItem[] = [
  { title: "Licence en Informatique de gestion", meta: "2020 — 2023", org: "Université de Kinshasa, Faculté des Sciences" },
  { title: "Développement Web et Mobile (Bac+2)", meta: "2024 — 2025", org: "Kadea Academy × Simplon" },
  { title: "Python", meta: "2026", org: "Cisco Networking Academy & Python Institute" },
  { title: "Certificat — Développeur Web", meta: "Oct. 2025", org: "Udemy" },
  { title: "JavaScript & JavaScript Essentials 1", meta: "2025", org: "Cisco Networking Academy" },
  { title: "Initiation au développement web", meta: "2023", org: "Kadea Boost" },
];

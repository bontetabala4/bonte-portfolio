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
  role: "Ingénieur d'Études et Développement Full Stack — React · TypeScript · Node.js · PostgreSQL",
  location: "Kinshasa (N'Sele), RD Congo",
  email: "bontetabala4@gmail.com",
  phone: "+243 995 608 233",
  github: "https://github.com/bontetabala4",
  linkedin: "https://linkedin.com/in/bonté-tabala-mangala",
  summary:
    "Ingénieur logiciel full stack cumulant une expertise éprouvée dans la conception, le développement et le déploiement d'architectures web robustes (React, TypeScript, Node.js/AdonisJS, PostgreSQL). Rompu aux exigences des applications métier critiques (gestion de stocks sous contraintes réglementaires, contrôle d'accès sécurisé et traçabilité temps réel), j'interviens sur l'ensemble de la chaîne de valeur logicielle : modélisation de bases relationnelles, sécurisation d'API RESTful, conteneurisation et intégration continue. Autonome et rigoureux, disponible pour des projets d'envergure et des postes en distanciel (remote).",
};

export const STACK: Record<string, string[]> = {
  "Cœur de profil": ["React.js", "TypeScript", "Node.js", "AdonisJS", "PostgreSQL", "REST API"],
  "Front-end": ["Next.js", "Tailwind CSS", "Bootstrap", "HTML5 / CSS3", "Figma", "Vite"],
  "Back-end & Données": ["Express.js", "Lucid ORM", "MySQL", "Authentication / Authorization", "RBAC", "Python / FastAPI"],
  "DevOps & Outils": ["Git / GitHub", "Docker", "Linux (Bash)", "Postman"],
};

export const PROJECTS: Project[] = [
  {
    id: "gstock",
    name: "GStock — Système d'Information & Gestion de Stocks Pharmaceutiques",
    client: "Agence Congolaise des Grands Travaux (ACGT)",
    status: "EN PRODUCTION",
    date: "Juil. 2026",
    role: "Ingénieur d'Études et Développement Full Stack",
    context: "Système d'information d'entreprise dédié à la gouvernance et au suivi rigoureux des approvisionnements médicaux.",
    description:
      "Conception et déploiement d'une solution d'inventaire automatisée intégrant la gestion des flux d'entrées/sorties, la traçabilité fournisseurs et un algorithme d'ordonnancement FEFO (First-Expired, First-Out) garantissant la conformité sanitaire et la réduction des pertes d'actifs sensibles.",
    highlights: [
      "Modélisation rigoureuse du schéma relationnel sous PostgreSQL (intégrité référentielle, indexation, contraintes métier).",
      "Conception et implémentation d'un moteur d'allocation automatique des stocks fondé sur la date limite de consommation (FEFO).",
      "Développement d'une interface réactive en EJS / Bootstrap adossée à une couche de services robuste sous Express.js.",
      "Génération d'états d'inventaires prédictifs, traçabilité exhaustive de la chaîne logistique et alertes de réapprovisionnement."
    ],
    stack: ["JavaScript", "Node.js", "Express.js", "PostgreSQL", "EJS", "Bootstrap"],
    githubUrl: "https://github.com/bontetabala4",
  },
  {
    id: "badges",
    name: "Système Réparti de Contrôle d'Accès & Identification Sécurisée",
    client: "Agence Congolaise des Grands Travaux (ACGT)",
    status: "EN PRODUCTION",
    date: "Juin 2026",
    role: "Ingénieur d'Études et Développement Full Stack",
    context: "Infrastructure interne de sécurisation des accès physiques et d'authentification du personnel de l'ACGT.",
    description:
      "Solution intégrée couvrant la génération cryptographique d'identifiants uniques, le contrôle d'accès instantané par lecture optique de QR codes et la production industrielle de badges sur supports physiques PVC.",
    highlights: [
      "Génération dynamique de jetons QR sécurisés encapsulant les métadonnées agents et validation instantanée sans latence.",
      "Module d'authentification et de validation opérationnelle avec temps de réponse optimal lors des scans.",
      "Mise en page vectorielle haute fidélité calibrée spécifiquement pour l'impression thermique directe sur cartes PVC.",
      "Architecture logicielle modulaire bâtie sur AdonisJS avec typage statique strict TypeScript et persistance PostgreSQL."
    ],
    stack: ["AdonisJS", "TypeScript", "PostgreSQL", "Tailwind CSS", "Lucid ORM"],
    githubUrl: "https://github.com/bontetabala4",
  },
  {
    id: "qr-generator",
    name: "QR Pointage — Solution Dématérialisée d'Émargement & Suivi de Présence",
    client: "Projet freelance",
    status: "LIVRÉ",
    date: "Nov. 2025 – Jan. 2026",
    role: "Lead Developer Full Stack",
    context: "Plateforme SaaS d'automatisation des flux d'émargement et d'audit d'assiduité pour entreprises et établissements.",
    description:
      "Remplacement intégral des procédures manuelles d'émargement par un mécanisme de signature numérique via QR codes horodatés, couplé à un tableau de bord analytique consolidant les présences en temps réel.",
    highlights: [
      "Élimination intégrale du risque de fraude grâce à un protocole d'horodatage certifié et à des identifiants éphémères.",
      "Tableau de bord opérationnel fournissant des métriques analytiques automatisées (taux d'absentéisme, ponctualité, cumul horaire).",
      "API RESTful haute vélocité en Node.js garantissant une latence minimale lors des pics d'affluence.",
      "Piste d'audit inviolable et export automatisé des rapports d'activité pour l'administration."
    ],
    stack: ["Node.js", "PostgreSQL", "JavaScript", "REST API", "Tailwind CSS"],
    githubUrl: "https://github.com/bontetabala4",
  },
  {
    id: "twitter-clone",
    name: "Microblogging Engine — Architecture Distribuée Full Stack",
    client: "Kadea Academy",
    status: "RÉALISÉ",
    date: "Avr. 2025",
    role: "Ingénieur Logiciel Full Stack",
    context: "Projet d'ingénierie logicielle simulant l'architecture et les flux transactionnels d'un réseau social d'envergure.",
    description:
      "Implémentation des mécanismes fondamentaux d'une plateforme sociale à fort trafic : ingestion de flux en direct, système d'interactions asynchrones, gestion granulaire des sessions et profils utilisateurs.",
    highlights: [
      "Authentification sécurisée avec gestion de sessions par jetons JWT signés et salage/hachage cryptographique des identifiants.",
      "Modélisation de relations graphes et relations récursives complexes sous PostgreSQL (abonnements, threads imbriqués, interactions).",
      "Conception d'une interface monopage (SPA) performante, modulaire et fluide sous React.js et Tailwind CSS.",
      "Endpoints API REST découplés et optimisés pour minimiser la consommation de bande passante."
    ],
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/bontetabala4",
  },
  {
    id: "kongowood-maps",
    name: "Kongowood Maps — Plateforme Géospatiale de Repérage Cinématographique",
    client: "Projet personnel",
    status: "EN DÉVELOPPEMENT",
    date: "En cours",
    role: "Fondateur & Architecte Logiciel",
    context: "Plateforme technologique visant à structurer et moderniser l'industrie cinématographique en RD Congo et Afrique Centrale.",
    description:
      "Système d'information géographique (SIG) et collaboratif facilitant le repérage de lieux de tournage : cartographie vectorielle interactive, fiches techniques de décors, moteur de filtrage multicritères et espaces de travail pour équipes de production.",
    highlights: [
      "Cartographie dynamique interactive exploitant les données géospatiales pour le géoréférencement précis de décors.",
      "Fiches de caractérisation technique enrichies : données topographiques, contraintes logistiques et statut réglementaire.",
      "Espace collaboratif sécurisé facilitant les échanges entre régisseurs généraux, directeurs de la photographie et producteurs."
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Leaflet / Maps", "Tailwind CSS"],
    githubUrl: "https://github.com/bontetabala4",
  },
  {
    id: "hand-tech",
    name: "Hand Tech — Écosystème d'Assistance Intelligente Multimodal",
    client: "Projet personnel",
    status: "EN DÉVELOPPEMENT",
    date: "En cours",
    role: "Ingénieur Logiciel & Systèmes Intelligents",
    context: "Dispositif d'accessibilité numérique et d'assistance cognitive fondé sur les technologies de vision par ordinateur.",
    description:
      "Architecture distribuée articulée autour d'un client mobile multiplateforme, d'une passerelle API asynchrone en FastAPI et d'un micro-service dédié à l'inférence d'algorithmes d'apprentissage automatique.",
    highlights: [
      "Architecture orientée micro-services garantissant l'isolation des processus de traitement d'images et d'inférence IA.",
      "Client mobile multiplateforme (Flutter) offrant une ergonomie réactive et une faible empreinte mémoire.",
      "Conteneurisation standardisée (Docker) assurant la reproductibilité environnementale du cycle de vie logiciel."
    ],
    stack: ["Flutter", "FastAPI", "Python / IA", "Docker"],
    githubUrl: "https://github.com/bontetabala4",
  },
  {
    id: "procv-builder",
    name: "ProCV Builder — Moteur de Génération & Rendu de Curriculum Vitae",
    client: "Freelance",
    status: "LIVRÉ",
    date: "Oct. 2025",
    role: "Ingénieur d'Études et Développement Full Stack",
    description: "Application web d'édition interactive de profils professionnels avec compilation de maquettes en temps réel et moteur d'export PDF vectoriel de haute précision.",
    highlights: [
      "Moteur de rendu réactif calculant les états d'affichage sans rupture de navigation ni latence.",
      "Pipeline d'export PDF vectoriel garantissant la fidélité typographique et la compatibilité avec les systèmes ATS recruteurs.",
      "Architecture applicative découplée avec séparation stricte de la logique de présentation et des règles de validation."
    ],
    stack: ["React", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/bontetabala4",
  },
  {
    id: "ecommerce-dashboard",
    name: "E-Commerce Analytics — Plateforme Décisionnelle & Visualisation de Données",
    client: "Freelance",
    status: "LIVRÉ",
    date: "Sept. 2025",
    role: "Frontend Software Engineer",
    description: "Tableau de bord décisionnel dédié à l'analyse multidimensionnelle des indicateurs clés de performance (KPI) pour le commerce électronique.",
    highlights: [
      "Visualisations dynamiques et interactives (entonnoirs de conversion, cohortes de fidélisation, volatilité des paniers moyens).",
      "Moteur d'agrégation de séries temporelles avec filtres contextuels et génération de synthèses décisionnelles.",
      "Conception ergonomique axée sur la lisibilité des indicateurs et l'optimisation des performances de rendu graphique."
    ],
    stack: ["React", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com/bontetabala4",
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

import { PROFILE, STACK, PROJECTS, TIMELINE, EDUCATION } from "../data/content";

// En dev local (sans VITE_API_URL), API_BASE vaut "".
// Toutes les requêtes partent en chemin relatif (/api/...) et le proxy Vite
// les redirige vers localhost:8000 — le navigateur ne voit qu'une seule origine,
// donc zéro CORS. En production, VITE_API_URL pointe vers le backend déployé.
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

// ─── données statiques ────────────────────────────────────────────────────────

async function tryFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as T;
  } catch {
    // Backend pas encore lancé, ou timeout : on continue avec les données locales.
    return fallback;
  }
}

export const getProfile   = () => tryFetch("/api/profile",   PROFILE);
export const getStack     = () => tryFetch("/api/stack",     STACK);
export const getProjects  = () => tryFetch("/api/projects",  PROJECTS);
export const getTimeline  = () => tryFetch("/api/timeline",  TIMELINE);
export const getEducation = () => tryFetch("/api/education", EDUCATION);

// ─── ATLAS (repli local si backend injoignable) ───────────────────────────────

function localAsk(question: string): string {
  const q = question.trim().toLowerCase();
  if (!q) return "Signal vide. Pose-moi une question sur les projets, la stack ou le parcours de Bonte.";
  if (["salut", "bonjour", "hello", "hey", "bonsoir"].some((g) => q.includes(g))) {
    return "Bonjour. Je suis ATLAS, l'assistant embarqué de ce portfolio. Pose-moi une question : projets, stack, parcours, contact.";
  }
  if (q.includes("contact") || q.includes("mail") || q.includes("joindre") || q.includes("téléphone")) {
    return `Canal direct : ${PROFILE.email} · ${PROFILE.phone} · GitHub : ${PROFILE.github}`;
  }
  if (q.includes("stack") || q.includes("techno") || q.includes("compétence") || q.includes("competence")) {
    return `Cœur de stack : ${[...STACK["Front-end"].slice(0, 3), ...STACK["API & Back-end"].slice(0, 3)].join(", ")}.`;
  }
  const named = PROJECTS.find(
    (p) => q.includes(p.id.replace(/-/g, "")) || q.includes(p.name.split(" — ")[0].toLowerCase())
  );
  if (named) {
    return `${named.name} — ${named.description} Stack : ${named.stack.join(", ")}. Statut : ${named.status}.`;
  }
  if (q.includes("projet") || q.includes("travaux") || q.includes("réalisation")) {
    const names = PROJECTS.slice(0, 4).map((p) => p.name.split(" — ")[0]).join(", ");
    return `Quatre systèmes phares : ${names}. Demande le nom d'un projet pour le détail.`;
  }
  if (q.includes("expérience") || q.includes("parcours") || q.includes("stage")) {
    const latest = TIMELINE[0];
    return `Dernier poste : ${latest.title} — ${latest.org} (${latest.when}).`;
  }
  if (q.includes("formation") || q.includes("diplôme") || q.includes("étude")) {
    const e = EDUCATION[0];
    return `${e.title} — ${e.org} (${e.meta}).`;
  }
  if (q.includes("atlas") || q.includes("qui es")) {
    return "ATLAS : guide par règles, pas un LLM. Il connaît ce portfolio par cœur.";
  }
  if (q.includes("disponible") || q.includes("freelance") || q.includes("remote")) {
    return `Bonte est ouvert aux missions freelance et postes remote. Contact : ${PROFILE.email}.`;
  }
  return 'Hors index. Essaie : "projets", "stack", "parcours" ou "contact".';
}

export async function askAtlas(question: string): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      return data.reply as string;
    }
  } catch {
    // Backend down — on répond localement, sans bruit.
  }
  return localAsk(question);
}

// ─── formulaire de contact ────────────────────────────────────────────────────

export type ContactPayload = { name: string; email: string; subject: string; message: string };
export type ContactResult  = { delivered: boolean; method: "api" | "mailto"; emailed?: boolean; error?: string };

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const data = await res.json().catch(() => null);
      return { delivered: true, method: "api", emailed: Boolean(data?.emailed) };
    }

    // Erreur HTTP propre (400, 422, 429…)
    const data = await res.json().catch(() => null);
    return {
      delivered: false,
      method: "api",
      error: data?.detail ?? `Le serveur a répondu ${res.status} — réessaie dans un instant.`,
    };
  } catch (err) {
    // Réseau mort, timeout : on dit clairement ce qui s'est passé, on n'ouvre PAS le mail.
    const isTimeout = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    return {
      delivered: false,
      method: "api",
      error: isTimeout
        ? "Le serveur ne répond pas — vérifie qu'il est bien démarré."
        : "Connexion impossible. Vérifie ta connexion ou relance le backend.",
    };
  }
}


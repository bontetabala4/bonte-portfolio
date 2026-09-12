import { PROFILE, STACK, PROJECTS, TIMELINE, EDUCATION } from "../data/content";

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

async function tryFetch<T>(path: string, fallback: T): Promise<T> {
  if (!API_URL) return fallback;
  try {
    const res = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as T;
  } catch {
    // Backend indisponible (pas encore lancé, ou déployé sans VITE_API_URL) :
    // le front continue de fonctionner avec les données locales.
    return fallback;
  }
}

export const getProfile = () => tryFetch("/api/profile", PROFILE);
export const getStack = () => tryFetch("/api/stack", STACK);
export const getProjects = () => tryFetch("/api/projects", PROJECTS);
export const getTimeline = () => tryFetch("/api/timeline", TIMELINE);
export const getEducation = () => tryFetch("/api/education", EDUCATION);

// Repli local d'ATLAS si le backend FastAPI n'est pas joignable —
// même logique simple par mots-clés que backend/ai.py.
function localAsk(question: string): string {
  const q = question.trim().toLowerCase();
  if (!q) return "Signal vide reçu. Pose-moi une question sur le parcours, les projets ou la stack de Bonte.";
  if (["salut", "bonjour", "hello", "hey", "bonsoir"].some((g) => q.includes(g))) {
    return "Bonjour. Je suis ATLAS, l'assistant embarqué de ce portfolio. Demande-moi les projets, la stack, le parcours ou le contact.";
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
    return `Quatre systèmes phares en archive : ${names}. Demande le nom d'un projet pour le détail.`;
  }
  if (q.includes("expérience") || q.includes("parcours") || q.includes("stage")) {
    const latest = TIMELINE[0];
    return `Dernier poste enregistré : ${latest.title} — ${latest.org} (${latest.when}).`;
  }
  if (q.includes("formation") || q.includes("diplôme") || q.includes("étude")) {
    const e = EDUCATION[0];
    return `${e.title} — ${e.org} (${e.meta}).`;
  }
  if (q.includes("atlas") || q.includes("qui es")) {
    return "ATLAS : module de navigation du portfolio. Pas un grand modèle de langage — un guide par règles qui connaît ce document par cœur.";
  }
  if (q.includes("disponible") || q.includes("freelance") || q.includes("remote")) {
    return `Bonte est ouvert aux missions freelance et postes remote. Contact : ${PROFILE.email}.`;
  }
  return 'Requête hors index. Essaie : "projets", "stack", "parcours" ou "contact".';
}

export async function askAtlas(question: string): Promise<string> {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/api/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply as string;
      }
    } catch {
      // repli silencieux ci-dessous
    }
  }
  return localAsk(question);
}

export type ContactPayload = { name: string; email: string; subject: string; message: string };
export type ContactResult = { delivered: boolean; method: "api" | "mailto"; error?: string };

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        return { delivered: true, method: "api" };
      }
      const data = await res.json().catch(() => null);
      return { delivered: false, method: "api", error: data?.detail || "Le serveur a refusé le message." };
    } catch {
      // Backend injoignable : on retombe sur mailto ci-dessous, le message
      // n'est jamais perdu silencieusement.
    }
  }
  const to = PROFILE.email;
  const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
  const subject = encodeURIComponent(payload.subject || `Message depuis le portfolio de ${payload.name}`);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  return { delivered: true, method: "mailto" };
}

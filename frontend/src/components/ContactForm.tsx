import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactMessage } from "../lib/api";

type Status = "idle" | "sending" | "sent" | "saved" | "mailto" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus("error");
      setError("Tous les champs sont requis.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("L'adresse email n'a pas l'air valide.");
      return;
    }

    setStatus("sending");
    setError("");
    const result = await sendContactMessage({ name, email, subject, message });

    if (result.delivered && result.method === "api" && result.emailed) {
      setStatus("sent");
      reset();
    } else if (result.delivered && result.method === "api") {
      setStatus("saved");
      reset();
    } else if (result.method === "mailto") {
      setStatus("mailto");
      reset();
    } else {
      setStatus("error");
      setError(result.error || "Échec de l'envoi. Réessaie dans un instant.");
    }
  }

  const disabled = status === "sending";

  return (
    <div className="hud-corners mt-10 max-w-2xl border border-line bg-panel/70 p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${
              status === "sending" ? "animate-ping bg-amber" : "bg-cyan"
            }`}
          />
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status === "sending" ? "bg-amber" : "bg-cyan"}`} />
        </span>
        <span className="font-mono text-[11px] tracking-widest text-cyan-soft/80">
          FORMULAIRE DE CONTACT DIRECT
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] text-amber">VOTRE NOM</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            className="border border-line bg-void px-3 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-cyan/60 focus:outline-none"
            placeholder="Ex. Sarah Connor"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] text-amber">VOTRE ADRESSE EMAIL</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
            type="email"
            className="border border-line bg-void px-3 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-cyan/60 focus:outline-none"
            placeholder="sarah@exemple.com"
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="font-mono text-[10px] text-amber">OBJET DE VOTRE MESSAGE</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={disabled}
            className="border border-line bg-void px-3 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-cyan/60 focus:outline-none"
            placeholder="Proposition de projet, collaboration ou question…"
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="font-mono text-[10px] text-amber">MESSAGE</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
            rows={5}
            className="resize-none border border-line bg-void px-3 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-cyan/60 focus:outline-none"
            placeholder="Parlez-moi de votre besoin ou de votre idée…"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={disabled}
            className="w-full border border-cyan/60 bg-cyan/10 px-6 py-3 font-mono text-xs tracking-widest text-cyan-soft transition-colors hover:bg-cyan/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {status === "sending" ? "ENVOI EN COURS…" : "ENVOYER LE MESSAGE"}
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {status === "sent" && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 border border-cyan/40 bg-cyan/5 px-4 py-3 font-mono text-xs text-cyan-soft"
          >
            ✓ Bien reçu ! Votre message m'a été transmis par email. Je vous réponds sous 24h.
          </motion.div>
        )}
        {status === "mailto" && (
          <motion.div
            key="mailto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 border border-amber/40 bg-amber/5 px-4 py-3 font-mono text-xs text-amber"
          >
            ✓ Votre client mail vient de s'ouvrir avec votre message prêt à l'envoi.
          </motion.div>
        )}
        {status === "saved" && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 border border-amber/40 bg-amber/5 px-4 py-3 font-mono text-xs text-amber"
          >
            ✓ Message sauvegardé avec succès dans ma base de messages.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 border border-red-500/40 bg-red-500/5 px-4 py-3 font-mono text-xs text-red-300"
          >
            ✕ {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

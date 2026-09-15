import { motion } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import type { Profile } from "../lib/types";

export default function Hero({ profile }: { profile: Profile }) {
  const { output: nameOut, done: nameDone } = useTypewriter(profile.name.toUpperCase(), 55, 400);

  return (
    <header id="top" className="relative overflow-hidden pb-28 pt-20 md:pt-28">
      <div className="scan-sweep" />
      <div className="mx-auto max-w-6xl px-6">
        {/* ligne de boot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3 font-mono text-xs text-cyan/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          Connecté · Basé à {profile.location} · Disponible pour des missions
        </motion.div>

        <h1 className="font-display text-[clamp(2.1rem,6vw,4.4rem)] font-black leading-[1.05] text-ink">
          {nameOut}
          {!nameDone && <span className="cursor-blink text-cyan">▌</span>}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="mt-5 max-w-2xl font-display text-lg font-medium tracking-wide text-cyan-soft md:text-xl"
        >
          {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.6 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="border border-cyan bg-cyan/10 px-6 py-3 font-medium tracking-wide text-cyan-soft transition-colors hover:bg-cyan/20"
          >
            Voir mes projets
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="border border-line px-6 py-3 font-medium tracking-wide text-ink/80 transition-colors hover:border-cyan/60 hover:text-ink"
          >
            M'écrire directement
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-6 py-3 font-medium tracking-wide text-ink/80 transition-colors hover:border-cyan/60 hover:text-ink"
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin || "https://linkedin.com/in/bonté-tabala-mangala"}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-6 py-3 font-medium tracking-wide text-ink/80 transition-colors hover:border-cyan/60 hover:text-ink"
          >
            LinkedIn ↗
          </a>
        </motion.div>

        {/* panneau d'infos rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.6 }}
          className="hud-corners mt-16 grid max-w-2xl grid-cols-2 gap-px border border-line bg-line/40 font-mono text-xs sm:grid-cols-4"
        >
          {[
            ["Spécialité",   "React · Node · Postgres"],
            ["Email",        profile.email],
            ["GitHub",       "@bontetabala4"],
            ["Basé à",       "Kinshasa · RDC"],
          ].map(([label, value]) => (
            <div key={label} className="bg-panel px-3 py-3">
              <div className="text-cyan-soft/70">{label}</div>
              <div className="mt-1 truncate text-ink">{value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}


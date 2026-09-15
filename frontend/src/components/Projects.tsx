import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import type { Project } from "../lib/types";

export default function Projects({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fermer la modal avec la touche Échap
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    }
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  const featured = projects.slice(0, 4);
  const rest = projects.slice(4);

  return (
    <section id="work" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-3 font-mono text-xs text-amber">02 // PROJETS</div>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Ce que j'ai construit</h2>
          <p className="mt-3 max-w-2xl text-ink/70">
            Cliquez sur un projet pour ouvrir sa fiche technique détaillée : architecture, contexte métier, fonctionnalités clés et technologies.
          </p>
        </Reveal>

        {/* Projets principaux */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line/40 md:grid-cols-2">
          {featured.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 0.08}>
              <motion.div
                onClick={() => setSelectedProject(p)}
                whileHover={{ backgroundColor: "rgba(79,227,214,0.04)" }}
                className="group relative flex h-full cursor-pointer flex-col justify-between bg-void p-7 transition-all hover:border-cyan/40"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-[11px] text-amber">{p.client}</div>
                      <h3 className="mt-1 font-display text-lg font-semibold text-ink transition-colors group-hover:text-cyan">
                        {p.name}
                      </h3>
                    </div>
                    <span className="whitespace-nowrap border border-line px-2 py-1 font-mono text-[10px] text-cyan-soft">
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">{p.description}</p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-line/50">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="border border-line/80 bg-panel px-2 py-0.5 font-mono text-[10px] text-cyan-soft">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 font-mono text-[10px] text-ink/50">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-cyan transition-transform group-hover:translate-x-1">
                    Ouvrir →
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Autres réalisations */}
        <div className="mt-1 grid grid-cols-1 gap-px border border-t-0 border-line bg-line/40 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 0.06}>
              <div
                onClick={() => setSelectedProject(p)}
                className="group flex h-full cursor-pointer flex-col justify-between bg-void p-5 transition-colors hover:bg-panel"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-amber">{p.date}</span>
                    <span className="font-mono text-[10px] text-cyan-soft">{p.status}</span>
                  </div>
                  <h4 className="mt-2 font-display text-sm font-semibold text-ink transition-colors group-hover:text-cyan">
                    {p.name}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink/60">{p.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-line/30 pt-2 font-mono text-[10px]">
                  <span className="text-ink/50">{p.client}</span>
                  <span className="text-cyan group-hover:underline">Détails ↗</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal / Fiche technique immersive */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop avec flou sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-void/85 backdrop-blur-md"
            />

            {/* Fenêtre modale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hud-corners relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-cyan/40 bg-panel/95 p-6 shadow-2xl shadow-cyan/10 sm:p-8"
            >
              {/* En-tête de la modal */}
              <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-amber">{selectedProject.client}</span>
                    <span className="text-ink/40">·</span>
                    <span className="font-mono text-xs text-cyan-soft">{selectedProject.date}</span>
                    <span className="border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
                      {selectedProject.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                    {selectedProject.name}
                  </h3>
                  {selectedProject.role && (
                    <div className="mt-1 font-mono text-xs text-cyan-soft/80">
                      Rôle : {selectedProject.role}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-line bg-void text-lg text-ink/70 transition-colors hover:border-cyan hover:text-cyan"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>

              {/* Contenu */}
              <div className="mt-6 space-y-6">
                {/* Contexte & Description */}
                <div>
                  <h4 className="font-mono text-xs tracking-wider text-amber uppercase">Présentation & Contexte</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/85 sm:text-base">
                    {selectedProject.description}
                  </p>
                  {selectedProject.context && (
                    <p className="mt-2 text-xs italic text-ink/60">
                      Cadre : {selectedProject.context}
                    </p>
                  )}
                </div>

                {/* Points forts / Réalisations concrètes */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div>
                    <h4 className="font-mono text-xs tracking-wider text-amber uppercase">
                      Points Clés & Réalisations
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stack technique */}
                <div>
                  <h4 className="font-mono text-xs tracking-wider text-amber uppercase">Technologies Utilisées</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-cyan/30 bg-void px-3 py-1 font-mono text-xs text-cyan-soft"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Liens & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                  <div className="flex gap-3">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-line bg-void px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-cyan hover:text-cyan"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-cyan bg-cyan/15 px-4 py-2 font-mono text-xs text-cyan transition-colors hover:bg-cyan/25"
                      >
                        Voir la démo ↗
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="border border-line px-4 py-2 font-mono text-xs text-ink/60 transition-colors hover:text-ink"
                  >
                    Fermer [Échap]
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


import { motion } from "framer-motion";
import Reveal from "./Reveal";
import type { Project } from "../lib/types";

export default function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 4);
  const rest = projects.slice(4);

  return (
    <section id="work" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-3 font-mono text-xs text-amber">02 // ARCHIVE</div>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Travaux sélectionnés</h2>
          <p className="mt-3 max-w-2xl text-ink/70">
            Quatre systèmes qui montrent la même approche : comprendre le métier avant d'écrire du code.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line/40 md:grid-cols-2">
          {featured.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(79,227,214,0.04)" }}
                className="h-full bg-void p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[11px] text-amber">{p.client}</div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">{p.name}</h3>
                  </div>
                  <span className="whitespace-nowrap border border-line px-2 py-1 font-mono text-[10px] text-cyan-soft">
                    {p.status}
                  </span>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="border border-line px-2 py-1 font-mono text-[10px] text-cyan-soft">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-1 gap-px border border-t-0 border-line bg-line/40 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 0.06}>
              <div className="h-full bg-void p-5">
                <h4 className="font-display text-sm font-semibold text-ink">{p.name}</h4>
                <p className="mt-2 text-xs leading-relaxed text-ink/60">{p.description}</p>
                <div className="mt-3 font-mono text-[10px] text-amber">{p.client} · {p.date}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

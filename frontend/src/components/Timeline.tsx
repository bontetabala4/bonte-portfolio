import { motion } from "framer-motion";
import Reveal from "./Reveal";
import type { TimelineItem } from "../lib/types";

export default function Timeline({ timeline }: { timeline: TimelineItem[] }) {
  return (
    <section id="path" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-3 font-mono text-xs text-amber">03 // PARCOURS</div>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Mon chemin jusqu'ici</h2>
          <p className="mt-3 max-w-xl text-ink/70">
            De l'Université de Kinshasa à l'ACGT en passant par Kadea Academy — chaque étape a ajouté quelque chose à ma façon de penser les systèmes.
          </p>
        </Reveal>

        <div className="relative mt-12 max-w-2xl pl-8">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[3px] top-1 bottom-1 w-px bg-gradient-to-b from-cyan via-cyan/40 to-transparent"
          />
          <div className="flex flex-col gap-10">
            {timeline.map((t, idx) => (
              <Reveal key={t.title + t.when} delay={idx * 0.06}>
                <div className="relative">
                  <span className="absolute -left-[35px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-cyan bg-void" />
                  <div className="font-mono text-xs text-cyan-soft">{t.when}</div>
                  <h4 className="mt-1 font-display text-base font-semibold text-ink">{t.title}</h4>
                  <div className="mt-1 text-sm text-ink/60">{t.org}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


import Reveal from "./Reveal";
import type { StackMap } from "../lib/types";

export default function StackGrid({ stack }: { stack: StackMap }) {
  const layers = Object.entries(stack);

  return (
    <section id="stack" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-3 font-mono text-xs text-amber">01 // ARCHITECTURE</div>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Champ de compétence</h2>
          <p className="mt-3 max-w-2xl text-ink/70">
            Le cœur : React, TypeScript, Node.js et PostgreSQL. Le reste s'y greffe selon les besoins du système.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line/40 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map(([layer, items], idx) => (
            <Reveal key={layer} delay={idx * 0.08}>
              <div className="h-full bg-panel p-6">
                <div className="font-mono text-[11px] tracking-widest text-amber">{layer.toUpperCase()}</div>
                <ul className="mt-4 space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-ink/90">
                      <span className="h-px w-3 bg-cyan/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";
import type { EducationItem } from "../lib/types";

export default function Education({ education }: { education: EducationItem[] }) {
  return (
    <section className="py-8 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-3 font-mono text-xs text-amber">04 // RÉFÉRENTIEL</div>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Formation &amp; certifications</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {education.map((e, idx) => (
            <Reveal key={e.title} delay={idx * 0.05}>
              <div className="border-l-2 border-cyan/50 pl-4">
                <h4 className="font-display text-sm font-semibold text-ink">{e.title}</h4>
                <div className="mt-1 font-mono text-[11px] text-amber">{e.meta}</div>
                <div className="mt-1 text-sm text-ink/60">{e.org}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

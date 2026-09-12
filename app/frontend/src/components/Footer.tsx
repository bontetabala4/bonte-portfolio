import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import type { Profile } from "../lib/types";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-3 font-mono text-xs text-amber">06 // CANAL DE SORTIE</div>
          <h2 className="max-w-md font-display text-2xl font-bold text-ink md:text-4xl">
            Construisons quelque chose de solide.
          </h2>
          <p className="mt-4 max-w-md text-ink/70">
            Ouvert aux missions freelance et aux postes remote — full-stack, API, ou architecture de systèmes de
            données.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-px border border-line bg-line/40 sm:grid-cols-2">
            <a href={`mailto:${profile.email}`} className="bg-void px-5 py-4 transition-colors hover:bg-panel">
              <div className="font-mono text-[10px] text-amber">EMAIL</div>
              <div className="mt-1 text-sm text-ink">{profile.email}</div>
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="bg-void px-5 py-4 transition-colors hover:bg-panel">
              <div className="font-mono text-[10px] text-amber">TÉLÉPHONE</div>
              <div className="mt-1 text-sm text-ink">{profile.phone}</div>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="bg-void px-5 py-4 transition-colors hover:bg-panel">
              <div className="font-mono text-[10px] text-amber">GITHUB</div>
              <div className="mt-1 text-sm text-ink">@bontetabala4</div>
            </a>
            <div className="bg-void px-5 py-4">
              <div className="font-mono text-[10px] text-amber">LOCALISATION</div>
              <div className="mt-1 text-sm text-ink">{profile.location}</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>

        <div className="mt-16 flex flex-wrap justify-between gap-2 font-mono text-[11px] text-ink/30">
          <span>KINSHASA / N'SELE, RD CONGO</span>
          <span>© 2026 — BONTE TABALA MANGALA</span>
        </div>
      </div>
    </footer>
  );
}

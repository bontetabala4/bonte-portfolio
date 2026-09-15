import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { askAtlas } from "../lib/api";
import Reveal from "./Reveal";

type Msg = { role: "atlas" | "user"; text: string };

const SUGGESTIONS = ["Quels sont tes projets ?", "Quelle est ta stack ?", "Comment te contacter ?"];

function TypedLine({ text }: { text: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 14);
    return () => window.clearInterval(id);
  }, [text]);
  return <>{out}</>;
}

export default function AIConsole() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "atlas", text: "Bonjour, je suis ATLAS. Je connais ce portfolio par cœur — projets, stack, parcours, contact. Pose-moi une question." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    const reply = await askAtlas(q);
    await new Promise((r) => setTimeout(r, 350));
    setThinking(false);
    setMessages((m) => [...m, { role: "atlas", text: reply }]);
  }

  return (
    <section id="atlas" className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="mb-3 font-mono text-xs text-amber">05 // ASSISTANT</div>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">ATLAS</h2>
          <p className="mt-3 max-w-2xl text-ink/70">
            Un guide par mots-clés que j'ai codé pour répondre aux questions courantes sur ce portfolio. Ce n'est pas un LLM — il connaît exactement ce qui est dans cette page, rien de plus.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="hud-corners mt-10 border border-line bg-panel/70">
            {/* header */}
            <div className="flex items-center gap-4 border-b border-line px-6 py-4">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <span className="pulse-ring" />
                <span className="pulse-ring" style={{ animationDelay: "0.8s" }} />
                <span className="relative h-3 w-3 rounded-full bg-cyan shadow-[0_0_12px_2px_rgba(79,227,214,0.8)]" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-ink">ATLAS · assistant du portfolio</div>
                <div className="font-mono text-[11px] text-cyan-soft/70">
                  {thinking ? "en train de réfléchir…" : "prêt à répondre"}
                </div>
              </div>
            </div>

            {/* log */}
            <div ref={logRef} className="flex max-h-80 flex-col gap-4 overflow-y-auto px-6 py-6">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={m.role === "user" ? "self-end text-right" : "self-start"}
                  >
                    <div className="font-mono text-[10px] text-ink/40">
                      {m.role === "atlas" ? "ATLAS" : "TOI"}
                    </div>
                    <div
                      className={
                        m.role === "atlas"
                          ? "mt-1 max-w-md border border-cyan/30 bg-cyan/5 px-4 py-2.5 text-sm text-ink"
                          : "mt-1 inline-block max-w-md border border-line bg-void px-4 py-2.5 text-sm text-ink/80"
                      }
                    >
                      {m.role === "atlas" && i === messages.length - 1 && !thinking ? (
                        <TypedLine text={m.text} />
                      ) : (
                        m.text
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {thinking && (
                <div className="self-start font-mono text-xs text-cyan-soft/70">
                  <span className="cursor-blink">●</span> ATLAS cherche dans ses données…
                </div>
              )}
            </div>

            {/* suggestions */}
            <div className="flex flex-wrap gap-2 border-t border-line px-6 py-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="border border-line px-3 py-1.5 font-mono text-[11px] text-ink/70 transition-colors hover:border-cyan/60 hover:text-cyan-soft"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-3 border-t border-line px-6 py-4"
            >
              <span className="font-mono text-cyan">&gt;</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pose ta question ici…"
                className="flex-1 bg-transparent font-mono text-sm text-ink placeholder:text-ink/30 focus:outline-none"
              />
              <button
                type="submit"
                className="border border-cyan/60 px-4 py-1.5 font-mono text-xs text-cyan-soft transition-colors hover:bg-cyan/10"
              >
                Envoyer
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


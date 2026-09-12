import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PAGES, pageIndex } from "../pages/pagesMeta";

export default function Pager() {
  const location = useLocation();
  const navigate = useNavigate();
  const idx = pageIndex(location.pathname);
  const prev = PAGES[idx - 1];
  const next = PAGES[idx + 1];

  return (
    <div className="border-t border-line/60 bg-void/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <button
          onClick={() => prev && navigate(prev.path)}
          disabled={!prev}
          className="group flex items-center gap-2 font-mono text-xs text-ink/60 transition-colors disabled:opacity-20 enabled:hover:text-cyan-soft"
        >
          <span className="transition-transform group-enabled:group-hover:-translate-x-1">←</span>
          {prev ? prev.label.toUpperCase() : "—"}
        </button>

        <div className="flex items-center gap-1.5">
          {PAGES.map((p, i) => (
            <motion.span
              key={p.path}
              className="h-1.5 w-1.5 rounded-full"
              animate={{
                backgroundColor: i === idx ? "#4FE3D6" : "#12283A",
                scale: i === idx ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
          <span className="ml-3 font-mono text-[10px] text-ink/30">
            MODULE {String(idx + 1).padStart(2, "0")}/{PAGES.length}
          </span>
        </div>

        <button
          onClick={() => next && navigate(next.path)}
          disabled={!next}
          className="group flex items-center gap-2 font-mono text-xs text-ink/60 transition-colors disabled:opacity-20 enabled:hover:text-cyan-soft"
        >
          {next ? next.label.toUpperCase() : "—"}
          <span className="transition-transform group-enabled:group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { PAGES } from "../pages/pagesMeta";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? "text-cyan-soft" : "text-ink/80 hover:text-cyan"}`;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-line/70 bg-void/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3 font-display text-sm tracking-widest text-ink">
          <span className="relative flex h-7 w-7 items-center justify-center border border-cyan text-[10px] text-cyan">
            BT
            <span className="absolute -inset-1 border border-cyan/30" />
          </span>
          BONTE&nbsp;TABALA&nbsp;MANGALA
        </NavLink>
        <ul className="hidden gap-8 text-sm font-medium tracking-wide md:flex">
          {PAGES.map((p) => (
            <li key={p.path}>
              <NavLink to={p.path} className={linkClass} end={p.path === "/"}>
                {p.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen((o) => !o)}
          className="border border-line px-3 py-1.5 font-mono text-xs text-ink md:hidden"
        >
          {open ? "×" : "≡"}
        </button>
      </div>
      {open && (
        <ul className="flex flex-col gap-4 border-t border-line px-6 py-5 md:hidden">
          {PAGES.map((p) => (
            <li key={p.path}>
              <NavLink to={p.path} onClick={() => setOpen(false)} className={linkClass} end={p.path === "/"}>
                {p.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </motion.nav>
  );
}

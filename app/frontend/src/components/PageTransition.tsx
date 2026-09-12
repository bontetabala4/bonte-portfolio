import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Transition "warp" façon vaisseau qui change de module : un balayage
 * (clip-path) découvre la page pendant qu'un éclair cyan traverse l'écran.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      transition={{ duration: 0.55, ease: [0.77, 0, 0.18, 1] }}
      className="relative"
    >
      <motion.div
        initial={{ scaleY: 1, opacity: 0.9 }}
        animate={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none absolute inset-x-0 top-0 z-40 h-full bg-gradient-to-b from-cyan/25 via-cyan/5 to-transparent"
      />
      {children}
    </motion.div>
  );
}

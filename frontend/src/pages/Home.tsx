import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import PageTransition from "../components/PageTransition";
import { usePortfolio } from "../context/PortfolioContext";

export default function Home() {
  const { profile } = usePortfolio();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Hero profile={profile} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.6 }}
        className="mx-auto max-w-6xl px-6 pb-20"
      >
        <button
          onClick={() => navigate("/competences")}
          className="flex items-center gap-2 font-mono text-xs text-cyan-soft/80 transition-colors hover:text-cyan-soft"
        >
          EXPLORER LES MODULES
          <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
            →
          </motion.span>
        </button>
      </motion.div>
    </PageTransition>
  );
}

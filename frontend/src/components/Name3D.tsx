import { motion } from "framer-motion";

/**
 * Le nom en relief façon "3D" : chaque lettre pivote et se matérialise
 * une par une, avec un empilement de text-shadow qui simule une extrusion
 * (comme un logo gravé) plutôt qu'un aplat plat.
 */
export default function Name3D({ text, startDelay = 0.3 }: { text: string; startDelay?: number }) {
  const letters = text.split("");

  return (
    <span
      className="inline-block"
      style={{ perspective: 800 }}
      aria-label={text}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, rotateX: -90, y: 14 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{
            delay: startDelay + i * 0.045,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: "inline-block",
            transformStyle: "preserve-3d",
            textShadow:
              "1px 1px 0 #0c2331, 2px 2px 0 #0c2331, 3px 3px 0 #0c2331, 4px 4px 0 #0c2331, 5px 5px 10px rgba(0,0,0,0.55), 0 0 26px rgba(79,227,214,0.45)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#060B12",
        panel: "#0A121D",
        line: "#12283A",
        cyan: {
          DEFAULT: "#4FE3D6",
          soft: "#8FF2E8",
        },
        amber: "#F2A93B",
        ink: "#CFE3EA",
      },
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Rajdhani'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// En développement local, on proxy toutes les requêtes /api/* vers le backend FastAPI.
// Ça élimine le CORS côté navigateur — le browser ne voit qu'une seule origine (5173).
// En prod, VITE_API_URL pointe directement vers le backend déployé et le proxy n'entre pas en jeu.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8001",
        changeOrigin: true,
      },
    },
  },
});

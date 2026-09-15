import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { PortfolioProvider } from "./context/PortfolioContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </HashRouter>
  </React.StrictMode>
);

// Fait disparaître l'écran de chargement (index.html) une fois React monté
// et le premier rendu peint à l'écran.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const loader = document.getElementById("boot-loader");
    if (!loader) return;
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 600);
  });
});

import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HUDBackground from "./components/HUDBackground";
import Nav from "./components/Nav";
import Pager from "./components/Pager";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Work from "./pages/Work";
import Path from "./pages/Path";
import Atlas from "./pages/Atlas";
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/competences" element={<Skills />} />
        <Route path="/travaux" element={<Work />} />
        <Route path="/parcours" element={<Path />} />
        <Route path="/atlas" element={<Atlas />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col font-body">
      <HUDBackground />
      <Nav />
      <main className="flex-1 overflow-hidden">
        <AnimatedRoutes />
      </main>
      <Pager />
    </div>
  );
}

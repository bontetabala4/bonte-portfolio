import Projects from "../components/Projects";
import PageTransition from "../components/PageTransition";
import { usePortfolio } from "../context/PortfolioContext";

export default function Work() {
  const { projects } = usePortfolio();
  return (
    <PageTransition>
      <div className="pt-16">
        <Projects projects={projects} />
      </div>
    </PageTransition>
  );
}

import StackGrid from "../components/StackGrid";
import PageTransition from "../components/PageTransition";
import { usePortfolio } from "../context/PortfolioContext";

export default function Skills() {
  const { stack } = usePortfolio();
  return (
    <PageTransition>
      <div className="pt-16">
        <StackGrid stack={stack} />
      </div>
    </PageTransition>
  );
}

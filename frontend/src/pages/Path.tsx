import Timeline from "../components/Timeline";
import Education from "../components/Education";
import PageTransition from "../components/PageTransition";
import { usePortfolio } from "../context/PortfolioContext";

export default function Path() {
  const { timeline, education } = usePortfolio();
  return (
    <PageTransition>
      <div className="pt-16">
        <Timeline timeline={timeline} />
        <div className="mx-auto max-w-6xl border-t border-line/60 px-6" />
        <Education education={education} />
      </div>
    </PageTransition>
  );
}

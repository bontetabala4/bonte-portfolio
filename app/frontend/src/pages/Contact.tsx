import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { usePortfolio } from "../context/PortfolioContext";

export default function Contact() {
  const { profile } = usePortfolio();
  return (
    <PageTransition>
      <div className="pt-16">
        <Footer profile={profile} />
      </div>
    </PageTransition>
  );
}

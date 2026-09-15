import AIConsole from "../components/AIConsole";
import PageTransition from "../components/PageTransition";

export default function Atlas() {
  return (
    <PageTransition>
      <div className="pt-16">
        <AIConsole />
      </div>
    </PageTransition>
  );
}

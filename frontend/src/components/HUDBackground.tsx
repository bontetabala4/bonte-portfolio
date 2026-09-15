export default function HUDBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 hud-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(79,227,214,0.10), transparent 40%), radial-gradient(circle at 85% 60%, rgba(242,169,59,0.07), transparent 45%)",
        }}
      />
    </div>
  );
}

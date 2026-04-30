import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    try {
      document.documentElement.dataset.manualScroll = String(Date.now());
    } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      try {
        delete (document.documentElement as any).dataset.manualScroll;
      } catch {}
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className={
        "pointer-events-auto fixed bottom-6 right-6 z-40 rounded-full px-3 py-3 text-sm transition-all " +
        (visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none")
      }
      style={{
        background:
          "linear-gradient(90deg, hsl(var(--neon-blue)/0.2), hsl(var(--neon-purple)/0.2))",
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.25), 0 0 12px hsl(var(--neon-blue)/0.35)",
        border: "1px solid hsla(var(--border), 0.6)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      ↑
    </button>
  );
}

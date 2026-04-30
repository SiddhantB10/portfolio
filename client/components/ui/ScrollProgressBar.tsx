import React, { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.height = "2px";
    el.style.width = "100%";
    el.style.transformOrigin = "0 0";
    el.style.transform = "scaleX(0)";
    el.style.zIndex = "60";
    el.style.background =
      "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)))";
    el.style.boxShadow = "0 0 10px hsl(var(--neon-blue)/0.35)";
    el.style.willChange = "transform";
    el.style.pointerEvents = "none";
    if (!reduce) el.style.transition = "transform 120ms ease-out";
    ref.current = el;
    document.body.appendChild(el);

    const update = () => {
      const scrolled = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(scrolled / h, 1) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (ref.current && ref.current.parentElement) {
        ref.current.parentElement.removeChild(ref.current);
      }
      ref.current = null;
    };
  }, []);

  return null;
}

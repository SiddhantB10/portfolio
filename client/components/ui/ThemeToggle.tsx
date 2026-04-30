import React, { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

function applyTheme(theme: "light" | "dark", withTransition = true) {
  try {
    const root = document.documentElement;
    if (withTransition) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 300);
    }
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  } catch {}
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Initialize theme: prefer stored, else default to dark
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      const initial: "light" | "dark" =
        stored === "light" || stored === "dark" ? stored : "dark";
      setTheme(initial);
      applyTheme(initial, false);
    } catch {
      setTheme("dark");
      applyTheme("dark", false);
    }
  }, []);

  const isDark = theme === "dark";

  const onToggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    applyTheme(next, true);
  };

  const gradientStyle = useMemo(
    () => ({
      background:
        "linear-gradient(90deg, hsl(var(--neon-blue)/0.25), hsl(var(--neon-purple)/0.25))",
      boxShadow:
        "0 0 10px hsl(var(--neon-blue)/0.25), 0 0 14px hsl(var(--neon-purple)/0.2)",
      border: "1px solid hsla(var(--border), 0.65)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }),
    [],
  );

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.99]"
      style={gradientStyle}
    >
      <span
        className="grid place-items-center h-6 w-6 rounded-full transition-transform"
        style={{
          background:
            "radial-gradient(20px 20px at 50% 50%, hsl(var(--neon-blue)/0.45), transparent)",
          boxShadow: "0 0 10px hsl(var(--neon-blue)/0.35)",
        }}
      >
        <Sun
          size={14}
          className="transition-opacity duration-200"
          style={{ opacity: isDark ? 0.35 : 1 }}
        />
      </span>
      <span
        className="grid place-items-center h-6 w-6 rounded-full transition-transform"
        style={{
          background:
            "radial-gradient(20px 20px at 50% 50%, hsl(var(--neon-purple)/0.45), transparent)",
          boxShadow: "0 0 10px hsl(var(--neon-purple)/0.35)",
        }}
      >
        <Moon
          size={14}
          className="transition-opacity duration-200"
          style={{ opacity: isDark ? 1 : 0.35 }}
        />
      </span>
      <span className="sr-only">Theme</span>
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--neon-blue)/0.12), hsl(var(--neon-purple)/0.12))",
        }}
      />
    </button>
  );
}

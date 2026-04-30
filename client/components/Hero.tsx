import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const lines = ["Hi, I am", "Siddhant", "Bajaj"];

export default function Hero() {
  const [texts, setTexts] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTexts(lines);
      return;
    }

    let mounted = true;

    (async function typeLines() {
      for (let idx = 0; idx < lines.length && mounted; idx++) {
        const line = lines[idx];
        for (let i = 0; i <= line.length && mounted; i++) {
          setTexts((prev) => {
            const copy = [...prev];
            copy[idx] = line.slice(0, i);
            return copy;
          });
          await new Promise((r) => setTimeout(r, idx === 0 ? 40 : 70));
        }
        await new Promise((r) => setTimeout(r, 180));
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const gradientBlue = useMemo(
    () => ({
      backgroundImage:
        "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--neon-blue)/0.6))",
      WebkitBackgroundClip: "text",
      color: "transparent",
    }),
    [],
  );

  const gradientPurple = useMemo(
    () => ({
      backgroundImage:
        "linear-gradient(90deg, hsl(var(--neon-purple)), hsl(var(--neon-purple)/0.6))",
      WebkitBackgroundClip: "text",
      color: "transparent",
    }),
    [],
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center text-center"
    >
      <div className="relative z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display"
        >
          <div className="leading-tight">
            <div className="block text-3xl sm:text-4xl md:text-5xl font-medium text-muted-foreground">
              {texts[0]}
            </div>
            <div
              style={gradientBlue}
              className="block mt-1 text-6xl sm:text-7xl md:text-8xl font-extrabold font-display"
            >
              {texts[1]}
            </div>
            <div
              style={gradientPurple}
              className="block mt-1 text-6xl sm:text-7xl md:text-8xl font-extrabold font-display"
            >
              {texts[2]}
            </div>
          </div>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base sm:text-lg text-muted-foreground"
        >
          Front‑end engineer crafting immersive, performant web experiences with
          React, TypeScript, and 3D interactions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group glass rounded-full px-5 py-2 text-sm sm:text-base text-foreground transition-all hover:scale-[1.02] active:scale-[0.99]"
            aria-label="View projects"
          >
            <span className="relative z-10">View Projects</span>
          </a>
          <a
            href="#contact"
            className="group rounded-full px-5 py-2 text-sm sm:text-base text-foreground transition-all hover:scale-[1.02] active:scale-[0.99]"
            aria-label="Contact"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--neon-blue)/0.2), hsl(var(--neon-purple)/0.2))",
              boxShadow:
                "0 0 16px hsl(var(--neon-blue)/0.3), 0 0 22px hsl(var(--neon-purple)/0.2)",
              borderRadius: 9999,
            }}
          >
            <span className="relative z-10">Contact</span>
          </a>
        </motion.div>
      </div>
      <div className="absolute inset-0 -z-10 interactive-bg" aria-hidden />
    </section>
  );
}

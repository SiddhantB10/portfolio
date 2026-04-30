import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 88 },
  { name: "Three.js / R3F", level: 80 },
  { name: "Framer Motion", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Node.js", level: 70 },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement | null>(null);
  // animate every time the section becomes visible
  const inView = useInView(containerRef, { once: false, amount: 0.25 });

  return (
    <section
      id="skills"
      ref={containerRef as any}
      className="relative scroll-mt-24 py-24"
    >
      <div className="container mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
          Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{s.name}</span>
                {/* percentage appears when the section is in view */}
                <span className="text-muted-foreground" aria-hidden>
                  {inView ? `${s.level}%` : ""}
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.level}%` } : { width: "0%" }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: i * 0.08,
                  }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)))",
                    boxShadow:
                      "0 0 15px hsl(var(--neon-blue)/0.5), 0 0 20px hsl(var(--neon-purple)/0.35)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

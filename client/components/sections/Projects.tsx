import { motion } from "framer-motion";

const projects = [
  {
    title: "My Portfolio Website",
    desc: "A personal portfolio website to showcase my projects, skills, and experience, built with modern web technologies",
    tags: ["React", "Tailwind", "Framer Motion"],
    link: "https://www.siddhantbajajcv.com/",
  },
  {
    title: "FertiSmart",
    desc: "AI tool that analyzes soil health to predict crops and fertilizer needs for maximum productivity.",
    tags: ["Next.js", "Data Mining", "TypeScript"],
    link: "https://fertismart.vercel.app/",
  },
  {
    title: "MarkIT",
    desc: "A full-stack lecture management system built with the MERN. It enables students and instructors to organize courses, track lectures, and collaborate in real-time with secure authentication and modern UI.",
    tags: ["Node.js", "Express.js", "MongoDB"],
    link: "https://markit-fsd.vercel.app/",
  },
  {
    title: "SecureLend",
    desc: "A secure lending platform built with modern web technologies.",
    tags: ["React", "Node.js", "Blockchain"],
    link: "https://secure-lend-vert.vercel.app/",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
          Projects
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={(p as any).link ?? "#"}
              target={(p as any).link ? "_blank" : undefined}
              rel={(p as any).link ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative block rounded-2xl p-6 glass will-change-transform cursor-pointer pointer-events-auto"
              whileHover={{ y: -6 }}
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(var(--neon-blue)/0.12), transparent 40%)",
                  opacity: 0,
                }}
              />
              <h3 className="text-lg font-semibold mb-2 group-hover:neon-text-blue transition-[text-shadow]">
                {p.title}
              </h3>
              <p className="text-muted-foreground mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary/60 px-3 py-1 text-xs"
                    style={{ boxShadow: "0 0 10px hsl(var(--neon-blue)/0.15)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

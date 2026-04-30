import { motion } from "framer-motion";

const achievements = [
  {
    title: "Interactive UI Engineering",
    desc: "Built engaging, accessible interfaces with motion and 3D while maintaining performance budgets.",
  },
  {
    title: "Design Systems",
    desc: "Designed and shipped themeable component libraries with strong DX and a11y.",
  },
  {
    title: "Web Performance",
    desc: "Optimized bundles and rendering, achieving fast LCP/CLS across complex views.",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-24 py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
          Achievements
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="glass rounded-2xl p-6 hover:shadow-[0_0_25px_hsl(var(--neon-purple)/0.25)] transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
              <p className="text-muted-foreground">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

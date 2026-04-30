import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 md:p-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src="/photo.jpeg"
              alt="Siddhant Bajaj"
              loading="lazy"
              decoding="async"
              className="h-28 w-28 rounded-full object-cover ring-2 ring-[hsl(var(--neon-blue))]/40"
              width={112}
              height={112}
            />
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I’m Siddhant Bajaj, a frontend engineer focused on creating
                delightful, interactive user interfaces. I blend design and
                engineering to deliver clean, performant experiences with a
                futuristic aesthetic.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

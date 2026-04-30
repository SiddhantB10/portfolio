import { motion } from "framer-motion";

const certificates = [
  {
    title: "AWS Academy Graduate - Cloud Foundations - Training Badge",
    org: "Amazon Web Services",
    year: "2025",
    link: "https://www.credly.com/badges/0274ea84-b978-4c9a-979b-5bfd02060757/public_url",
  },
  {
    title: "Networking Basics",
    org: "Cisco",
    year: "2024",
    link: "https://www.credly.com/badges/fa8246d8-eb7f-4972-b4a5-8bfa981fffc0/public_url",
  },
  {
    title: "Kerala Blockchain Academy",
    org: "KBA",
    year: "2026",
    link: "",
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative scroll-mt-24 py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
          Certificates
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((c, i) => {
            const Container = c.link ? motion.a : motion.div;
            const props: any = c.link
              ? {
                  href: c.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "glass rounded-2xl p-6 cursor-pointer pointer-events-auto",
                }
              : { className: "glass rounded-2xl p-6" };

            return (
              <Container
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                {...props}
              >
                <h3 className="text-lg font-semibold mb-1">
                  <span className="text-base">{c.title}</span>
                </h3>

                <div className="text-sm text-muted-foreground">
                  <div>{c.org}</div>
                  <div className="flex flex-row items-center gap-2">
                    <span aria-hidden>•</span>
                    <span>{c.year}</span>
                  </div>
                </div>
              </Container>
            );
          })}
        </div>
      </div>
    </section>
  );
}

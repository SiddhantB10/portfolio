import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 md:p-10"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Contact
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <a
                href="mailto:siddhantbajaj142@gmail.com"
                className="text-foreground hover:underline"
                aria-label="Email Siddhant"
              >
                <p className="m-0">siddhantbajaj142@gmail.com</p>
              </a>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <a
                href="tel:+919421730009"
                className="text-foreground hover:underline cursor-pointer pointer-events-auto"
                aria-label="Call Siddhant"
              >
                <p className="m-0">+91 9421730009</p>
              </a>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">GitHub</div>
              <a
                href="https://github.com/SiddhantB10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
                aria-label="Visit Siddhant's GitHub"
              >
                <div className="m-0 cursor-pointer pointer-events-auto">
                  Siddhant Bajaj
                </div>
              </a>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">LinkedIn</div>
              <a
                href="https://www.linkedin.com/in/siddhantbajaj22/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
                aria-label="Visit Siddhant's LinkedIn"
              >
                <div className="m-0 flex cursor-pointer pointer-events-auto">
                  Siddhant Bajaj
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

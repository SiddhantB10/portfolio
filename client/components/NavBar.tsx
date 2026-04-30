import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useActiveSection, SectionId } from "@/hooks/useActiveSection";
import ThemeToggle from "@/components/ui/ThemeToggle";

const sections: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  const { active, setActive } = useActiveSection(sections.map((s) => s.id));

  useEffect(() => {
    const onHashChange = () => {
      const id = (window.location.hash.replace("#", "") || "home") as SectionId;
      setActive(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [setActive]);

  const onNavClick = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      try {
        document.documentElement.dataset.manualScroll = String(Date.now());
      } catch {}

      const nav = document.querySelector("nav");
      const offset = (nav?.getBoundingClientRect().height || 72) + 12;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });

      try {
        history.replaceState(null, "", `#${id}`);
      } catch {}
      setActive(id);

      setTimeout(() => {
        try {
          delete document.documentElement.dataset.manualScroll;
        } catch {}
      }, 1400);
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <nav className="glass rounded-full px-4 py-2 md:px-6 md:py-3">
        <ul className="flex items-center gap-2 md:gap-4">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => onNavClick(e, s.id)}
                  className={cn(
                    "relative px-3 py-1.5 text-sm md:text-base rounded-full transition-colors",
                    isActive
                      ? "text-neon-blue neon-text-blue"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="font-medium">{s.label}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full transition-all",
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-70",
                    )}
                    style={{
                      background:
                        "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)))",
                      boxShadow:
                        "0 0 8px hsl(var(--neon-blue)/0.3), 0 0 12px hsl(var(--neon-purple)/0.2)",
                    }}
                  />
                </a>
              </li>
            );
          })}
          <li className="pl-1 md:pl-2">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
}

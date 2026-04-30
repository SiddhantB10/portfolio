import { useEffect, useRef, useState } from "react";

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "achievements"
  | "projects"
  | "certificates"
  | "contact";

export const useActiveSection = (ids: SectionId[]) => {
  const [active, setActive] = useState<SectionId>(ids[0]);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        try {
          const marker = (document.documentElement as any).dataset
            ?.manualScroll;
          const now = Date.now();
          if (marker && now - Number(marker) < 1200) {
            ticking.current = false;
            return;
          }

          const center = window.scrollY + window.innerHeight / 2;
          let current: SectionId = ids[0];
          for (const id of ids) {
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const bottom = top + rect.height;
            if (center >= top && center < bottom) {
              current = id as SectionId;
              break;
            }
          }
          setActive(current);
        } finally {
          ticking.current = false;
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids.join("|")]);

  return { active, setActive } as const;
};

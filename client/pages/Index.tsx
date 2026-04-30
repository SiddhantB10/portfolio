import React, { Suspense, lazy, useEffect } from "react";
const Background3D = lazy(() => import("@/components/three/Background3D"));
import NavBar from "@/components/NavBar";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import BackToTop from "@/components/ui/BackToTop";
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";

export default function Index() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("theme");
      if (!stored) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else if (stored === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {}

    const onMouseMove = (e: MouseEvent) => {
      try {
        const x = (e.clientX / window.innerWidth) * 100 + "%";
        const y = (e.clientY / window.innerHeight) * 100 + "%";
        document.documentElement.style.setProperty("--cursor-x", x);
        document.documentElement.style.setProperty("--cursor-y", y);
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <NavBar />
      {/* subtle scroll progress bar */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ScrollProgressBar />
      <BackToTop />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Projects />
        <Certificates />
        <Contact />
        <footer className="py-12 text-center text-sm text-muted-foreground">
          © 2025 Siddhant Bajaj
        </footer>
      </main>
    </div>
  );
}

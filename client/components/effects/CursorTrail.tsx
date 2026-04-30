import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const c = document.createElement("canvas");
    c.style.position = "fixed";
    c.style.inset = "0";
    c.style.pointerEvents = "none";
    c.style.zIndex = "0"; // sits above Background3D (-z-10) but below main (z-10)
    c.style.mixBlendMode = "screen";
    canvasRef.current = c;
    document.body.appendChild(c);

    const ctx = c.getContext("2d", { alpha: true })!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.floor(window.innerWidth * dpr);
      c.height = Math.floor(window.innerHeight * dpr);
      c.style.width = `${window.innerWidth}px`;
      c.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowColor = "rgba(255,255,255,0.25)";
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let pmx = mx;
    let pmy = my;
    let hueBase = 201; // neon blue base

    const isMobile = window.innerWidth < 768;
    const spawnPerMove = isMobile ? 4 : 8;
    const maxParticles = isMobile ? 120 : 240;

    const spawn = (x: number, y: number, speed: number) => {
      for (let i = 0; i < spawnPerMove; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = (Math.random() * 0.8 + 0.2) * speed;
        const size = (Math.random() * 2 + 1) * (isMobile ? 0.7 : 1);
        const life = Math.random() * 0.6 + 0.6;
        const hue = hueBase + (i / spawnPerMove) * 60; // sweep towards purple
        particles.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life,
          maxLife: life,
          size,
          hue,
        });
      }
      while (particles.length > maxParticles) particles.shift();
    };

    const onMove = (e: MouseEvent) => {
      pmx = mx;
      pmy = my;
      mx = e.clientX;
      my = e.clientY;
      const dx = mx - pmx;
      const dy = my - pmy;
      const speed = Math.min(Math.hypot(dx, dy) / 8, 6);
      hueBase = 201 + Math.min(speed * 8, 76); // blue to purple as it speeds
      spawn(mx, my, 0.8 + speed * 0.2);
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      onMove({
        clientX: t.clientX,
        clientY: t.clientY,
      } as unknown as MouseEvent);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;

      ctx.clearRect(0, 0, c.width / dpr, c.height / dpr);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        // ease towards cursor for a subtle magnetic effect
        const ax = (mx - p.x) * 0.0025;
        const ay = (my - p.y) * 0.0025;
        p.vx += ax;
        p.vy += ay;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        const t = 1 - p.life / p.maxLife;
        const alpha = 0.15 + (1 - t) * 0.35;
        const size = p.size * (1 + (1 - t) * 0.8);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.shadowBlur = 24;
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 8);
        grad.addColorStop(0, `hsla(${p.hue},100%,60%,${alpha})`);
        grad.addColorStop(0.6, `hsla(${p.hue},100%,50%,${alpha * 0.35})`);
        grad.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, size * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", resize);
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvasRef.current.parentElement.removeChild(canvasRef.current);
      }
      canvasRef.current = null;
    };
  }, []);

  return null;
}

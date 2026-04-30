import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingBlob() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const mx = typeof mouse.x === "number" ? mouse.x : 0;
    const my = typeof mouse.y === "number" ? mouse.y : 0;
    ref.current.rotation.x = Math.sin(t / 2) * 0.12 + my * 0.12;
    ref.current.rotation.y = Math.cos(t / 2) * 0.12 + mx * 0.12;
  });
  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <icosahedronGeometry args={[1.6, 24]} />
      <MeshDistortMaterial
        color={new THREE.Color("hsl(201,100%,50%)")}
        emissive={new THREE.Color("hsl(201,100%,30%)")}
        emissiveIntensity={0.35}
        roughness={0.3}
        metalness={0.45}
        transparent
        opacity={0.24}
        distort={0.35}
        speed={0.9}
      />
    </mesh>
  );
}

function Particles({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const mx = typeof mouse.x === "number" ? mouse.x : 0;
    const my = typeof mouse.y === "number" ? mouse.y : 0;
    ref.current.rotation.y = t * 0.02 + mx * 0.1;
    ref.current.rotation.x = t * 0.01 + my * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={new THREE.Color("hsl(277,100%,63%)")}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Background3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isReduced ? 200 : isMobile ? 300 : 800;
  const starsCount = isReduced ? 150 : isMobile ? 400 : 800;

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense fallback={null}>
          <Stars
            radius={50}
            depth={40}
            count={starsCount}
            factor={1.5}
            fade
            speed={isReduced ? 0.2 : 0.6}
          />
          <Particles count={particleCount} />
          {!isReduced && <FloatingBlob />}
        </Suspense>
      </Canvas>
    </div>
  );
}

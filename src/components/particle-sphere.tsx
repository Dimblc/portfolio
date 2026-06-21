"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  delay: number;
}

function generateSphereParticles(count: number, radius: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution for even spacing
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    // Vignette effect: denser at edges, fewer in center
    const edgeFactor = Math.abs(z) / radius;
    const centerOpacity = 1 - Math.pow(edgeFactor, 0.7);

    particles.push({
      x,
      y,
      z,
      size: 1.5 + Math.random() * 2.5,
      opacity: 0.2 + centerOpacity * 0.8,
      delay: Math.random() * 2,
    });
  }

  return particles;
}

export function ParticleSphere({
  count = 180,
  radius = 220,
  className = "",
}: {
  count?: number;
  radius?: number;
  className?: string;
}) {
  const particles = useMemo(() => generateSphereParticles(count, radius), [count, radius]);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: radius * 2.6, height: radius * 2.6 }}
    >
      {/* Glow halo behind sphere */}
      <div
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(52,252,255,0.15) 0%, rgba(4,40,203,0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Radial gradient wash */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,16,90,0.3) 0%, rgba(0,5,46,0.1) 40%, transparent 70%)",
        }}
      />

      {particles.map((particle, index) => {
        const scale = 1 - (particle.z / radius) * 0.4; // Perspective: closer = larger
        const left = `calc(50% + ${particle.x}px)`;
        const top = `calc(50% + ${particle.y}px)`;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              left,
              top,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.z > 0 ? "#34fcff" : "#0428cb",
              opacity: 0,
              transform: `translate(-50%, -50%) scale(${scale})`,
              boxShadow:
                particle.z > 0
                  ? "0 0 6px 1px rgba(52,252,255,0.4)"
                  : "0 0 4px 1px rgba(4,40,203,0.3)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: particle.opacity * (particle.z > 0 ? 1 : 0.5),
              scale: scale,
            }}
            transition={{
              duration: 1.5,
              delay: particle.delay,
              ease: [0.23, 0.86, 0.39, 0.96] as const,
            }}
          />
        );
      })}
    </div>
  );
}

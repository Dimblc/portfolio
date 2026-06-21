"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FlyingParticlesProps {
  count?: number;
  speed?: number;
  size?: number;
  depth?: number;
  spread?: number;
  color?: string;
  area?: "full" | "left" | "right";
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  baseSize: number;
}

export function FlyingParticles({
  count = 150,
  speed = 4,
  size = 2,
  depth = 2000,
  spread = 1200,
  color = "#ffffff",
  area = "full",
  className,
}: FlyingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0, centerX: 0, centerY: 0 });
  const animationRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const focalLength = 300;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      dimensionsRef.current = {
        width,
        height,
        centerX: width / 2,
        centerY: height / 2,
      };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resetParticle = (particle: Particle) => {
      const halfSpread = spread * 0.5;
      if (area === "right") {
        particle.x = Math.random() * halfSpread;
      } else if (area === "left") {
        particle.x = -Math.random() * halfSpread;
      } else {
        particle.x = (Math.random() - 0.5) * spread;
      }
      particle.y = (Math.random() - 0.5) * spread;
      particle.z = depth;
      particle.baseSize = Math.random() * size + 0.5;
    };

    const createParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => {
        const particle: Particle = {
          x: 0,
          y: 0,
          z: 0,
          baseSize: 0,
        };
        resetParticle(particle);
        particle.z = Math.random() * depth;
        return particle;
      });
    };

    const draw = () => {
      const { width, height, centerX, centerY } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = color;

      for (const particle of particlesRef.current) {
        particle.z -= speed;

        if (particle.z <= 1) {
          resetParticle(particle);
        }

        const scale = focalLength / particle.z;
        const screenX = centerX + particle.x * scale;
        const screenY = centerY + particle.y * scale;
        const particleSize = Math.max(0.5, particle.baseSize * scale);
        const opacity = Math.min(1, Math.max(0.2, 1 - particle.z / depth));

        if (
          screenX < -50 ||
          screenX > width + 50 ||
          screenY < -50 ||
          screenY > height + 50
        ) {
          continue;
        }

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mounted, count, speed, size, depth, spread, color, area]);

  if (!mounted) return null;

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

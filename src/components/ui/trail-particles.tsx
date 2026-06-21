"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TrailParticlesProps {
  count?: number;
  speed?: number;
  size?: number;
  trailLength?: number;
  color?: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  history: { x: number; y: number }[];
}

export function TrailParticles({
  count = 80,
  speed = 1,
  size = 2,
  trailLength = 20,
  color = "#ffffff",
  className,
}: TrailParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });
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

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      dimensionsRef.current = { width, height };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      const { width, height } = dimensionsRef.current;
      particlesRef.current = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * speed + speed * 0.3;
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * size + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          history: Array.from({ length: trailLength }, () => ({ x, y })),
        };
      });
    };

    const updateParticle = (particle: Particle, width: number, height: number) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      particle.history.push({ x: particle.x, y: particle.y });
      if (particle.history.length > trailLength) {
        particle.history.shift();
      }
    };

    const drawParticle = (particle: Particle) => {
      const { history } = particle;
      if (history.length < 2) return;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < history.length - 1; i++) {
        const alpha = ((i + 1) / history.length) * particle.opacity;
        const lineWidth = ((i + 1) / history.length) * particle.size;

        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(history[i].x, history[i].y);
        ctx.lineTo(history[i + 1].x, history[i + 1].y);
        ctx.stroke();
      }

      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const particle of particlesRef.current) {
        updateParticle(particle, width, height);
        drawParticle(particle);
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      createParticles();
    });
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [mounted, count, speed, size, trailLength, color]);

  if (!mounted) return null;

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden pointer-events-none", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

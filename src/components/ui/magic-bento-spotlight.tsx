"use client";

import { useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagicBentoSpotlightProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  glowColor?: string;
}

export function MagicBentoSpotlight({
  children,
  className,
  radius = 400,
  glowColor = "37, 99, 235",
}: MagicBentoSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = container.querySelectorAll(".magic-bento-card");
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        const distance = Math.hypot(mouseX - cardCenterX, mouseY - cardCenterY);
        const proximity = radius * 0.25;
        const fadeDistance = radius;

        let glowIntensity = 0;
        if (distance <= proximity) {
          glowIntensity = 1;
        } else if (distance <= fadeDistance) {
          const t = (fadeDistance - distance) / (fadeDistance - proximity);
          // Smoother falloff curve
          glowIntensity = t * t * (3 - 2 * t);
        }

        const relativeX = ((mouseX - cardRect.left) / cardRect.width) * 100;
        const relativeY = ((mouseY - cardRect.top) / cardRect.height) * 100;

        cardElement.style.setProperty("--glow-x", `${relativeX}%`);
        cardElement.style.setProperty("--glow-y", `${relativeY}%`);
        cardElement.style.setProperty("--glow-intensity", glowIntensity.toString());
        cardElement.style.setProperty("--glow-radius", `${radius}px`);
        cardElement.style.setProperty("--glow-color", glowColor);
      });
    };

    const handleMouseLeave = () => {
      const cards = container.querySelectorAll(".magic-bento-card");
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.style.setProperty("--glow-intensity", "0");
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [radius, glowColor]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {children}
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// --- PROPS INTERFACE ---
interface InteractiveProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  logoUrl: string;
  title: string;
  description: string;
  price: string;
}

// --- TILT CARD WRAPPER ---
interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxRotation?: number;
  scale?: number;
}

export function TiltCard({
  children,
  className,
  maxRotation = 8,
  scale = 1.02,
  ...props
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -maxRotation;
    const rotateY = ((x - width / 2) / (width / 2)) * maxRotation;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transformStyle: "preserve-3d" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}

// --- PRODUCT CARD ---
export function InteractiveProductCard({
  className,
  imageUrl,
  logoUrl,
  title,
  description,
  price,
  ...props
}: InteractiveProductCardProps) {
  return (
    <TiltCard
      className={cn(
        "relative w-full max-w-[340px] aspect-[9/12] rounded-3xl bg-card shadow-lg",
        className
      )}
      {...props}
    >
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-110"
        style={{ transform: "translateZ(-20px) scale(1.1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-3xl" />

      <div
        className="absolute inset-0 p-5 flex flex-col"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-xs text-white/70">{description}</p>
          </div>
          <img src={logoUrl} alt="Brand Logo" className="h-4 w-auto" />
        </div>

        <div className="absolute top-[108px] left-5">
          <div className="rounded-full bg-black/40 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            {price}
          </div>
        </div>

        <div className="mt-auto flex w-full justify-center gap-2 pb-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                index === 0 ? "bg-white" : "bg-white/30"
              )}
            />
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

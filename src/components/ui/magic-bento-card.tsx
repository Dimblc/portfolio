"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./magic-bento-card.css";

interface MagicBentoCardProps {
  children: ReactNode;
  className?: string;
}

export function MagicBentoCard({ children, className }: MagicBentoCardProps) {
  return (
    <div className={cn("magic-bento-card", className)}>
      {children}
    </div>
  );
}

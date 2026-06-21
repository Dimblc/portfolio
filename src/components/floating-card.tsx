"use client";

import { motion } from "framer-motion";

interface FloatingCardProps {
  label: string;
  title: string;
  description?: string;
  status?: "success" | "warning" | "neutral";
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  delay?: number;
  width?: string;
}

const statusColors = {
  success: "#34fcff",
  warning: "#f59e0b",
  neutral: "#6b6b83",
};

export function FloatingCard({
  label,
  title,
  description,
  status = "neutral",
  position,
  delay = 0,
  width = "240px",
}: FloatingCardProps) {
  return (
    <motion.div
      className="absolute hidden md:block"
      style={{
        ...position,
        width,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.8 + delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
    >
      <motion.div
        className="p-5 rounded-lg border border-[#2a2a35] bg-[#111118]/90 backdrop-blur-sm"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 6 + delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: statusColors[status],
              boxShadow: `0 0 8px ${statusColors[status]}`,
            }}
          />
          <span className="text-[11px] uppercase tracking-[0.08em] text-[#6b6b83] font-mono">
            {label}
          </span>
        </div>
        <h4 className="text-sm text-white font-medium leading-snug mb-1">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-[#6b6b83] leading-relaxed">
            {description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

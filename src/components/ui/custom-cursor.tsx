"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  size?: number;
  hoverSize?: number;
  color?: string;
  hoverColor?: string;
  className?: string;
}

export function CustomCursor({
  size = 12,
  hoverSize = 40,
  color = "#ffffff",
  hoverColor = "#34fcff",
  className,
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const addHoverListeners = () => {
      const clickables = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
      return clickables;
    };

    let clickables = addHoverListeners();

    const observer = new MutationObserver(() => {
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      clickables = addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  const scale = isHovering ? 1 : size / hoverSize;
  const backgroundColor = isHovering ? "transparent" : color;
  const borderColor = isHovering ? hoverColor : "transparent";
  const blendMode = isHovering ? "mix-blend-normal" : "mix-blend-difference";

  return (
    <div
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[10000]",
        !isVisible && "opacity-0",
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        className={cn(
          "rounded-full border-2 transition-all duration-300 ease-out",
          blendMode,
          className
        )}
        style={{
          width: hoverSize,
          height: hoverSize,
          backgroundColor,
          borderColor,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    </div>
  );
}

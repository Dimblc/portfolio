import { cn } from "@/lib/utils";
import React from "react";

interface FlowHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  className?: string;
}

export const FlowHoverButton: React.FC<FlowHoverButtonProps> = ({
  icon,
  children,
  href,
  className,
  ...props
}) => {
  const baseClasses = cn(
    `relative cursor-pointer z-0 inline-flex items-center justify-center gap-2 overflow-hidden rounded-md
    px-4 py-2 font-semibold transition-all duration-500
    before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-white before:transition-transform before:duration-1000 before:content-[""]
    hover:scale-105 hover:text-black hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95`,
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
};

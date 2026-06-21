"use client";

import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export function VerticalCutRevealDemo() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-8 p-10 md:p-16 lg:p-24 bg-[#050505] text-white">
      <div className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase text-center">
        <VerticalCutReveal
          splitBy="characters"
          staggerDuration={0.025}
          staggerFrom="first"
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 21,
          }}
        >
          HI, FRIEND!
        </VerticalCutReveal>
      </div>

      <div className="text-lg md:text-2xl font-light tracking-wide text-center text-[#34fcff]">
        <VerticalCutReveal
          splitBy="words"
          staggerDuration={0.1}
          staggerFrom="last"
          reverse={true}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 30,
          }}
        >
          super cool & awesome example text
        </VerticalCutReveal>
      </div>

      <div className="text md:text-xl font-light text-[#6b6b83] max-w-2xl text-center">
        <VerticalCutReveal
          splitBy="lines"
          staggerDuration={0.2}
          staggerFrom="first"
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 30,
            delay: 0.2,
          }}
          containerClassName="leading-relaxed"
        >
          {"We are on a mission\nto make the web\nsuper fun again!"}
        </VerticalCutReveal>
      </div>
    </div>
  );
}

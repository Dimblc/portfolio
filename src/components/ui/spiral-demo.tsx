"use client";

import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { motion } from "framer-motion";

export function SpiralDemo() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <SpiralAnimation />
      </div>

      <div className="absolute inset-0 bg-[#050505]/40 z-[1] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 text-center pt-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="mb-6"
        >
          <span className="inline-block text-[14px] uppercase tracking-[0.05em] text-[#34fcff] font-mono-data">
            QA Engineer · Simulators · Desktop · Hardware · VR
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-white leading-[1.1] mb-8"
        >
          Дмитрий Лобанов
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[#a0a0b0] leading-relaxed mb-10"
        >
          Тестирую связку ПО + железо + драйверы + Windows. Специализируюсь на real-time системах: автосимуляторы, VR, десктоп и аппаратно-программные комплексы.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="pointer-events-auto"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563eb] text-white text-sm font-medium hover:bg-[#1d4ed8] transition-colors"
          >
            Связаться
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-[2] pointer-events-none" />
    </section>
  );
}

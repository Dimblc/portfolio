"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedShaderBackground } from "@/components/ui/animated-shader-hero";
import { DotField } from "@/components/ui/dot-field";
import { Aurora } from "@/components/ui/aurora";
import { Waves } from "@/components/ui/waves";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { FlowHoverButton } from "@/components/ui/flow-hover-button";
import { TiltCard } from "@/components/ui/card-7";
import { MagicBentoCard } from "@/components/ui/magic-bento-card";
import { MagicBentoSpotlight } from "@/components/ui/magic-bento-spotlight";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { CustomCursor } from "@/components/ui/custom-cursor";
import {
  ContainerScroll,
  ContainerAnimated,
} from "@/components/ui/animated-video-on-scroll";
import {
  Mail,
  Phone,
  Send,
  Menu,
  X,
  Layers,
  Gamepad2,
  Monitor,
  ArrowRight,
  Cog,
  BarChart3,
  Car,
} from "lucide-react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
      setNavScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "Обо мне" },
    { href: "#skills", label: "Навыки" },
    { href: "#experience", label: "Опыт" },
    { href: "#projects", label: "Кейсы" },
    { href: "#contact", label: "Контакты" },
  ];

  const simulators = [
    { name: "Assetto Corsa", icon: <Monitor className="w-5 h-5" /> },
    { name: "BeamNG.drive", icon: <Layers className="w-5 h-5" /> },
    { name: "ETS 2", icon: <Monitor className="w-5 h-5" /> },
    { name: "DirectInput / XInput", icon: <Gamepad2 className="w-5 h-5" /> },
    { name: "VR-модули", icon: <Monitor className="w-5 h-5" /> },
  ];

  const skills = [
    {
      title: "Input Lag",
      desc: "Задержка ввода, отклик UI и синхронизация устройств.",
      metric: "<16 ms",
      label: "целевой отклик",
      icon: ArrowRight,
      x: 18,
      y: 22,
    },
    {
      title: "FPS & Performance",
      desc: "Регрессионные прогоны, профилирование и стабильность кадров.",
      metric: "60/120",
      label: "целевой FPS",
      icon: BarChart3,
      x: 82,
      y: 22,
    },
    {
      title: "Physics & Simulation",
      desc: "Коллизии, ragdoll, физика транспорта и симуляторов.",
      metric: "200+",
      label: "тест-кейсов",
      icon: Cog,
      x: 18,
      y: 78,
    },
    {
      title: "Hardware & OS",
      desc: "Валидация на конфигурациях, драйверах и ОС.",
      metric: "50+",
      label: "конфигураций",
      icon: Monitor,
      x: 82,
      y: 78,
    },
    {
      title: "Telemetry",
      desc: "Логи, сетевые запросы и телеметрия симуляторов.",
      metric: "1000+",
      label: "часов анализа",
      icon: Car,
      x: 50,
      y: 11,
    },
  ];

  const hubMetrics = [
    { value: "1000+", label: "часов тестирования" },
    { value: "200+", label: "сборок" },
    { value: "50+", label: "конфигураций" },
    { value: "3+", label: "года опыта" },
  ];

  const techStack = [
    "Jira",
    "TestRail",
    "Postman",
    "Chrome DevTools",
    "Git",
    "Windows 10/11",
    "Драйверы",
    "Службы",
    "Event Viewer",
    "Логи",
    "Сборка ПК",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SpotlightCursor config={{ radius: 180, brightness: 0.08, color: "#ffffff" }} />
      <CustomCursor size={12} hoverSize={40} color="#ffffff" />
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled ? "nav-blur py-4" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#" className="text-xl font-light tracking-tight text-white">
            DL
          </a>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.05em] text-[#6b6b83] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <FlowHoverButton
            href="#contact"
            className="hidden md:inline-flex bg-[#2563eb] text-white text-sm"
          >
            Связаться
          </FlowHoverButton>
          <button
            className="md:hidden text-white/80"
            onClick={() => setMobileOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 bg-[#050505]/98 z-50 flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-6 right-6 text-white/80"
            onClick={() => setMobileOpen(false)}
            aria-label="Закрыть меню"
          >
            <X className="w-8 h-8" />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-light text-white hover:text-[#34fcff] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* SpiralAnimation hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Animated shader background */}
        <div className="absolute inset-0 z-0">
          <AnimatedShaderBackground />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.85)_0%,rgba(5,5,5,0.45)_60%)] z-[1] pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 text-center pt-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="mb-6"
          >
            <span className="inline-block text-[14px] uppercase tracking-[0.05em] text-[#34fcff] font-mono-data">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 21,
                  delay: 0.5,
                }}
              >
                QA Engineer · Simulators · Desktop · Hardware · VR
              </VerticalCutReveal>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-white leading-[1.1] mb-8"
          >
            <VerticalCutReveal
              splitBy="characters"
              staggerDuration={0.03}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
                delay: 0.7,
              }}
            >
              Дмитрий Лобанов
            </VerticalCutReveal>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-[#a0a0b0] leading-relaxed mb-10"
          >
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.05}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
                delay: 0.9,
              }}
            >
              Тестирую связку ПО + железо + драйверы + Windows. Специализируюсь на real-time системах: автосимуляторы, VR, десктоп и аппаратно-программные комплексы.
            </VerticalCutReveal>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <FlowHoverButton
              href="#contact"
              icon={<ArrowRight className="w-4 h-4" />}
              className="bg-[#2563eb] text-white text-sm"
            >
              Связаться
            </FlowHoverButton>
            <FlowHoverButton
              href="#projects"
              className="border border-[#2a2a35] text-white text-sm"
            >
              Смотреть кейсы
            </FlowHoverButton>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-[2] pointer-events-none" />
      </section>

      <section id="about" className="relative py-24 px-4 md:px-6 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35 blur-[2px] pointer-events-none">
          <Waves
            lineColor="#2a3a5a"
            backgroundColor="transparent"
            waveSpeedX={0.01}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={0}
            xGap={12}
            yGap={36}
          />
        </div>
        <ContainerScroll className="relative z-10 max-w-[1200px] mx-auto !min-h-0">
          <ContainerAnimated>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-editorial text-white">
                QA инженер, специализирующийся на GameDev и симуляторах
              </h2>
            </div>
          </ContainerAnimated>
          <MagicBentoSpotlight className="w-full" radius={400}>
            <div className="grid md:grid-cols-2 gap-5">
              <ContainerAnimated className="h-full" transition={{ delay: 0.1 }}>
                <TiltCard className="h-full" maxRotation={6} scale={1.02}>
                  <MagicBentoCard className="h-full min-h-[300px] md:min-h-full rounded-lg overflow-hidden border border-[#2a2a35] hover:border-[#6b6b83] transition-colors">
                    <img
                      src="qa-workstation.jpg.png"
                      alt="QA workstation"
                      className="w-full h-full object-cover"
                    />
                  </MagicBentoCard>
                </TiltCard>
              </ContainerAnimated>
              <div className="grid md:grid-cols-2 gap-5">
                <ContainerAnimated className="md:col-span-2 h-full" transition={{ delay: 0.2 }}>
                  <TiltCard className="h-full" maxRotation={6} scale={1.02}>
                    <MagicBentoCard className="h-full p-6 md:p-8 rounded-lg bg-[#111118] border border-[#2a2a35] hover:border-[#6b6b83] transition-colors">
                      <span className="inline-block px-3 py-1 rounded text-xs bg-[#2563eb]/10 text-[#2563eb] font-mono-data uppercase tracking-wider mb-4">
                        Ключевая роль
                      </span>
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-4">Профиль</h3>
                      <p className="text-[#9DA3B3] text-base md:text-lg">
                        QA-инженер с опытом тестирования десктопных приложений, видеоигр и аппаратно-программных комплексов. Специализируюсь на проверке связки <strong className="text-white">ПО + железо + драйверы + Windows 10/11</strong>.
                      </p>
                      <div className="mt-6 pt-6 border-t border-[#2a2a35]">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-2xl md:text-3xl font-light text-white">200+</div>
                            <div className="text-sm text-[#9DA3B3]">Сборок протестировано</div>
                          </div>
                          <div>
                            <div className="text-2xl md:text-3xl font-light text-white">50+</div>
                            <div className="text-sm text-[#9DA3B3]">Конфигураций ПК</div>
                          </div>
                          <div>
                            <div className="text-2xl md:text-3xl font-light text-white">3+</div>
                            <div className="text-sm text-[#9DA3B3]">Года опыта</div>
                          </div>
                        </div>
                      </div>
                    </MagicBentoCard>
                  </TiltCard>
                </ContainerAnimated>
                <ContainerAnimated className="h-full" transition={{ delay: 0.3 }}>
                  <TiltCard className="h-full" maxRotation={6} scale={1.02}>
                    <MagicBentoCard className="h-full p-6 rounded-lg bg-[#111118] border border-[#2a2a35] hover:border-[#6b6b83] transition-colors flex flex-col">
                      <h3 className="text-xl font-light text-white mb-4">Специализация</h3>
                      <p className="text-[#9DA3B3]">
                        Понимаю специфику GameDev/Simulators в отличие от Web: фокусируюсь не на статичном UI и API, а на <strong className="text-white">real-time системах</strong> — физике движения, отклике устройств (input lag), стабильности FPS и поведении системы при длительной нагрузке.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-[#050505] text-[#9DA3B3] border border-[#2a2a35] uppercase tracking-wider">
                          <Cog className="w-3.5 h-3.5 text-[#34fcff]" /> Реальные системы
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-[#050505] text-[#9DA3B3] border border-[#2a2a35] uppercase tracking-wider">
                          <BarChart3 className="w-3.5 h-3.5 text-[#34fcff]" /> Производительность
                        </span>
                      </div>
                    </MagicBentoCard>
                  </TiltCard>
                </ContainerAnimated>
                <ContainerAnimated className="h-full" transition={{ delay: 0.4 }}>
                  <TiltCard className="h-full" maxRotation={6} scale={1.02}>
                    <MagicBentoCard className="h-full p-6 rounded-lg bg-[#111118] border border-[#2a2a35] hover:border-[#6b6b83] transition-colors flex flex-col">
                      <h3 className="text-xl font-light text-white mb-4">Интересы</h3>
                      <p className="text-[#9DA3B3]">
                        Глубоко увлекаюсь автосимуляторами, знаю принципы работы узлов ТС (трансмиссия, подвеска, тормозная система) и физику поведения автомобиля в заносе/при торможении.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-[#050505] text-[#9DA3B3] border border-[#2a2a35] uppercase tracking-wider">
                          <Car className="w-3.5 h-3.5 text-[#34fcff]" /> Автосимуляторы
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-[#050505] text-[#9DA3B3] border border-[#2a2a35] uppercase tracking-wider">
                          <Gamepad2 className="w-3.5 h-3.5 text-[#34fcff]" /> GameDev
                        </span>
                      </div>
                    </MagicBentoCard>
                  </TiltCard>
                </ContainerAnimated>
              </div>
            </div>
          </MagicBentoSpotlight>
        </ContainerScroll>
      </section>

      <section id="skills" className="relative py-24 px-4 md:px-6 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Aurora
            colorStops={["#34fcff", "#2563eb", "#7c3aed"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <ContainerScroll className="relative z-10 max-w-[1200px] mx-auto !min-h-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-editorial text-white">
              Ключевые навыки
            </h2>
          </div>

          <MagicBentoSpotlight className="hidden md:block w-full" radius={400}>
            <div className="relative w-full aspect-[16/9]">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1600 900" preserveAspectRatio="none">
                {skills.map((s, i) => (
                  <line
                    key={i}
                    x1="800"
                    y1="450"
                    x2={s.x * 16}
                    y2={s.y * 10}
                    stroke="#34fcff"
                    strokeOpacity="0.25"
                    strokeWidth="1.5"
                    strokeDasharray="6 5"
                  />
                ))}
              </svg>

              {/* Hub */}
              <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[28%] h-[26%]">
                <MagicBentoCard className="w-full h-full p-5 rounded-xl bg-[#111118] border border-[#2a2a35] flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,252,255,0.08)_0%,transparent_60%)]" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-lg bg-[#050505] border border-[#2a2a35] flex items-center justify-center text-[#34fcff] mx-auto mb-3">
                      <Gamepad2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-editorial text-white">GAMEDEV QA</h3>
                    <p className="text-xs text-[#9DA3B3] mt-1">Основная специализация</p>
                  </div>
                </MagicBentoCard>
              </div>

              {/* Satellites */}
              {skills.map((s, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-[23%] h-[22%]"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  <MagicBentoCard className="w-full h-full p-4 rounded-xl bg-[#111118] border border-[#2a2a35] flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#050505] border border-[#2a2a35] flex items-center justify-center text-[#34fcff]">
                        <s.icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-light text-white">{s.title}</h3>
                    </div>
                    <p className="text-xs text-[#9DA3B3] leading-relaxed">
                      {s.desc}
                    </p>
                    <div className="mt-auto">
                      <div className="text-2xl font-light text-[#34fcff]">{s.metric}</div>
                      <div className="text-[10px] text-[#9DA3B3] uppercase tracking-wider">{s.label}</div>
                    </div>
                  </MagicBentoCard>
                </div>
              ))}
            </div>
          </MagicBentoSpotlight>

          <ContainerAnimated className="md:hidden" transition={{ delay: 0.1 }}>
            <MagicBentoSpotlight className="w-full" radius={300}>
              <div className="space-y-4">
                <MagicBentoCard className="p-5 rounded-xl bg-[#111118] border border-[#2a2a35] text-center">
                  <div className="w-14 h-14 rounded-xl bg-[#050505] border border-[#2a2a35] flex items-center justify-center text-[#34fcff] mx-auto mb-3">
                    <Gamepad2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-editorial text-white">GAMEDEV QA</h3>
                  <p className="text-xs text-[#9DA3B3] mt-1">Основная специализация</p>
                </MagicBentoCard>

                <div className="grid grid-cols-1 gap-4">
                  {skills.map((s, i) => (
                    <MagicBentoCard key={i} className="p-4 rounded-xl bg-[#111118] border border-[#2a2a35] flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[#050505] border border-[#2a2a35] flex items-center justify-center text-[#34fcff]">
                          <s.icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-light text-white">{s.title}</h3>
                      </div>
                      <p className="text-xs text-[#9DA3B3] leading-relaxed">{s.desc}</p>
                      <div className="mt-3">
                        <div className="text-2xl font-light text-[#34fcff]">{s.metric}</div>
                        <div className="text-[10px] text-[#9DA3B3] uppercase tracking-wider">{s.label}</div>
                      </div>
                    </MagicBentoCard>
                  ))}
                </div>
              </div>
            </MagicBentoSpotlight>
          </ContainerAnimated>

          <ContainerAnimated className="mt-10" transition={{ delay: 0.2 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hubMetrics.map((m) => (
                <div key={m.label} className="p-5 rounded-xl bg-[#111118] border border-[#2a2a35] text-center">
                  <div className="text-4xl md:text-5xl font-light text-white">{m.value}</div>
                  <div className="text-xs text-[#9DA3B3] uppercase tracking-wider mt-2">{m.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-[#9DA3B3]">
              Jira · TestRail · Postman · Chrome DevTools · Git · Windows 10/11 · Драйверы · Службы · Event Viewer · Логи · Сборка ПК
            </p>
          </ContainerAnimated>
        </ContainerScroll>
      </section>

      <section id="experience" className="relative py-24 px-4 md:px-6 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none scale-y-[-1]">
          <Aurora
            colorStops={["#34fcff", "#2563eb", "#7c3aed"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-editorial text-white">
                Опыт работы
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <MagicBentoSpotlight className="w-full" radius={400}>
              <div className="space-y-5">
                {/* Main case card */}
                <MagicBentoCard className="p-6 md:p-8 rounded-xl bg-[#111118] border border-[#2a2a35]">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-editorial text-white">Independent QA Practice</h3>
                      <p className="text-[#9DA3B3] mt-1">GameDev / Simulators · Новосибирск</p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded text-xs bg-[#050505] text-[#34fcff] border border-[#2a2a35] font-mono-data uppercase tracking-wider">
                      2022 — н.в.
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["GameDev QA", "Simulators", "Hardware Validation"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded text-xs bg-[#050505] text-[#8185a0] border border-[#2a2a35] font-mono-data uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </MagicBentoCard>

                {/* Area + Results */}
                <div className="grid md:grid-cols-2 gap-5">
                  <MagicBentoCard className="p-6 rounded-xl bg-[#111118] border border-[#2a2a35]">
                    <h4 className="text-sm uppercase tracking-wider text-[#34fcff] font-mono-data mb-4">Область деятельности</h4>
                    <ul className="space-y-3">
                      {[
                        "Physics Testing",
                        "Input Lag Analysis",
                        "FPS Stability",
                        "Hardware Compatibility",
                        "Telemetry Analysis",
                      ].map((task) => (
                        <li key={task} className="flex items-center gap-3 text-sm text-[#9DA3B3]">
                          <span className="w-5 h-5 rounded-full bg-[#34fcff]/10 flex items-center justify-center text-[#34fcff] text-xs">✓</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </MagicBentoCard>

                  <MagicBentoCard className="p-6 rounded-xl bg-[#111118] border border-[#2a2a35]">
                    <h4 className="text-sm uppercase tracking-wider text-[#34fcff] font-mono-data mb-4">Результаты</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {hubMetrics.map((m) => (
                        <div key={m.label} className="text-center p-3 rounded-lg bg-[#050505] border border-[#2a2a35]">
                          <div className="text-2xl font-light text-white">{m.value}</div>
                          <div className="text-[10px] text-[#9DA3B3] uppercase tracking-wider leading-tight">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </MagicBentoCard>
                </div>

                {/* Projects + Tech */}
                <div className="grid md:grid-cols-2 gap-5">
                  <MagicBentoCard className="p-6 rounded-xl bg-[#111118] border border-[#2a2a35]">
                    <h4 className="text-sm uppercase tracking-wider text-[#34fcff] font-mono-data mb-4">Что тестирую</h4>
                    <div className="flex flex-wrap gap-3">
                      {simulators.map((sim) => (
                        <div
                          key={sim.name}
                          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#050505] border border-[#2a2a35]"
                        >
                          <span className="text-[#34fcff]">{sim.icon}</span>
                          <span className="font-light text-white text-sm">{sim.name}</span>
                        </div>
                      ))}
                    </div>
                  </MagicBentoCard>

                  <MagicBentoCard className="p-6 rounded-xl bg-[#111118] border border-[#2a2a35]">
                    <h4 className="text-sm uppercase tracking-wider text-[#34fcff] font-mono-data mb-4">Технологии</h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded text-xs bg-[#050505] text-[#8185a0] border border-[#2a2a35] font-mono-data uppercase tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </MagicBentoCard>
                </div>
              </div>
            </MagicBentoSpotlight>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="py-24 px-4 md:px-6 bg-[#0a0a0f]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-editorial text-white">
                Кейсы
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                type: "",
                title: "Physics Validation",
                problem: "Автомобиль терял сцепление при определённых настройках.",
                actions: [
                  "Анализ телеметрии",
                  "Проверка Force Feedback",
                  "Тестирование на разных покрытиях",
                ],
                results: [
                  "причина локализована",
                  "баг подтверждён",
                  "оформлен отчёт",
                ],
                tags: ["Force Feedback", "Input Lag", "Physics", "DirectInput"],
              },
              {
                type: "",
                title: "Force Feedback & Input Analysis",
                problem: "Игроки сообщали о задержках управления и некорректной работе Force Feedback на части оборудования.",
                actions: [
                  "Тестирование рулей и педалей разных производителей",
                  "Проверка DirectInput и XInput",
                  "Измерение input lag в игровых сценариях",
                  "Анализ отклика Force Feedback под нагрузкой",
                ],
                results: [
                  "локализованы причины задержек управления",
                  "выявлены конфликты драйверов устройств",
                  "подтверждены проблемы синхронизации ввода",
                  "подготовлены рекомендации по исправлению",
                ],
                tags: ["FORCE FEEDBACK", "DIRECTINPUT", "XINPUT", "INPUT LAG"],
              },
              {
                type: "",
                title: "Performance & Stability Testing",
                problem: "После обновлений возникали просадки FPS и нестабильность работы во время длительных игровых сессий.",
                actions: [
                  "Многочасовые регрессионные прогоны",
                  "Мониторинг производительности системы",
                  "Анализ логов и телеметрии",
                  "Проверка различных аппаратных конфигураций",
                ],
                results: [
                  "обнаружены критические деградации FPS",
                  "выявлены сценарии утечек памяти",
                  "найдены причины нестабильности сборок",
                  "улучшено качество релизов",
                ],
                tags: ["FPS", "PERFORMANCE", "REGRESSION", "LOG ANALYSIS"],
              },
            ].map((project, index) => (
              <Reveal key={project.title} delay={index * 0.1}>
                <TiltCard className="h-full" maxRotation={6} scale={1.02}>
                  <div className="h-full flex flex-col rounded-lg overflow-hidden bg-[#111118] border border-[#2a2a35] hover:border-[#6b6b83] transition-all duration-300">
                    <div className="p-5 border-b border-[#2a2a35]">
                      {project.type && (
                        <span className="text-[11px] uppercase tracking-[0.08em] text-[#34fcff] font-mono-data">
                          {project.type}
                        </span>
                      )}
                      <h3 className="text-lg font-light text-white mt-1">{project.title}</h3>
                    </div>
                    <div className="p-5 flex-1 flex flex-col gap-4">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#34fcff] font-mono-data mb-2">Проблема</h4>
                        <p className="text-[#9DA3B3] text-sm">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#34fcff] font-mono-data mb-2">Действия</h4>
                        <ul className="space-y-2 text-sm text-[#9DA3B3]">
                          {project.actions?.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-[#34fcff]">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#34fcff] font-mono-data mb-2">Результат</h4>
                        <ul className="space-y-2 text-sm text-[#9DA3B3]">
                          {project.results?.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-[#34fcff]">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded text-[11px] bg-[#050505] text-[#9DA3B3] border border-[#2a2a35] font-mono-data uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-4 md:px-6 bg-[#050505]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-editorial text-white">
                Контакты
              </h2>
            </div>
          </Reveal>
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="space-y-6">
                <h3 className="text-2xl font-light text-white">Давайте обсудим проект</h3>
                <p className="text-[#6b6b83]">
                  Если у вас есть задачи в сфере тестирования десктопных приложений, симуляторов, VR или аппаратно-программных комплексов — напишите мне.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+79133994187"
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#111118] border border-[#2a2a35] hover:border-[#6b6b83] transition-all"
                  >
                    <Phone className="w-5 h-5 text-[#34fcff]" />
                    <div>
                      <div className="text-xs text-[#6b6b83]">Телефон</div>
                      <div className="font-light text-white">+7 (913) 399-41-87</div>
                    </div>
                  </a>
                  <a
                    href="mailto:l0banov.dimbl@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#111118] border border-[#2a2a35] hover:border-[#6b6b83] transition-all"
                  >
                    <Mail className="w-5 h-5 text-[#34fcff]" />
                    <div>
                      <div className="text-xs text-[#6b6b83]">Email</div>
                      <div className="font-light text-white">l0banov.dimbl@gmail.com</div>
                    </div>
                  </a>
                  <a
                    href="https://t.me/dimblhc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#111118] border border-[#2a2a35] hover:border-[#6b6b83] transition-all"
                  >
                    <Send className="w-5 h-5 text-[#34fcff]" />
                    <div>
                      <div className="text-xs text-[#6b6b83]">Telegram</div>
                      <div className="font-light text-white">@dimblhc</div>
                    </div>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 md:px-6 border-t border-[#2a2a35] text-center text-[#6b6b83] text-sm bg-[#050505]">
        <p>© {new Date().getFullYear()} Дмитрий Лобанов. QA Engineer.</p>
      </footer>
    </div>
  );
}

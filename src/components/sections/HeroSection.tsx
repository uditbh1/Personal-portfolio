"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";
import HeroBackground from "@/components/shared/HeroBackground";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  "AI & RAG Pipeline Engineer",
  "Full Stack Developer",
  "MSc CS @ University of Bath",
  "React & Next.js Specialist"
];

const UDIT_LETTERS = ["U", "D", "I", "T"];

const HeroSection = () => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme as "light" | "dark");
    }
  }, [resolvedTheme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const isDark = currentTheme !== "light";
  const sectionBgColor = isDark ? "bg-black" : "bg-white";
  const textColor = isDark ? "text-white" : "text-neutral-900";
  const subTextColor = isDark ? "text-neutral-300" : "text-neutral-700";

  return (
    <section
      id="hero"
      className={`relative min-h-screen w-full max-w-full flex flex-col items-center justify-center text-center py-20 sm:py-24 scroll-mt-20 sm:scroll-mt-24 ${sectionBgColor} overflow-hidden`}
    >
      {/* 1. LAYER: 3D WebGL Retrieval Field (Embedding Space) */}
      <HeroBackground />

      {/* 2. LAYER: Subtle Atmosphere behind Typography (#00B3B3 in dark mode, soft neutral in light mode) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] dark:bg-[radial-gradient(ellipse_60%_45%_at_50%_48%,rgba(0,179,179,0.14)_0%,rgba(0,0,0,0)_75%)] bg-[radial-gradient(ellipse_60%_45%_at_50%_48%,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0)_75%)] opacity-100"
        aria-hidden="true"
      />

      {/* 3. LAYER: Top & Bottom Vignettes (Keep Navigation & EXPLORE clean) */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-[2] bg-gradient-to-b from-background via-background/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-[2] bg-gradient-to-t from-background via-background/60 to-transparent"
        aria-hidden="true"
      />

      {/* 4. LAYER: Foreground Hero Content (Z-Index 10 above 3D Canvas) */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-full flex flex-col items-center scroll-hero-scrub">
        {/* Status Row */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-100/90 border border-[#6F8090]/20 text-[#6F8090] dark:bg-transparent dark:border-transparent dark:liquid-glass-subtle dark:text-[#00B3B3] backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>Available for Opportunities</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-100/90 border border-neutral-200/90 text-neutral-600 dark:bg-transparent dark:border-transparent dark:liquid-glass-subtle dark:text-neutral-300 backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>London, United Kingdom</span>
          </div>
        </motion.div>

        {/* Enhanced Headline with Animated Kinetic "UDIT" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-headline font-extrabold uppercase tracking-tight mb-5 sm:mb-6 ${textColor} select-none leading-none`}
        >
          <span>HI, I&apos;M</span>{" "}
          <span className="relative inline-block group">
            {/* Soft Ambient Breathing Aura behind UDIT */}
            <motion.span
              animate={{
                scale: [0.92, 1.15, 0.92],
                opacity: isDark ? [0.45, 0.75, 0.45] : [0.25, 0.5, 0.25],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 sm:-inset-6 rounded-full blur-2xl -z-10 pointer-events-none"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse at center, rgba(0, 179, 179, 0.5) 0%, rgba(0, 179, 179, 0) 70%)"
                  : "radial-gradient(ellipse at center, rgba(111, 128, 144, 0.4) 0%, rgba(111, 128, 144, 0) 70%)",
              }}
              aria-hidden="true"
            />

            {/* Kinetic Letter Wave & Shimmer Gradient */}
            <span
              className={`inline-flex items-center gap-0.5 sm:gap-1 animate-gradient-flow bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-[#00B3B3] via-[#5eead4] to-[#00B3B3] drop-shadow-[0_0_24px_rgba(0,179,179,0.35)]"
                  : "bg-gradient-to-r from-[#475569] via-[#6F8090] to-[#334155] drop-shadow-[0_0_18px_rgba(111,128,144,0.25)]"
              }`}
            >
              {UDIT_LETTERS.map((letter, i) => (
                <motion.span
                  key={letter + i}
                  className="inline-block relative cursor-default"
                  animate={{
                    y: [0, -7, 0],
                    rotate: [0, i % 2 === 0 ? 1 : -1, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                  whileHover={{
                    y: -14,
                    scale: 1.14,
                    rotate: i % 2 === 0 ? 4 : -4,
                    transition: { type: "spring", stiffness: 450, damping: 12 },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>

            {/* Animated Dynamic Glowing Underline */}
            <span className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-[3.5px] sm:h-[4.5px] rounded-full overflow-hidden bg-neutral-200/80 dark:bg-white/10">
              {/* Stationary glow */}
              <span
                className="absolute inset-0 bg-[#6F8090] dark:bg-[#00B3B3] opacity-60 rounded-full"
                aria-hidden="true"
              />
              {/* Traveling light beam pulse */}
              <motion.span
                animate={{
                  x: ["-100%", "150%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.6,
                  ease: "easeInOut",
                  repeatDelay: 0.3,
                }}
                className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-white dark:via-[#7ef9e8] to-transparent shadow-[0_0_14px_rgba(255,255,255,0.8)]"
                aria-hidden="true"
              />
            </span>
          </span>
        </motion.h1>

        {/* Subline: Sparkle + Cycling Roles */}
        <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden mb-8 sm:mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`text-xl sm:text-2xl md:text-3xl font-headline font-medium ${subTextColor} flex items-center gap-2`}
            >
              <Sparkles className="w-5 h-5 text-[#6F8090] dark:text-[#00B3B3] inline-block shrink-0" />
              <span>{ROLES[roleIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bottom EXPLORE + Chevron */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 0.5, duration: 0.5 },
            y: { repeat: Infinity, duration: 2.0, ease: "easeInOut" },
          }}
          className="mt-4 sm:mt-6 inline-flex flex-col items-center text-xs tracking-widest uppercase text-muted-foreground hover:text-[#6F8090] dark:hover:text-[#00B3B3] transition-colors cursor-pointer group"
          aria-label="Scroll to explore projects"
        >
          <span className="text-[11px] font-mono mb-1.5 tracking-widest group-hover:text-[#6F8090] dark:group-hover:text-[#00B3B3] transition-colors">
            EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 text-[#6F8090] dark:text-[#00B3B3]" />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;


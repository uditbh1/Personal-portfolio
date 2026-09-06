"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Namaste",
  "Hola",
  "Ciao",
  "Konnichiwa",
  "Welcome",
  "Udit Bhatia"
];

export default function OpeningScreen() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const brandColor = isDark ? "#00B3B3" : "#6F8090";

  useEffect(() => {
    // Lock scroll during splash screen
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    // Word switching animation
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev < GREETINGS.length - 1) {
          return prev + 1;
        }
        clearInterval(wordInterval);
        return prev;
      });
    }, 180);

    return () => {
      clearInterval(progressInterval);
      clearInterval(wordInterval);
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence onExitComplete={() => {
      document.body.style.overflow = "unset";
    }}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 bg-[#050505] text-white select-none"
        >
          {/* Top developer badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-neutral-400"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: brandColor }} />
            <span>Developer Portfolio</span>
            <span className="text-neutral-600">/</span>
            <span className="font-mono" style={{ color: brandColor }}>2026</span>
          </motion.div>

          {/* Center Greeting Reveal */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="h-20 flex items-center justify-center overflow-hidden">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold font-headline tracking-tight text-center"
              >
                {index === GREETINGS.length - 1 ? (
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: isDark
                        ? "linear-gradient(to right, #00B3B3, #67e8f9, #3b82f6)"
                        : "linear-gradient(to right, #6F8090, #94a3b8, #cbd5e1)",
                    }}
                  >
                    {GREETINGS[index]}
                  </span>
                ) : (
                  <span className="text-white flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: brandColor }} />
                    {GREETINGS[index]}
                  </span>
                )}
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm text-neutral-400 font-mono tracking-wider mt-3"
            >
              Full Stack Developer & AI Engineer
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="w-full max-w-xs sm:max-w-md flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: brandColor }} />
                INITIALIZING
              </span>
              <span className="font-bold" style={{ color: brandColor }}>{progress}%</span>
            </div>
            
            {/* Progress track */}
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
              <motion.div
                className="h-full"
                style={{ 
                  width: `${progress}%`,
                  backgroundImage: isDark
                    ? "linear-gradient(to right, #00B3B3, #00cccc, #3b82f6)"
                    : "linear-gradient(to right, #6F8090, #8595a5, #94a3b8)",
                }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

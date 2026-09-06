"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Code2, GitCommit, GraduationCap, Award, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";

interface StatItem {
  id: string;
  number?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  label: string;
  subtext: string;
  icon: React.ElementType;
  darkColor: string;
  lightColor: string;
  badge?: string;
  link?: string;
}

const STATS: StatItem[] = [
  {
    id: "exp",
    number: 3,
    suffix: "+",
    label: "Years of Experience",
    subtext: "Full Stack & Modern Web",
    icon: Zap,
    darkColor: "#00B3B3",
    lightColor: "#6F8090",
  },
  {
    id: "projects",
    number: 20,
    suffix: "+",
    label: "Projects Completed",
    subtext: "Production & Academic Apps",
    icon: Code2,
    darkColor: "#3b82f6",
    lightColor: "#2563eb",
  },
  {
    id: "commits",
    number: 1000,
    suffix: "+",
    label: "Code Commits",
    subtext: "Active Open Source Contributor",
    icon: GitCommit,
    darkColor: "#a855f7",
    lightColor: "#9333ea",
  },
  {
    id: "scholarship",
    text: "GREAT",
    label: "Scholar 2024",
    subtext: "British Council & Univ of Bath",
    icon: GraduationCap,
    darkColor: "#f59e0b",
    lightColor: "#d97706",
  },
  {
    id: "azure",
    text: "AI-901",
    label: "Azure Certified",
    subtext: "Microsoft Certified AI-901",
    badge: "Verified Credential",
    icon: Award,
    darkColor: "#00B4D8",
    lightColor: "#0284c7",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/UditBhatia-0784/D2CDC4B11CE03AF7?sharingId=78262910EB2D7C35",
  },
];

// Silky-smooth monotonic rolling number hook with exponential deceleration
function useRollingNumber(value: number, durationMs = 1800, start = false) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start || value <= 0) return;
    let startTime: number | null = null;
    let mounted = true;
    let lastRendered = 0;

    const step = (ts: number) => {
      if (!mounted) return;
      if (!startTime) startTime = ts;

      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Smooth ease-out exponential deceleration: swift initial roll, gentle elegant landing
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(ease * value);

      // Strictly monotonic progression (never jitters or stutters backward)
      if (current !== lastRendered) {
        lastRendered = current;
        setDisplayValue(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const rafId = requestAnimationFrame(step);
    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
    };
  }, [value, durationMs, start]);

  return displayValue;
}

function StatCard({ stat, index, inView, isDark }: { stat: StatItem; index: number; inView: boolean; isDark: boolean }) {
  const Icon = stat.icon;
  const color = isDark ? stat.darkColor : stat.lightColor;
  const durSec = (4.5 + (index % 3) * 0.8).toFixed(1) + "s";
  const rolledValue = useRollingNumber(stat.number ?? 0, 1800, inView);

  const displayContent = stat.number !== undefined ? (
    <span>
      {stat.prefix ?? ""}
      {rolledValue.toLocaleString()}
      {stat.suffix ?? ""}
    </span>
  ) : (
    <span>{stat.text}</span>
  );

  const CardWrapper = stat.link ? "a" : "div";
  const linkProps = stat.link
    ? {
        href: stat.link,
        target: "_blank",
        rel: "noopener noreferrer",
        title: "Verify official Microsoft credential",
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
        delay: index * 0.08,
      }}
      whileHover={{ y: -6, scale: 1.025 }}
      className="relative rounded-[20px] overflow-visible group cursor-default select-none h-full transition-shadow duration-300"
    >
      {/* 1. Masked Scrolling Animated Gradient Border */}
      <div
        className="fg-mask-border absolute inset-0 rounded-[20px] pointer-events-none"
        style={{
          padding: "2px",
          backgroundImage: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.08), ${color})`,
          backgroundSize: "200% 200%",
          animation: `fg_scrolling ${durSec} linear infinite`,
        }}
      />

      {/* 2. Ambient Hover Outer Glow */}
      <div
        className="absolute -inset-1 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, ${color}45 0%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* 3. Card Glass Body */}
      <CardWrapper
        {...linkProps}
        className={`relative z-10 w-full h-full p-5 sm:p-6 rounded-[18px] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between
          ${
            isDark
              ? "bg-[#0b0e14]/85 text-white shadow-[0_12px_32px_-10px_rgba(0,0,0,0.8),_inset_0_1px_0_rgba(255,255,255,0.07)]"
              : "bg-white/90 text-neutral-900 shadow-[0_10px_28px_-5px_rgba(0,0,0,0.06),_inset_0_1px_0_rgba(255,255,255,0.95)]"
          }
          ${stat.link ? "cursor-pointer" : ""}
        `}
      >
        {/* Top Row: Number / Text + Icon Badge */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black font-headline tracking-tight transition-colors duration-200"
            style={{ color: stat.id === "scholarship" ? color : undefined }}
          >
            {displayContent}
          </div>

          <div
            className="p-2.5 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0 shadow-sm"
            style={{
              backgroundColor: `${color}15`,
              borderColor: `${color}35`,
              color,
            }}
          >
            <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
        </div>

        {/* Bottom Details */}
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight tracking-tight">
              {stat.label}
            </h3>
            {stat.link && (
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-1 leading-snug">
            {stat.subtext}
          </p>

          {stat.badge && (
            <div
              className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border transition-colors"
              style={{
                backgroundColor: `${color}14`,
                borderColor: `${color}35`,
                color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              <span>{stat.badge}</span>
            </div>
          )}
        </div>
      </CardWrapper>
    </motion.div>
  );
}

export default function StatsRibbon() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  return (
    <section
      ref={ref}
      className="py-14 bg-background border-y border-border/40 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 179, 179, 0.06) 0%, rgba(0, 0, 0, 0) 80%)"
            : "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(111, 128, 144, 0.05) 0%, rgba(0, 0, 0, 0) 80%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={i}
              inView={inView}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

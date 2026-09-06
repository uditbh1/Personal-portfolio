"use client";

import { useState, useRef } from "react";
import { experiences } from "@/data/portfolioData";
import type { Experience } from "@/data/portfolioData";
import { 
  MapPin, 
  CalendarDays, 
  CheckCircle2, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Building2,
  Terminal,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Key tech skills for each role to enhance scannability
const ROLE_SKILLS: Record<string, string[]> = {
  klaspad: [
    "React Router v7",
    "Remix SSR",
    "Vite",
    "MERN Stack",
    "MongoDB (35+ Models)",
    "OpenAI Embeddings",
    "JWT / RBAC"
  ],
  "lifelancer-2024": [
    "React.js",
    "Reusable Components",
    "UI/UX Prototyping",
    "UML Modeling",
    "Agile Sprints",
    "Git PR Reviews"
  ],
  newgen: [
    "JavaScript (ES6+)",
    "UI Optimization",
    "Bug Triage",
    "Code Modernization",
    "Technical Documentation",
    "Agile"
  ],
  "lifelancer-2022": [
    "React.js",
    "Component-Based UI",
    "Client Requirements",
    "UML System Flows",
    "Git Workflow",
    "Agile Development"
  ],
};

const ROLE_METADATA: Record<string, { isCurrent?: boolean; tenure?: string; roleType?: string }> = {
  klaspad: { isCurrent: true, tenure: "Present", roleType: "Full-Time" },
  "lifelancer-2024": { isCurrent: false, tenure: "1 Year", roleType: "Full-Time" },
  newgen: { isCurrent: false, tenure: "7 Mos", roleType: "Full-Time" },
  "lifelancer-2022": { isCurrent: false, tenure: "1 Year", roleType: "Contract / Remote" },
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Interactive scroll-linked draw beam for the timeline spine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 80%"],
  });

  const springScaleY = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 28,
    restDelta: 0.001,
  });

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-28 bg-background relative overflow-hidden w-full max-w-full scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-[#6F8090]/5 dark:bg-[#00B3B3]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest liquid-glass-subtle text-[#6F8090] dark:text-[#00B3B3] mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-headline uppercase tracking-tight text-foreground mb-4">
            Work Experience
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineering scalable SaaS platforms, leading frontend architecture, and building production AI workflows.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 liquid-glass-subtle">
              <Sparkles className="w-3 h-3 text-[#6F8090] dark:text-[#00B3B3]" />
              3+ Years Production Experience
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 liquid-glass-subtle">
              <Building2 className="w-3 h-3 text-[#6F8090] dark:text-[#00B3B3]" />
              4 Software Roles
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 liquid-glass-subtle">
              <Layers className="w-3 h-3 text-[#6F8090] dark:text-[#00B3B3]" />
              Enterprise Full-Stack & SSR
            </span>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Base Inactive Timeline Track */}
          <div className="absolute top-6 bottom-6 left-6 md:left-1/2 w-[2px] bg-neutral-200/70 dark:bg-white/10 md:-translate-x-1/2 rounded-full pointer-events-none" />

          {/* Interactive Scroll-Linked Energy Beam */}
          <motion.div
            style={{ scaleY: springScaleY, originY: 0 }}
            className="absolute top-6 bottom-6 left-6 md:left-1/2 w-[2px] md:-translate-x-1/2 rounded-full pointer-events-none
              bg-gradient-to-b from-[#6F8090] via-[#5c6e7e] to-[#6F8090] shadow-[0_0_12px_rgba(111,128,144,0.6)]
              dark:from-[#00B3B3] dark:via-[#38bdf8] dark:to-[#00B3B3] dark:shadow-[0_0_16px_rgba(0,179,179,0.8)]"
          />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp: Experience, index: number) => {
              const isEven = index % 2 === 0;
              const skills = ROLE_SKILLS[exp.id] || [];
              const meta = ROLE_METADATA[exp.id] || {};
              const isExpanded = !!expandedCards[exp.id];
              const displayPoints = isExpanded 
                ? exp.descriptionPoints 
                : exp.descriptionPoints.slice(0, 3);
              const hasMorePoints = exp.descriptionPoints.length > 3;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center w-full pl-14 md:pl-0 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Desktop Opposite Spacer */}
                  <div className="hidden md:block w-1/2" />

                  {/* Spine Milestone Node */}
                  <div className="absolute left-6 md:left-1/2 top-7 md:top-auto -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className={`relative rounded-full flex items-center justify-center transition-all duration-300
                        ${
                          meta.isCurrent
                            ? "w-7 h-7 bg-[#6F8090]/20 dark:bg-[#00B3B3]/20 border-2 border-[#6F8090] dark:border-[#00B3B3]"
                            : "w-5 h-5 bg-background border-2 border-[#6F8090]/60 dark:border-[#00B3B3]/60"
                        }
                      `}
                    >
                      {/* Active Center Dot */}
                      <div 
                        className={`rounded-full transition-all duration-300
                          ${
                            meta.isCurrent
                              ? "w-3 h-3 bg-[#6F8090] dark:bg-[#00B3B3] shadow-[0_0_12px_#6F8090] dark:shadow-[0_0_14px_#00B3B3]"
                              : "w-2 h-2 bg-[#6F8090] dark:bg-[#00B3B3]"
                          }
                        `} 
                      />

                      {/* Radar Ping on Current Position */}
                      {meta.isCurrent && (
                        <span className="absolute inset-0 rounded-full border border-[#6F8090] dark:border-[#00B3B3] animate-ping opacity-75" />
                      )}
                    </motion.div>
                  </div>

                  {/* Horizontal Branch Connector for Desktop */}
                  <div 
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[1.5px] pointer-events-none z-10
                      ${
                        isEven
                          ? "right-1/2 bg-gradient-to-l from-[#6F8090]/80 dark:from-[#00B3B3]/80 to-transparent"
                          : "left-1/2 bg-gradient-to-r from-[#6F8090]/80 dark:from-[#00B3B3]/80 to-transparent"
                      }
                    `}
                  />

                  {/* Experience Card */}
                  <div className="w-full md:w-1/2 md:px-8">
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      className="relative rounded-2xl liquid-glass p-6 sm:p-7 border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                    >
                      {/* Ambient corner glow */}
                      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#6F8090]/10 dark:from-[#00B3B3]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />

                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-xs font-mono font-bold text-[#6F8090] dark:text-[#00B3B3] uppercase tracking-wider">
                              {exp.company}
                            </span>
                            {meta.isCurrent && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Current Role
                              </span>
                            )}
                            {meta.tenure && !meta.isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-200/60 dark:bg-white/5 border border-border/40 text-muted-foreground">
                                {meta.tenure}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black font-headline text-foreground leading-tight group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                        </div>

                        {exp.icon && (
                          <div className="p-2.5 rounded-xl liquid-glass-subtle border border-border/40 text-primary shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/50">
                            <exp.icon className="h-5 w-5" />
                          </div>
                        )}
                      </div>

                      {/* Meta Information Badges */}
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground mb-4 font-mono">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/60 dark:bg-white/5 border border-border/30">
                          <CalendarDays className="h-3.5 w-3.5 text-[#6F8090] dark:text-[#00B3B3]" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/60 dark:bg-white/5 border border-border/30">
                          <MapPin className="h-3.5 w-3.5 text-[#6F8090] dark:text-[#00B3B3]" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Key Tech Arsenal Pills */}
                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-[11px] px-2.5 py-0.5 rounded-md font-mono bg-neutral-100/80 dark:bg-white/5 border border-border/40 text-foreground/80 hover:border-primary/40 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Impact Bullet Points */}
                      <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90">
                        {displayPoints.map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.04 }}
                            className="flex items-start gap-2.5 leading-relaxed"
                          >
                            <CheckCircle2 className="h-4 w-4 text-[#6F8090] dark:text-[#00B3B3] mt-0.5 shrink-0" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Expand / Collapse Toggle Button */}
                      {hasMorePoints && (
                        <div className="mt-4 pt-3 border-t border-border/30 flex justify-end">
                          <button
                            onClick={() => toggleExpand(exp.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#6F8090] dark:text-[#00B3B3] hover:underline cursor-pointer select-none transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                <span>Collapse highlights</span>
                                <ChevronUp className="w-3.5 h-3.5" />
                              </>
                            ) : (
                              <>
                                <span>+{exp.descriptionPoints.length - 3} more achievements</span>
                                <ChevronDown className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

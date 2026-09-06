"use client";

import { useState, useMemo } from "react";
import { skillsData } from "@/data/portfolioData";
import type { SkillCategory, Skill } from "@/data/portfolioData";
import { 
  Cpu, 
  Sparkles, 
  Code2, 
  Layers, 
  Server, 
  TestTube2, 
  Cloud,
  CheckCircle2,
  Terminal,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const CATEGORY_ICONS: Record<string, any> = {
  languages: Code2,
  frameworks: Layers,
  backend: Server,
  testing: TestTube2,
  deployment: Cloud,
};

const CATEGORY_TAGLINES: Record<string, string> = {
  languages: "Core programming languages & relational query syntax",
  frameworks: "Frontend libraries, reactive state managers & styling engines",
  backend: "Server runtimes, APIs, version control & developer tooling",
  testing: "Unit & integration test suites preventing production regressions",
  deployment: "Cloud hosting, containerization, CI/CD & orchestration",
};

const CATEGORY_FILTERS = [
  { id: "all", label: "All Arsenal", icon: Sparkles },
  { id: "languages", label: "Languages", icon: Code2 },
  { id: "frameworks", label: "Frameworks", icon: Layers },
  { id: "backend", label: "Backend & Tools", icon: Server },
  { id: "testing", label: "Testing", icon: TestTube2 },
  { id: "deployment", label: "Cloud & DevOps", icon: Cloud },
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const totalSkillsCount = useMemo(() => {
    return skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  const displayedCategories = useMemo(() => {
    if (activeCategory === "all") return skillsData;
    return skillsData.filter((cat) => cat.id === activeCategory);
  }, [activeCategory]);

  return (
    <section 
      id="skills" 
      className="py-28 bg-background relative overflow-hidden w-full max-w-full scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[#6F8090]/5 dark:bg-[#00B3B3]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest liquid-glass-subtle text-[#6F8090] dark:text-[#00B3B3] mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-headline uppercase tracking-tight text-foreground mb-4">
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Production proficiencies across frontend engineering, distributed backend systems, testing frameworks, and multi-cloud DevOps.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 liquid-glass-subtle">
              <Sparkles className="w-3 h-3 text-[#6F8090] dark:text-[#00B3B3]" />
              {totalSkillsCount}+ Technologies
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 liquid-glass-subtle">
              <Layers className="w-3 h-3 text-[#6F8090] dark:text-[#00B3B3]" />
              Full-Stack Architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 liquid-glass-subtle">
              <Cloud className="w-3 h-3 text-[#6F8090] dark:text-[#00B3B3]" />
              Azure & AWS Cloud Ready
            </span>
          </div>

          {/* Floating Glass Category Filter Dock */}
          <div className="mt-8 flex justify-center px-2">
            <div className="p-1.5 rounded-full backdrop-blur-2xl transition-all duration-300 flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar max-w-full shadow-lg border border-border/50 liquid-glass-subtle">
              {CATEGORY_FILTERS.map((filter) => {
                const isActive = activeCategory === filter.id;
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveCategory(filter.id)}
                    className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono transition-colors duration-200 flex items-center gap-2 select-none whitespace-nowrap shrink-0
                      ${
                        isActive
                          ? "text-white dark:text-black font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillCategory"
                        className="absolute inset-0 rounded-full shadow-md z-0
                          dark:bg-[#00B3B3] dark:shadow-[0_0_20px_rgba(0,179,179,0.5)]
                          bg-[#6F8090] text-white shadow-[0_0_14px_rgba(111,128,144,0.4)]"
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{filter.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Skills Bento Grid with Framer Motion AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`grid ${activeCategory === "all" ? "lg:grid-cols-2" : "max-w-3xl"} gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch`}
          >
            {displayedCategories.map((category: SkillCategory, catIndex: number) => {
              const CategoryIcon = CATEGORY_ICONS[category.id] || Cpu;
              const tagline = CATEGORY_TAGLINES[category.id] || "Specialized competencies";

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: catIndex * 0.08 }}
                  className="rounded-2xl liquid-glass p-6 sm:p-7 border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Category Title Header */}
                    <div className="flex items-start justify-between gap-3 mb-5 pb-3 border-b border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[#6F8090]/10 dark:bg-[#00B3B3]/10 text-[#6F8090] dark:text-[#00B3B3] transition-transform duration-300 group-hover:scale-110">
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold font-headline text-foreground tracking-tight group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-[11px] font-mono text-muted-foreground">
                            {tagline}
                          </p>
                        </div>
                      </div>

                      <Badge 
                        variant="secondary" 
                        className="text-[10px] font-mono px-2 py-0.5 liquid-glass-subtle shrink-0"
                      >
                        {category.skills.length} skills
                      </Badge>
                    </div>

                    {/* Skill Cards Grid */}
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {category.skills.map((skill: Skill) => (
                        <motion.div
                          key={skill.id}
                          whileHover={{ y: -3, scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          className="relative p-3 rounded-xl liquid-glass-subtle border border-border/40 hover:border-primary/50 hover:bg-card/90 transition-all duration-200 group/skill overflow-hidden cursor-default shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-2.5 mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="p-1.5 rounded-lg bg-neutral-100/90 dark:bg-white/5 border border-border/30 text-[#6F8090] dark:text-[#00B3B3] group-hover/skill:scale-110 group-hover/skill:text-primary transition-all shrink-0">
                                <skill.icon className="h-4 w-4" />
                              </div>
                              <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono font-bold text-muted-foreground group-hover/skill:text-foreground transition-colors shrink-0">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Animated Mastery Progress Track */}
                          <div className="w-full h-1.5 rounded-full bg-neutral-200/60 dark:bg-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{ duration: 0.9, delay: 0.05, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-[#6F8090] to-[#5c6e7e] dark:from-[#00B3B3] dark:to-[#38bdf8]"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;

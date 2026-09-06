"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects as allProjects } from "@/data/portfolioData";
import type { Project } from "@/data/portfolioData";
import { ExternalLink, Sparkles, Bot, Layers, Smartphone, Gamepad2, SlidersHorizontal, RotateCcw, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "@/components/shared/TiltCard";

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  {
    id: "all",
    label: "All Projects",
    icon: Sparkles,
    matcher: () => true,
  },
  {
    id: "ai-rag",
    label: "AI & RAG",
    icon: Bot,
    matcher: (p: Project) => p.tags.some((t) => ["AI", "RAG", "Chatbot", "Vector Search", "Object Detection"].includes(t)),
  },
  {
    id: "fullstack",
    label: "Full Stack",
    icon: Layers,
    matcher: (p: Project) => p.tags.some((t) => ["Full Stack", "Next.js", "TypeScript", "Backend", "Node.js"].includes(t)),
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    matcher: (p: Project) => p.tags.some((t) => ["Mobile", "React Native"].includes(t)),
  },
  {
    id: "games",
    label: "Games & Web",
    icon: Gamepad2,
    matcher: (p: Project) => p.tags.some((t) => ["Game", "JavaScript", "jQuery", "E-commerce"].includes(t)),
  },
];

const POPULAR_TECH = [
  "RAG",
  "Next.js",
  "TypeScript",
  "Node.js",
  "React Native",
  "JavaScript",
  "Vector Search",
  "REST API"
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Compute category project counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = allProjects.filter(cat.matcher).length;
    });
    return counts;
  }, []);

  // Filter projects by active category and tech tag
  const filteredProjects = useMemo(() => {
    let result = allProjects;

    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    if (cat && cat.id !== "all") {
      result = result.filter(cat.matcher);
    }

    if (activeTech) {
      result = result.filter(
        (p) => p.tags.includes(activeTech) || p.techStack.includes(activeTech)
      );
    }

    return result;
  }, [activeCategory, activeTech]);

  // Pagination calculation (6 projects per page)
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden w-full max-w-full scroll-mt-20 sm:scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#6F8090]/5 dark:bg-[#00B3B3]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest liquid-glass-subtle text-[#6F8090] dark:text-[#00B3B3] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Engineering Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-headline uppercase tracking-tight text-foreground mb-4">
            Projects Showcase
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Production full-stack platforms, AI agent architectures, and high-performance interactive web apps.
          </p>
        </div>

        {/* ENHANCED FILTER SYSTEM */}
        <div className="mb-12 max-w-full">
          {/* 1. Primary Categories Floating Pill Dock */}
          <div className="relative max-w-full mx-auto flex justify-center mb-4 px-2">
            <div
              onMouseLeave={() => setHoveredCategory(null)}
              className="relative p-1.5 sm:p-2 rounded-full backdrop-blur-2xl transition-all duration-300 flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar max-w-full shadow-lg border
                dark:bg-[#0d1017]/85 dark:border-white/10 dark:shadow-[0_12px_36px_-10px_rgba(0,0,0,0.8),_0_0_24px_-6px_rgba(0,179,179,0.18)]
                bg-white/90 border-[#6F8090]/25 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06),_0_0_20px_-6px_rgba(111,128,144,0.18)]"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const isHovered = hoveredCategory === cat.id;
                const Icon = cat.icon;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setActiveTech(null);
                      setCurrentPage(1);
                    }}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-2 select-none whitespace-nowrap shrink-0 group
                      ${
                        isActive
                          ? "text-white dark:text-black font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {/* Active Pill Spring Glow */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 rounded-full shadow-md z-0
                          dark:bg-[#00B3B3] dark:shadow-[0_0_22px_rgba(0,179,179,0.5)]
                          bg-[#6F8090] text-white shadow-[0_0_16px_rgba(111,128,144,0.4)]"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}

                    {/* Inactive Hover Preview Highlight */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="hoverFilterPill"
                        className="absolute inset-0 rounded-full bg-neutral-100/70 dark:bg-white/5 -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] sm:text-[11px] font-mono px-1.5 py-0.2 rounded-full transition-colors
                          ${
                            isActive
                              ? "bg-white/25 dark:bg-black/20 text-white dark:text-black font-bold"
                              : "bg-neutral-200/70 dark:bg-white/10 text-muted-foreground group-hover:text-foreground"
                          }
                        `}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Popular Tech Badges & Filter Status */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto px-4">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground/70 mr-1 flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3 h-3 text-[#6F8090] dark:text-[#00B3B3]" />
              Tech:
            </span>
            {POPULAR_TECH.map((tech) => {
              const isTechActive = activeTech === tech;
              return (
                <button
                  key={tech}
                  onClick={() => {
                    setActiveTech(isTechActive ? null : tech);
                    setCurrentPage(1);
                  }}
                  className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full border transition-all duration-200 select-none flex items-center gap-1
                    ${
                      isTechActive
                        ? "bg-[#6F8090] text-white border-[#6F8090] dark:bg-[#00B3B3] dark:text-black dark:border-[#00B3B3] font-semibold shadow-sm"
                        : "bg-neutral-100/60 dark:bg-white/5 border-neutral-200/60 dark:border-white/10 text-muted-foreground hover:text-foreground hover:border-[#6F8090]/40 dark:hover:border-[#00B3B3]/40"
                    }
                  `}
                >
                  <span>{tech}</span>
                  {isTechActive && <X className="w-3 h-3 ml-0.5" />}
                </button>
              );
            })}

            {/* Clear / Reset Action */}
            {(activeCategory !== "all" || activeTech !== null) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setActiveCategory("all");
                  setActiveTech(null);
                  setCurrentPage(1);
                }}
                className="text-[11px] sm:text-xs text-[#6F8090] dark:text-[#00B3B3] hover:underline flex items-center gap-1 ml-2 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </motion.button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeTech || "none"}-page-${validPage}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Empty State when 0 projects match */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16 px-4 rounded-3xl liquid-glass border border-border/50 max-w-md mx-auto">
                <SlidersHorizontal className="w-8 h-8 text-[#6F8090] dark:text-[#00B3B3] mx-auto mb-3 opacity-60" />
                <h4 className="text-lg font-bold font-headline text-foreground mb-1">No matching projects</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">Try clearing the active tech filter or choosing another category.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveTech(null);
                    setCurrentPage(1);
                  }}
                  className="rounded-full text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> View All Projects
                </Button>
              </div>
            )}

            {/* Projects Gallery Grid with 3D Tilt Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {paginatedProjects.map((project: Project) => (
                <TiltCard
                  key={project.id}
                  tiltFactor={9}
                  hoverScale={1.02}
                  borderRadius="1rem"
                  glareIntensity={0.06}
                  glareSize={40}
                  className="h-full"
                >
                  <div className="rounded-2xl liquid-glass p-5 sm:p-6 flex flex-col justify-between border border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
                    <div>
                      {project.imageUrl && (
                        <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden mb-5 liquid-glass-subtle border border-border/30">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            style={{ objectFit: "contain" }}
                            className="rounded-xl transition-transform duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <h3 className="text-xl sm:text-2xl font-bold font-headline text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-[11px] px-2 py-0.5 liquid-glass-subtle">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="relative z-30 flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-border/30 mt-auto pointer-events-auto">
                      {project.githubLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="rounded-full text-xs h-8 px-3 cursor-pointer hover:bg-neutral-200/80 dark:hover:bg-white/10 pointer-events-auto"
                        >
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            <FaGithub className="mr-1.5 h-3.5 w-3.5" /> Code
                          </a>
                        </Button>
                      )}
                      {project.liveDemoLink && project.liveDemoLink !== "#" && (
                        <Button
                          size="sm"
                          asChild
                          className="rounded-full text-xs h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer pointer-events-auto"
                        >
                          <a
                            href={project.liveDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* Floating Glass Pagination Dock */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-4 border-t border-border/40">
                {/* Result count indicator */}
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                  Showing <span className="font-semibold text-foreground">{startIndex + 1}</span>–
                  <span className="font-semibold text-foreground">
                    {Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)}
                  </span> of{" "}
                  <span className="font-semibold text-foreground">{filteredProjects.length}</span> projects
                </p>

                {/* Page Buttons Dock */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-full backdrop-blur-xl border
                  dark:bg-[#0d1017]/85 dark:border-white/10 dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]
                  bg-white/90 border-[#6F8090]/25 shadow-md">
                  
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(Math.max(1, validPage - 1))}
                    disabled={validPage === 1}
                    aria-label="Previous Page"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                      disabled:opacity-30 disabled:cursor-not-allowed
                      hover:bg-neutral-200/60 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isActive = page === validPage;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative w-8 h-8 rounded-full text-xs font-mono font-medium flex items-center justify-center transition-colors select-none
                          ${isActive ? "text-white dark:text-black font-bold" : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-white/5"}
                        `}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activePaginationPill"
                            className="absolute inset-0 rounded-full
                              bg-[#6F8090] text-white shadow-[0_0_12px_rgba(111,128,144,0.4)]
                              dark:bg-[#00B3B3] dark:shadow-[0_0_14px_rgba(0,179,179,0.5)]"
                            transition={{ type: "spring", stiffness: 450, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{page}</span>
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, validPage + 1))}
                    disabled={validPage === totalPages}
                    aria-label="Next Page"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                      disabled:opacity-30 disabled:cursor-not-allowed
                      hover:bg-neutral-200/60 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;

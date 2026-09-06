"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Terminal, 
  Award, 
  GraduationCap, 
  MapPin, 
  Zap, 
  Smartphone, 
  TestTube2, 
  Boxes, 
  Copy, 
  Check,
  CheckCircle2,
  Code2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ProfileCard from "./ProfileCard";

const PILLARS = [
  {
    id: "responsiveness",
    title: "Responsiveness",
    tagline: "Fluid, sub-second UX",
    desc: "Mobile-first layouts, optimized LCP/CLS metrics, and tactile micro-interactions across every device.",
    icon: Zap,
  },
  {
    id: "cross-platform",
    title: "Cross-Platform Focus",
    tagline: "Unified Multi-Platform",
    desc: "Architecting seamless cross-platform experiences spanning Next.js web, SSR, and React Native mobile.",
    icon: Smartphone,
  },
  {
    id: "tdd",
    title: "Test-Driven Development",
    tagline: "Zero-Regression Quality",
    desc: "Rigorous unit and integration test coverage ensuring dependable deployments and predictable refactors.",
    icon: TestTube2,
  },
  {
    id: "modular",
    title: "Component-Based Modularity",
    tagline: "Atomic Design Systems",
    desc: "Decoupled, reusable TypeScript components built with strict contracts and design system harmony.",
    icon: Boxes,
  },
];

const DEV_CONFIG = `// udit.config.ts
export const engineer = {
  name: "Udit Bhatia",
  role: "Full Stack & AI Engineer",
  education: {
    degree: "MSc Computer Science (2:1)",
    institution: "University of Bath",
    recognition: "GREAT Scholar 2024"
  },
  coreFocus: [
    "Enterprise Full-Stack Platforms",
    "RAG Pipelines & Vector Search",
    "Modular Component Architecture"
  ],
  status: "Available for Opportunities",
  location: "London, United Kingdom"
};`;

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<"pillars" | "terminal">("pillars");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyConfig = () => {
    navigator.clipboard.writeText(DEV_CONFIG);
    setCopied(true);
    toast({
      title: "Config Copied!",
      description: "udit.config.ts copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      className="py-28 bg-secondary/15 relative overflow-hidden w-full max-w-full border-t border-border/30 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-[#6F8090]/5 dark:bg-[#00B3B3]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center justify-center space-y-5"
          >
            <ProfileCard
              avatarUrl="/udit.png"
              enableTilt={true}
              className="shadow-2xl"
            />

            {/* Quick Status Bar Below Card */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/40 liquid-glass-subtle">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Roles
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/40 liquid-glass-subtle">
                <MapPin className="w-3 h-3 text-[#6F8090] dark:text-[#00B3B3]" />
                London, United Kingdom
              </span>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Interactive Bento Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest liquid-glass-subtle text-[#6F8090] dark:text-[#00B3B3] mb-3 w-fit">
              <Terminal className="w-3.5 h-3.5" />
              <span>Engineering Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-headline uppercase tracking-tight text-foreground mb-4">
              About Me
            </h2>

            {/* Narrative Story Card */}
            <div className="p-6 sm:p-7 rounded-2xl liquid-glass mb-6 border border-border/40 space-y-3.5">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                I am a results-driven <span className="font-semibold text-foreground">Full Stack & AI Pipeline Engineer</span> with a Master&apos;s degree in Computer Science from the <span className="font-semibold text-[#6F8090] dark:text-[#00B3B3]">University of Bath</span>. I specialize in engineering high-performance web applications, scalable enterprise SaaS modules, and production-ready Retrieval-Augmented Generation (RAG) architectures.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                My development workflow combines <span className="text-foreground font-medium">Test-Driven Development (TDD)</span> with <span className="text-foreground font-medium">component-based modular systems</span>, ensuring maintainable, battle-tested codebases that scale smoothly across teams.
              </p>

              {/* Pedigree Recognition Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-border/30">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#6F8090]/10 dark:bg-[#00B3B3]/10 text-[#6F8090] dark:text-[#00B3B3] border border-[#6F8090]/25 dark:border-[#00B3B3]/25 font-semibold">
                  <GraduationCap className="w-3.5 h-3.5" />
                  MSc Computer Science • Univ. of Bath
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  GREAT Scholar 2024
                </span>
              </div>
            </div>

            {/* Interactive View Switcher Dock */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="inline-flex p-1 rounded-full backdrop-blur-xl border border-border/50 liquid-glass-subtle">
                <button
                  onClick={() => setActiveTab("pillars")}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors select-none flex items-center gap-1.5
                    ${activeTab === "pillars" ? "text-white dark:text-black font-bold" : "text-muted-foreground hover:text-foreground"}
                  `}
                >
                  {activeTab === "pillars" && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute inset-0 rounded-full bg-[#6F8090] text-white shadow-[0_0_12px_rgba(111,128,144,0.4)] dark:bg-[#00B3B3] dark:shadow-[0_0_14px_rgba(0,179,179,0.5)]"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Core Pillars</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors select-none flex items-center gap-1.5
                    ${activeTab === "terminal" ? "text-white dark:text-black font-bold" : "text-muted-foreground hover:text-foreground"}
                  `}
                >
                  {activeTab === "terminal" && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute inset-0 rounded-full bg-[#6F8090] text-white shadow-[0_0_12px_rgba(111,128,144,0.4)] dark:bg-[#00B3B3] dark:shadow-[0_0_14px_rgba(0,179,179,0.5)]"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Code2 className="w-3 h-3" />
                    <span>Developer Config</span>
                  </span>
                </button>
              </div>

              {activeTab === "terminal" && (
                <button
                  onClick={copyConfig}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#6F8090] dark:text-[#00B3B3] hover:bg-[#6F8090]/10 dark:hover:bg-[#00B3B3]/10 border border-border/40 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy config"}</span>
                </button>
              )}
            </div>

            {/* Interactive Content Area with Framer Motion AnimatePresence */}
            <AnimatePresence mode="wait">
              {activeTab === "pillars" ? (
                <motion.div
                  key="pillars"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  {PILLARS.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <motion.div
                        key={pillar.id}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className="p-4 rounded-xl liquid-glass border border-border/40 hover:border-[#6F8090]/60 dark:hover:border-[#00B3B3]/60 hover:shadow-lg transition-all duration-300 group cursor-default"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="p-2 rounded-lg bg-[#6F8090]/10 dark:bg-[#00B3B3]/10 text-[#6F8090] dark:text-[#00B3B3] group-hover:scale-110 transition-transform">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold font-headline text-foreground leading-none">
                              {pillar.title}
                            </h4>
                            <span className="text-[10px] font-mono text-[#6F8090] dark:text-[#00B3B3] opacity-80">
                              {pillar.tagline}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                          {pillar.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl overflow-hidden border border-border/50 bg-neutral-950/90 shadow-2xl font-mono text-xs"
                >
                  {/* macOS Terminal Window Titlebar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] text-neutral-400">udit.config.ts — TypeScript</span>
                    <div className="w-8" />
                  </div>

                  {/* Terminal Code Body with Syntax Highlights */}
                  <div className="p-4 overflow-x-auto text-[11px] sm:text-xs leading-relaxed text-neutral-300">
                    <pre>
                      <code>
                        <span className="text-neutral-500">// udit.config.ts</span>{"\n"}
                        <span className="text-purple-400">export const</span> <span className="text-blue-400">engineer</span> = {"{"}{"\n"}
                        {"  "}<span className="text-neutral-400">name:</span> <span className="text-emerald-300">&quot;Udit Bhatia&quot;</span>,{"\n"}
                        {"  "}<span className="text-neutral-400">role:</span> <span className="text-emerald-300">&quot;Full Stack & AI Engineer&quot;</span>,{"\n"}
                        {"  "}<span className="text-neutral-400">education:</span> {"{"}{"\n"}
                        {"    "}<span className="text-neutral-400">degree:</span> <span className="text-emerald-300">&quot;MSc Computer Science (2:1)&quot;</span>,{"\n"}
                        {"    "}<span className="text-neutral-400">institution:</span> <span className="text-emerald-300">&quot;University of Bath&quot;</span>,{"\n"}
                        {"    "}<span className="text-neutral-400">recognition:</span> <span className="text-emerald-300">&quot;GREAT Scholar 2024&quot;</span>{"\n"}
                        {"  "}{"}"},{"\n"}
                        {"  "}<span className="text-neutral-400">coreFocus:</span> [ <span className="text-amber-300">&quot;Full-Stack&quot;</span>, <span className="text-amber-300">&quot;RAG Pipelines&quot;</span>, <span className="text-amber-300">&quot;Modular Systems&quot;</span> ],{"\n"}
                        {"  "}<span className="text-neutral-400">status:</span> <span className="text-cyan-300">&quot;Available for Opportunities&quot;</span>,{"\n"}
                        {"  "}<span className="text-neutral-400">location:</span> <span className="text-emerald-300">&quot;London, United Kingdom&quot;</span>{"\n"}
                        {"}"};
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block w-1.5 h-3.5 bg-primary ml-1 align-middle"
                        />
                      </code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

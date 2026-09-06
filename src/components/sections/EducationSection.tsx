"use client";

import { useState } from "react";
import Image from "next/image";
import { education, certifications } from "@/data/portfolioData";
import type { EducationItem, CertificationItem } from "@/data/portfolioData";
import { 
  GraduationCap, 
  CalendarDays, 
  Award, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2,
  Cpu,
  Layers
} from "lucide-react";
import { FaMicrosoft } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Key academic coursework and focus areas for degrees
const DEGREE_FOCUS: Record<string, string[]> = {
  bath: [
    "Full-Stack Architecture",
    "Functional Programming",
    "AI & Machine Learning Foundations",
    "Pervasive & Distributed Systems",
    "Software Engineering Principles"
  ],
  ipu: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (OOP)",
    "Operating Systems & Architecture",
    "Network Security & Protocols",
    "Full-Stack Web Engineering"
  ],
};

const EducationSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "academic" | "certifications">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Credential ID Copied!",
      description: `${text} copied to clipboard.`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const showAcademic = activeTab === "all" || activeTab === "academic";
  const showCertifications = activeTab === "all" || activeTab === "certifications";

  return (
    <section 
      id="education" 
      className="py-28 bg-secondary/15 relative overflow-hidden w-full max-w-full border-t border-border/30 scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#6F8090]/5 dark:bg-[#00B3B3]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest liquid-glass-subtle text-[#6F8090] dark:text-[#00B3B3] mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Professional Accreditations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-headline uppercase tracking-tight text-foreground mb-4">
            Education & Certifications
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced degrees in Computer Science, prestigious scholarship recognition, and industry-certified Microsoft AI credentials.
          </p>

          {/* Interactive Credential Category Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex p-1.5 rounded-full backdrop-blur-xl border border-border/50 liquid-glass-subtle shadow-md">
              <button
                onClick={() => setActiveTab("all")}
                className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono transition-colors select-none flex items-center gap-2
                  ${activeTab === "all" ? "text-white dark:text-black font-bold" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {activeTab === "all" && (
                  <motion.div
                    layoutId="activeEduTab"
                    className="absolute inset-0 rounded-full bg-[#6F8090] text-white shadow-[0_0_12px_rgba(111,128,144,0.4)] dark:bg-[#00B3B3] dark:shadow-[0_0_14px_rgba(0,179,179,0.5)]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>All Credentials</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab("academic")}
                className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono transition-colors select-none flex items-center gap-2
                  ${activeTab === "academic" ? "text-white dark:text-black font-bold" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {activeTab === "academic" && (
                  <motion.div
                    layoutId="activeEduTab"
                    className="absolute inset-0 rounded-full bg-[#6F8090] text-white shadow-[0_0_12px_rgba(111,128,144,0.4)] dark:bg-[#00B3B3] dark:shadow-[0_0_14px_rgba(0,179,179,0.5)]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Degrees (2)</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab("certifications")}
                className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono transition-colors select-none flex items-center gap-2
                  ${activeTab === "certifications" ? "text-white dark:text-black font-bold" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {activeTab === "certifications" && (
                  <motion.div
                    layoutId="activeEduTab"
                    className="absolute inset-0 rounded-full bg-[#6F8090] text-white shadow-[0_0_12px_rgba(111,128,144,0.4)] dark:bg-[#00B3B3] dark:shadow-[0_0_14px_rgba(0,179,179,0.5)]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Microsoft AI-901</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-16 max-w-6xl mx-auto"
          >
            {/* PART 1: Academic Degrees */}
            {showAcademic && (
              <div>
                {activeTab === "all" && (
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="w-4 h-4 text-[#6F8090] dark:text-[#00B3B3]" />
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground">
                      Academic Background
                    </h3>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                  {education.map((edu: EducationItem, index: number) => {
                    const focusList = DEGREE_FOCUS[edu.id] || [];
                    const isBath = edu.id === "bath";

                    return (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -6, scale: 1.015 }}
                        className="h-full"
                      >
                        <div className="relative rounded-2xl liquid-glass p-6 sm:p-8 flex flex-col justify-between h-full border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                          {/* Ambient subtle corner glow */}
                          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#6F8090]/10 dark:from-[#00B3B3]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />

                          <div>
                            {/* Card Header */}
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="min-w-0">
                                <span className="text-xs font-mono font-bold text-[#6F8090] dark:text-[#00B3B3] uppercase tracking-wider block mb-1">
                                  {edu.institution}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black font-headline text-foreground leading-tight group-hover:text-primary transition-colors">
                                  {edu.degree}
                                </h3>
                              </div>
                              {edu.icon && (
                                <div className="p-2.5 rounded-xl liquid-glass-subtle border border-border/40 text-primary shrink-0 transition-transform duration-300 group-hover:scale-110">
                                  <edu.icon className="h-6 w-6" />
                                </div>
                              )}
                            </div>

                            {/* Degree Metas */}
                            <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground mb-4 font-mono">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/60 dark:bg-white/5 border border-border/40 font-semibold text-foreground">
                                <Award className="h-3.5 w-3.5 text-[#6F8090] dark:text-[#00B3B3]" />
                                <span>{edu.grade}</span>
                              </div>
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/60 dark:bg-white/5 border border-border/40">
                                <CalendarDays className="h-3.5 w-3.5 text-[#6F8090] dark:text-[#00B3B3]" />
                                <span>{edu.period}</span>
                              </div>
                            </div>

                            {/* Degree Summary */}
                            {edu.description && (
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                                {edu.description}
                              </p>
                            )}

                            {/* Academic Modules / Highlights */}
                            {focusList.length > 0 && (
                              <div className="space-y-2 mb-6">
                                <span className="text-[11px] font-mono text-muted-foreground/80 uppercase tracking-wider block">
                                  Key Study Focus:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {focusList.map((item) => (
                                    <Badge
                                      key={item}
                                      variant="secondary"
                                      className="text-[11px] px-2.5 py-0.5 rounded-md font-mono bg-neutral-100/80 dark:bg-white/5 border border-border/30 text-foreground/80"
                                    >
                                      {item}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Prestigious GREAT Scholarship Highlight for Bath */}
                          {edu.scholarshipImageUrl && isBath && (
                            <div className="mt-4 p-4 rounded-xl liquid-glass-subtle border border-amber-500/30 dark:border-amber-400/30 bg-amber-500/5 flex items-center gap-3.5 relative overflow-hidden">
                              <div className="relative w-16 h-14 shrink-0 rounded overflow-hidden">
                                <Image
                                  src={edu.scholarshipImageUrl}
                                  alt="British Council GREAT Scholarship 2024 Badge"
                                  fill
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 font-headline">
                                  <Sparkles className="w-3.5 h-3.5" /> GREAT Scholarship 2024
                                </p>
                                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                                  Prestigious national merit scholarship awarded jointly by the British Council & University of Bath.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PART 2: Dedicated Professional Certification Showcase */}
            {showCertifications && (
              <div>
                {activeTab === "all" && (
                  <div className="flex items-center gap-2 mb-6">
                    <Award className="w-4 h-4 text-[#00B4D8]" />
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground">
                      Professional Certifications
                    </h3>
                  </div>
                )}

                <div className="space-y-6">
                  {certifications.map((cert: CertificationItem) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="relative rounded-3xl liquid-glass p-6 sm:p-8 lg:p-10 border border-[#00B4D8]/30 dark:border-[#00B4D8]/40 shadow-2xl overflow-hidden group"
                    >
                      {/* Ambient Azure Cyan Background Glow */}
                      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00B4D8]/15 via-transparent to-transparent rounded-bl-full pointer-events-none" />

                      <div className="grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 flex flex-col justify-between h-full">
                          <div>
                            {/* Top Badges */}
                            <div className="flex flex-wrap items-center gap-2.5 mb-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00B4D8]/15 border border-[#00B4D8]/40 text-[#00B4D8] dark:text-[#38bdf8]">
                                <VscAzure className="w-4 h-4" />
                                <span>{cert.code}</span>
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {cert.badge}
                              </span>
                              <span className="text-xs font-mono text-muted-foreground">
                                {cert.period}
                              </span>
                            </div>

                            {/* Certificate Title */}
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-headline text-foreground tracking-tight mb-2 group-hover:text-[#00B4D8] transition-colors">
                              {cert.name} ({cert.code})
                            </h3>
                            <p className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
                              <FaMicrosoft className="w-3.5 h-3.5 text-[#00B4D8]" />
                              <span>Issued by {cert.issuer} Corporation</span>
                            </p>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                              {cert.description}
                            </p>
                          </div>

                          {/* Verified Competencies */}
                          <div>
                            <span className="text-[11px] font-mono text-muted-foreground/80 uppercase tracking-wider block mb-2">
                              Verified Technical Domains:
                            </span>
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {cert.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="text-xs px-2.5 py-1 rounded-lg font-mono bg-neutral-100/80 dark:bg-white/5 border border-border/40 text-foreground/90"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-[#00B4D8] mr-1 inline" />
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            {/* Verification CTA & Credential Copy */}
                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/30">
                              <Button
                                size="sm"
                                asChild
                                className="rounded-full shadow-lg text-xs sm:text-sm bg-[#00B4D8] hover:bg-[#0096c7] text-white font-semibold cursor-pointer"
                              >
                                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                  <VscAzure className="mr-1.5 h-4 w-4" /> Verify on Microsoft Learn
                                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                                </a>
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopy(cert.id, cert.credentialId)}
                                className="rounded-full text-xs font-mono cursor-pointer hover:bg-neutral-200/80 dark:hover:bg-white/10"
                              >
                                {copiedId === cert.id ? (
                                  <>
                                    <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                                    <span>ID Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                                    <span>ID: {cert.credentialId}</span>
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Certificate Visual Badge Column */}
                        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl liquid-glass-subtle border border-[#00B4D8]/30 text-center relative overflow-hidden">
                          <div className="w-20 h-20 rounded-2xl bg-[#00B4D8]/10 border border-[#00B4D8]/30 flex items-center justify-center text-[#00B4D8] mb-4 shadow-inner">
                            <VscAzure className="w-12 h-12" />
                          </div>
                          <span className="text-xl font-black font-headline text-foreground mb-1">
                            {cert.code}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground mb-3">
                            Azure AI Fundamentals
                          </span>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Official Microsoft Certification
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EducationSection;

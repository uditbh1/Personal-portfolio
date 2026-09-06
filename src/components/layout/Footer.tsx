"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { contactDetails, cvPath, certifications } from "@/data/portfolioData";
import { 
  CodeXml, 
  Sparkles, 
  ArrowUpRight, 
  ArrowUp, 
  Mail, 
  Phone, 
  FileText, 
  Award, 
  MapPin,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";

const FOOTER_NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills Arsenal", href: "#skills" },
  { label: "Education & AI-901", href: "#education" },
];

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  const ai901Cert = certifications.find((c) => c.code === "AI-901") || certifications[0];
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden rounded-t-[32px] sm:rounded-t-[44px] border-t border-border/40 bg-card/90 dark:bg-[#090d13]/95 backdrop-blur-2xl shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] pt-14 pb-10 sm:pt-16 sm:pb-12 text-foreground">
      {/* ─── Framer Breathing Glow Orbs ─────────────────────────────────────── */}
      {/* Orb 1: Bottom-Left Breathing Glow */}
      <motion.div
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [1, 1.2, 1],
          x: [0, 240, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6.5,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="pointer-events-none absolute -bottom-20 -left-10 h-[240px] w-[500px] rounded-full blur-[38px] -z-10"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(50% 50% at 50% 50%, rgba(0, 179, 179, 0.35) 0%, rgba(0, 179, 179, 0) 100%)"
            : "radial-gradient(50% 50% at 50% 50%, rgba(111, 128, 144, 0.32) 0%, rgba(111, 128, 144, 0) 100%)",
        }}
      />

      {/* Orb 2: Top-Right Small Breathing Glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.55, 0.25],
          scale: [1, 1.25, 1],
          x: [0, -180, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 7.5,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.5,
        }}
        className="pointer-events-none absolute -top-14 right-10 h-[220px] w-[420px] rounded-full blur-[36px] -z-10"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(50% 50% at 50% 50%, rgba(56, 189, 248, 0.28) 0%, rgba(56, 189, 248, 0) 100%)"
            : "radial-gradient(50% 50% at 50% 50%, rgba(111, 128, 144, 0.22) 0%, rgba(111, 128, 144, 0) 100%)",
        }}
      />

      {/* Orb 3: Center-Bottom Ambient Breathing Glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.42, 0.2],
          scale: [1, 1.35, 1],
          x: [0, -150, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 9,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1,
        }}
        className="pointer-events-none absolute -bottom-24 left-1/3 h-[220px] w-[440px] rounded-full blur-[42px] -z-10"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(50% 50% at 50% 50%, rgba(0, 179, 179, 0.22) 0%, rgba(0, 179, 179, 0) 100%)"
            : "radial-gradient(50% 50% at 50% 50%, rgba(111, 128, 144, 0.22) 0%, rgba(111, 128, 144, 0) 100%)",
        }}
      />

      {/* ─── Footer Content Container ───────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Top Row: Brand & Structured Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              {/* Brand </> Coding Logo with Spring Hover Micro-Interaction */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: -6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="p-2.5 rounded-xl bg-[#6F8090]/10 dark:bg-[#00B3B3]/10 text-[#6F8090] dark:text-[#00B3B3] border border-border/40 shadow-sm cursor-pointer"
              >
                <CodeXml className="w-6 h-6" />
              </motion.div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black font-headline tracking-wider text-foreground uppercase">
                  UDIT BHATIA
                </h3>
                <p className="text-[11px] font-mono text-[#6F8090] dark:text-[#00B3B3] uppercase tracking-widest">
                  Software Engineer & AI Architect
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Crafting high-throughput full-stack architectures, generative AI pipelines, and polished digital experiences from London, UK. Built to breathe.
            </p>

            {/* Glowing CTA Button */}
            <div className="pt-1">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-block"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#6F8090] to-[#506070] dark:from-[#00B3B3] dark:to-[#008b8b] text-white shadow-[0_0_20px_rgba(111,128,144,0.3)] hover:shadow-[0_0_30px_rgba(111,128,144,0.5)] dark:shadow-[0_0_20px_rgba(0,179,179,0.3)] dark:hover:shadow-[0_0_30px_rgba(0,179,179,0.5)] transition-all cursor-pointer"
                >
                  <span>Let’s Talk</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Structured Link Columns (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Navigation */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#6F8090] dark:text-[#00B3B3] font-bold">
                Explore
              </p>
              <ul className="space-y-2">
                {FOOTER_NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#6F8090] dark:text-[#00B3B3]" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Connect & Verified Credentials */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#6F8090] dark:text-[#00B3B3] font-bold">
                Connect
              </p>
              <ul className="space-y-2">
                {contactDetails.socials.map((social) => (
                  <li key={social.name}>
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-[#6F8090] dark:hover:text-[#00B3B3] transition-colors inline-flex items-center gap-2 group"
                    >
                      <social.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-inherit transition-colors" />
                      <span>{social.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </motion.a>
                  </li>
                ))}

                {/* Microsoft AI-901 Official Verification */}
                {ai901Cert && (
                  <li>
                    <motion.a
                      href={ai901Cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-[#00B4D8] transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <Award className="w-3.5 h-3.5 text-[#00B4D8]" />
                      <span>Azure AI-901</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00B4D8]" />
                    </motion.a>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 3: Direct Contact */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <p className="text-xs font-mono uppercase tracking-widest text-[#6F8090] dark:text-[#00B3B3] font-bold">
                Direct
              </p>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href={`mailto:${contactDetails.email}`}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#6F8090] dark:text-[#00B3B3] shrink-0" />
                    <span>Email Me</span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#6F8090] dark:text-[#00B3B3] shrink-0" />
                    <span>{contactDetails.phone}</span>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href={cvPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#6F8090] dark:text-[#00B3B3] shrink-0" />
                    <span>Download CV</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </motion.a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Glowing Shimmer Divider ──────────────────────────────────────── */}
        <div className="relative my-8 sm:my-10 h-px w-full bg-border/40 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#6F8090]/50 dark:via-[#00B3B3]/60 to-transparent"
          />
        </div>

        {/* ─── Bottom Row ───────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          {/* Copyright */}
          <div className="flex items-center gap-1.5 font-mono tracking-wide">
            <span>&copy; {currentYear}</span>
            <span className="font-bold text-foreground">UDIT BHATIA</span>
            <span>• All rights reserved.</span>
          </div>

          {/* Built With Notice */}
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#6F8090] dark:text-[#00B3B3]" />
            <span>Built with Next.js, Framer Motion & Tailwind</span>
          </div>

          {/* Back to Top Action */}
          <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg liquid-glass-subtle border border-border/40 hover:border-[#6F8090] dark:hover:border-[#00B3B3] text-foreground hover:text-primary transition-all text-xs font-mono cursor-pointer shadow-sm"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#6F8090] dark:text-[#00B3B3]" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

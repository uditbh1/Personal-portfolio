"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, CodeXml } from "lucide-react";
import { navItems } from "@/data/portfolioData";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const transitionSpring = { bounce: 0.1, duration: 0.5, type: "spring" as const };
const transitionTween = { duration: 6, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatType: "mirror" as const };

const AppHeader = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      navItems.forEach((item) => {
        const sectionId = item.href.substring(1);
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = sectionId;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    if (elem) {
      setTimeout(() => {
        const navOffset = window.innerWidth < 640 ? 74 : 90;
        const elementPosition = elem.getBoundingClientRect().top;
        const targetScrollY = Math.max(0, elementPosition + window.scrollY - navOffset);

        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
      }, 50);
    }
  };

  return (
    <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4">
      <motion.nav
        ref={navRef}
        layout
        transition={transitionSpring}
        className={`pointer-events-auto relative w-full max-w-[680px] overflow-hidden backdrop-blur-2xl transition-colors duration-300
          ${
            mobileMenuOpen
              ? "rounded-[28px] sm:rounded-[32px]"
              : "rounded-full"
          }
          ${
            isDark
              ? "bg-[#0d0f16]/75 border border-white/10 shadow-[0px_20px_50px_-10px_rgba(0,0,0,0.65),_inset_0px_1px_0px_0px_rgba(255,255,255,0.08),_0px_0px_40px_-6px_rgba(0,179,179,0.22)]"
              : "bg-white/80 border border-[#6F8090]/25 shadow-[0px_15px_35px_-5px_rgba(0,0,0,0.06),_inset_0px_1px_0px_0px_rgba(255,255,255,0.9),_0px_0px_30px_-4px_rgba(111,128,144,0.18)]"
          }
        `}
      >
        {/* 1. SIGNATURE BREATHING GLOW (Mirrors and scales horizontally behind the pill) */}
        <motion.div
          animate={{
            x: [0, 220, 0],
            scale: [1, 1.18, 1],
            opacity: isDark ? [0.65, 0.9, 0.65] : [0.45, 0.75, 0.45],
          }}
          transition={transitionTween}
          className="pointer-events-none absolute -top-12 left-4 h-36 w-80 rounded-full blur-[32px] -z-10"
          style={{
            background: isDark
              ? "radial-gradient(50% 50% at 50% 50%, rgba(0, 179, 179, 0.45) 0%, rgba(0, 179, 179, 0) 100%)"
              : "radial-gradient(50% 50% at 50% 50%, rgba(111, 128, 144, 0.38) 0%, rgba(111, 128, 144, 0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* 2. MAIN NAV BAR ROW */}
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-5 relative z-10">
          {/* Brand Logo with </> Coding Logo */}
          <Link
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2 text-decoration-none group select-none shrink-0"
            aria-label="Udit's Portfolio Home"
          >
            <motion.span
              whileHover={{ scale: 1.15, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center justify-center text-[#6F8090] dark:text-[#00B3B3] transition-colors"
            >
              <CodeXml className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.span>
            <span className="font-headline font-bold text-base sm:text-lg text-foreground group-hover:text-[#6F8090] dark:group-hover:text-[#00B3B3] transition-colors">
              Udit
            </span>
          </Link>

          {/* Desktop NavLink Pills */}
          <nav className="hidden md:flex items-center gap-1" onMouseLeave={() => setHoveredNav(null)}>
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              const isHovered = hoveredNav === item.href;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  onMouseEnter={() => setHoveredNav(item.href)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 select-none
                    ${
                      isActive
                        ? "text-[#6F8090] dark:text-[#00B3B3] font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {/* Floating active pill highlight */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full -z-10 bg-neutral-200/60 dark:bg-white/10 shadow-sm border border-neutral-300/40 dark:border-white/10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}

                  {/* Hover glow pill highlight */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="hoverNavPill"
                      className="absolute inset-0 rounded-full -z-10 bg-neutral-100/50 dark:bg-white/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Actions: ThemeToggle + Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="scale-90 sm:scale-95 origin-center">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-full bg-neutral-100/80 dark:bg-white/10 text-foreground border border-neutral-200/60 dark:border-white/10 hover:bg-neutral-200/80 dark:hover:bg-white/15 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* 3. MOBILE DRAWER ACCORDION (When Menu Open is active) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transitionSpring}
              className="overflow-hidden border-t border-neutral-200/40 dark:border-white/10"
            >
              <div className="flex flex-col gap-2 p-5 pt-3">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2 }}
                      className={`text-lg sm:text-xl font-headline font-bold uppercase tracking-wider py-2 px-2.5 rounded-xl transition-all select-none cursor-pointer block active:scale-[0.98]
                        ${
                          isActive
                            ? "text-[#6F8090] dark:text-[#00B3B3] bg-neutral-100/70 dark:bg-white/5"
                            : "text-neutral-600 hover:text-foreground dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-white/5"
                        }
                      `}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default AppHeader;


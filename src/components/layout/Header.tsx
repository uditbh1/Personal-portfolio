
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, CodeXml } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { navItems } from '@/data/portfolioData'; // cvPath is no longer needed here
import { ThemeToggle } from '@/components/ThemeToggle';

const AppHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      let currentSection = '';
      navItems.forEach(item => {
        const sectionId = item.href.substring(1);
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NavLinks = ({isMobile = false}: {isMobile?: boolean}) => (
    <>
      {navItems.map((item) => {
        const commonLinkProps = {
          href: item.href,
          className: `px-3 py-2 rounded-md font-medium transition-colors
            ${activeSection === item.href.substring(1) ? 'text-accent' : 'text-foreground hover:text-primary'}
            ${isMobile ? 'block text-lg my-2' : 'text-sm'}
          `,
          'aria-current': activeSection === item.href.substring(1) ? 'page' : undefined,
        };

        if (isMobile) {
          return (
            <SheetClose asChild key={item.label}>
              <a {...commonLinkProps}>{item.label}</a>
            </SheetClose>
          );
        }
        return (
          <a key={item.label} {...commonLinkProps}>{item.label}</a>
        );
      })}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? 'bg-background/80 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="#hero" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-accent transition-colors">
            <CodeXml size={28} />
            <span className="font-headline">Udit</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <NavLinks />
            <div className="ml-2"> {/* Adjusted margin slightly for spacing if needed */}
              <ThemeToggle />
            </div>
          </nav>

          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2" suppressHydrationWarning>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-6 bg-background">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-left text-2xl font-headline text-primary">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col items-start space-y-4">
                  <NavLinks isMobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

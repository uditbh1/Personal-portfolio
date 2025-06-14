
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, CodeXml } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { navItems, cvPath } from '@/data/portfolioData';
import { usePathname } from 'next/navigation'; // Not strictly needed for # links, but good practice

const AppHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

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
        const NavLinkComponent = isMobile ? SheetClose : 'a';
        return (
          <NavLinkComponent
            key={item.label}
            href={item.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${activeSection === item.href.substring(1) ? 'text-accent' : 'text-foreground hover:text-primary'}
              ${isMobile ? 'block text-lg my-2' : ''}
            `}
            aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
          >
            {item.label}
          </NavLinkComponent>
        );
      })}
      <Button asChild variant="outline" size={isMobile ? "lg" : "sm"} className={isMobile ? "w-full mt-4" : "ml-4"}>
        <a href={cvPath} target="_blank" rel="noopener noreferrer" download>Download CV</a>
      </Button>
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
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
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


"use client";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { cvPath } from '@/data/portfolioData';
import { SparklesCore } from '@/components/ui/sparkles';

const HeroSection = () => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme as 'light' | 'dark');
    }
  }, [resolvedTheme]);

  const particleColor = currentTheme === 'light' ? '#000000' : '#FFFFFF';
  const sectionBgColor = currentTheme === 'light' ? 'bg-white' : 'bg-black';
  const textColor = currentTheme === 'light' ? 'text-black' : 'text-white';
  const subTextColor = currentTheme === 'light' ? 'text-neutral-700' : 'text-neutral-300';
  const accentSpanColor = currentTheme === 'light' ? "text-primary" : "text-accent";

  return (
    <section id="hero" className={`relative min-h-screen flex flex-col items-center justify-center text-center py-20 ${sectionBgColor} overflow-hidden`}>
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="tsparticleshero"
          background="transparent"
          minSize={0.6}
          maxSize={1.6}
          particleDensity={100}
          className="w-full h-full"
          particleColor={particleColor}
          speed={2}
        />
      </div>
      
      <div className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8`}>
        <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold font-headline uppercase tracking-tighter mb-4 sm:mb-6 animate-fade-in-up ${textColor}`}>
          Hi, I&apos;m <span className={accentSpanColor}>Udit</span>
        </h1>
        <p className={`text-xl sm:text-2xl md:text-3xl ${subTextColor} mb-8 sm:mb-10 animate-fade-in-up animation-delay-200`}>
          A Full Stack Developer
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center animate-fade-in-up animation-delay-400">
          <Button
            size="lg"
            asChild
            className={`w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                        ${currentTheme === 'light' ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                                                  : 'bg-accent text-accent-foreground hover:bg-accent/90'}`}
            suppressHydrationWarning
          >
            <a href="#projects">
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className={`w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                        ${currentTheme === 'light' ? 'text-black border-neutral-300 hover:bg-neutral-100 hover:text-black' 
                                                  : 'text-white border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600'}`}
            suppressHydrationWarning
          >
            <a href={cvPath} target="_blank" rel="noopener noreferrer">
              View CV <Download className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
      <style jsx>{`
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animate-fade-in-up {
          opacity: 0;
          animation-fill-mode: forwards;
          animation-name: fadeInUp;
          animation-duration: 0.8s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

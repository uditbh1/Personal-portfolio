
"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Eye } from 'lucide-react';
import ResumeModal from '@/components/shared/ResumeModal';
import { cvPath } from '@/data/portfolioData';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center py-20 bg-gradient-to-br from-background via-secondary to-background">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Abstract background"
        layout="fill"
        objectFit="cover"
        quality={75}
        className="opacity-10"
        data-ai-hint="digital particles network"
        priority
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold font-headline uppercase tracking-tighter mb-6 animate-fade-in-up">
          Hi, I&apos;m <span className="text-primary">Udit</span>
        </h1>
        <p className="text-2xl md:text-3xl text-foreground mb-10 animate-fade-in-up animation-delay-200">
          Full Stack Developer
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center animate-fade-in-up animation-delay-400">
          <Button size="lg" asChild className="w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <a href="#projects">
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild  className="w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <a href={cvPath} download="Udit_Bhatnagar_Resume.pdf">
              Download CV <Download className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button variant="secondary" size="lg" onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Preview CV <Eye className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="ghost" asChild className="w-full sm:w-auto hover:text-primary transition-colors duration-300">
             <a href="#contact">
              Contact Me
            </a>
          </Button>
        </div>
      </div>
      <ResumeModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
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


"use client";

import Image from 'next/image';
import { CheckCircle, Zap, Code as CodeIcon, Award } from 'lucide-react'; // Renamed Code to CodeIcon to avoid conflict
import { keyValues, animatedCountersData } from '@/data/portfolioData';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SparklesCore } from '@/components/ui/sparkles';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme as 'light' | 'dark');
    }
  }, [resolvedTheme]);

  const particleColor = currentTheme === 'dark' ? 'hsl(var(--accent))' : 'hsl(var(--primary))';
  const imageBorderColor = currentTheme === 'dark' ? 'border-accent' : 'border-primary';
  const imageShadowColor = currentTheme === 'dark' ? 'shadow-accent/30' : 'shadow-primary/30';


  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-5 items-center">
          <div className="lg:col-span-2 flex justify-center items-center">
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="absolute inset-0 z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <SparklesCore
                  id="tsparticlesabout"
                  background="transparent"
                  minSize={0.3}
                  maxSize={0.8}
                  particleDensity={40}
                  className="w-full h-full"
                  particleColor={particleColor}
                  speed={0.5}
                />
              </div>
              <div className={`relative z-10 w-full h-full rounded-full overflow-hidden border-4 ${imageBorderColor} ${imageShadowColor} shadow-2xl transition-all duration-300 group-hover:shadow-none`}>
                <Image
                  src="/Adobe Express - file.png"
                  alt="Udit Bhatnagar - Professional Portrait"
                  width={400} 
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="professional portrait"
                  priority
                />
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-4xl font-bold font-headline uppercase tracking-wider text-primary mb-6">
              About Me
            </h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              I am a passionate and results-oriented Full Stack Developer with a Master&apos;s degree in Computer Science from the University of Bath. With a strong foundation in modern web technologies and a keen eye for detail, I specialize in creating responsive, user-friendly, and high-performance web applications. My approach to development is rooted in best practices like TDD and component-based architecture, ensuring scalable and maintainable code.
            </p>
            <h3 className="text-2xl font-semibold font-headline text-primary mb-4">Key Values</h3>
            <ul className="space-y-3 mb-8">
              {keyValues.map((value, index) => (
                <li key={index} className="flex items-center text-foreground">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 shrink-0" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {animatedCountersData.map(counter => (
                <div key={counter.id} className="p-6 bg-card shadow-md rounded-lg transition-transform duration-300 hover:scale-105">
                    {counter.id === 'exp' && <Zap className="h-10 w-10 text-primary mx-auto mb-3" />}
                    {counter.id === 'projects' && <CodeIcon className="h-10 w-10 text-primary mx-auto mb-3" />}
                    {counter.id === 'commits' && <Award className="h-10 w-10 text-primary mx-auto mb-3" />}
                    <p className="text-3xl font-bold text-primary">{counter.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{counter.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

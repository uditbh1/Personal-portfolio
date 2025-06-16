
"use client";

import { CheckCircle } from 'lucide-react';
import { keyValues, animatedCountersData } from '@/data/portfolioData';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';

const AboutSection = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme as 'light' | 'dark');
    }
  }, [resolvedTheme]);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return (
      <section id="about" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start lg:items-center">
            <div className="lg:col-span-2 flex justify-center items-start pt-4">
              <div className="w-[400px] h-[400px] bg-muted rounded-lg animate-pulse"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="h-10 bg-muted rounded w-1/2 mb-6 animate-pulse"></div>
              <div className="space-y-3 mb-6">
                <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-muted rounded w-full animate-pulse"></div>
                <div className="h-6 bg-muted rounded w-5/6 animate-pulse"></div>
              </div>
              <div className="h-8 bg-muted rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="space-y-3 mb-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-5 w-5 bg-muted rounded-full mr-3 animate-pulse"></div>
                    <div className="h-5 bg-muted rounded w-1/2 animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-6 bg-card shadow-md rounded-lg">
                    <div className="h-10 w-10 bg-muted rounded-full mx-auto mb-3 animate-pulse"></div>
                    <div className="h-8 bg-muted rounded w-1/2 mx-auto animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mx-auto mt-1 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start lg:items-center">
          <div className="lg:col-span-2 flex justify-center items-start pt-4">
            <ProfileCard
              handle="uditb"
              status="Seeking new opportunities"
              contactText="Get in Touch"
              avatarUrl="/Adobe Express - file.png"
              miniAvatarUrl="/Adobe Express - file.png" 
              iconUrl="https://placehold.co/128x128.png?text=Icon"
              grainUrl="https://placehold.co/400x400.png?text=Grain"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={handleContactClick}
            />
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
                <motion.div 
                  key={counter.id} 
                  className="p-6 bg-card shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {counter.icon && <counter.icon className="h-10 w-10 text-primary mx-auto mb-3" />}
                  <p className="text-3xl font-bold text-primary">{counter.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{counter.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

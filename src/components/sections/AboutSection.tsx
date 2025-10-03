
"use client";

import { CheckCircle } from 'lucide-react';
import { keyValues, animatedCountersData } from '@/data/portfolioData';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';

const AboutSection = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'left' ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  if (!mounted) {
    return (
      <section id="about" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start lg:items-center">
            <div className="lg:col-span-2 flex justify-center items-start pt-4">
              {/* Skeleton loader for ProfileCard */}
              <div className="w-full max-w-[425px] h-[425px] bg-muted rounded-lg animate-pulse"></div>
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
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="about"
      className="py-20 bg-secondary"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start lg:items-center">
          <motion.div
            className="lg:col-span-2 flex justify-center items-start pt-4"
            custom="left"
            variants={itemVariants}
          >
            <ProfileCard
              avatarUrl="/udit.png"
              enableTilt={true}
            />
          </motion.div>
          <motion.div
            className="lg:col-span-3"
            custom="right"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold font-headline uppercase tracking-wider text-primary mb-6">
              About Me
            </h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              I am a passionate and results-oriented Full Stack Developer with a Master's degree in Computer Science from the University of Bath. With a strong foundation in modern web technologies and a keen eye for detail, I specialize in creating responsive, user-friendly, and high-performance web applications. My approach to development is rooted in best practices like TDD and component-based architecture, ensuring scalable and maintainable code.
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
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;


"use client";

import { CheckCircle } from 'lucide-react';
import { keyValues, animatedCountersData } from '@/data/portfolioData';
import { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard'; // Import the new ProfileCard

const AboutSection = () => {
  // Themed styles for ProfileCard can be passed as props if needed,
  // or ProfileCard can use useTheme internally if it needs to adapt.
  // For now, ProfileCard has its own theme-agnostic styling.

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    // Basic skeleton or placeholder to avoid layout shift and hydration errors
    return (
      <section id="about" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 flex justify-center items-center">
              <div className="w-[300px] h-[420px] bg-muted rounded-lg animate-pulse"></div> {/* Placeholder for card */}
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
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 flex justify-center items-center">
            {/* Replace the old image section with ProfileCard */}
            <ProfileCard
              name="Udit Bhatnagar"
              title="Full Stack Developer"
              handle="uditb" // Example handle
              status="Seeking new opportunities"
              contactText="Get in Touch"
              avatarUrl="/Adobe Express - file.png" // Your actual avatar image
              miniAvatarUrl="/Adobe Express - file.png" // Can be same or different
              iconUrl="https://placehold.co/128x128.png" // Placeholder for card's internal design
              grainUrl="https://placehold.co/300x300.png" // Placeholder for card's grain texture
              showUserInfo={true}
              enableTilt={true}
              onContactClick={handleContactClick}
              // You can add more props here as defined in ProfileCardProps
              // e.g., behindGradient, innerGradient if you want to customize them
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
                <div key={counter.id} className="p-6 bg-card shadow-md rounded-lg transition-transform duration-300 hover:scale-105">
                    {counter.icon && <counter.icon className="h-10 w-10 text-primary mx-auto mb-3" />}
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


    
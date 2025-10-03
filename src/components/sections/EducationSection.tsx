
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { education } from '@/data/portfolioData';
import type { EducationItem } from '@/data/portfolioData';
import { GraduationCap, CalendarDays, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const EducationSection = () => {

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="education"
      className="py-20 bg-secondary"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold font-headline uppercase tracking-wider text-primary mb-12 text-center">
          Education
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu: EducationItem) => (
            <motion.div key={edu.id} variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-card h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-headline text-primary">{edu.institution}</CardTitle>
                      <p className="text-md font-semibold text-accent">{edu.degree}</p>
                    </div>
                    {edu.icon && <edu.icon className="h-10 w-10 text-muted-foreground ml-4" />}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 space-y-1">
                    <div className="flex items-center">
                       <Award className="h-4 w-4 mr-2" /> {edu.grade}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2" /> {edu.period}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {edu.description && <p className="text-sm text-foreground mb-4">{edu.description}</p>}
                  {edu.scholarshipImageUrl && edu.id === 'bath' && ( // Specific for Great Scholarship 2024 as per proposal
                    <div className="mt-4 p-3 border border-dashed border-accent rounded-md bg-accent/10 flex items-center gap-3">
                      <Image
                        src={edu.scholarshipImageUrl}
                        alt="Great Scholarship 2024 Badge"
                        width={80}
                        height={50}
                        className="rounded"
                        data-ai-hint={edu.scholarshipImageHint}
                      />
                      <div>
                        <p className="text-sm font-semibold text-accent">Great Scholarship 2024 Recipient</p>
                        <p className="text-xs text-accent/80">Awarded by the University of Bath (British Council)</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default EducationSection;

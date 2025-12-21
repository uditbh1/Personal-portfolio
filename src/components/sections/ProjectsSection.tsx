
"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects as allProjects, projectFilters } from '@/data/portfolioData';
import type { Project } from '@/data/portfolioData';
import { Github, ExternalLink, Filter } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { FaGithub } from "react-icons/fa";
import { motion } from 'framer-motion';

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(project => project.tags.includes(activeFilter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -40 },
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
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold font-headline uppercase tracking-wider text-primary mb-4">
            Projects Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my work, demonstrating skills in various technologies and problem domains.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projectFilters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter)}
              className="capitalize shadow-sm hover:shadow-md transition-shadow"
            >
              {filter === 'All' && <Filter className="mr-2 h-4 w-4" />}
              {filter}
            </Button>
          ))}
        </motion.div>

        <motion.div
          key={activeFilter}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.map((project: Project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <CardContainer containerClassName="w-full h-full" className="w-full h-full">
                <CardBody className="bg-card relative group/card w-full h-full rounded-xl p-6 border border-card-foreground/10 hover:shadow-2xl hover:shadow-primary/[0.1] dark:hover:shadow-accent/[0.1] flex flex-col">
                  {project.imageUrl && (
                    <CardItem as="div" translateZ={40} className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'contain' }}
                        data-ai-hint={project.imageHint}
                        className="rounded-lg"
                      />
                    </CardItem>
                  )}
                  <CardItem as="h3" translateZ="50" className="text-2xl font-headline text-primary mb-2">
                    {project.title}
                  </CardItem>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.map((tech) => (
                      <CardItem key={tech} as="div" translateZ={30} translateX={-2} translateY={-2} className="p-0">
                         <Badge variant="secondary" className="text-xs">{tech}</Badge>
                      </CardItem>
                    ))}
                  </div>

                  <CardItem as="div" translateZ="20" className="mb-4 flex-grow">
                     <p className="text-muted-foreground text-sm">
                      {project.description}
                     </p>
                  </CardItem>
                  
                  <div className="flex justify-end space-x-3 mt-auto pt-4">
                    {project.githubLink && (
                      <CardItem as="div" translateZ="30" translateX={-5} translateY={5}>
                        <Button variant="outline" size="sm" asChild className="shadow-md">
                          <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="mr-2 h-4 w-4" /> GitHub
                          </Link>
                        </Button>
                      </CardItem>
                    )}
                    {project.liveDemoLink && project.liveDemoLink !== "#" && (
                       <CardItem as="div" translateZ="30" translateX={5} translateY={5}>
                        <Button variant="default" size="sm" asChild className="shadow-md">
                          <Link href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </Link>
                        </Button>
                      </CardItem>
                    )}
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

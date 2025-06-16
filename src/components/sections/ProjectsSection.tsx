
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

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold font-headline uppercase tracking-wider text-primary mb-4 text-center">
          Projects Showcase
        </h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          A selection of my work, demonstrating skills in various technologies and problem domains.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredProjects.map((project: Project) => (
            <CardContainer key={project.id} containerClassName="w-full" className="w-full">
              <CardBody className="bg-card relative group/card w-full rounded-xl p-6 border border-card-foreground/10 hover:shadow-2xl hover:shadow-primary/[0.1] dark:hover:shadow-accent/[0.1] flex flex-col min-h-[450px]">
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
                          <Github className="mr-2 h-4 w-4" /> GitHub
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

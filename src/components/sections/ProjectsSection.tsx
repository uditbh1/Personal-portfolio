
"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
            <CardContainer key={project.id} containerClassName="py-0" className="w-full">
              <CardBody className="bg-card relative group/card w-full h-full rounded-xl p-0 border border-foreground/[0.1] hover:shadow-2xl hover:shadow-primary/[0.1] dark:hover:shadow-accent/[0.1]">
                <Card className="flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 rounded-lg bg-transparent w-full h-full border-0">
                  {project.imageUrl && (
                     <CardItem as="div" translateZ={30} className="relative h-48 w-full rounded-t-lg overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={project.imageHint}
                      />
                    </CardItem>
                  )}
                  <CardHeader className="pt-6 px-6 pb-2">
                    <CardItem as="div" translateZ="50" className="w-full">
                      <CardTitle className="text-2xl font-headline text-primary">{project.title}</CardTitle>
                    </CardItem>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.techStack.map((tech) => (
                        <CardItem key={tech} as="div" translateZ={40} translateX={-2} translateY={-2} className="p-0">
                           <Badge variant="secondary" className="text-xs">{tech}</Badge>
                        </CardItem>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow px-6 pb-4 pt-2">
                     <CardItem as="div" translateZ="20" className="w-full">
                       <CardDescription className="text-muted-foreground text-sm">{project.description}</CardDescription>
                     </CardItem>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-3 px-6 pb-6 pt-2">
                    {project.githubLink && (
                      <CardItem as="div" translateZ="30" translateX={-5} translateY={5}>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                          </Link>
                        </Button>
                      </CardItem>
                    )}
                    {project.liveDemoLink && project.liveDemoLink !== "#" && (
                       <CardItem as="div" translateZ="30" translateX={5} translateY={5}>
                        <Button variant="default" size="sm" asChild>
                          <Link href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </Link>
                        </Button>
                      </CardItem>
                    )}
                  </CardFooter>
                </Card>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;



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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-card">
              {project.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={project.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {project.githubLink && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Link>
                  </Button>
                )}
                {project.liveDemoLink && project.liveDemoLink !== "#" && (
                  <Button variant="default" size="sm" asChild>
                    <Link href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

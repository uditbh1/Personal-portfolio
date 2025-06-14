import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { experiences } from '@/data/portfolioData';
import type { Experience } from '@/data/portfolioData';
import { Briefcase, MapPin, CalendarDays, Check } from 'lucide-react';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold font-headline uppercase tracking-wider text-primary mb-12 text-center">
          Work Experience
        </h2>
        <div className="relative">
          {/* Vertical line for timeline effect */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-border -translate-x-1/2"></div>

          {experiences.map((exp: Experience, index: number) => (
            <div key={exp.id} className={`mb-12 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              <div className="hidden md:block w-1/2"></div>
              <div className="hidden md:block relative">
                {/* Timeline dot */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="w-full md:w-1/2 md:px-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-headline text-primary">{exp.role}</CardTitle>
                        <p className="text-md font-semibold text-accent">{exp.company}</p>
                      </div>
                      {exp.icon && <exp.icon className="h-8 w-8 text-muted-foreground ml-4" />}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2" /> {exp.period}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" /> {exp.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-foreground list-inside">
                      {exp.descriptionPoints.map((point, i) => (
                        <li key={i} className="flex">
                          <Check className="h-4 w-4 text-accent mr-2 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillsData } from '@/data/portfolioData';
import type { SkillCategory, Skill } from '@/data/portfolioData';
import { BrainCircuit } from 'lucide-react';

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold font-headline uppercase tracking-wider text-primary mb-12 text-center">
          Technical Skills
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {skillsData.map((category: SkillCategory) => (
            <Card key={category.id} className="shadow-lg rounded-lg bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-accent flex items-center">
                  <BrainCircuit className="h-6 w-6 mr-3" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill: Skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center p-3 rounded-lg bg-secondary border border-transparent hover:border-primary transition-colors duration-300"
                    >
                      <skill.icon className="h-5 w-5 mr-2.5 text-primary" />
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

    
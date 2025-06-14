import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
                  <BrainCircuit className="h-6 w-6 mr-3" /> {/* Generic icon for category */}
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.skills.map((skill: Skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center text-md font-medium text-foreground">
                        <skill.icon className="h-5 w-5 mr-2 text-primary" />
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" aria-label={`${skill.name} proficiency ${skill.level}%`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, Users, Code, Award } from 'lucide-react';
import { keyValues, animatedCountersData } from '@/data/portfolioData';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-xl rounded-lg">
              <Image
                src="https://placehold.co/600x700.png"
                alt="Udit Bhatnagar - Professional Portrait"
                width={600}
                height={700}
                className="object-cover w-full h-full"
                data-ai-hint="professional portrait developer"
              />
            </Card>
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
                <Card key={counter.id} className="p-6 bg-background shadow-md rounded-lg">
                  <CardContent className="p-0">
                    {counter.id === 'exp' && <Zap className="h-10 w-10 text-primary mx-auto mb-3" />}
                    {counter.id === 'projects' && <Code className="h-10 w-10 text-primary mx-auto mb-3" />}
                    {counter.id === 'commits' && <Award className="h-10 w-10 text-primary mx-auto mb-3" />}
                    <p className="text-3xl font-bold text-primary">{counter.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{counter.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimatedSection>
        <ProjectsSection />
      </AnimatedSection>
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection>
        <ExperienceSection />
      </AnimatedSection>
      <AnimatedSection>
        <EducationSection />
      </AnimatedSection>
      <AnimatedSection>
        <SkillsSection />
      </AnimatedSection>
      <AnimatedSection>
        <ContactSection />
      </AnimatedSection>
    </>
  );
}

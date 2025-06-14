import Link from 'next/link';
import { contactDetails } from '@/data/portfolioData';
import { Button } from '@/components/ui/button';

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-4 mb-6">
          {contactDetails.socials.map((social) => (
            <Button key={social.name} variant="ghost" size="icon" asChild>
              <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                <social.icon className="h-6 w-6" />
              </Link>
            </Button>
          ))}
        </div>
        <p className="text-sm">
          &copy; {currentYear} Udit Bhatnagar. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js, Tailwind CSS, and ShadCN UI.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;

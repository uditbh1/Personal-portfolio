
import { Briefcase, Code, Database, GitFork, Github, GraduationCap, Linkedin, Mail, Phone, LayoutGrid, Wind, Component, Server, ToyBrick, ArrowRightLeft, TerminalSquare, TestTube2, TestTube, CloudUpload, Atom, Route, Network, Palette, FileCode, MapPin, CalendarDays, Building, ExternalLink, Filter, Rss, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  imageUrl?: string;
  imageHint?: string;
  githubLink?: string;
  liveDemoLink?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'proctify',
    title: 'Proctify',
    techStack: ['WebRTC', 'TensorFlow.js', 'React', 'Node.js'],
    description: 'A secure online proctoring platform utilizing dual-camera WebRTC streams and TensorFlow.js for real-time monitoring and anomaly detection. Designed to ensure academic integrity during remote examinations.',
    imageUrl: 'https://mybucketeer.com/9627598760757695/proctify.png',
    imageHint: 'online proctoring platform',
    githubLink: 'https://github.com/uditkumar001',
    liveDemoLink: '#',
    tags: ['WebRTC', 'AI', 'Security'],
  },
  {
    id: 'bloom',
    title: 'Bloom',
    techStack: ['React Native', 'Firebase', 'Gamification'],
    description: 'An edutainment mobile application for children, focusing on interactive learning through games and stories. Awarded "Best Serious Game" for its innovative approach to education.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'kids learning app',
    githubLink: 'https://github.com/uditkumar001',
    liveDemoLink: '#',
    tags: ['Mobile', 'React Native', 'Edutainment'],
  },
  {
    id: 'battleship',
    title: 'Battleship Game',
    techStack: ['JavaScript', 'HTML/CSS', 'TDD', 'Algorithms'],
    description: 'A classic Battleship browser game developed with a strong emphasis on Test-Driven Development (TDD). Features an intelligent Player vs. Computer (PvC) mode with an algorithmic opponent.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'battleship game board',
    githubLink: 'https://github.com/uditkumar001',
    liveDemoLink: '#',
    tags: ['Game', 'TDD', 'JavaScript'],
  },
];

export const projectFilters = ['All', ...new Set(projects.flatMap(p => p.tags))];


export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  descriptionPoints: string[];
  icon?: LucideIcon;
}

export const experiences: Experience[] = [
  {
    id: 'newgen',
    company: 'Newgen Soft Pvt. Ltd.',
    role: 'Software Developer Intern',
    period: 'Feb 2023 – Aug 2023',
    location: 'Noida, India',
    descriptionPoints: [
      'Enhanced internal UIs for better user experience and efficiency.',
      'Resolved critical performance issues, improving application responsiveness.',
      'Conducted code reviews and contributed to maintaining high code quality standards.',
      'Collaborated in an Agile environment, participating in daily stand-ups and sprint planning.',
    ],
    icon: Building,
  },
  {
    id: 'lifelancer',
    company: 'Lifelancer',
    role: 'Frontend Developer Intern',
    period: 'Feb 2022 – Feb 2023',
    location: 'Remote',
    descriptionPoints: [
      'Led the implementation of React.js based user interfaces for key product features.',
      'Utilized UML diagrams for software design and architecture planning.',
      'Managed codebase and collaborative development using Git workflows.',
      'Developed responsive web pages ensuring cross-browser compatibility.',
    ],
    icon: Rss,
  },
];

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  grade: string;
  period: string;
  description?: string;
  scholarshipImageUrl?: string;
  scholarshipImageHint?: string;
  icon?: LucideIcon;
}

export const education: EducationItem[] = [
  {
    id: 'bath',
    institution: 'University of Bath',
    degree: 'MSc Computer Science',
    grade: 'Upper Second Class Honours (2:1)',
    period: '2023 – 2024',
    description: 'Specialized in advanced software engineering, AI, and data science.',
    scholarshipImageUrl: 'https://placehold.co/150x100.png',
    scholarshipImageHint: 'scholarship award badge',
    icon: GraduationCap,
  },
  {
    id: 'ipu',
    institution: 'Indraprastha University (GGSIPU)',
    degree: 'BTech Information Technology',
    grade: '9.04 GPA',
    period: '2019 – 2023',
    description: 'Comprehensive study in core computer science and IT principles.',
    icon: BookOpen,
  },
];

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // Percentage 0-100
  icon: LucideIcon;
}

export const skillsData: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages',
    skills: [
      { id: 'js', name: 'JavaScript (ES6+)', level: 90, icon: Code },
      { id: 'html', name: 'HTML5', level: 95, icon: FileCode },
      { id: 'css', name: 'CSS3', level: 90, icon: Palette },
      { id: 'sql', name: 'SQL (PostgreSQL)', level: 75, icon: Database },
    ],
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Libraries',
    skills: [
      { id: 'react', name: 'React.js', level: 90, icon: Atom },
      { id: 'router', name: 'React Router', level: 85, icon: Route },
      { id: 'axios', name: 'Axios', level: 80, icon: Network },
      { id: 'tailwind', name: 'Tailwind CSS', level: 90, icon: Wind },
      { id: 'bootstrap', name: 'Bootstrap', level: 80, icon: LayoutGrid },
      { id: 'cssmodules', name: 'CSS Modules', level: 75, icon: Component },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Tools',
    skills: [
      { id: 'node', name: 'Node.js', level: 80, icon: Server },
      { id: 'express', name: 'Express.js', level: 75, icon: ToyBrick },
      { id: 'rest', name: 'REST APIs', level: 85, icon: ArrowRightLeft },
      { id: 'git', name: 'Git', level: 90, icon: GitFork },
      { id: 'github', name: 'GitHub', level: 90, icon: Github },
      { id: 'postman', name: 'Postman', level: 85, icon: TerminalSquare },
    ],
  },
  {
    id: 'testing',
    name: 'Testing',
    skills: [
      { id: 'jest', name: 'Jest', level: 80, icon: TestTube2 },
      { id: 'rtl', name: 'React Testing Library', level: 80, icon: TestTube },
    ],
  },
  {
    id: 'deployment',
    name: 'Deployment',
    skills: [
      { id: 'netlify', name: 'Netlify', level: 75, icon: CloudUpload },
      { id: 'vercel', name: 'Vercel', level: 80, icon: CloudUpload },
      { id: 'azure', name: 'MS Azure', level: 70, icon: CloudUpload },
    ],
  },
];

export const contactDetails = {
  email: 'udbtech001@gmail.com',
  phone: '+44 7769980037',
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/uditbhatnagar001/', icon: Linkedin },
    { name: 'GitHub', url: 'https://github.com/uditkumar001', icon: Github },
  ],
};

export const keyValues = [
  "Responsiveness", "Cross-Platform Focus", "Test-Driven Development", "Component-Based Development"
];

export const animatedCountersData = [
  { id: 'exp', label: 'Years of Experience', value: '3+' },
  { id: 'projects', label: 'Projects Completed', value: '20+' },
  { id: 'commits', label: 'Code Commits', value: '1000+' },
];

export const cvPath = 'https://drive.google.com/file/d/1IeRkPt-mhu-ntoj7jOfudrPPfL_v7oLb/view?usp=sharing';


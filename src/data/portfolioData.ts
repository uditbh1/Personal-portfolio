
import { Briefcase, Code as CodeIcon, Database, GitFork, Github, GraduationCap, Linkedin, Mail, Phone, LayoutGrid, Wind, Component, Server, ToyBrick, ArrowRightLeft, TerminalSquare, TestTube2, TestTube, CloudUpload, Atom, Route, Network, Palette, FileCode, MapPin, CalendarDays, Building, ExternalLink, Filter, Rss, BookOpen, Zap, Award, ServerCog, Cog, Box } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { IoLogoJavascript } from "react-icons/io5";
import type { ElementType } from 'react';
import { FaHtml5, FaLinkedinIn } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill, RiNodejsFill } from "react-icons/ri";
import { SiDocker, SiGit, SiGithub, SiNpm, SiReactrouter } from "react-icons/si";
import { SiAxios } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaBootstrap } from "react-icons/fa";
import { SiCssmodules } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import { FaNpm } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { SiJest } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { BiLogoNetlify } from "react-icons/bi";
import { IoLogoVercel } from "react-icons/io5";
import { SiRedux } from "react-icons/si";

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
    techStack: ['TensorFlow.js', 'WebRTC', 'Node.js', 'MongoDB', 'Socket.IO'],
    description: 'An AI-powered dual-camera proctoring system ensuring secure, fair online exams. Uses TensorFlow.js for real-time face and object detection, WebRTC for live video streams, and JWT-authenticated Node.js backend with MongoDB.',
    imageUrl: '/Proctify.jpg',
    imageHint: 'AI proctoring system',
    githubLink: 'https://github.com/uditbh1/proctify-',
    liveDemoLink: '#', // Example valid link
    tags: ['AI', 'Security', 'JavaScript', 'Object Detection', 'Full Stack','REST API'],
  },
  {
    id: 'bloom',
    title: 'Bloom',
    techStack: ['React Native', 'React', 'Expo', 'JavaScript (ES6+)'],
    description: 'An edutainment mobile app developed as part of a university project to teach users about indoor plant care through quizzes, virtual maintenance, and interactive gameplay. Features include a virtual bedroom hub, real-time care reminders, and a gamified reward system. Won the "Best Serious Game" award at the University of Bath Game Expo.',
    imageUrl: '/Bloom.jpg',
    imageHint: 'plant care app',
    githubLink: 'https://github.com/dfoshidero/Bloom',
    liveDemoLink: 'https://www.youtube.com/watch?v=v2pALOEpWOQ',
    tags: ['Mobile', 'React Native', 'Game', 'Full Stack' , 'Team Project', 'REST API']
  },
  {
    id: 'battleship',
    title: 'Battleship Game',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Jest', 'TDD'],
    description: 'A modern, interactive web-based Battleship game with Player vs Player and Player vs Computer modes. Features intelligent ship placement, smart AI, and a fully tested codebase using Jest and Test-Driven Development (TDD).',
    imageUrl: '/Battleship.jpg',
    imageHint: 'battleship game board',
    githubLink: 'https://github.com/uditbh1/BattleShips',
    liveDemoLink: 'https://uditbh1.github.io/BattleShips/',
    tags: ['Game', 'TDD', 'JavaScript', 'AI', 'Jest']
  },
  {
    id: 'golds-gym-app',
    title: 'Gold’s Gym App',
    techStack: ['React', 'Material UI', 'JavaScript', 'REST API', 'RapidAPI'],
    description: 'A modern fitness web app that allows users to search exercises by body part, equipment, or target muscle. Integrates ExerciseDB and YouTube APIs to display video tutorials based on the selected exercise. Features include suggestions for exercises targeting the same muscle group and those using the same equipment.',
    imageUrl: '/golds gym.jpg',
    imageHint: 'fitness app interface',
    githubLink: 'https://github.com/uditbh1/goldsgymapp_udit',
    liveDemoLink: 'https://goldsgymviaudit.netlify.app/', 
    tags: ['React'],
  },
  {
    id: 'jake-cv-builder',
    title: 'Jake CV Builder',
    techStack: ['React', 'JavaScript', 'CSS', 'jsPDF', 'html2canvas', 'Vite', 'Responsive Design'],
    description: 'A dynamic React app inspired by Jake Ryan’s iconic CV template. Lets users build, preview, and download a slick one-page PDF resume with editable sections for education, experience, projects, and skills—all in real time.',
    imageUrl: '/jakecv.jpg',
    imageHint: 'resume builder preview',
    githubLink: 'https://github.com/uditbh1/Jake-CV-Builder',
    liveDemoLink: 'https://jakecvbuilderbyudit.netlify.app/',
    tags: ['React'],
  },
  {
    id: 'etch-a-sketch',
    title: 'Etch-a-Sketch Grid Drawer',
    techStack: ['JavaScript', 'HTML', 'CSS', 'Flexbox', 'DOM Manipulation'],
    description: 'A pixel-based drawing tool built using vanilla JavaScript. Features dynamic grid generation, hover-based colouring, and adjustable grid size with prompt input. Includes extra functionality for random RGB colouring and progressive darkening using opacity.',
    imageUrl: '/Etch.jpg',
    imageHint: 'pixel grid drawing',
    githubLink: 'https://github.com/uditbh1/Etch-a-Sketch', 
    liveDemoLink: 'https://uditbh1.github.io/Etch-a-Sketch/', 
    tags: ['JavaScript'],
  },
  {
    id: 'spotify-clone',
    title: 'Spotify Clone',
    techStack: ['JavaScript', 'HTML/CSS', 'REST APIs', 'OAuth2.0', 'Fetch API'],
    description: 'A Spotify-inspired music streaming web app built with vanilla JavaScript. Features dynamic playlist rendering, real-time audio playback, and user authentication via Spotify OAuth. Integrates Spotify Web API to fetch user data, top tracks, and search results.',
    imageUrl: '/Spotify.jpg',
    imageHint: 'music streaming interface',
    githubLink: 'https://github.com/uditbh1/spotify-clone',
    liveDemoLink: 'https://spotify-clone-whitefang.netlify.app/login/login.html',
    tags: ['JavaScript','REST API'],
  },
  {
    id: 'ecommerce-odin',
    title: 'E-Commerce Store',
    techStack: ['React.js', 'Tailwind CSS', 'React Router', 'Context API', 'FakeStoreAPI'],
    description: 'A modern e-commerce web app featuring product listings, a responsive shopping cart, and seamless navigation. Built with React and Tailwind CSS as part of my learning journey through The Odin Project.',
    imageUrl: '/ecommerceodin.jpg',
    imageHint: 'ecommerce product page',
    githubLink: 'https://github.com/uditbh1/Ecommerce-Odin',
    liveDemoLink: 'https://ecommerce-odin.pages.dev/',
    tags: ['E-commerce', 'React']
  },
  
  {
    id: 'pokemon-memory-game',
    title: 'Pokémon Memory Card Game',
    techStack: ['React', 'JavaScript', 'CSS3', 'PokéAPI'],
    description: 'A memory card game built with React and PokéAPI where players match 18 dynamically loaded Pokémon without repeating any. Features include real-time score tracking, card shuffling using Fisher-Yates algorithm, and a responsive UI.',
    imageUrl: '/Pokemon.jpg', 
    imageHint: 'pokemon card game',
    githubLink: 'https://github.com/uditbh1/Memory-Card/tree/main',
    liveDemoLink: 'https://memorycardbyudit.netlify.app/', 
    tags: ['Game', 'React'],
  },
  {
    id: 'todolist',
    title: 'ToDo List',
    techStack: ['JavaScript', 'HTML', 'CSS', 'DOM Manipulation', 'Local Storage'],
    description: 'A responsive ToDo List web app built with vanilla JavaScript as part of The Odin Project. Implements task creation, editing, deletion, and local storage for data persistence.',
    imageUrl: '/todo.jpg',
    imageHint: 'todo list app',
    githubLink: 'https://uditbh1.github.io/todolist/',
    liveDemoLink: 'https://github.com/uditbh1/todolist', // Note: This links to GitHub, not a live demo page.
    tags: ['JavaScript']
  },
  {
    id: 'kalkulator',
    title: 'Kalkulator',
    techStack: ['JavaScript', 'HTML', 'CSS', 'DOM Manipulation'],
    description: 'A calculator app built to replicate the Windows 10 calculator interface and functionality using vanilla JavaScript. Includes basic and advanced operations with responsive UI.',
    imageUrl: '/kalkulator.jpg',
    imageHint: 'calculator interface',
    githubLink: 'https://github.com/uditbh1/kalkulator', 
    liveDemoLink: 'https://uditbh1.github.io/kalkulator/',  
    tags: ['JavaScript'],
  },
  
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors',
    techStack: ['JavaScript', 'HTML/CSS', 'DOM Manipulation', 'Game Logic'],
    description: 'A lightweight Rock Paper Scissors game built with vanilla JavaScript. Implements dynamic DOM updates and core game logic for Player vs. Computer interaction with real-time result feedback.',
    imageUrl: '/rock paper.jpg',
    imageHint: 'rock paper scissors game',
    githubLink: 'https://github.com/uditbh1/rock-paper-scissors',
    liveDemoLink: 'https://uditbh1.github.io/rock-paper-scissors/',
    tags: ['Game', 'JavaScript'],
  },
  {
    id: 'ecommerce-app',
    title: 'Ecommerce App',
    techStack: ['TypeScript', 'Vite', 'React', 'REST API', 'FakeStore API'],
    description: 'A modern eCommerce application built as a first TypeScript and Vite project. Integrates the FakeStore API to display products, manage a shopping cart, and simulate a checkout experience.',
    imageUrl: '/typescriptecomm.jpg',
    imageHint: 'typescript ecommerce ui',
    githubLink: 'https://github.com/uditbh1/ecommerceapp',
    liveDemoLink: 'https://ecommbyudit.netlify.app/',
    tags: ['TypeScript', 'React', 'REST API', 'E-commerce'],
  },
    
  {
    id: 'weather-app',
    title: 'Weather Forecast App',
    techStack: ['JavaScript', 'HTML/CSS', 'REST APIs', 'Async/Await', 'DateTime APIs'],
    description: 'A dynamic weather forecasting app that fetches and displays real-time data using the OpenWeatherMap API. Features include current weather, 5-day forecast, hourly breakdown, and geolocation-based updates with a clean UI.',
    imageUrl: '/weather.jpg',
    imageHint: 'weather app display',
    githubLink: 'https://github.com/uditbh1/weather-app',
    liveDemoLink: 'https://weatherapp-by-udit.netlify.app/',
    tags: ['JavaScript']
  },
  {
    id: 'drumkit',
    title: 'Drum Kit',
    techStack: ['JavaScript', 'DOM Manipulation', 'Event Handling', 'Audio API', 'HTML/CSS'],
    description: 'An interactive browser-based drum kit built with vanilla JavaScript. Users can play drum sounds via mouse clicks or keyboard presses, enhanced with responsive button animations.',
    imageUrl: '/drum kit.jpg',
    imageHint: 'interactive drum kit',
    githubLink: 'https://github.com/uditbh1/drum-kit-game', 
    liveDemoLink: 'https://uditbh1.github.io/drum-kit-game/', 
    tags: ['JavaScript'],
  },
  {
    id: 'simon-game',
    title: 'Simon Game',
    techStack: ['JavaScript', 'jQuery', 'HTML/CSS', 'DOM Manipulation', 'Event Handling'],
    description: 'A memory-based browser game that challenges users to repeat increasingly complex colour sequences. Implements interactive UI updates, sound effects, and real-time input validation using jQuery.',
    imageUrl: '/simon game.jpg',
    imageHint: 'simon game buttons',
    githubLink: 'https://github.com/uditbh1/simon-game',
    liveDemoLink: 'https://uditbh1.github.io/simon-game/',
    tags: ['Game', 'JavaScript', 'jQuery']
  }
  
];

export const projectFilters = ['All', ...new Set(projects.flatMap(p => p.tags))];


export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  descriptionPoints: string[];
  icon?: ElementType;
}

export const experiences: Experience[] = [
  {
    id: 'newgen',
    company: 'Newgen Soft Pvt. Ltd.',
    role: 'Software Developer',
    period: 'Feb 2023 – Aug 2023',
    location: 'Noida, India',
    descriptionPoints: [
      'Developed and improved internal application user interfaces using JavaScript, resulting in enhanced user engagement and feature functionality.',
      'Identified and resolved performance bottlenecks, contributing to more efficient and responsive applications.',
      'Collaborated closely with senior developers to debug and fix critical issues in high-impact modules.',
      'Participated in code reviews, providing constructive feedback that improved code quality and maintainability.' ,
      'Authored clear and concise technical documentation for newly developed modules, aiding in faster onboarding and smoother knowledge transfer.', 
      'Contributed to the continuous improvement of shared codebases by suggesting design and implementation enhancements.',
      'Demonstrated strong skills in JavaScript, UI development, debugging, code review, documentation, and effective team collaboration.',
      'Implemented interactive features and UI components to enhance the user experience across various internal tools.',
      'Assisted in refactoring legacy code to align with modern JavaScript standards, improving readability and long-term maintainability.' ,
      'Participated in agile ceremonies including sprint planning and retrospectives, ensuring alignment with project goals and timelines.' ,
      'Collaborated with cross-functional teams including designers and QA to deliver seamless and user-friendly interfaces.',
    ],
    icon: Building,
  },
  {
    id: 'lifelancer',
    company: 'Lifelancer',
    role: 'Software Engineer',
    period: 'Feb 2022 – Feb 2023',
    location: 'United Kingdom',
    descriptionPoints: [
      "Designed and developed responsive, component-based user interfaces using React.js, translating user stories and client feedback into functional front-end solutions.",
    "Led requirement gathering sessions with stakeholders to understand project objectives and user needs, aligning technical approaches with business goals.",
    "Created UML diagrams such as use case, activity, and sequence diagrams to visualise system architecture and enhance team understanding.",
    "Implemented and maintained Git-based workflows, including feature branching and pull request reviews, to streamline version control and improve team collaboration.",
    "Built interactive wireframes and high-fidelity prototypes using design tools to validate concepts early and reduce rework.",
    "Collaborated with UX designers and product owners to ensure consistent application of UI/UX best practices.",
    "Participated in Agile development cycles, contributing to sprint planning, daily stand-ups, and retrospectives for continuous improvement.",
    "Demonstrated strong skills in React.js, UI/UX design, requirement analysis, version control (Git), UML modelling, and cross-functional team collaboration.",
    ],
    icon: Rss,
  },
  {
    id:'indore Innovation Hub Pvt.Ltd',
    company:'Indore Innovation Hub Pvt.Ltd',
    role:'Software Developer',
    period:'Jan 2021 – Jan 2022',
    location:'Indore, India',
    descriptionPoints:[
    "Designed, developed, and maintained scalable web applications using modern frameworks such as React and Node.js to meet business and user requirements.",
    "Collaborated with cross-functional teams including design, QA, and DevOps in Agile/Scrum environments to deliver high-quality software on schedule.",
    "Wrote clean, efficient, and well-documented code; implemented unit and integration tests to ensure code quality and reliability.",
    "Designed REST APIs and deployed containerised services using Docker and Kubernetes.",
    "Applied BDD/TDD practices and automated testing using tools like Playwright and Postman.",
    "Experienced with CI/CD pipelines, version control (Git), and build tools like Maven.",
    "Deployed applications on cloud platforms such as AWS and Azure."
  ],
    icon: Building,
  }
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
  icon?: ElementType;
}

export const education: EducationItem[] = [
  {
    id: 'bath',
    institution: 'University of Bath',
    degree: 'MSc Computer Science',
    grade: 'Upper Second Class Honours (2:1)',
    period: '2023 – 2024',
    description: 'Specialised in full-stack development, software engineering principles, and AI foundations, with additional focus on functional programming and pervasive systems.',
    scholarshipImageUrl: '/British-Council-GREAT-1.png',
    scholarshipImageHint: 'scholarship award',
    icon: GraduationCap,
  },
  {
    id: 'ipu',
    institution: 'Indraprastha University (GGSIPU)',
    degree: 'BTech Information Technology',
    grade: '9.01 GPA',
    period: '2019 – 2023',
    description: 'Specialised in computer systems, network security, and full-stack web development, with strong foundations in algorithms, operating systems, and object-oriented programming.',
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
  icon: ElementType;
}

export const skillsData: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages',
    skills: [
      { id: 'js', name: 'JavaScript (ES6+)', level: 90, icon: IoLogoJavascript },
      { id: 'html', name: 'HTML5', level: 95, icon: FaHtml5 },
      { id: 'css', name: 'CSS3', level: 90, icon: FaCss3Alt },
      { id: 'sql', name: 'SQL (PostgreSQL)', level: 75, icon: BiLogoPostgresql },
    ],
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Libraries',
    skills: [
      { id: 'react', name: 'React.js', level: 90, icon: FaReact},
      { id: 'redux', name: 'Redux', level: 85, icon: SiRedux},
      { id: 'nextjs', name: 'Next.js', level: 85, icon: RiNextjsFill },
      { id: 'router', name: 'React Router', level: 85, icon: SiReactrouter },
      { id: 'axios', name: 'Axios', level: 80, icon: SiAxios },
      { id: 'tailwind', name: 'Tailwind CSS', level: 90, icon: RiTailwindCssFill },
      { id: 'bootstrap', name: 'Bootstrap', level: 80, icon: FaBootstrap },
      { id: 'cssmodules', name: 'CSS Modules', level: 75, icon: SiCssmodules },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Tools',
    skills: [
      { id: 'node', name: 'Node.js', level: 80, icon: RiNodejsFill },
      { id: 'express', name: 'Express.js', level: 75, icon: SiExpress },
      { id: 'rest', name: 'REST APIs', level: 85, icon: ArrowRightLeft },
      { id: 'git', name: 'Git', level: 90, icon: SiGit },
      { id: 'github', name: 'GitHub', level: 90, icon: SiGithub },
      { id: 'postman', name: 'Postman', level: 85, icon: SiPostman },
      { id: 'npm', name: 'npm', level: 85, icon: SiNpm },
      { id: 'VScode', name: 'VScode', level: 85, icon: VscVscode },
    ],
  },
  {
    id: 'testing',
    name: 'Testing',
    skills: [
      { id: 'jest', name: 'Jest', level: 80, icon: SiJest },
      { id: 'rtl', name: 'React Testing Library', level: 80, icon: TestTube },
    ],
  },
  {
    id: 'deployment',
    name: 'Deployment & DevOps',
    skills: [
      { id: 'cicd', name: 'CI/CD', level: 75, icon: Cog },
      { id: 'docker', name: 'Docker', level: 70, icon: SiDocker },
      { id: 'aws', name: 'AWS', level: 65, icon: FaAws },
      { id: 'azure', name: 'MS Azure', level: 70, icon: VscAzure },
      { id: 'netlify', name: 'Netlify', level: 75, icon: BiLogoNetlify },
      { id: 'vercel', name: 'Vercel', level: 80, icon: IoLogoVercel },
    ],
  },
];

export const contactDetails = {
  email: 'udbtech001@gmail.com',
  phone: '+44 7769980037',
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/udit121/', icon: FaLinkedinIn},
    { name: 'GitHub', url: 'https://github.com/uditbh1', icon: FaGithub },
  ],
};

export const keyValues = [
  "Responsiveness", "Cross-Platform Focus", "Test-Driven Development", "Component-Based Development"
];

export const animatedCountersData = [
  { id: 'exp', label: 'Years of Experience', value: '3+', icon: Zap },
  { id: 'projects', label: 'Projects Completed', value: '20+', icon: CodeIcon },
  { id: 'commits', label: 'Code Commits', value: '1000+', icon: Award },
];

export const cvPath = 'https://drive.google.com/file/d/1IeRkPt-mhu-ntoj7jOfudrPPfL_v7oLb/view?usp=sharing';


    

    


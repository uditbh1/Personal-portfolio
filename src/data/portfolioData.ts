
import { Briefcase, Code as CodeIcon, Database, GitFork, Github, GraduationCap, Linkedin, Mail, Phone, LayoutGrid, Wind, Component, Server, ToyBrick, ArrowRightLeft, TerminalSquare, TestTube2, TestTube, CloudUpload, Atom, Route, Network, Palette, FileCode, MapPin, CalendarDays, Building, ExternalLink, Filter, Rss, BookOpen, Zap, Award } from 'lucide-react';
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
  icon?: LucideIcon;
}

export const experiences: Experience[] = [
  {
    id: 'newgen',
    company: 'Newgen Soft Pvt. Ltd.',
    role: 'Software Developer',
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
    role: 'Frontend Developer',
    period: 'Feb 2022 – Feb 2023',
    location: 'United Kingdom',
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
  icon: LucideIcon;
}

export const skillsData: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages',
    skills: [
      { id: 'js', name: 'JavaScript (ES6+)', level: 90, icon: CodeIcon },
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
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/udit121/', icon: Linkedin },
    { name: 'GitHub', url: 'https://github.com/uditbh1', icon: Github },
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


    
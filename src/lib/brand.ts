export interface Brand {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  socials: { github?: string; linkedin?: string; portfolio?: string };
  accent: 'mist' | 'blossom' | 'sunrise';
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  impact?: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  date: string;
}

export const brand: Brand = {
  name: 'Judinus Judes Uthiyaraj',
  role: 'Software Engineering Undergraduate',
  tagline: 'I build user-friendly apps with clean code, safe patterns, and delightful UX.',
  email: 'jjudians@gmail.com',
  phone: '+94 703783061',
  location: 'Jaffna, Sri Lanka',
  socials: {
    github: 'https://github.com/Judinus10',
    linkedin: 'https://www.linkedin.com/in/judinus'
  },
  accent: 'mist',
};

export const projects: Project[] = [
  {
    title: 'Hotel POS / Booking Suite',
    description: 'Modular POS + booking with RBAC, email workflows, analytics.',
    tech: ['PHP', 'MySQL', 'Tailwind', 'Chart.js'],
    impact: 'Reduced check-in time by 35%, refunds down 18%.'
  },
  {
    title: 'Research PDF Extractor API',
    description: 'Parse PDFs, summarize methodology/datasets.',
    tech: ['Python', 'Flask', 'PyMuPDF', 'Transformers', 'KeyBERT'],
    impact: '3× faster literature reviews with structured outputs.'
  },
  {
    title: 'Portfolio Builder',
    description: 'Theme presets and CMS-free content, instant deploy.',
    tech: ['Next.js', 'Tailwind'],
    impact: '95+ Lighthouse scores.'
  },
  {
    title: 'E-Commerce Analytics Dashboard',
    description: 'Real-time sales tracking with predictive insights.',
    tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    impact: 'Increased sales forecasting accuracy by 42%.'
  },
  {
    title: 'Smart Inventory Management',
    description: 'AI-powered stock optimization for retail chains.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
    impact: 'Reduced inventory costs by 28% across 15+ stores.'
  },
  {
    title: 'Social Media Automation Tool',
    description: 'Content scheduling and engagement analytics platform.',
    tech: ['Vue.js', 'Express.js', 'MongoDB', 'Bull Queue'],
    impact: 'Boosted social engagement by 67% for 200+ clients.'
  }
];

export const experience: ExperienceItem[] = [
  {
    role: 'Full-Stack Engineer',
    org: 'Freelance',
    period: '2023 → Present',
    bullets: [
      'Shipped 10+ production web apps for SMEs.',
      'Implemented RBAC, audit logs, and OTP flows.',
      'Optimized database queries reducing load times by 60%.',
      'Led API design and microservices architecture.'
    ]
  },
  {
    role: 'Research Assistant',
    org: 'University Project',
    period: '2022 → 2023',
    bullets: [
      'Built NLP pipelines to extract insights from PDFs.',
      'Drafted reproducible methodologies and datasets.',
      'Collaborated with 5+ researchers on data analysis.',
      'Published findings in 2 peer-reviewed journals.'
    ]
  },
  {
    role: 'Frontend Developer Intern',
    org: 'TechStart Solutions',
    period: '2022',
    bullets: [
      'Developed responsive UI components for SaaS platform.',
      'Improved user onboarding flow increasing retention by 25%.',
      'Worked with design team on accessibility improvements.',
      'Mentored 3 junior developers on React best practices.'
    ]
  }
];

export const skills: SkillGroup[] = [
  { label: 'Core', items: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'SQL'] },
  { label: 'Frameworks', items: ['React', 'Next.js', 'Flask', 'Laravel', 'Vue.js'] },
  { label: 'Cloud / DevOps', items: ['Vercel', 'Docker', 'Nginx', 'GitHub Actions', 'AWS'] },
  { label: 'Data / ML', items: ['Transformers', 'Pandas', 'KeyBERT', 'TensorFlow', 'PyTorch'] },
  { label: 'UI / UX', items: ['Tailwind', 'Figma', 'Framer Motion', 'Sass', 'Material UI'] },
  { label: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase'] }
];

export const certificates: Certificate[] = [
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2024' },
  { title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', year: '2024' },
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023' },
  { title: 'React Developer Certification', issuer: 'Meta', year: '2023' }
];

export const transactions: Transaction[] = [
  { id: 'TXN-001', description: 'Pro plan subscription', amount: 19.00, status: 'success', date: '2025-07-15' },
  { id: 'TXN-002', description: 'Template purchase', amount: 9.00, status: 'pending', date: '2025-07-20' },
  { id: 'TXN-003', description: 'Refund processed', amount: -9.00, status: 'success', date: '2025-07-21' },
  { id: 'TXN-004', description: 'Design asset', amount: 5.00, status: 'failed', date: '2025-07-22' },
  { id: 'TXN-005', description: 'API usage fee', amount: 12.50, status: 'success', date: '2025-07-25' },
  { id: 'TXN-006', description: 'Premium theme', amount: 29.99, status: 'success', date: '2025-07-28' },
  { id: 'TXN-007', description: 'Domain renewal', amount: 15.00, status: 'pending', date: '2025-08-01' },
  { id: 'TXN-008', description: 'SSL certificate', amount: 8.99, status: 'failed', date: '2025-08-05' }
];
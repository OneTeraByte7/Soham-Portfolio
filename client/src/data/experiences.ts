import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'ai-research-intern',
    role: 'AI/ML Research Intern',
    company: 'Tech Innovation Labs',
    location: 'Remote',
    duration: 'Jun 2024 - Present',
    responsibilities: [
      'Developed and deployed machine learning models for predictive analytics',
      'Implemented reinforcement learning algorithms for autonomous systems',
      'Collaborated with cross-functional teams on AI integration projects',
      'Optimized model performance reducing inference time by 40%',
      'Conducted research on Large Language Models and their applications'
    ],
    type: 'internship',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'MLOps'],
    achievements: [
      'Published research paper on multi-agent RL systems',
      'Improved model accuracy by 25%',
      'Deployed 5+ production ML models'
    ]
  },
  {
    id: 'fullstack-developer',
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    location: 'Hybrid',
    duration: 'Jan 2024 - May 2024',
    responsibilities: [
      'Built responsive web applications using React and TypeScript',
      'Designed and implemented RESTful APIs with Node.js and Express',
      'Integrated MongoDB for data persistence and management',
      'Implemented authentication and authorization systems',
      'Conducted code reviews and mentored junior developers'
    ],
    type: 'internship',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker'],
    achievements: [
      'Reduced page load time by 50%',
      'Built 10+ reusable components',
      'Managed team of 3 developers'
    ]
  },
  {
    id: 'data-analyst-intern',
    role: 'Data Analyst Intern',
    company: 'DataCorp Solutions',
    location: 'On-site',
    duration: 'Aug 2023 - Dec 2023',
    responsibilities: [
      'Analyzed large datasets using Python and SQL',
      'Created interactive dashboards with Tableau and Power BI',
      'Automated data processing pipelines',
      'Generated insights for business decision-making',
      'Collaborated with stakeholders to define KPIs'
    ],
    type: 'internship',
    skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Pandas'],
    achievements: [
      'Processed 1M+ data records',
      'Created 15+ interactive dashboards',
      'Saved 20 hours/week through automation'
    ]
  }
];

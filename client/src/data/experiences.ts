import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'deep-learning-titans',
    role: 'AI Engineer | Research Intern',
    company: 'Deep Learning Titans',
    location: 'Pune, India',
    duration: 'August 2025 - Ongoing',
    responsibilities: [
      'Improved model inference speed by 30% using state-of-the-art deep learning models',
      'Maintained 95% model accuracy while optimizing performance',
      'Automated data processing with AI workflows, reducing manual effort by 60%',
      'Guided strategy for 5+ AI projects by benchmarking model performance',
      'Boosted operational efficiency by 25% through ML model integration'
    ],
    type: 'internship',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Deep Learning', 'Model Optimization', 'AI Research', 'Data Processing'],
    achievements: [
      'Improved inference speed by 30%',
      'Maintained 95% model accuracy',
      'Reduced manual effort by 60%'
    ],
    logo: '/images/experience/dl.png'
  },
  {
    id: 'hackncrafts',
    role: 'Full Stack Developer Intern',
    company: 'hackNcrafts',
    location: 'Pune, India',
    duration: 'June 2025 - July 2025',
    responsibilities: [
      'Delivered 3 full-stack websites for diverse clients using the MERN stack',
      'Led backend development for the Meetocure healthcare application',
      'Built a scalable RESTful API to handle over 10,000 patient data entries',
      'Increased user engagement by 40% with real-time WebSocket features',
      'Improved application performance by 50% by optimizing database queries'
    ],
    type: 'internship',
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'MERN Stack', 'RESTful API', 'WebSocket', 'Database Optimization'],
    achievements: [
      'Delivered 3 full-stack websites',
      'Increased user engagement by 40%',
      'Improved performance by 50%'
    ],
    logo: '/images/experience/hnc.png'
  }
];

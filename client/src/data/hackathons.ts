import type { Hackathon } from '../types';

export const hackathons: Hackathon[] = [
  {
    id: 'sih-2025-grand-finale',
    name: 'Smart India Hackathon Grand Finale 2025',
    position: 'Top 5 Finalist',
    date: 'December 2025',
    description: 'Developed cooperative reinforcement framework coordinating 20+ aerial units, reaching 95% defense effectiveness. Analyzed 120Hz sensor streams through autonomous prioritization logic, finishing fifth nationwide among 500 teams at the Grand Finale in Bangalore & Pune.',
    project: 'Robotics, Drones & Machine Learning',
    achievement: 'Top 5 among 500+ teams nationally',
    icon: '/images/sih/certificate.jpg',
    color: 'cyber-purple',
    tags: ['AI/ML', 'Robotics', 'Drone Swarm', 'Reinforcement Learning', 'Real-time Systems', 'Autonomous Systems'],
    highlights: [
      'Fifth place nationally among 500+ teams',
      '95% defense effectiveness achieved',
      'Coordinated 20+ aerial units cooperatively',
      '120Hz real-time sensor stream analysis',
      'Autonomous prioritization logic system'
    ],
    gallery: [
      '/images/sih/certificate.jpg',
      '/images/sih/group.jpg'
    ]
  },
  {
    id: 'ieee-codeclash-2025',
    name: 'IEEE CodeClash International Hackathon',
    position: '3rd Place Winner',
    date: 'March 2025',
    description: 'Developed machine learning models for real-time collision detection in foggy weather. Achieved 85%+ accuracy using a dataset of over 500,000 data points. Secured 3rd place among 800 global teams and earned a $200 cash prize for innovation in road safety technology.',
    project: 'Machine Learning and Artificial Intelligence',
    achievement: '3rd Place among 800 teams',
    icon: '/images/ieee/certificate.png',
    color: 'cyber-blue',
    gallery: [
      '/images/ieee/certificate.png',
      '/images/ieee/poster.webp'
    ]
  },
  {
    id: 'nst-blinkit-teckron-2025',
    name: 'NST & Blinkit Hackathon Teckron',
    position: 'Top 16 Finalist',
    date: 'March 2025',
    description: 'Developed a waste management automation web app for dark stores. Utilized Machine Learning & AI to optimize waste segregation, enhancing efficiency by 60%. Built a scalable website infrastructure that processed 10,000+ data points for real-time waste categorization.',
    project: 'Smart Automation and Technology',
    achievement: 'Top 16 among 150+ teams',
    icon: '/images/nst/certificate.png',
    color: 'cyber-green',
    showCertificate: true,
    gallery: [
      '/images/nst/certificate.png'
    ]
  },
  {
    id: 'rift-2026',
    name: 'RIFT 2026 Hackathon',
    position: 'Semifinalist',
    date: 'March 2026',
    description: 'Developed an Autonomous CI/CD Healing Agent that autonomously detects, fixes, and commits pipeline failures. Built a full-stack multi-agent system using React, Gemini AI, and DevOps automation. Selected as one of 10 semifinalists from 200 teams across 5 problem statements (2 teams per statement).',
    project: '🤖 Autonomous CI/CD Healing Agent',
    achievement: 'Top 10 Semifinalist among 200 teams',
    icon: '/images/hackathons/rift.jpg',
    color: 'cyber-purple',
    tags: ['AI/ML', 'DevOps Automation', 'Agentic Systems', 'React', 'Gemini AI', 'CI/CD', 'Full-Stack'],
    highlights: [
      'Top 10 semifinalist from 200 competing teams',
      '2 teams selected per problem statement (5 tracks)',
      'Autonomous pipeline debugging in under 5 minutes',
      'Multi-agent system with AI-powered code fixes',
      'Real-time dashboard with live CI/CD monitoring',
      'Automatic repository scanning and test discovery',
      'Smart retry logic with up to 5 attempts'
    ],
    gallery: [
      '/images/hackathons/rift.jpg'
    ],
    links: {
      demo: 'https://rift-2026-kappa.vercel.app',
      github: 'https://github.com/OneTeraByte7/RIFT_2026.git'
    }
  }
];

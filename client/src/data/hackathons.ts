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
  }
];

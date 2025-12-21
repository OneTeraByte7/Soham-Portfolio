import type { Hackathon } from '../types';

export const hackathons: Hackathon[] = [
  {
    id: 'sih-2025-grand-finale',
    name: 'Smart India Hackathon Grand Finale 2025',
    position: 'Top 5 Finalist',
    date: 'December 2025',
    description: 'Led team to Top 5 nationally at SIH 2025 Grand Finale for Bharat Electronics Limited PS SIH25164 (130+ teams). Built AI/ML drone swarm algorithms achieving 95%+ asset protection with decentralized control. Developed Backend & ML models for autonomous counter-drone system in 36-hour hackathon. Implemented real-time Control system with 100+ Hz processing for threat prioritization.',
    project: 'Robotics, Drones & Machine Learning',
    achievement: 'Top 5 among 130+ teams nationally',
    icon: '/images/sih/certificate.jpg',
    color: 'cyber-purple',
    tags: ['AI/ML', 'Robotics', 'Drone Swarm', 'Real-time Systems', 'Backend Development'],
    highlights: [
      'Led team to Top 5 nationally among 130+ teams',
      '95%+ asset protection rate achieved',
      'Decentralized drone swarm control system',
      '100+ Hz real-time processing',
      '36-hour intensive development sprint'
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

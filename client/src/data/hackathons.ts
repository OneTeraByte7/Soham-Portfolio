import type { Hackathon } from '../types';

export const hackathons: Hackathon[] = [
  {
    id: 'ieee-codeclash-2025',
    name: 'IEEE CodeClash International Hackathon',
    position: '3rd Place Winner',
    date: 'March 2025',
    description: 'Developed machine learning models for real-time collision detection in foggy weather. Achieved 85%+ accuracy using a dataset of over 500,000 data points. Secured 3rd place among 800 global teams and earned a $200 cash prize for innovation in road safety technology.',
    project: 'Machine Learning and Artificial Intelligence',
    achievement: '3rd Place among 800 teams',
    icon: '/images/certifications/cert1.png',
    color: 'cyber-blue'
  },
  {
    id: 'nst-blinkit-teckron-2025',
    name: 'NST & Blinkit Hackathon Teckron',
    position: 'Top 16 Finalist',
    date: 'March 2025',
    description: 'Developed a waste management automation web app for dark stores. Utilized Machine Learning & AI to optimize waste segregation, enhancing efficiency by 60%. Built a scalable website infrastructure that processed 10,000+ data points for real-time waste categorization.',
    project: 'Smart Automation and Technology',
    achievement: 'Top 16 among 150+ teams',
    icon: '/images/hackathons/blinkit.png',
    color: 'cyber-green'
  }
];

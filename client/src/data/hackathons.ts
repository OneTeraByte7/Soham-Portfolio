import type { Hackathon } from '../types';

export const hackathons: Hackathon[] = [
  {
    id: 'techathon-2025',
    name: 'Techathon 2025',
    position: 'Winner',
    date: '2025',
    description: 'Built a comprehensive healthcare monitoring system for rural areas',
    project: 'HealthCare Monitoring System',
    achievement: '1st Place',
    icon: '/images/hackathons/techathon.png',
    color: 'cyber-blue'
  },
  {
    id: 'amd-hackathon-2025',
    name: 'AMD MI300 GPU Hackathon',
    position: 'Participant',
    date: '2025',
    description: 'Developed AI scheduling assistant using LLMs deployed on AMD MI300 GPUs',
    project: 'AI Scheduling Assistant',
    achievement: 'Finalist',
    icon: '/images/hackathons/amd.png',
    color: 'cyber-green'
  },
  {
    id: 'ai-football-hackathon',
    name: 'AI for Football Challenge',
    position: 'Winner',
    date: '2024',
    description: 'Created autonomous multi-agent reinforcement learning simulator',
    project: 'Multi-Agent RL Simulator',
    achievement: '1st Place',
    icon: '/images/hackathons/ai-football.png',
    color: 'cyber-purple'
  }
];

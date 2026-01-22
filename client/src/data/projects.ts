import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'rl-simulator',
    title: 'Autonomous multi-Agent RL Simulator',
    description: 'Multi-agent reinforcement learning simulation for collaborative tasks with custom Greedy algorithm optimization.',
    longDescription: 'Advanced multi-agent reinforcement learning system implementing collaborative decision-making algorithms. The system uses custom Greedy optimization techniques combined with PyTorch-based neural networks to enable autonomous agents to work together efficiently in complex environments.',
    image: '/images/projects/project1.jpg',
    technologies: ['Python', 'PyTorch', 'RL', 'OpenAI Gym', 'NumPy', 'TensorBoard'],
    achievements: [
      'Improved task completion by 70%',
      'Cut decision-making time by 40%',
      'Analyzed 1M+ data points',
      'Boosted efficiency by 25%'
    ],
    features: [
      'Multi-agent coordination system',
      'Custom Greedy algorithm for optimization',
      'Real-time visualization dashboard',
      'Scalable architecture for 100+ agents',
      'Performance metrics tracking',
      'Advanced reward shaping mechanisms'
    ],
    githubUrl: 'https://github.com/OneTeraByte7/AI-for-Football',
    category: 'ai'
  },
  {
    id: 'healthcare-system',
    title: 'HealthCare Monitoring System for Rural Areas',
    description: 'Full-stack rural healthcare platform with interactive dashboards and advanced data analytics.',
    longDescription: 'Comprehensive healthcare monitoring platform designed specifically for rural areas with limited internet connectivity. Features offline-first architecture, real-time patient monitoring, and advanced data visualization using Tableau and Power BI integration.',
    image: '/images/projects/project2.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'Tableau', 'Power BI', 'WebSocket'],
    achievements: [
      'Supports 5,000+ concurrent users',
      'Interactive Tableau & Power BI dashboards',
      'Processed 500,000+ data points',
      'Cut processing time by 35%'
    ],
    features: [
      'Real-time patient monitoring system',
      'Offline-first Progressive Web App',
      'Interactive data visualization dashboards',
      'Automated health alert system',
      'Multi-language support for accessibility',
      'Secure patient data encryption',
      'Mobile-responsive design'
    ],
    githubUrl: 'https://github.com/OneTeraByte7/Techathon2025',
    liveUrl: '#',
    category: 'fullstack'
  },
  {
    id: 'ai-scheduler',
    title: 'AI Scheduling Assistant',
    description: 'Agentic AI scheduler using LLMs to automate meetings via natural language processing.',
    longDescription: 'Intelligent scheduling assistant powered by Large Language Models (LLMs) that understands natural language requests and automatically manages calendar events. Deployed on AMD MI300 GPUs using vLLM for optimal performance and low latency.',
    image: '/images/projects/project3.jpg',
    technologies: ['Python', 'Flask', 'vLLM', 'AMD GPU', 'OAuth 2.0', 'Google Calendar API', 'LangChain'],
    achievements: [
      'Automated meeting scheduling via NLP',
      'Google Calendar & OAuth 2.0 integration',
      'Intelligent conflict resolution',
      'Deployed on AMD MI300 GPUs'
    ],
    features: [
      'Natural language understanding',
      'Smart conflict detection and resolution',
      'Multi-calendar support',
      'Time zone intelligent scheduling',
      'Email notification system',
      'Meeting priority management',
      'Integration with Zoom, Google Meet',
      'Voice command support'
    ],
    githubUrl: 'https://github.com/OneTeraByte7/AMD-MI300-GPU-HACKATHON_2025',
    category: 'ai'
  }
  ,
  {
    id: 'mlops-churn',
    title: 'MLOps Pipeline — MLflow + FastAPI',
    description: 'A production-ready, end-to-end MLOps pipeline for customer churn prediction in SaaS businesses.',
    longDescription: `This project demonstrates best practices for deploying machine learning models to production, including automated training, monitoring, drift detection, A/B testing, and CI/CD. It includes data versioning with DVC, experiment tracking with MLflow, model serving via FastAPI, drift detection, and automated retraining workflows.`,
    image: '/images/projects/mlops.jpg',
    technologies: ['Python', 'MLflow', 'FastAPI', 'XGBoost', 'DVC', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'GitHub Actions'],
    achievements: [
      'Reproducible experiments with MLflow',
      'Data versioning and lineage with DVC',
      'Automated retraining and safe deployment',
      'Integrated monitoring, drift detection and A/B testing'
    ],
    features: [
      'Data Versioning (DVC) and reproducible pipelines',
      'Experiment Tracking and Model Registry (MLflow)',
      'Automated training with XGBoost and early stopping',
      'Model Serving API using FastAPI with health & metrics endpoints',
      'A/B testing infrastructure with traffic splitting',
      'Feature & label drift detection (PSI, KS tests)',
      'Prometheus metrics and Grafana dashboards',
      'CI/CD with GitHub Actions and safe rollback mechanisms'
    ],
    githubUrl: 'https://github.com/OneTeraByte7/MLOps',
    liveUrl: '#',
    category: 'fullstack'
  }
];

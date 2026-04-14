export interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
  roles: string[];
  social: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  stats: {
    projects: number;
    hackathons: number;
    leetcode: number;
    internships: number;
  };
  experience: {
    company: string;
    role: string;
    duration: string;
    location: string;
    logo: string;
    bullets: string[];
    tech: string[];
  }[];
  projects: {
    name: string;
    description: string;
    image: string;
    tech: string[];
    category: "WEB" | "ML" | "TOOLS" | "SYSTEMS";
    github?: string;
    demo?: string;
    featured?: boolean;
  }[];
  hackathons: {
    name: string;
    achievement: "1st Place" | "Finalist" | "Top 10" | string;
    date: string;
    location: string;
    description: string;
    image: string;
    teamSize: number;
    builtWith: string[];
    links?: {
      demo?: string;
      github?: string;
    };
  }[];
  skills: {
    languages: { name: string; icon: string; proficiency: number }[];
    frameworks: { name: string; icon: string; proficiency: number }[];
    databases: { name: string; icon: string; proficiency?: number }[];
    tools: { name: string; icon: string; proficiency?: number }[];
  };
  competitive: {
    totalSolved: number;
    platforms: {
      name: string;
      logo: string;
      rating?: number;
      solved: number;
      globalRank: string;
      contests: number;
      color: 'orange' | 'blue' | 'green' | string;
    }[];
  };
  extras: {
    name: string;
    role: string;
    year: string;
    description: string;
    photo: string;
  }[];
}

export const portfolio: PortfolioData = {
  name: "Soham J Suryawanshi",
  tagline: "I build systems that learn, scale, and outlast the hype.",
  bio: "Hi, I'm Soham. I focus on building resilient software architectures and exploring the frontiers of machine learning. I believe in writing code that is not just functional, but beautiful and efficient.",
  roles: ["Software Developer Engineer", "Machine Learning Engineer"],
  social: {
    github: "https://github.com/OneTeraByte7",
    linkedin: "https://www.linkedin.com/in/sohamjs1313",
    email: "mailto:justforcoding13@gmail.com"
  },

  stats: {
    projects: 15,
    hackathons: 13,
    leetcode: 400,
    internships: 3,
  },

  experience: [
    {
      company: "Deep Learning Titans",
      role: "AI Engineer | Research Intern",
      duration: "Aug 2025 — Ongoing",
      location: "Pune, IND",
      logo: "/images/experience/dl.png",
      bullets: [
        "Improved model inference speed by 30% using state-of-the-art deep learning models.",
        "Maintained 95% model accuracy while optimizing performance.",
        "Automated data processing with AI workflows, reducing manual effort by 60%.",
        "Guided strategy for 5+ AI projects by benchmarking model performance.",
        "Boosted operational efficiency by 25% through ML model integration."
      ],
      tech: ["PyTorch", "Python", "Deep Learning", "Machine Learning"],
    },
    {
      company: "hackNcrafts",
      role: "Full Stack Developer Intern",
      duration: "June 2025 — July 2025",
      location: "Pune, IND",
      logo: "/images/experience/hnc.png",
      bullets: [
        "Delivered 3 full-stack websites for diverse clients using the MERN stack.",
        "Led backend development for the Meetocure healthcare application.",
        "Built a scalable RESTful API to handle over 10,000 patient data entries.",
        "Increased user engagement by 40% with real-time WebSocket features.",
        "Improved application performance by 50% by optimizing database queries."
      ],
      tech: ["MongoDB", "Express.js", "React", "Node.js"],
    }
  ],

  projects: [
    {
      name: "Autonomous multi-Agent RL Simulator",
      description: "Developed a multi-agent RL simulation to train agents in collaborative tasks, improving completion by 70%.",
      image: "/images/projects/project1.jpg",
      tech: ["Python", "PyTorch", "Reinforcement Learning", "OpenAI Gym"],
      category: "ML",
      github: "https://github.com/OneTeraByte7/AI-for-Delivery.git",
      featured: true,
    },
    {
      name: "HealthCare Monitoring System for Rural Areas",
      description: "Architected a full-stack rural healthcare platform supporting over 5,000 concurrent users with Tableau & Power BI dashboards.",
      image: "/images/projects/project2.jpg",
      tech: ["React", "Node.js", "MongoDB", "Express.js", "GraphQL"],
      category: "WEB",
      github: "https://github.com/justforcoding13",
      demo: "https://meet-o-cure.vercel.app/",
      featured: true,
    },
    {
      name: "AI Scheduling Assistant",
      description: "Built an agentic AI scheduler using Python, Flask, and vLLM to automate meetings via natural language.",
      image: "/images/projects/project3.jpg",
      tech: ["Python", "Flask", "vLLM", "Google Calendar API"],
      category: "ML",
      github: "https://github.com/OneTeraByte7/AMD-MI300-GPU-HACKATHON_2025.git",
      featured: true,
    },
    {
      name: "MLOps Churn Prediction Pipeline",
      description: "A production-ready, end-to-end MLOps pipeline for customer churn prediction. Features automated training, MLflow tracking, FastAPI serving, and CI/CD.",
      image: "/images/projects/mlops.png",
      tech: ["Python", "MLflow", "FastAPI", "GitHub Actions"],
      category: "ML",
      github: "https://github.com/OneTeraByte7/MLOps.git",
      featured: true,
    },
    {
      name: "Collision Detection AI - CodeClash2025",
      description: "An AI-powered system detecting real-world vehicle accident risques using custom machine learning models and live video processing.",
      image: "/images/projects/collision.jpg",
      tech: ["Python", "Machine Learning", "Scikit-Learn", "OpenCV"],
      category: "ML",
      github: "https://github.com/OneTeraByte7/CodeClash2025-Pinaka_programmers.git",
      featured: true,
    },
    {
      name: "Autonomous CI/CD Healing Agent",
      description: "A full-stack multi-agent system that autonomously discovers, fixes, and commits CI/CD pipeline failures using Gemini AI within 5 minutes.",
      image: "/images/projects/rift.png",
      tech: ["React", "Gemini AI", "Python", "DevOps"],
      category: "TOOLS",
      github: "https://github.com/OneTeraByte7/RIFT_2026.git",
      demo: "https://rift-2026-kappa.vercel.app/",
      featured: true,
    }
  ],

  hackathons: [
    {
      name: "Smart India Hackathon Grand Finale 2025",
      achievement: "Top 5 Finalist",
      date: "December 2025",
      location: "Bangalore & Pune",
      description: "Developed cooperative reinforcement framework coordinating 20+ aerial units, reaching 95% defense effectiveness. Analyzed 120Hz sensor streams through autonomous prioritization logic, finishing fifth nationwide among 500 teams.",
      image: "/images/sih/certificate.jpg",
      teamSize: 6,
      builtWith: ["Robotics", "Drones", "Machine Learning", "Reinforcement Learning", "Real-time Systems"],
    },
    {
      name: "IEEE CodeClash International Hackathon",
      achievement: "3rd Place Winner",
      date: "March 2025",
      location: "Global",
      description: "Developed machine learning models for real-time collision detection in foggy weather. Achieved 85%+ accuracy using a dataset of over 500,000 data points.",
      image: "/images/ieee/poster.webp",
      teamSize: 4,
      builtWith: ["Machine Learning", "Python", "AI"],
    },
    {
      name: "NST x Blinkit Hackathon - Teckron 2025",
      achievement: "Top 16 Finalist",
      date: "March 2025",
      location: "India",
      description: "Built an AI-powered waste classification platform for dark stores and micro-fulfillment centers that automates waste segregation, tracks store-wise performance, and supports real-time operational decisions.",
      image: "/images/nst/certificate.png",
      teamSize: 4,
      builtWith: ["AI", "Machine Learning", "Web App"],
      links: {
        demo: "https://hackron2025-roan.vercel.app/"
      },
    },
    {
      name: "RIFT 2026 Hackathon",
      achievement: "Semifinalist",
      date: "March 2026",
      location: "India",
      description: "Developed an Autonomous CI/CD Healing Agent that autonomously detects, fixes, and commits pipeline failures. Built a full-stack multi-agent system using React, Gemini AI, and DevOps automation. Selected as one of 10 semifinalists from 200 teams across 5 problem statements (2 teams per statement).",
      image: "/images/hackathons/rift.jpg",
      teamSize: 4,
      builtWith: ["AI/ML", "DevOps Automation", "React", "Gemini AI", "CI/CD", "Full-Stack"],
    }
  ],

  skills: {
    languages: [
      { name: "C++", icon: "cplusplus", proficiency: 90 },
      { name: "Python", icon: "python", proficiency: 90 },
      { name: "TypeScript", icon: "typescript", proficiency: 85 }
    ],
    frameworks: [
      { name: "React", icon: "react", proficiency: 85 },
      { name: "Node.js", icon: "nodejs", proficiency: 80 },
      { name: "Express.js", icon: "express", proficiency: 80 }
    ],
    databases: [
      { name: "PostgreSQL", icon: "postgresql", proficiency: 80 },
      { name: "MongoDB", icon: "mongodb", proficiency: 85 },
      { name: "MySQL", icon: "mysql", proficiency: 80 }
    ],
    tools: [
      { name: "Git", icon: "git", proficiency: 90 },
      { name: "PyTorch", icon: "pytorch", proficiency: 85 },
      { name: "TensorFlow", icon: "tensorflow", proficiency: 75 }
    ],
  },

  competitive: {
    totalSolved: 400,
    platforms: [
      {
        name: "LeetCode",
        logo: "/images/achieve/leetcode-logo.png",
        solved: 776,
        rating: 623,
        globalRank: "62,407",
        contests: 2,
        color: "orange",
      },
      {
        name: "Codeforces",
        logo: "/images/achieve/codeforces-logo.png",
        solved: 20,
        globalRank: "Newbie",
        rating: 871,
        contests: 3,
        color: "blue",
      }
    ]
  },

  extras: [
    {
      name: "Global Ambassador",
      role: "Ambassador",
      year: "2024",
      description: "Stanford's Code in Place",
      photo: "/images/extra/cip.png",
    },
    {
      name: "Prayaas Youth Foundation",
      role: "Volunteer",
      year: "2023",
      description: "Volunteered in Prayaas Youth Foundation",
      photo: "/images/extra/pyf.png",
    }
  ],
};

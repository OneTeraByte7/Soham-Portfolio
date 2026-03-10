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
      rating: number;
      solved: number;
      maxRating: number;
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
  roles: ["Software Developer", "ML Developer"],
  social: {
    github: "https://github.com/OneTeraByte7",
    linkedin: "https://www.linkedin.com/in/sohamjs1313",
    email: "mailto:justforcoding13@gmail.com"
  },

  stats: {
    projects: 15,
    hackathons: 8,
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
      github: "https://github.com/justforcoding13",
      featured: true,
    },
    {
      name: "HealthCare Monitoring System for Rural Areas",
      description: "Architected a full-stack rural healthcare platform supporting over 5,000 concurrent users with Tableau & Power BI dashboards.",
      image: "/images/projects/project2.jpg",
      tech: ["React", "Node.js", "MongoDB", "Express.js", "GraphQL"],
      category: "WEB",
      github: "https://github.com/justforcoding13",
      featured: true,
    },
    {
      name: "AI Scheduling Assistant",
      description: "Built an agentic AI scheduler using Python, Flask, and vLLM to automate meetings via natural language.",
      image: "/images/projects/project3.jpg",
      tech: ["Python", "Flask", "vLLM", "Google Calendar API"],
      category: "ML",
      github: "https://github.com/justforcoding13",
      featured: false,
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
      name: "NST & Blinkit Hackathon Teckron",
      achievement: "Top 16 Finalist",
      date: "March 2025",
      location: "India",
      description: "Developed a waste management automation web app for dark stores, utilizing AI to optimize waste segregation, enhancing efficiency by 60%.",
      image: "/images/nst/certificate.png",
      teamSize: 4,
      builtWith: ["AI", "Machine Learning", "Web App"],
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
        rating: 1800,
        solved: 400,
        maxRating: 1800,
        globalRank: "Top",
        contests: 30,
        color: "orange",
      },
      {
        name: "Codeforces",
        logo: "/images/achieve/codeforces-logo.png",
        rating: 1400,
        solved: 100,
        maxRating: 1400,
        globalRank: "Specialist",
        contests: 15,
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

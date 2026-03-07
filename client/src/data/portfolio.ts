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
  roles: ["Software Engineer", "ML Developer"],
  social: { 
    github: "https://github.com/YourGitHub", 
    linkedin: "https://linkedin.com/in/YourLinkedIn", 
    email: "mailto:your.email@example.com" 
  },

  stats: {
    projects: 15,
    hackathons: 8,
    leetcode: 400,
    internships: 3,
  },

  experience: [
    {
      company: "Tech Corp",
      role: "Software Engineering Intern",
      duration: "Jun 2025 — Aug 2025",
      location: "San Francisco, CA",
      logo: "public/logos/techcorp.png",
      bullets: [
        "Developed and maintained critical microservices.",
        "Improved API latency by 30% through caching and query optimization.",
        "Collaborated with cross-functional teams to deliver features on time."
      ],
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    }
  ],

  projects: [
    {
      name: "Antigravity UI",
      description: "A weightless Apple-inspired portfolio built with Framer Motion and React.",
      image: "public/projects/project1.jpg",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      category: "WEB",
      github: "https://github.com",
      demo: "https://example.com",
      featured: true,
    },
    {
      name: "Neural Classifier",
      description: "Deep learning model for image recognition achieving 99% accuracy on MNIST.",
      image: "public/projects/project2.jpg",
      tech: ["PyTorch", "Python", "NumPy"],
      category: "ML",
      github: "https://github.com",
      featured: false,
    }
  ],

  hackathons: [
    {
      name: "Global AI Hackathon 2025",
      achievement: "1st Place",
      date: "Oct 2025",
      location: "New York, NY",
      description: "Built an AI-powered code reviewer that caught critical security vulnerabilities in real-time.",
      image: "public/hackathons/ai-hack.jpg",
      teamSize: 3,
      builtWith: ["OpenAI API", "React", "FastAPI", "Docker"],
    }
  ],

  skills: {
    languages:  [
      { name: "TypeScript", icon: "typescript", proficiency: 90 },
      { name: "Python", icon: "python", proficiency: 85 },
      { name: "C++", icon: "cplusplus", proficiency: 80 }
    ],
    frameworks: [
      { name: "React", icon: "react", proficiency: 95 },
      { name: "Next.js", icon: "nextjs", proficiency: 85 },
      { name: "Node.js", icon: "nodejs", proficiency: 80 }
    ],
    databases:  [
      { name: "PostgreSQL", icon: "postgresql", proficiency: 80 },
      { name: "MongoDB", icon: "mongodb", proficiency: 75 }
    ],
    tools:      [
      { name: "Git", icon: "git", proficiency: 90 },
      { name: "Docker", icon: "docker", proficiency: 75 }
    ],
  },

  competitive: {
    totalSolved: 450,
    platforms: [
      {
        name: "LeetCode",
        logo: "public/logos/leetcode.png",
        rating: 1950,
        solved: 400,
        maxRating: 2000,
        globalRank: "Top 2%",
        contests: 45,
        color: "orange",
      },
      {
        name: "Codeforces",
        logo: "public/logos/codeforces.png",
        rating: 1450,
        solved: 50,
        maxRating: 1500,
        globalRank: "Specialist",
        contests: 20,
        color: "blue",
      }
    ]
  },

  extras: [
    {
      name: "Tech Meetup Speaker",
      role: "Speaker",
      year: "2024",
      description: "Presented a talk on building scalable frontend architectures to an audience of 100+ developers.",
      photo: "public/extra/speaker.jpg",
    }
  ],
};

// Type definitions for the portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  achievements: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'ai' | 'web' | 'fullstack';
}

export interface Achievement {
  platform: 'gfg' | 'leetcode' | 'codeforces';
  username: string;
  stats: {
    problemsSolved?: number;
    score?: number;
    rating?: number;
    rank?: string;
    streak?: number;
    badges?: number;
  };
  profileUrl: string;
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
  type: 'internship' | 'full-time';
  skills: string[];
  achievements: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Hackathon {
  id: string;
  name: string;
  position: string;
  date: string;
  description: string;
  project: string;
  achievement: string;
  icon: string;
  color: string;
}

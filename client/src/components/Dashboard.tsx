import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Github, ExternalLink, Code, Database, Globe, Network, Trophy } from 'lucide-react';
import QuantumField from './QuantumField';
import AntigravityCard from './AntigravityCard';
import SkillCloud from './SkillCloud';
import { projects } from '../data/projects';
import { experiences } from '../data/experiences';
import { hackathons } from '../data/hackathons';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 100 }
  }
};

export default function Dashboard() {
  return (
    <>
      <QuantumField />
      
      {/* Scrollable content overlay */}
      <div className="relative z-10 min-h-screen w-full overflow-y-auto overflow-x-hidden pt-20 pb-32">
        <motion.div 
          className="max-w-7xl mx-auto px-6 space-y-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section 1: Hero Intro Card */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-12 items-center">
            
            <AntigravityCard glowColor="electric-blue" delay={0.1} className="w-full lg:w-[480px] p-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-2 border-electric-blue/50 shadow-[0_0_30px_rgba(0,112,243,0.5)]">
                {/* Fallback to an abstract tech logo or portrait placeholder */}
                <img 
                  src="/profile.jpg" 
                  alt="Soham" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80'; }}
                />
              </div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Systems Architect</h2>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">Soham</h1>
              
              <div className="space-y-4 mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-electric-blue/10 border border-electric-blue/30 rounded-full">
                   <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                   <span className="text-electric-blue font-bold tracking-wider">Senior SDE</span>
                </div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-neon-green/10 border border-neon-green/30 rounded-full ml-4">
                   <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse delay-100" />
                   <span className="text-neon-green font-bold tracking-wider">ML Engineer</span>
                </div>
              </div>

              <p className="text-gray-400 font-light leading-relaxed">
                Navigating the intersection of artificial intelligence, scalable distributed systems, and immersive digital platforms. Building the infrastructure of tomorrow in pure weightless motion.
              </p>
            </AntigravityCard>

            {/* Hero Right side visuals */}
            <div className="hidden lg:flex flex-col justify-center gap-8 pl-12 flex-1">
              <motion.div variants={itemVariants} className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                 <Database className="w-12 h-12 text-electric-blue drop-shadow-[0_0_15px_rgba(0,112,243,0.8)]" />
                 <span className="text-2xl font-light tracking-[0.3em] text-white">Distributed Architectures</span>
              </motion.div>
              <div className="w-px h-16 bg-gradient-to-b from-electric-blue to-transparent ml-6" />
              <motion.div variants={itemVariants} className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                 <Network className="w-12 h-12 text-neon-green drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]" />
                 <span className="text-2xl font-light tracking-[0.3em] text-white">Neural Networks</span>
              </motion.div>
              <div className="w-px h-16 bg-gradient-to-b from-neon-green to-transparent ml-6" />
              <motion.div variants={itemVariants} className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                 <Globe className="w-12 h-12 text-vivid-orange drop-shadow-[0_0_15px_rgba(255,95,31,0.8)]" />
                 <span className="text-2xl font-light tracking-[0.3em] text-white">Global Scale Deployments</span>
              </motion.div>
            </div>
            
          </motion.div>

          {/* Section 2: Experience Timeline */}
          <motion.div variants={itemVariants} className="relative z-10 w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-electric-blue uppercase text-center mb-16 drop-shadow-[0_0_15px_rgba(0,112,243,0.5)]">Trajectory</h2>
            
            <div className="relative pl-8 md:pl-0">
               {/* Glowing blue vertical line */}
               <div className="absolute left-8 md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-electric-blue/30 shadow-[0_0_15px_rgba(0,112,243,0.8)]" />

               <div className="space-y-16">
                  {experiences.map((exp, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div key={exp.id} className={`relative flex flex-col md:flex-row items-center justify-between w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                         {/* Timeline Node */}
                         <div className="absolute left-0 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-electric-blue z-20 group-hover:scale-150 group-hover:bg-electric-blue transition-all duration-300 shadow-[0_0_20px_rgba(0,112,243,1)]" />
                         
                         <div className="w-full md:w-[45%] pl-12 md:pl-0 mt-4 md:mt-0">
                            <Link to={`/experience/${exp.id}`} className="block">
                              <AntigravityCard glowColor="electric-blue" delay={idx * 0.15} className="p-8 hover:border-electric-blue">
                                <span className="text-xs tracking-widest uppercase text-electric-blue font-bold mb-2 block">{exp.duration}</span>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-electric-blue transition-colors">{exp.role}</h3>
                                <p className="text-gray-400 font-medium mb-6">{exp.company}</p>
                                <div className="flex flex-wrap gap-2">
                                  {exp.skills.slice(0, 4).map(skill => (
                                    <span key={skill} className="px-2.5 py-1 text-xs font-semibold rounded border border-electric-blue/30 bg-electric-blue/10 text-electric-blue">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </AntigravityCard>
                            </Link>
                         </div>
                         <div className="hidden md:block w-full md:w-[45%]" />
                      </div>
                    );
                  })}
               </div>
            </div>
          </motion.div>

          {/* Section 3: Bento Grid for Projects (Green) and Hackathons (Orange) */}
          <motion.div variants={itemVariants} className="w-full">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-white uppercase text-center mb-16">
              <span className="text-neon-green drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">Nodes</span> & <span className="text-vivid-orange drop-shadow-[0_0_15px_rgba(255,95,31,0.5)]">Wins</span>
            </h2>

            <div className="bento-grid">
              
              {/* Highlight the top 3 hackathon wins first */}
              {hackathons.slice(0, 3).map((hack, idx) => (
                <div key={hack.id} className={`bento-item-tall project-card relative group ${idx === 0 ? 'bento-item-large' : ''}`}>
                  <Link to={`/hackathon/${hack.id}`} className="block h-full">
                    <AntigravityCard glowColor="vivid-orange" delay={idx * 0.1} className="h-full p-8 flex flex-col justify-between hover:border-vivid-orange/80">
                      
                      <div className="absolute top-0 right-0 p-6 z-20">
                         <div className="flex items-center gap-2 px-4 py-2 bg-vivid-orange/20 border border-vivid-orange/50 rounded-full animate-pulse">
                            <Trophy className="w-4 h-4 text-vivid-orange" />
                            <span className="text-vivid-orange font-bold text-xs">WIN #{idx + 1}</span>
                         </div>
                      </div>

                      <div className="relative z-10 flex-1 flex flex-col pt-12">
                         <h3 className="text-3xl md:text-4xl font-black text-white mb-4 line-clamp-2">{hack.name}</h3>
                         <p className="text-vivid-orange font-bold text-lg mb-6">{hack.position}</p>
                         <p className="text-gray-400 leading-relaxed line-clamp-3 mb-8">{hack.description}</p>
                         
                         <div className="flex flex-wrap gap-3 mt-auto">
                            {hack.tags?.slice(0, 3).map(tag => (
                              <span key={tag} className="px-3 py-1.5 bg-black border border-vivid-orange/30 text-vivid-orange text-xs font-bold rounded-md">
                                {tag}
                              </span>
                            ))}
                         </div>
                      </div>
                      
                      {/* Subdued background visual for hackathon cards */}
                      <div className="absolute bottom-[-10%] right-[-10%] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                         <Code className="w-64 h-64 text-vivid-orange" />
                      </div>
                    </AntigravityCard>
                  </Link>
                </div>
              ))}

              {/* Projects (Green Glow) filling out the grid */}
              {projects.map((project, idx) => (
                <div key={project.id} className="project-card relative group">
                  <Link to={`/project/${project.id}`} className="block h-full">
                    <AntigravityCard glowColor="neon-green" delay={0.4 + (idx * 0.1)} className="h-full p-0 flex flex-col hover:border-neon-green/80">
                      
                      <div className="h-48 relative overflow-hidden border-b border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 grayscale group-hover:grayscale-0"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80'; }}
                        />
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                          {project.githubUrl && (
                            <div className="p-2 border border-neon-green/30 bg-black/60 rounded-full backdrop-blur-md text-gray-300">
                              <Github className="w-4 h-4" />
                            </div>
                          )}
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <div className="p-2 border border-neon-green/30 bg-black/60 rounded-full backdrop-blur-md text-gray-300">
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.technologies.slice(0, 3).map(tech => (
                            <span key={tech} className="px-2.5 py-1 text-xs font-bold rounded-md bg-neon-green/10 border border-neon-green/20 text-neon-green">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-white/5 border border-white/10 text-gray-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                    </AntigravityCard>
                  </Link>
                </div>
              ))}
              
            </div>
          </motion.div>

          {/* Section 4: Skills Cloud Component */}
          <motion.div variants={itemVariants} className="w-full pt-20">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold tracking-[0.2em] text-white uppercase mb-4">Core Competencies</h2>
               <p className="text-gray-500 font-light tracking-widest text-sm uppercase">Neural Nodes Online</p>
            </div>
            
            <AntigravityCard glowColor="electric-blue" className="w-full p-2 border-0 bg-transparent shadow-none" delay={0.2}>
               <SkillCloud />
            </AntigravityCard>
          </motion.div>
          
        </motion.div>
      </div>
    </>
  );
}

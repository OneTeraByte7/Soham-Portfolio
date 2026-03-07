import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/projects';
import QuantumField from './QuantumField';
import GlassCard from './GlassCard';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <Link to="/" className="text-electric-blue hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-obsidian text-white overflow-hidden">
      {/* Background stays persistent if we place it globally, but for now we render per page or globally */}
      <QuantumField />
      
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-20">
          
          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-electric-blue transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Back to Dashboard</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-16"
          >
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-3 py-1 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold uppercase tracking-widest rounded-full">
                {project.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex gap-4 pt-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-md transition-all group">
                  <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
                  <span className="font-medium text-gray-200 group-hover:text-white">View Source</span>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-electric-blue/10 hover:bg-electric-blue/20 border border-electric-blue/30 rounded-xl backdrop-blur-md transition-all group shadow-[0_0_15px_rgba(0,112,243,0.2)] hover:shadow-[0_0_25px_rgba(0,112,243,0.4)] text-electric-blue text-shadow-sm">
                  <ExternalLink className="w-5 h-5 group-hover:drop-shadow-neon" />
                  <span className="font-medium">Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[21/9] bg-slate-grey"
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80"></div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 space-y-12"
            >
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-electric-blue"></div>
                  Overview
                </h3>
                <div className="text-gray-300 leading-relaxed space-y-4 font-light text-lg">
                  {project.longDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-neon-green"></div>
                  Key Features
                </h3>
                <div className="grid gap-4">
                  {project.features.map((feature, i) => (
                    <GlassCard key={i} className="p-4 flex items-start gap-4" delay={0.4 + (i * 0.1)}>
                      <CheckCircle2 className="w-6 h-6 text-neon-green shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </GlassCard>
                  ))}
                </div>
              </section>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Technologies */}
              <GlassCard className="p-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* Achievements */}
              <GlassCard className="p-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Achievements & Metrics</h4>
                <ul className="space-y-4">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-electric-blue mt-2 shrink-0 shadow-[0_0_8px_rgba(0,112,243,0.8)]"></div>
                      <span className="text-gray-300 text-sm leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

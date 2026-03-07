import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Tag } from 'lucide-react';
import { PortfolioData } from '../../data/portfolio';

interface ProjectModalProps {
  project: PortfolioData["projects"][0] | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pt-20 pb-10 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl custom-scrollbar z-10 flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-dim hover:text-white transition-colors bg-black/50 rounded-full border border-white/10 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-80 shrink-0">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add('bg-[#111]', 'flex', 'items-center', 'justify-center');
                  e.currentTarget.parentElement!.innerHTML = `<span class="font-mono text-3xl text-dim">${project.name}</span>`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
            </div>

            {/* Content Body */}
            <div className="p-8 md:p-12 relative -mt-20 z-10 flex flex-col gap-8">
              
              {/* Header Info */}
              <div>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-green/10 border border-green/30 text-green font-mono text-xs uppercase tracking-widest rounded-full">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 bg-orange/10 border border-orange/30 text-orange font-mono text-xs uppercase tracking-widest rounded-full flex items-center gap-2">
                       FEATURED
                    </span>
                  )}
                </div>
                <h2 className="text-4xl md:text-5xl font-thin tracking-tight text-white mb-4">
                  {project.name}
                </h2>
                <p className="text-xl text-dim leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {/* Technologies */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h3 className="text-lg font-mono text-white mb-4 flex items-center gap-3">
                    <div className="w-6 h-px bg-blue"></div>
                    TECHNOLOGIES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 bg-[#111] border border-white/10 rounded-xl text-sm font-mono text-dim shadow-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Links */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col justify-start">
                   <h3 className="text-lg font-mono text-white mb-4 flex items-center gap-3">
                    <div className="w-6 h-px bg-orange"></div>
                    LINKS
                  </h3>
                  <div className="flex flex-col gap-4">
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group w-fit">
                        <Github className="w-5 h-5 text-dim group-hover:text-white" />
                        <span className="font-mono text-sm text-dim group-hover:text-white">View Source Code</span>
                      </a>
                    ) : (
                      <div className="text-dim font-mono text-sm">No repository link available.</div>
                    )}
                    
                    {project.demo && project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-green/10 hover:bg-green/20 border border-green/30 rounded-xl transition-all group shadow-[0_0_15px_rgba(0,255,136,0.1)] hover:shadow-[0_0_25px_rgba(0,255,136,0.2)] text-green w-fit">
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-mono text-sm">Live Demo</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
              
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

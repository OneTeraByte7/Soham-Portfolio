import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { SectionLabel } from '../ui/SectionLabel';
import { GlowCard } from '../ui/GlowCard';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectModal } from '../ui/ProjectModal';

export function Projects() {
  const [filter, setFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const filters = ['ALL', 'WEB', 'ML', 'TOOLS', 'SYSTEMS'];

  const filteredProjects = portfolio.projects.filter(p => 
    filter === 'ALL' || p.category === filter
  );

  const featured = filteredProjects.filter(p => p.featured);
  const others = filteredProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-32 relative min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionLabel label="// 03" title="Projects" />

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-6 mb-16 border-b border-white/5 pb-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs tracking-widest uppercase pb-1 transition-colors relative ${
                filter === f ? 'text-green' : 'text-muted hover:text-white'
              }`}
            >
              {f}
              {filter === f && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-px bg-green"
                />
              )}
            </button>
          ))}
        </div>

        <motion.div layout className="flex flex-col gap-12">
          <AnimatePresence mode="popLayout">
            {/* Featured Projects */}
            {featured.map(project => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <GlowCard glowColor="blue" className="group overflow-hidden">
                  <div className="flex flex-col lg:flex-row min-h-[400px]">
                    <div className="w-full lg:w-3/5 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.classList.add('bg-[#111]', 'flex', 'items-center', 'justify-center');
                          e.currentTarget.parentElement!.innerHTML = `<span class="font-mono text-2xl text-dim">${project.name}</span>`;
                        }}
                      />
                    </div>
                    <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-[radial-gradient(ellipse_at_right,rgba(0,212,255,0.05),transparent)]">
                      <h3 className="text-3xl font-thin text-white mb-4">{project.name}</h3>
                      <p className="text-dim text-sm leading-relaxed mb-8 hidden md:block">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map(t => (
                          <span key={t} className="font-mono text-xs text-orange bg-orange/5 border border-orange/10 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 mt-auto">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-xs text-muted hover:text-green transition-colors">
                            <Github className="w-4 h-4" /> REPO
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-xs text-muted hover:text-green transition-colors">
                            <ExternalLink className="w-4 h-4" /> LIVE
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}

            {/* Grid Projects */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {others.map((project, i) => (
                  <motion.div
                    key={project.name}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <GlowCard glowColor="green" className="h-full flex flex-col group overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                      <div className="aspect-video overflow-hidden border-b border-[#1a1a1a]">
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.classList.add('bg-[#111]', 'flex', 'items-center', 'justify-center');
                            e.currentTarget.parentElement!.innerHTML = `<span class="font-mono text-xl text-dim">${project.name}</span>`;
                          }}
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-mono text-blue font-semibold mb-3">{project.name}</h3>
                        <p className="text-dim text-sm leading-relaxed mb-6 flex-1">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.slice(0, 3).map(t => (
                            <span key={t} className="font-mono text-[10px] text-orange border border-orange/20 px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#1a1a1a]">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="text-muted hover:text-green transition-colors">
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted hover:text-green transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
      
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building, X } from 'lucide-react';
import { PortfolioData } from '../../data/portfolio';
import { GlowCard } from './GlowCard';

interface ExperienceModalProps {
  experience: PortfolioData["experience"][0] | null;
  onClose: () => void;
}

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (experience) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [experience]);

  return (
    <AnimatePresence>
      {experience && (
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
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl custom-scrollbar z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-dim hover:text-white transition-colors bg-black/50 rounded-full border border-white/10 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Hero */}
            <div className="relative p-8 md:p-12 pb-8 border-b border-white/5 flex flex-col items-center text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,136,0.1),transparent_50%)] pointer-events-none" />
              
              {experience.logo ? (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#111] p-3 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.15)] mb-6 z-10">
                   <img src={experience.logo} alt={experience.company} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display='none' }} />
                </div>
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#111] to-[#222] border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.15)] mb-6 z-10">
                   <Building className="w-10 h-10 text-green" />
                </div>
              )}
              
              <h2 className="text-3xl md:text-5xl font-thin tracking-tight text-white mb-2 z-10">
                {experience.role}
              </h2>
              <p className="text-xl md:text-2xl font-mono text-green mb-6 z-10">
                {experience.company}
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm font-mono z-10">
                <span className="text-dim border border-white/10 px-3 py-1.5 rounded-full bg-white/5">{experience.duration}</span>
                <span className="text-dim border border-white/10 px-3 py-1.5 rounded-full bg-white/5">{experience.location}</span>
                <span className="text-blue border border-blue/20 bg-blue/5 px-3 py-1.5 rounded-full">INTERNSHIP</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 md:p-12 space-y-12 bg-black/40">
              
              {/* Responsibilities */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <h3 className="text-lg font-mono text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-green"></div>
                  RESPONSIBILITIES
                </h3>
                <div className="space-y-4">
                  {experience.bullets.map((resp, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 hover:bg-white/5 border-l-2 border-transparent hover:border-green transition-all rounded-r-xl">
                      <ArrowRight className="w-5 h-5 text-green shrink-0 mt-0.5" />
                      <p className="text-dim leading-relaxed font-light">{resp}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Technologies */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <h3 className="text-lg font-mono text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-blue"></div>
                  TECHNOLOGIES
                </h3>
                <div className="flex flex-wrap gap-3">
                  {experience.tech.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-[#111] border border-white/10 rounded-xl text-sm font-mono text-dim shadow-lg hover:border-green hover:text-green transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
              
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { SectionLabel } from '../ui/SectionLabel';
import { GlowCard } from '../ui/GlowCard';
import { useState } from 'react';
import { ExperienceModal } from '../ui/ExperienceModal';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 relative min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionLabel label="// 02" title="Experience" />

        <div className="relative mt-20" ref={containerRef}>
          {/* Animated Timeline Line */}
          <div className="absolute left-0 lg:left-1/2 md:translate-x-[-1px] top-0 bottom-0 w-px bg-[#111] hidden md:block">
            <motion.div 
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-green/0 via-green/80 to-green/0"
            />
          </div>

          <div className="absolute left-10 md:hidden top-0 bottom-0 w-px bg-[#111]">
            <motion.div 
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-green/0 via-green/80 to-green/0"
            />
          </div>

          <div className="flex flex-col gap-12 lg:gap-24">
            {portfolio.experience.map((exp, index) => {
               const isLeft = index % 2 === 0;
               return (
                 <ExperienceItem key={index} experience={exp} isLeft={isLeft} index={index} onClick={() => setSelectedExperience(exp)} />
               );
            })}
          </div>
        </div>
      </div>

      <ExperienceModal 
        experience={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
    </section>
  );
}

function ExperienceItem({ experience, isLeft, index, onClick }: { experience: any, isLeft: boolean, index: number, onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row ${isLeft ? 'md:flex-row-reverse' : ''} justify-center md:justify-between items-start md:items-center w-full pl-20 md:pl-0`}>
      
      {/* Mobile Dot */}
      <div className="absolute left-[34px] md:hidden top-8 flex items-center justify-center -translate-x-1/2 w-8 h-8 z-10">
        <div className={`w-3 h-3 rounded-full border-2 border-green bg-black transition-shadow duration-700 ${inView ? 'shadow-[0_0_12px_#00ff88]' : ''}`} />
      </div>

      {/* Desktop Empty Space */}
      <div className="hidden md:block w-1/2" />

      {/* Desktop Dot */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 z-10">
        <div className={`w-3 h-3 rounded-full border-2 border-green bg-black transition-shadow duration-700 ${inView ? 'shadow-[0_0_12px_#00ff88]' : ''}`} />
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 30 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-[calc(50%-3rem)] cursor-pointer group`}
        onClick={onClick}
      >
        <GlowCard className="p-8 transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#111] overflow-hidden flex items-center justify-center border border-white/10 shrink-0">
                <img src={experience.logo} alt={experience.company} className="w-6 h-6 object-contain" onError={(e) => { e.currentTarget.style.display='none' }} />
              </div>
              <div>
                <h4 className="font-mono text-blue text-lg font-semibold leading-tight">{experience.company}</h4>
                <div className="font-mono text-xs text-orange mt-1">{experience.duration}</div>
              </div>
            </div>
          </div>

          <h3 className="text-green font-semibold text-xl mt-4 mb-2">{experience.role}</h3>
          
          <div className="inline-block font-mono text-xs text-muted border border-muted/30 px-2 py-0.5 rounded mb-6">
            {experience.location}
          </div>

          <ul className="space-y-3 mb-6">
            {experience.bullets.map((bullet: string, i: number) => (
              <li key={i} className="text-dim text-sm leading-relaxed flex items-start">
                <span className="text-green mr-2 mt-0.5">▸</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech: string, i: number) => (
              <span key={i} className="font-mono text-[11px] bg-[#111] border border-white/10 text-dim px-2 py-1 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}

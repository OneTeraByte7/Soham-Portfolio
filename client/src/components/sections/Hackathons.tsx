import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { SectionLabel } from '../ui/SectionLabel';
import { GlowCard } from '../ui/GlowCard';

export function Hackathons() {
  const statRef = useRef(null);
  const isInView = useInView(statRef, { once: true, margin: "-100px" });

  const total = portfolio.stats.hackathons;
  const wins = portfolio.hackathons.filter(h => h.achievement.includes("1st")).length;

  return (
    <section id="hackathons" className="py-32 relative min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionLabel label="// 04" title="Hackathons" />

        <div className="mb-24" ref={statRef}>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl font-thin text-white leading-tight"
          >
            {total} Hackathons. {wins} Wins. <span className="text-muted">0 Regrets.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolio.hackathons.map((hackathon, index) => (
            <HackathonCard key={index} hackathon={hackathon} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HackathonCard({ hackathon, index }: { hackathon: any, index: number }) {
  const isWinner = hackathon.achievement.toLowerCase().includes('1st');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <GlowCard hover={false} className="overflow-hidden group flex flex-col h-full border-none">
        
        {/* Header Image */}
        <div className="relative aspect-[16/9] overflow-hidden w-full">
          <img 
            src={hackathon.image} 
            alt={hackathon.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add('bg-black');
              // Create a canvas placeholder effect with CSS
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-[#0d0d0d]" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="font-mono text-white font-semibold text-xl md:text-2xl drop-shadow-md">{hackathon.name}</h3>
          </div>

          <div className="absolute top-6 right-6">
            <div className={`relative overflow-hidden ${
              isWinner 
              ? 'bg-orange text-black font-semibold shadow-[0_0_20px_rgba(255,140,0,0.5)]' 
              : 'bg-blue text-black font-semibold shadow-[0_0_20px_rgba(0,212,255,0.5)]'
            } font-mono text-xs px-4 py-1.5 rounded-full`}>
              <span className="relative z-10">{isWinner ? '🏆 ' : '🥈 '}{hackathon.achievement}</span>
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 flex flex-col flex-1 bg-[#0d0d0d] border border-t-0 border-[#1a1a1a] rounded-b-2xl relative z-10">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <div className="font-mono text-xs text-muted">{hackathon.date} • {hackathon.location}</div>
            <div className="font-mono text-xs text-blue flex items-center gap-1">
              <span className="text-lg">👥</span> {hackathon.teamSize} members
            </div>
          </div>

          <p className="text-dim text-sm leading-relaxed mb-8 flex-1">
            {hackathon.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {hackathon.builtWith.map((tech: string, i: number) => (
              <span key={i} className="font-mono text-[10px] bg-black border border-white/10 text-muted px-2 py-1 rounded-md">
                {tech}
              </span>
            ))}
          </div>

          {/* Winner subtle gold particles wrapper would go here */}
          {isWinner && (
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden rounded-b-2xl">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,rgba(255,140,0,0.1),transparent)]" />
            </div>
          )}
        </div>

      </GlowCard>
    </motion.div>
  );
}

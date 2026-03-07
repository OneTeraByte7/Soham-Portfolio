import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { SectionLabel } from '../ui/SectionLabel';
import { GlowCard } from '../ui/GlowCard';
import { useCounter } from '../../hooks/useCounter';

export function CompetitiveProgramming() {
  const statRef = useRef(null);
  const isInView = useInView(statRef, { once: true, margin: "-100px" });
  const totalSolved = useCounter(portfolio.competitive.totalSolved, 2, isInView);

  return (
    <section id="competitive" className="py-32 relative min-h-screen bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.03),transparent_70%)]">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionLabel label="// 06" title="Competitive Programming" align="center" />

        {/* Hero Stat */}
        <div className="flex flex-col items-center justify-center text-center mt-20 mb-32" ref={statRef}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="text-[100px] md:text-[140px] font-mono font-bold text-green leading-none text-shadow-glow-green mb-4"
          >
            {totalSolved}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-mono text-sm md:text-base tracking-[0.5em] text-muted uppercase"
          >
            PROBLEMS SOLVED
          </motion.div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolio.competitive.platforms.map((platform, index) => {
            const glowColor = platform.color as 'orange' | 'blue' | 'green';
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <GlowCard glowColor={glowColor} className="h-full flex flex-col p-8 md:p-10 relative overflow-hidden group">
                  {/* Background decoration */}
                  <div className={`absolute -right-20 -top-20 w-64 h-64 bg-${platform.color}/5 rounded-full blur-[80px] group-hover:bg-${platform.color}/10 transition-colors duration-700 pointer-events-none`} />

                  <div className="flex items-center gap-6 mb-10 z-10">
                    <img src={platform.logo} alt={platform.name} className="w-12 h-12 object-contain" onError={(e) => { e.currentTarget.style.display='none' }} />
                    <div>
                      <h3 className="font-mono text-lg text-white mb-1">{platform.name}</h3>
                      <div className={`font-mono text-4xl font-bold text-${platform.color} text-shadow-glow-${platform.color}`}>
                        {platform.rating}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-8 gap-x-4 mt-auto border-t border-white/5 pt-8 z-10">
                    <div>
                      <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-2">Solved</div>
                      <div className="font-mono text-xl text-white">{platform.solved}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-2">Max Rating</div>
                      <div className="font-mono text-xl text-white">{platform.maxRating}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-2">Global Rank</div>
                      <div className="font-mono text-xl text-white">{platform.globalRank}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-2">Contests</div>
                      <div className="font-mono text-xl text-white">{platform.contests}</div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

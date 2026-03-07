import React from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { GlowCard } from '../ui/GlowCard';
import { CounterStat } from '../ui/CounterStat';
import { TerminalBlock } from '../ui/TerminalBlock';
import { SectionLabel } from '../ui/SectionLabel';

export function About() {
  const quoteRef = React.useRef(null);
  const isQuoteInView = useInView(quoteRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 lg:py-48 relative min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        
        <SectionLabel label="// 01" title="About Me" />

        {/* Big quote statement */}
        <div className="mb-32 max-w-4xl" ref={quoteRef}>
          <div className="relative overflow-hidden inline-block">
            <motion.h3 
              initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
              animate={isQuoteInView ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-thin text-white leading-[1.3] tracking-tight"
            >
              "The best code is like a well-designed tool: powerful when used, invisible when working."
            </motion.h3>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <TerminalBlock 
              filename="~/portfolio/bio.sh"
              content={`#!/bin/bash\n\necho "Initializing profile..."\nsleep 1\n\ncat << EOF\n${portfolio.bio}\nEOF\n\n# Systems active. Ready for input.`}
              typingSpeed={20}
            />
          </motion.div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <GlowCard glowColor="green" className="h-full flex items-center justify-center p-8">
                <CounterStat value={portfolio.stats.projects} label="Projects" />
              </GlowCard>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlowCard glowColor="blue" className="h-full flex items-center justify-center p-8">
                <CounterStat value={portfolio.stats.hackathons} label="Hackathons" />
              </GlowCard>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <GlowCard glowColor="orange" className="h-full flex items-center justify-center p-8">
                <CounterStat value={portfolio.stats.leetcode} label="LeetCode" />
              </GlowCard>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlowCard glowColor="green" className="h-full flex items-center justify-center p-8">
                <CounterStat value={portfolio.stats.internships} label="Internships" />
              </GlowCard>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

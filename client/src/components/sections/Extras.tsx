import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { SectionLabel } from '../ui/SectionLabel';

export function Extras() {
  return (
    <section id="extras" className="py-32 relative min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionLabel label="// 07" title="Beyond the Terminal" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-20">
          
          {/* Left: Photo Mosaic */}
          <div className="columns-2 sm:columns-3 lg:columns-2 xl:columns-3 gap-4 space-y-4">
            {portfolio.extras.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden group break-inside-avoid border border-[#1a1a1a]"
              >
                <img 
                  src={item.photo} 
                  alt={item.name} 
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.classList.add('bg-[#111]', 'aspect-square');
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <h4 className="font-mono text-white text-sm font-semibold mb-1 truncate">{item.name}</h4>
                  <span className="font-mono text-xs text-green truncate">{item.role}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Activities List */}
          <div className="flex flex-col">
            {portfolio.extras.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-8 border-b border-[#111] transition-all hover:border-l-2 hover:border-l-green hover:pl-6 -ml-0 hover:-ml-[2px]"
              >
                <div className="font-mono text-xs text-orange sm:w-16 shrink-0 mt-1">
                  {item.year}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                    <span className="font-mono text-xs text-green bg-green/5 border border-green/20 px-2 py-0.5 rounded-full">
                      {item.role}
                    </span>
                  </div>
                  <p className="text-dim text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

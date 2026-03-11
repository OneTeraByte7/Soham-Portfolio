import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { useTypewriter } from '../../hooks/useTypewriter';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
  const { displayText } = useTypewriter(portfolio.roles.join(' & '), 50, 800);

  // Line by line reveal variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient & Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_60%_10%,rgba(0,255,136,0.07),transparent_70%)] pointer-events-none" />
      {/* Particles simplified simulation */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnPgo8cmVjdCB3aWR0aD0nNCcgaGVpZ2h0PSc0JyBmaWxsPScjZmZmJyBmaWxsLW9wYWNpdHk9JzAuMScvPgo8L3N2Zz4=')] mix-blend-overlay" />

      <div className="max-w-[1200px] mx-auto px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Side: Photo Block */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="w-64 md:w-80 rounded-2xl overflow-hidden border border-white/10 animate-float shadow-2xl relative bg-surface">
              <img
                src="/images/profile/profile.jpg"
                alt={portfolio.name}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                  e.currentTarget.parentElement!.innerHTML = `<span class="text-4xl text-dim font-mono">${portfolio.name.charAt(0)}</span>`;
                }}
              />
            </div>

            {/* Badges */}
            <div className="flex justify-center lg:justify-start gap-4 mt-8">
              <div className="border border-green/40 bg-green/5 text-green font-mono text-xs px-4 py-1.5 rounded-full backdrop-blur-sm">
                ⚡ Software Engineer
              </div>
              <div className="border border-blue/40 bg-blue/5 text-blue font-mono text-xs px-4 py-1.5 rounded-full backdrop-blur-sm">
                🧠 ML Developer
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Text Block */}
        <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-orange mb-4"
          >
            PORTFOLIO — 2025
          </motion.span>

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            {portfolio.name.split(' ').map((word, i) => (
              <motion.span
                key={i}
                variants={item}
                className="inline-block text-6xl md:text-7xl xl:text-8xl font-thin tracking-tight text-white leading-none mr-4"
                style={{ fontFamily: '"SF Pro Display", system-ui, sans-serif' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Role Types out */}
          <div className="h-8 mb-6 mt-4">
            <h2 className="font-mono text-xl text-green">
              {displayText}
              {!displayText && <span className="animate-blink text-green">|</span>}
              {displayText && <span className="animate-blink text-green ml-1">|</span>}
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-dim text-lg md:text-xl font-light leading-relaxed max-w-lg mb-10"
          >
            {portfolio.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="bg-black border border-green text-green font-mono text-sm px-8 py-4 rounded-xl tracking-widest hover:bg-green hover:text-black transition-all duration-300 text-center relative overflow-hidden group"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
            </a>
            <a
              href="#about"
              className="bg-transparent border border-white/30 text-white font-mono text-sm px-8 py-4 rounded-xl tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-center"
            >
              ABOUT ME
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex gap-6"
          >
            <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="text-muted hover:text-green transition-colors p-2">
              <Github className="w-6 h-6" />
            </a>
            <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-blue transition-colors p-2">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={portfolio.social.email} className="text-muted hover:text-orange transition-colors p-2">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="font-mono text-[10px] tracking-widest text-muted mb-2">SCROLL</span>
        <div className="w-px h-12 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-green animate-scrollPulse" />
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Layout
import { Navbar } from './components/layout/Navbar';
import { SideNav } from './components/layout/SideNav';
import { Footer } from './components/layout/Footer';

// Sections
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Hackathons } from './components/sections/Hackathons';
import { Skills } from './components/sections/Skills';
import { CompetitiveProgramming } from './components/sections/CompetitiveProgramming';
import { Extras } from './components/sections/Extras';

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-green rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        id="custom-cursor-ring"
        className="fixed top-0 left-0 w-8 h-8 border border-green/60 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 255, 136, 0.1)' : 'transparent',
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Page load sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-green/30 selection:text-white">
      <CustomCursor />
      
      {/* Top scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green via-blue to-green origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Loading Sequence */}
      {isLoading ? (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-48 h-[2px] bg-gradient-to-r from-green via-blue to-orange origin-left mb-8"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="font-mono text-xs tracking-[0.5em] text-dim uppercase"
          >
            INITIALIZING
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <SideNav />
          
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Hackathons />
            <Skills />
            <CompetitiveProgramming />
            <Extras />
          </main>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}

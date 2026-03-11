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

import { CustomCursor } from './components/ui/CustomCursor';

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

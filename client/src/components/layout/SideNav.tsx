import React, { useEffect, useState } from 'react';

const sections = ['home', 'about', 'experience', 'projects', 'hackathons', 'skills'];

export function SideNav() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
      {/* Connecting line background */}
      <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-muted/30 to-transparent -z-10" />

      {sections.map((id) => {
        const isActive = activeSection === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Go to ${id}`}
            className="group relative flex items-center justify-center w-6 h-6"
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-2 h-2 bg-green shadow-[0_0_8px_#00ff88]' 
                  : 'w-1.5 h-1.5 bg-muted group-hover:bg-white group-hover:scale-125'
              }`}
            />
            {/* Tooltip */}
            <span className="absolute left-8 px-2 py-1 rounded bg-[#111] border border-white/10 font-mono text-[10px] text-dim opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap uppercase tracking-widest pointer-events-none">
              {id}
            </span>
          </a>
        );
      })}
    </div>
  );
}

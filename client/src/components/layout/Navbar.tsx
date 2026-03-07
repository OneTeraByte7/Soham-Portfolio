import React, { useState } from 'react';
import { portfolio } from '../../data/portfolio';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Home', 'Experience', 'Projects', 'Skills'];
  const [active, setActive] = useState('Home');

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5 transition-all">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Name Prompt */}
          <div className="font-mono text-sm">
            <span className="text-dim">{'>'}</span> <span className="text-green">{portfolio.name.split(' ')[0].toLowerCase()}</span>
            <span className="animate-blink text-green ml-1 block sm:inline-block w-1.5 h-4 bg-green align-middle"></span>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setActive(link)}
                className="relative font-mono text-xs tracking-widest text-dim hover:text-white transition-colors"
              >
                {link}
                {active === link && (
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green" />
                )}
              </a>
            ))}
          </div>

          {/* Right: Badge */}
          <div className="hidden md:flex items-center border border-green/30 px-3 py-1 rounded-full bg-green/5">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
            </span>
            <span className="font-mono text-xs text-green">Available for work</span>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`block w-6 h-px bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center transition-opacity duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => {
                setActive(link);
                setIsOpen(false);
              }}
              className={`font-mono text-2xl tracking-widest ${active === link ? 'text-green' : 'text-dim hover:text-white'}`}
            >
              {link}
            </a>
          ))}
          <div className="mt-8 flex items-center border border-green/30 px-4 py-2 rounded-full bg-green/5">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green"></span>
            </span>
            <span className="font-mono text-sm text-green">Available for work</span>
          </div>
        </div>
      </div>
    </>
  );
}

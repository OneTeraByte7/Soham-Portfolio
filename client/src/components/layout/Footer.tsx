import React from 'react';
import { portfolio } from '../../data/portfolio';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#111] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 py-20">

        {/* Top Section */}
        <div className="flex flex-col items-center mb-16 relative z-10">
          <h2 className="font-mono text-2xl text-green mb-3 text-shadow-glow-green">
            {portfolio.name}
          </h2>
          <p className="text-dim text-sm text-center max-w-md mb-8">
            {portfolio.tagline}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-blue transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={portfolio.social.email} className="text-muted hover:text-orange transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            {portfolio.social.twitter && (
              <a href={portfolio.social.twitter} target="_blank" rel="noreferrer" className="text-muted hover:text-blue transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8 z-10 relative">
          <div className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {portfolio.name}. Built with Love💖.
          </div>
          <div className="font-mono text-xs text-muted">
            Engineering , Machine Learning and Passion
          </div>
        </div>
      </div>

      {/* Floating Rocket */}
      <div className="absolute right-8 bottom-8 text-2xl animate-float opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-10" onClick={() => window.scrollTo(0, 0)}>
        🚀
      </div>

      {/* Background gradient hint */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(0,255,136,0.03),transparent_70%)] pointer-events-none" />
    </footer>
  );
}

import React from 'react';
import { cn } from '../../utils/cn';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'green' | 'blue' | 'orange';
  hover?: boolean;
}

export function GlowCard({ children, className, glowColor = 'green', hover = true }: GlowCardProps) {
  const glowClasses = {
    green: 'hover:border-green/30 hover:shadow-[0_0_40px_rgba(0,255,136,0.06)]',
    blue: 'hover:border-blue/30 hover:shadow-[0_0_40px_rgba(0,212,255,0.06)]',
    orange: 'hover:border-orange/30 hover:shadow-[0_0_40px_rgba(255,140,0,0.06)]',
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] transition-all duration-500",
        hover && glowClasses[glowColor],
        className
      )}
    >
      {/* Optional decorative glow pseudo-element could go here */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

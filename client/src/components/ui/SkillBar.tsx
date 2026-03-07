import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SkillBarProps {
  name: string;
  percentage: number;
  className?: string;
}

export function SkillBar({ name, percentage, className }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Custom block rendering for the text display (e.g. ████░░░░)
  const totalBlocks = 20;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);
  const blockString = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);

  return (
    <div ref={ref} className={cn("w-full mb-4 group", className)}>
      {/* Text Row */}
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-white min-w-[80px]">{name}</span>
          <span className="font-mono text-xs text-dim hidden sm:inline-block tracking-widest">{blockString}</span>
        </div>
        <span className="font-mono text-xs text-green">{percentage}%</span>
      </div>
      
      {/* Animated Bar */}
      <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: inView ? `${percentage}%` : '0%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-green to-blue relative"
        >
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}

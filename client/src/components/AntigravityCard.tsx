import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AntigravityCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  glowColor?: 'electric-blue' | 'neon-green' | 'vivid-orange';
}

const GLOW_MAP = {
  'electric-blue': '0, 112, 243',
  'neon-green': '57, 255, 20',
  'vivid-orange': '255, 95, 31'
};

export default function AntigravityCard({ 
  children, 
  className = '', 
  delay = 0,
  glowColor = 'electric-blue',
  ...props 
}: AntigravityCardProps) {
  
  const glowRGB = GLOW_MAP[glowColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      className={`antigravity-card rounded-2xl overflow-hidden ${className}`}
      style={{
        '--glow-color': glowRGB,
      } as React.CSSProperties}
      {...props}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Interactive luminous overlay layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
    </motion.div>
  );
}

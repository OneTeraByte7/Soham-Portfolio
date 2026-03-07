import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const skills = [
  "React", "TypeScript", "Node.js", "Python", "PyTorch", 
  "TensorFlow", "Kubernetes", "Docker", "AWS", "Next.js",
  "GraphQL", "PostgreSQL", "MongoDB", "Redis", "Kafka",
  "Three.js", "WebGL", "C++", "Go", "Rust"
];

export default function SkillCloud() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-gradient-radial from-electric-blue/5 to-transparent flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl p-8 relative z-10">
          {skills.map((skill, index) => {
            // Pseudo-random but deterministic values based on index
            const isML = ['Python', 'PyTorch', 'TensorFlow'].includes(skill);
            const isBackend = ['Node.js', 'Go', 'Rust', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'C++'].includes(skill);
            
            // Assign glows based on category
            let glowClass = "text-electric-blue border-electric-blue/30 shadow-[0_0_10px_rgba(0,112,243,0.3)]";
            if (isML) glowClass = "text-neon-green border-neon-green/30 shadow-[0_0_10px_rgba(57,255,20,0.3)]";
            if (isBackend) glowClass = "text-vivid-orange border-vivid-orange/30 shadow-[0_0_10px_rgba(255,95,31,0.3)]";

            // Float parameters
            const floatDelay = index * 0.2;
            const floatDuration = 4 + (index % 3);
            
            // Mouse parallax effect strength
            const parallaxX = (index % 5 - 2) * 15;
            const parallaxY = (index % 4 - 1.5) * 15;

            return (
              <motion.div
                key={skill}
                animate={{
                  x: mousePosition.x * parallaxX,
                  y: mousePosition.y * parallaxY + (Math.sin(Date.now() / 1000 + index) * 5) - 10,
                }}
                transition={{
                  y: { duration: floatDuration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: floatDelay },
                  x: { type: "spring", stiffness: 50, damping: 20 },
                }}
                className={`px-4 py-2 rounded-full border bg-black/40 backdrop-blur-md text-sm font-semibold tracking-wide ${glowClass} hover:scale-110 transition-transform cursor-default select-none`}
              >
                {skill}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

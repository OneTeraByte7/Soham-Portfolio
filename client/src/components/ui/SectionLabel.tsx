import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionLabelProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionLabel({ label, title, subtitle, align = 'left' }: SectionLabelProps) {
  return (
    <div className={cn("mb-16", align === 'center' && "text-center flex flex-col items-center")}>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="font-mono text-xs tracking-[0.3em] uppercase text-orange mb-3"
      >
        {label}
      </motion.p>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1 }}
        className="text-4xl lg:text-5xl font-thin text-white tracking-tight"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn("h-px mt-6 bg-gradient-to-r from-green via-blue to-transparent", align === 'center' && "from-transparent via-green to-transparent")}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="text-dim text-lg mt-4 max-w-2xl font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

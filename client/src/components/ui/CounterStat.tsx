import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCounter } from '../../hooks/useCounter';
import { cn } from '../../utils/cn';

interface CounterStatProps {
  value: number;
  label: string;
  className?: string;
  duration?: number;
}

export function CounterStat({ value, label, className, duration = 1.5 }: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCounter(value, duration, inView);

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      <span className="text-5xl font-mono font-bold text-white">
        {count}
        {value >= 100 ? '+' : ''}
      </span>
      <span className="font-mono text-xs text-muted tracking-widest uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

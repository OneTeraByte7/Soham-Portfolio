import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';

interface TerminalBlockProps {
  filename?: string;
  content: string;
  typingSpeed?: number;
}

export function TerminalBlock({ filename = '~/portfolio/bio.sh', content, typingSpeed = 30 }: TerminalBlockProps) {
  const { displayText } = useTypewriter(content, typingSpeed, 500);

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-[#1f1f1f] overflow-hidden shadow-2xl">
      <div className="bg-[#141414] px-4 py-3 flex items-center gap-2 border-b border-[#1f1f1f]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="font-mono text-xs text-muted ml-2">{filename}</span>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed min-h-[200px]">
        <div className="mb-2">
          <span className="text-green">➜</span> <span className="text-blue">~</span> <span className="text-dim">{filename}</span>
        </div>
        <p className="text-dim">
          {displayText}
          <span className="animate-blink text-green inline-block w-2 ml-1">|</span>
        </p>
      </div>
    </div>
  );
}

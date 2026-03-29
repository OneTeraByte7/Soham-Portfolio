import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { hackathons as detailedHackathons } from '../../data/hackathons';
import { SectionLabel } from '../ui/SectionLabel';
import { GlowCard } from '../ui/GlowCard';
import { X, Calendar, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Utility function to determine if a hackathon is a winning achievement
 * @param achievement - The achievement string from the hackathon data
 * @returns Boolean indicating if the hackathon was won (1st place)
 */
function isWinnerAchievement(achievement: string): boolean {
  return achievement.toLowerCase().includes('1st');
}

/**
 * Utility function to format hackathon metadata
 * @param date - The date string of the hackathon
 * @param location - The location of the hackathon
 * @returns Formatted metadata string
 */
function formatHackathonMeta(date: string, location: string): string {
  return `${date} • ${location}`;
}

/**
 * Configuration constants for hackathons component
 */
const HACKATHON_CONFIG = {
  ANIMATION_DELAY: 0.1,
  SCALE_HOVER: 1.02,
  IMAGE_SCALE_ZOOM: 1.05,
  ANIMATION_DURATION: 0.8,
  INTRO_DURATION: 1,
  PARTICLE_OPACITY: 0.1,
} as const;

/**
 * Logger utility for component events
 */
const logger = {
  logHackathonSelect: (name: string, achievement: string) => {
    console.debug(`[Hackathons] Selected: ${name} - ${achievement}`);
  },
  logModalOpen: (name: string) => {
    console.debug(`[Hackathons] Modal opened for: ${name}`);
  },
  logModalClose: () => {
    console.debug(`[Hackathons] Modal closed`);
  },
  logImageError: (hackathonName: string, imageSrc: string) => {
    console.warn(`[Hackathons] Image failed to load for ${hackathonName}: ${imageSrc}`);
  },
};

/**
 * Utility to safely find a detailed hackathon by name
 */
function findDetailedHackathon(hackathonName: string) {
  try {
    return detailedHackathons.find(h => h.name === hackathonName) || null;
  } catch (error) {
    console.error('[Hackathons] Error finding detailed hackathon:', error);
    return null;
  }
}

/**
 * Utility to calculate hackathon statistics
 */
function calculateHackathonStats(hackathons: any[]) {
  try {
    const total = hackathons.length;
    const wins = hackathons.filter(h => isWinnerAchievement(h.achievement)).length;
    return { total, wins, winRate: (wins / total * 100).toFixed(1) };
  } catch (error) {
    console.error('[Hackathons] Error calculating stats:', error);
    return { total: 0, wins: 0, winRate: '0.0' };
  }
}

/**
 * Custom hook to manage modal scroll lock
 */
function useModalScrollLock(isOpen: boolean) {
  React.useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
}

/**
 * Type definitions for Hackathon data structure
 */
interface HackathonData {
  name: string;
  image: string;
  date: string;
  location: string;
  teamSize: number;
  achievement: string;
  description: string;
  builtWith: string[];
  gallery?: string[];
  highlights?: string[];
  tags?: string[];
}

export function Hackathons() {
  const statRef = useRef(null);
  const isInView = useInView(statRef, { once: true, margin: "-100px" });
  const [selectedHackathon, setSelectedHackathon] = useState<any>(null);

  const stats = calculateHackathonStats(portfolio.hackathons);
  const total = stats.total;
  const wins = stats.wins;
  
  // Component lifecycle logging
  React.useEffect(() => {
    logger.logHackathonSelect('HackathonsSection', `Mounted with ${total} hackathons`);
  }, [total]);

  return (
    <>
      <section id="hackathons" className="py-32 relative min-h-screen">
        <div className="max-w-[1200px] mx-auto px-8">
          <SectionLabel label="// 04" title="Hackathons" />

          <div className="mb-24" ref={statRef}>
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl font-thin text-white leading-tight"
            >
              {total} Hackathons. {wins} Wins. <span className="text-muted">0 Regrets.</span>
            </motion.h2>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolio.hackathons.map((hackathon, index) => (
              <HackathonCard 
                key={index} 
                hackathon={hackathon} 
                index={index} 
                onClick={() => {
                  const detailed = findDetailedHackathon(hackathon.name);
                  logger.logHackathonSelect(hackathon.name, hackathon.achievement);
                  logger.logModalOpen(hackathon.name);
                  setSelectedHackathon(detailed || hackathon);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <HackathonModal 
        hackathon={selectedHackathon} 
        onClose={() => {
          logger.logModalClose();
          setSelectedHackathon(null);
        }} 
      />
    </>
  );
}

function HackathonCard({ hackathon, index, onClick }: { hackathon: any, index: number, onClick: () => void }) {
  const isWinner = isWinnerAchievement(hackathon.achievement);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: HACKATHON_CONFIG.ANIMATION_DURATION, delay: index * HACKATHON_CONFIG.ANIMATION_DELAY }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <GlowCard hover={true} className="overflow-hidden group flex flex-col h-full border-none transition-all duration-300 hover:scale-[1.02]">
        
        {/* Header Image */}
        <div className="relative aspect-[16/9] overflow-hidden w-full">
          <img 
            src={hackathon.image} 
            alt={hackathon.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
            onError={(e) => {
              logger.logImageError(hackathon.name, hackathon.image);
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add('bg-black');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-[#0d0d0d]" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="font-mono text-white font-semibold text-xl md:text-2xl drop-shadow-md">{hackathon.name}</h3>
          </div>

          <div className="absolute top-6 right-6">
            <div className={`relative overflow-hidden ${
              isWinner 
              ? 'bg-orange text-black font-semibold shadow-[0_0_20px_rgba(255,140,0,0.5)]' 
              : 'bg-blue text-black font-semibold shadow-[0_0_20px_rgba(0,212,255,0.5)]'
            } font-mono text-xs px-4 py-1.5 rounded-full`}>
              <span className="relative z-10">{isWinner ? '🏆 ' : '🥈 '}{hackathon.achievement}</span>
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 flex flex-col flex-1 bg-[#0d0d0d] border border-t-0 border-[#1a1a1a] rounded-b-2xl relative z-10">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <div className="font-mono text-xs text-muted">{formatHackathonMeta(hackathon.date, hackathon.location)}</div>
            <div className="font-mono text-xs text-blue flex items-center gap-1">
              <span className="text-lg">👥</span> {hackathon.teamSize} members
            </div>
          </div>

          <p className="text-dim text-sm leading-relaxed mb-8 flex-1">
            {hackathon.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {hackathon.builtWith.map((tech: string, i: number) => (
              <span key={i} className="font-mono text-[10px] bg-black border border-white/10 text-muted px-2 py-1 rounded-md">
                {tech}
              </span>
            ))}
          </div>

          {/* Click to view details indicator */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-xs text-blue">Click for details →</span>
          </div>

          {/* Winner subtle gold particles wrapper would go here */}
          {isWinner && (
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden rounded-b-2xl">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,rgba(255,140,0,0.1),transparent)]" />
            </div>
          )}
        </div>

      </GlowCard>
    </motion.div>
  );
}

function HackathonModal({ hackathon, onClose }: { hackathon: any, onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (hackathon) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [hackathon]);

  if (!hackathon) return null;

  const images = hackathon.gallery || [hackathon.icon];
  const hasMultipleImages = images.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0d0d0d] border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <Trophy className="w-8 h-8 text-orange flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{hackathon.name}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-orange/20 text-orange rounded-full font-semibold">
                    {hackathon.position || hackathon.achievement}
                  </span>
                  <span className="flex items-center gap-1 text-muted">
                    <Calendar className="w-4 h-4" />
                    {hackathon.date}
                  </span>
                  {hackathon.project && (
                    <span className="text-dim">• {hackathon.project}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">About the Project</h3>
              <p className="text-dim leading-relaxed">{hackathon.description}</p>
            </div>

            {/* Highlights */}
            {hackathon.highlights && hackathon.highlights.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {hackathon.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-dim">
                      <span className="text-orange mt-1">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {hackathon.tags && hackathon.tags.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Technologies & Domains</h3>
                <div className="flex flex-wrap gap-2">
                  {hackathon.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-blue/10 border border-blue/20 text-blue rounded-md text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {images.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Certificates & Photos</h3>
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden bg-black border border-white/10">
                    <img
                      src={images[currentImageIndex]}
                      alt={`Gallery ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>
                  
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                      <div className="flex justify-center gap-2 mt-4">
                        {images.map((_: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex ? 'bg-orange w-8' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

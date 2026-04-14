import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import { hackathons } from '../data/hackathons';
import QuantumField from './QuantumField';
import GlassCard from './GlassCard';

export default function HackathonDetail() {
  const { id } = useParams();
  const hackathon = hackathons.find(h => h.id === id);

  if (!hackathon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Hackathon Not Found</h2>
          <Link to="/" className="text-neon-cyan hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-obsidian text-white overflow-hidden">
      <QuantumField />
      
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-vivid-orange transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Back to Dashboard</span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-16 text-center flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-obsidian to-slate-grey border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,95,31,0.2)] mb-4">
               <Trophy className="w-12 h-12 text-vivid-orange" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2">
              {hackathon.name}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-lg">
              <span className="font-bold text-vivid-orange">{hackathon.position}</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-2 text-gray-400"><Calendar className="w-4 h-4" /> {hackathon.date}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-12">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-vivid-orange"></div>
                  The Challenge & Solution
                </h3>
                <GlassCard className="p-8">
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    {hackathon.description}
                  </p>
                </GlassCard>
              </motion.div>

              {hackathon.highlights && hackathon.highlights.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-px bg-vivid-orange"></div>
                    Key Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {hackathon.highlights.map((highlight, idx) => (
                      <GlassCard key={idx} className="p-4 flex gap-4" delay={0.4 + (idx * 0.1)}>
                        <CheckCircle className="w-6 h-6 text-vivid-orange shrink-0" />
                        <span className="text-gray-200 text-sm leading-relaxed">{highlight}</span>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <GlassCard className="p-6 bg-vivid-orange/5 hover:border-vivid-orange/50 hover:shadow-[0_0_30px_rgba(255,95,31,0.1)] transition-all">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-vivid-orange mb-2">Category</h4>
                 <p className="text-white font-medium text-lg mb-6">{hackathon.project}</p>

                 <h4 className="text-xs font-bold uppercase tracking-widest text-vivid-orange mb-2">Major Achievement</h4>
                 <p className="text-white font-medium text-lg mb-6">{hackathon.achievement}</p>

                 {hackathon.links?.demo && (
                   <>
                     <h4 className="text-xs font-bold uppercase tracking-widest text-vivid-orange mb-2">Live Demo</h4>
                     <a
                       href={hackathon.links.demo}
                       target="_blank"
                       rel="noreferrer"
                       className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-vivid-orange text-black font-semibold transition-transform hover:scale-[1.02] mb-6"
                     >
                       <ExternalLink className="w-4 h-4" />
                       Open project
                     </a>
                   </>
                 )}
                 
                 {hackathon.tags && hackathon.tags.length > 0 && (
                   <>
                     <h4 className="text-xs font-bold uppercase tracking-widest text-vivid-orange mb-3">Tags & Domains</h4>
                     <div className="flex flex-wrap gap-2">
                       {hackathon.tags.map((tag, idx) => (
                         <span key={idx} className="px-3 py-1 bg-black/40 border border-white/5 rounded-md text-xs text-gray-300">
                           {tag}
                         </span>
                       ))}
                     </div>
                   </>
                 )}
              </GlassCard>
            </motion.div>
          </div>

          {/* Gallery Section */}
          {(hackathon.gallery && hackathon.gallery.length > 0) || hackathon.icon ? (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-20"
            >
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-400">Project Memories & Certificates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {hackathon.gallery?.map((img, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-slate-grey">
                     <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80'; }} />
                  </div>
                ))}
                {!hackathon.gallery && hackathon.icon && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-slate-grey md:col-span-2">
                     <img src={hackathon.icon} alt="Certificate" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80'; }} />
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}
          
        </div>
      </div>
    </div>
  );
}

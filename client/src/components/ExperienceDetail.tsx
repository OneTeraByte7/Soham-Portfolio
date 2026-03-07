import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building } from 'lucide-react';
import { experiences } from '../data/experiences';
import QuantumField from './QuantumField';
import GlassCard from './GlassCard';

export default function ExperienceDetail() {
  const { id } = useParams();
  const experience = experiences.find(e => e.id === id);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Not Found</h2>
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
        <div className="max-w-4xl mx-auto px-6 py-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-electric-blue transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Back to Dashboard</span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-16 text-center flex flex-col items-center"
          >
            {experience.logo ? (
              <div className="w-24 h-24 rounded-3xl bg-white p-2 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,112,243,0.2)] mb-4">
                 <img src={experience.logo} alt={experience.company} className="w-full h-full object-contain rounded-2xl" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-obsidian to-slate-grey border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,112,243,0.2)] mb-4">
                 <Building className="w-12 h-12 text-electric-blue" />
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2">
              {experience.role}
            </h1>
            <p className="text-2xl font-bold text-electric-blue mb-4">{experience.company}</p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-base font-medium">
              <span className="text-gray-400 uppercase tracking-widest">{experience.duration}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 uppercase tracking-widest">{experience.location}</span>
              <span className="text-gray-600">•</span>
              <span className="text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3 py-1 rounded-full">{experience.type}</span>
            </div>
          </motion.div>

          <div className="space-y-12">
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-px bg-electric-blue"></div>
                Key Responsibilities & Deliverables
              </h3>
              <GlassCard className="p-8">
                <ul className="space-y-6">
                  {experience.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <ArrowRight className="w-6 h-6 text-electric-blue shrink-0 mt-0.5" />
                      <p className="text-gray-300 leading-relaxed text-lg font-light">{resp}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-px bg-electric-blue"></div>
                Achievements
              </h3>
               <div className="grid sm:grid-cols-2 gap-4">
                  {experience.achievements.map((achievement, idx) => (
                    <GlassCard key={idx} className="p-4 bg-electric-blue/5 hover:bg-electric-blue/10 flex gap-4 transition-colors" delay={0.4 + (idx * 0.1)}>
                      <div className="w-2 h-2 rounded-full bg-electric-blue mt-2 shrink-0 shadow-[0_0_8px_rgba(0,112,243,0.8)]"></div>
                      <span className="text-gray-200 leading-relaxed">{achievement}</span>
                    </GlassCard>
                  ))}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-px bg-white"></div>
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {experience.skills.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-gray-300 shadow-lg backdrop-blur-md">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

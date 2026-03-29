import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import { SectionLabel } from '../ui/SectionLabel';
import { SkillBar } from '../ui/SkillBar';

/**
 * Skill category configuration
 */
const SKILL_CATEGORIES = [
  { title: 'Languages', data: portfolio.skills.languages },
  { title: 'Frameworks', data: portfolio.skills.frameworks },
  { title: 'Databases', data: portfolio.skills.databases },
  { title: 'Tools', data: portfolio.skills.tools }
] as const;

/**
 * Proficiency level color mapping
 */
const PROFICIENCY_COLORS = {
  EXPERT: { color: 'bg-green shadow-[0_0_8px_#00ff88]', threshold: 90 },
  ADVANCED: { color: 'bg-blue shadow-[0_0_8px_#00d4ff]', threshold: 80 },
  INTERMEDIATE: { color: 'bg-orange shadow-[0_0_8px_#ff8c00]', threshold: 0 },
} as const;

/**
 * Animation configuration for skills section
 */
const SKILL_ANIMATIONS = {
  CATEGORY_DURATION: 0.6,
  CATEGORY_DELAY: 0.1,
  BAR_DURATION: 0.6,
  BAR_DELAY: 0.1,
  BAR_MARGIN: '-50px',
} as const;

/**
 * Logger for skills interactions
 */
const skillsLogger = {
  logComponentMount: (totalSkills: number) => {
    console.debug(`[Skills] Component mounted with ${totalSkills} total skills`);
  },
  logCategoryView: (category: string, count: number) => {
    console.debug(`[Skills] Viewing category: ${category} (${count} skills)`);
  },
};

/**
 * Get proficiency color based on skill level
 */
function getProficiencyDotColor(proficiency: number = 0): string {
  if (proficiency >= PROFICIENCY_COLORS.EXPERT.threshold) {
    return PROFICIENCY_COLORS.EXPERT.color;
  }
  if (proficiency >= PROFICIENCY_COLORS.ADVANCED.threshold) {
    return PROFICIENCY_COLORS.ADVANCED.color;
  }
  return PROFICIENCY_COLORS.INTERMEDIATE.color;
}

/**
 * Filter and sort skills by proficiency
 */
function getTopProficiencies(count: number = 8) {
  return [
    ...portfolio.skills.languages,
    ...portfolio.skills.frameworks,
    ...portfolio.skills.databases.filter(d => d.proficiency),
    ...portfolio.skills.tools.filter(t => t.proficiency)
  ].sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0)).slice(0, count);
}

export function Skills() {
  React.useEffect(() => {
    const totalSkills = SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.data.length, 0);
    skillsLogger.logComponentMount(totalSkills);
  }, []);

  // For the animated bars section we'll combine and sort by proficiency (top 8)
  const allProficiencies = getTopProficiencies(8);

  return (
    <section id="skills" className="py-32 relative min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionLabel label="// 05" title="Skills & Arsenal" />

        {/* Part 1: Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-32">
          {SKILL_CATEGORIES.map((category, i) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: SKILL_ANIMATIONS.BAR_MARGIN }}
              transition={{ duration: SKILL_ANIMATIONS.CATEGORY_DURATION, delay: i * SKILL_ANIMATIONS.CATEGORY_DELAY }}
              onViewportEnter={() => skillsLogger.logCategoryView(category.title, category.data.length)}
            >
              <h3 className="font-mono text-xs tracking-widest text-orange uppercase mb-6 border-b border-orange/20 pb-3">
                {category.title}
              </h3>
              <div className="flex flex-col">
                {category.data.map((skill: any) => (
                  <div key={skill.name} className="group flex items-center justify-between py-3 border-b border-[#111] transition-all hover:bg-green/5 hover:-mx-3 hover:px-3 hover:rounded-lg">
                    <div className="flex items-center gap-4">
                      <img 
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`} 
                        alt={skill.name}
                        className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => { e.currentTarget.style.display='none' }}
                      />
                      <span className="font-mono text-sm text-dim group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    {skill.proficiency && (
                      <div className={`w-1.5 h-1.5 rounded-full ${getProficiencyDotColor(skill.proficiency)} transition-transform duration-300 group-hover:scale-150`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Part 2: Animated Bars */}
        <div className="mb-32">
          <h3 className="text-2xl font-thin text-white mb-12 border-l-2 border-green pl-6">Core Proficiencies</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-8">
            {allProficiencies.map((skill: any, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <SkillBar name={skill.name} percentage={skill.proficiency || 0} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part 3: Quote */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <blockquote className="text-3xl md:text-4xl font-thin text-white/50 italic text-center max-w-3xl leading-relaxed">
            "The best tool is the one that disappears."
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}

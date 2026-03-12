'use client'

import { motion } from 'framer-motion'
import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'
import SkillChip from './ui/SkillChip'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'],
    accent: true,
  },
  {
    category: 'Tools',
    skills: ['Git', 'Docker', 'Postman', 'SQLAlchemy'],
    accent: false,
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['Node.js', 'Express', 'React', 'Flask', 'D3.js'],
    accent: false,
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'PostgreSQL'],
    accent: false,
  },
]

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        title="Skills"
      />

      <div className="grid sm:grid-cols-2 gap-10">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillChip key={skill} label={skill} accent={group.accent} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

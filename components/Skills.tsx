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
      <SectionHeading title="Skills" />

      <div className="grid sm:grid-cols-2 gap-6">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillChip key={skill} label={skill} accent={group.accent} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

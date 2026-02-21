import SectionHeading from '../ui/SectionHeading'
import SkillBar from '../ui/SkillBar'
import skills from '../../data/skills.json'

export default function Skills() {
  const mid = Math.ceil(skills.length / 2)
  const left = skills.slice(0, mid)
  const right = skills.slice(mid)

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <SectionHeading title="My Skills" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            {left.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
          <div>
            {right.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

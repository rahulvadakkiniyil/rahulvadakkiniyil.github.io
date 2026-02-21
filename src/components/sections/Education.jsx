import SectionHeading from '../ui/SectionHeading'
import TimelineItem from '../ui/TimelineItem'
import education from '../../data/education.json'

export default function Education() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Education</h3>
      {education.map((item, i) => (
        <TimelineItem
          key={item.year}
          year={item.year}
          title={item.title}
          subtitle={item.institution}
          delay={i * 0.1}
        />
      ))}
    </div>
  )
}

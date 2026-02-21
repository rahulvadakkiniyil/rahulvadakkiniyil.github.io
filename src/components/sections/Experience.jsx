import { Download } from 'lucide-react'
import TimelineItem from '../ui/TimelineItem'
import experience from '../../data/experience.json'

export default function Experience() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Experience</h3>
      {experience.map((item, i) => (
        <TimelineItem
          key={item.period}
          year={item.period}
          title={item.title}
          subtitle={item.company}
          description={item.description}
          delay={i * 0.1}
        >
          {item.downloadUrl && (
            <a
              href={item.downloadUrl}
              download
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              <Download size={14} />
              {item.downloadLabel}
            </a>
          )}
        </TimelineItem>
      ))}
    </div>
  )
}

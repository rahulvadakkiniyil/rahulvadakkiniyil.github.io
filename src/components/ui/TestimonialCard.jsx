import { Quote } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

export default function TestimonialCard({ name, role, text, delay = 0 }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <Quote size={24} className="text-primary-500/30 mb-3" />
        <p className="text-gray-600 dark:text-gray-400 text-sm italic mb-4">{text}</p>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{name}</p>
          {role && <p className="text-xs text-gray-500">{role}</p>}
        </div>
      </div>
    </AnimatedSection>
  )
}

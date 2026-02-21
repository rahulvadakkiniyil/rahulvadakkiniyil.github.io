import { ExternalLink } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

export default function ProjectCard({ name, url, image, delay = 0 }) {
  return (
    <AnimatedSection delay={delay}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
      >
        <div className="p-6 flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50">
          <img
            src={image}
            alt={name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
          <span className="font-medium text-sm text-gray-900 dark:text-white">{name}</span>
          <ExternalLink size={14} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
        </div>
      </a>
    </AnimatedSection>
  )
}

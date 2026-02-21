import AnimatedSection from './AnimatedSection'

export default function TimelineItem({ year, title, subtitle, description, children, delay = 0 }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="relative pl-8 pb-8 border-l-2 border-primary-500/30 last:border-0 last:pb-0">
        <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary-500 border-4 border-white dark:border-gray-950" />
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-primary-500/10 text-primary-500">
          {year}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-primary-500 dark:text-primary-400 mb-2">{subtitle}</p>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </AnimatedSection>
  )
}

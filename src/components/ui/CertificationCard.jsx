import AnimatedSection from './AnimatedSection'

export default function CertificationCard({ title, image, delay = 0 }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
        <div className="p-6 flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm font-medium text-center text-gray-900 dark:text-white">{title}</p>
        </div>
      </div>
    </AnimatedSection>
  )
}

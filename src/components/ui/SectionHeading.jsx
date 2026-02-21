import { motion } from 'framer-motion'

export default function SectionHeading({ title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-12 ${className}`}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-primary-500/10 text-primary-500 dark:bg-primary-400/10 dark:text-primary-400">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
    </motion.div>
  )
}

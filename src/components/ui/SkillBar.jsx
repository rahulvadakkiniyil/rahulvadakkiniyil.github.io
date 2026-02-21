import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function SkillBar({ name, level }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-sm font-medium text-primary-500">{level}%</span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400 transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

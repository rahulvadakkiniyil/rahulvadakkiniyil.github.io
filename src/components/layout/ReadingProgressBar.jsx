import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ReadingProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

import { Calendar, Clock, ExternalLink, Tag } from 'lucide-react'
import { calculateReadingTime } from '../../utils/readingTime'

export default function BlogCard({ post, onSelect }) {
  const readTime = post.content ? calculateReadingTime(post.content) : '3 min read'

  const handleClick = () => {
    if (post.hasLocalContent) {
      onSelect(post.slug)
    } else if (post.externalUrl) {
      window.open(post.externalUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readTime}
          </span>
          {post.externalUrl && !post.hasLocalContent && (
            <ExternalLink size={12} className="text-primary-500" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        {post.tags && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-primary-500/10 text-primary-500"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

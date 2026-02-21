import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { ArrowLeft, Calendar, Clock, ExternalLink } from 'lucide-react'
import { calculateReadingTime } from '../../utils/readingTime'

export default function BlogPost({ post, onBack }) {
  const readTime = post.content ? calculateReadingTime(post.content) : '3 min read'

  return (
    <article className="max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to posts
      </button>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {readTime}
          </span>
        </div>
        {post.externalUrl && (
          <a
            href={post.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary-500 hover:text-primary-600 transition-colors"
          >
            <ExternalLink size={14} />
            Read original on {post.externalUrl.includes('medium.com') ? 'Medium' : 'Hashnode'}
          </a>
        )}
      </header>
      <div className="prose prose-lg dark:prose-invert prose-primary max-w-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-primary-500">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

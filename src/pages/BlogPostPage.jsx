import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BlogPost from '../components/blog/BlogPost'
import ReadingProgressBar from '../components/layout/ReadingProgressBar'
import { loadBlogPosts } from '../utils/blogParser'
import blogsData from '../data/blogs.json'

export default function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const localPosts = await loadBlogPosts()
      const blogMeta = blogsData.find((b) => b.slug === slug)
      const localContent = localPosts.find((p) => p.slug === slug)

      if (blogMeta) {
        setPost({ ...blogMeta, content: localContent?.content || '' })
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950">
        <p className="text-gray-500 mb-4">Post not found</p>
        <button
          onClick={() => navigate('/blog')}
          className="text-primary-500 hover:text-primary-600"
        >
          Back to blog
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ReadingProgressBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogPost post={post} onBack={() => navigate('/blog')} />
      </div>
    </div>
  )
}

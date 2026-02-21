import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BlogSearch from '../components/blog/BlogSearch'
import BlogTagFilter from '../components/blog/BlogTagFilter'
import BlogList from '../components/blog/BlogList'
import BlogAdminPanel from '../components/blog/BlogAdminPanel'
import { useAdminMode } from '../hooks/useAdminMode'
import { loadBlogPosts } from '../utils/blogParser'
import blogsData from '../data/blogs.json'

export default function BlogPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [localPosts, setLocalPosts] = useState([])
  const [isAdmin] = useAdminMode()
  const [showAdmin, setShowAdmin] = useState(false)

  useEffect(() => {
    loadBlogPosts().then(setLocalPosts)
  }, [])

  // Merge local markdown posts with blog data JSON
  const posts = useMemo(() => {
    return blogsData.map((blog) => {
      const local = localPosts.find((p) => p.slug === blog.slug)
      return { ...blog, content: local?.content || '' }
    })
  }, [localPosts])

  const allTags = useMemo(() => {
    const tags = new Set()
    posts.forEach((p) => p.tags?.forEach((t) => tags.add(t)))
    return [...tags].sort()
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(search.toLowerCase())
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
      return matchesSearch && matchesTag
    })
  }, [posts, search, selectedTag])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 mb-4 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to portfolio
            </a>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Thoughts on DevOps, cloud, and infrastructure
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowAdmin(true)}
              className="px-4 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Admin Panel
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="sm:w-80">
            <BlogSearch value={search} onChange={setSearch} />
          </div>
        </div>

        <div className="mb-8">
          <BlogTagFilter tags={allTags} selected={selectedTag} onSelect={setSelectedTag} />
        </div>

        <BlogList
          posts={filtered}
          onSelect={(slug) => navigate(`/blog/${slug}`)}
        />
      </div>

      {showAdmin && <BlogAdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  )
}

import BlogCard from './BlogCard'

export default function BlogList({ posts, onSelect }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400">No posts found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} onSelect={onSelect} />
      ))}
    </div>
  )
}

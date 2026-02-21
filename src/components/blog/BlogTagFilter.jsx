export default function BlogTagFilter({ tags, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
          selected === null
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag === selected ? null : tag)}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            tag === selected
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

import { useState } from 'react'
import { X, Plus, Save, Trash2 } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export default function BlogAdminPanel({ onClose }) {
  const [drafts, setDrafts] = useLocalStorage('blog-drafts', [])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', slug: '', tags: '', content: '' })

  const saveDraft = () => {
    if (!form.title || !form.slug) return
    const draft = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      date: new Date().toISOString().split('T')[0],
      isDraft: true,
    }
    if (editing !== null) {
      const updated = [...drafts]
      updated[editing] = draft
      setDrafts(updated)
    } else {
      setDrafts([...drafts, draft])
    }
    setForm({ title: '', slug: '', tags: '', content: '' })
    setEditing(null)
  }

  const editDraft = (i) => {
    const d = drafts[i]
    setForm({ title: d.title, slug: d.slug, tags: d.tags.join(', '), content: d.content })
    setEditing(i)
  }

  const deleteDraft = (i) => {
    setDrafts(drafts.filter((_, idx) => idx !== i))
    if (editing === i) {
      setForm({ title: '', slug: '', tags: '', content: '' })
      setEditing(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Blog Admin</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/50"
          />
          <input
            type="text"
            placeholder="slug-for-url"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/50"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/50"
          />
          <textarea
            placeholder="Markdown content..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={8}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/50 font-mono text-sm"
          />
          <button
            onClick={saveDraft}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {editing !== null ? <Save size={16} /> : <Plus size={16} />}
            {editing !== null ? 'Update Draft' : 'Save Draft'}
          </button>
        </div>

        {drafts.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Drafts</h3>
            <div className="space-y-2">
              {drafts.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{d.title}</p>
                    <p className="text-xs text-gray-500">{d.date}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => editDraft(i)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500">
                      <Save size={14} />
                    </button>
                    <button onClick={() => deleteDraft(i)} className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

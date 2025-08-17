'use client'

import { useState } from 'react'
import { Task, TaskColor } from '../../types'
import { api } from '../../lib/api'
import Link from 'next/link'

const COLORS: TaskColor[] = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'brown', 'orange']

export default function TaskForm({ initial, mode }: { initial?: Partial<Task>; mode: 'create' | 'edit' }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [color, setColor] = useState<TaskColor>((initial?.color as TaskColor) ?? 'blue')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return alert('Title is required')
    setSaving(true)
    try {
      if (mode === 'create') await api.create({ title: title.trim(), color })
      else if (mode === 'edit' && initial?.id != null) await api.update(initial.id, { title: title.trim(), color })
      window.location.href = '/'
    } finally { setSaving(false) }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form className="bg-gray-900 p-8 max-w-4xl mx-auto space-y-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {mode === 'create' ? 'Create Task' : 'Edit Task'}
          </h1>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xl font-medium text-gray-300">Title</label>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
              placeholder="e.g. Brush teeth"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xl font-medium text-gray-300">Color</label>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-white' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c as TaskColor)}
                  aria-label={`Select ${c} color`}
                  aria-pressed={color === c}
                >
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-700 text-xl"
            disabled={saving}
          >
            {saving ? 'Saving...' : mode === 'create' ? 'Add Task' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
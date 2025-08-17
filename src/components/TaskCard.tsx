'use client'

import { Task } from '../../types'
import { api } from '../../lib/api'
import { useState } from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'

export default function TaskCard({ task, onChanged }: { task: Task; onChanged: () => void }) {
  const [loading, setLoading] = useState(false)

  async function toggleCompleted() {
    setLoading(true)
    try {
      await api.update(task.id, { completed: !task.completed })
      onChanged()
    } finally { setLoading(false) }
  }

  async function confirmDelete(e: React.MouseEvent) {
    e.preventDefault()
    if (!window.confirm('Delete this task?')) return
    setLoading(true)
    try {
      await api.remove(task.id)
      onChanged()
    } finally { setLoading(false) }
  }

  return (
    <div className={clsx(
      'w-full p-4 flex items-center justify-between hover:shadow transition rounded-md','bg-gray-800')}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="h-5 w-5"
          checked={task.completed}
          onChange={(e) => { e.preventDefault(); toggleCompleted(); }}
          onClick={(e) => e.preventDefault()}
          disabled={loading}
          aria-label="Toggle completed"
          style={{ accentColor: task.color }}
        />
        <Link href={`/tasks/${task.id}`}>
          <div className="flex items-center gap-2">
            <h3 className={clsx('font-medium', task.completed && 'line-through text-gray-400')}>
              {task.title}
            </h3>
            <span className={clsx('text-xs px-2 py-1 rounded-full', task.completed ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-300')}>
              {task.completed ? 'Completed' : 'Open'}
            </span>
          </div>
        </Link>
      </div>
      <button
        onClick={confirmDelete}
        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import TaskCard from '@/components/TaskCard'
import { Task } from '../../types'

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await api.list()
      setTasks(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const total = tasks?.length ?? 0
  const done = tasks?.filter((t) => t.completed).length ?? 0

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 p-4 space-y-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Todo App
          </h1>
          <p className="text-lg text-gray-400">Tasks: {total} | Completed: {done}</p>
          <Link
            href="/tasks/new"
            className="w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Create Task</span>
          </Link>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {error && (
          <div className="p-4 rounded-md text-red-400 bg-red-900 border border-red-800 text-lg">
            {error}
          </div>
        )}
        {!tasks && !error && (
          <div className="text-lg text-gray-500">Loading…</div>
        )}
        <div className="space-y-3">
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} onChanged={load} />
          ))}
          {tasks?.length === 0 && (
            <div className="p-6 text-center text-gray-500 border-2 border-dashed border-gray-700 rounded-lg text-lg">
              You don't have any tasks registered yet. Create tasks and organize your to-do list.
            </div>
          )}
        </div>
      </div>

      <Link
        href="/tasks/new"
        className="sm:hidden fixed right-6 bottom-6 rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-blue-600 text-white text-2xl font-bold hover:bg-blue-700 transition"
        aria-label="Create Task"
      >
        +
      </Link>
    </div>
  )
}
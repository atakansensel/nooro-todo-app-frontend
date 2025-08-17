'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import TaskForm from '../../../components/TaskForm'
import { api } from '../../../../lib/api'
import { Task } from '../../../../types'

export default function EditTaskPage() {
  const params = useParams()
  const id = Number(params?.id)
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTask() {
      try {
        console.log('Fetched task:', id)
        const data = await api.get(id)
        console.log('Task data:', data)
        setTask(data)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchTask()
  }, [id])

  if (loading) return <div className="p-6">Loading...</div>
  if (!task) return <div className="p-6">Task not found</div>

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <TaskForm initial={task} mode="edit" />
    </div>
  )
}

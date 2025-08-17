'use client'

import TaskForm from '../../../components/TaskForm'

export default function CreateTaskPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <TaskForm mode="create" />
    </div>
  )
}
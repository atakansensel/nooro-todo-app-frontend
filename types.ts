export type TaskColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'brown' | 'orange'

export interface Task {
  id: number
  title: string
  color: TaskColor
  completed: boolean
  createdAt: string
  updatedAt: string
}
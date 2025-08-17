import { Task } from '../types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      cache: 'no-store',
      signal: controller.signal,
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`HTTP ${res.status}: ${text}`)
    }
    return res.json() as Promise<T>
  } finally {
    clearTimeout(timeout)
  }
}

export const api = {
  list: () => http<Task[]>('/tasks'),
  create: (data: Pick<Task, 'title' | 'color'>) => http<Task>('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Pick<Task, 'title' | 'color' | 'completed'>>) => http<Task>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: number) => http<{ success: boolean }>(`/tasks/${id}`, { method: 'DELETE' }),
  get: (id: number) => http<Task>(`/tasks/${id}`),
}
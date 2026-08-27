import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Todo {
  id: number
  text: string
  done: boolean
}

let nextId = Date.now()

export default function TodoList() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('study-todos', [])
  const [input, setInput] = useState('')

  const add = () => {
    const text = input.trim()
    if (!text) return
    setTodos(prev => [...prev, { id: nextId++, text, done: false }])
    setInput('')
  }

  const toggle = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const remove = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') add()
  }

  return (
    <div className="py-4">
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="新しいタスク..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800/60 text-white/90 placeholder-white/30
            border border-slate-700 focus:outline-none focus:border-yellow-400/50 text-sm transition"
        />
        <button
          onClick={add}
          className="px-4 py-2 rounded-lg font-semibold text-sm transition cursor-pointer select-none
            bg-yellow-400 text-slate-900 hover:bg-yellow-300 active:scale-95"
        >
          + Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(t => (
          <li
            key={t.id}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/40 group"
          >
            <button
              onClick={() => toggle(t.id)}
              className={`text-lg cursor-pointer select-none transition
                ${t.done ? 'text-green-400' : 'text-white/40 hover:text-white/70'}`}
            >
              {t.done ? '☑' : '☐'}
            </button>
            <span
              className={`flex-1 text-sm transition
                ${t.done ? 'text-white/40 line-through' : 'text-white/80'}`}
            >
              {t.text}
            </span>
            <button
              onClick={() => remove(t.id)}
              className="text-white/20 hover:text-red-400 transition cursor-pointer select-none opacity-0 group-hover:opacity-100 text-lg leading-none"
            >
              ×
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <p className="text-white/30 text-sm text-center py-8">タスクなし</p>
        )}
      </ul>
    </div>
  )
}
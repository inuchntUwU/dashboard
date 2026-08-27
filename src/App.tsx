import { useState, useEffect } from 'react'
import Clock from './components/Clock'
import Timer from './components/Timer'
import QuickLinks from './components/QuickLinks'
import MiniNote from './components/MiniNote'
import TodoList from './components/TodoList'

type Tab = 'timer' | 'note' | 'todo'

function App() {
  const [tab, setTab] = useState<Tab>('timer')
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const tabs: { key: Tab; label: string }[] = [
    { key: 'timer', label: '⏱ Timer' },
    { key: 'note', label: '📝 Note' },
    { key: 'todo', label: '✅ Todo' },
  ]

  return (
    <div className="min-h-svh bg-slate-900 text-white flex flex-col">
      <Clock />

      <div className="flex-1 w-full max-w-4xl mx-auto px-4 flex flex-col lg:flex-row lg:gap-6">
        <div className="lg:w-1/2 lg:sticky lg:top-0 lg:self-start">
          <div className="flex justify-center gap-1 mb-4 lg:hidden">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer select-none
                  ${tab === t.key ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/50 hover:text-white/80'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <Timer />
          </div>
          <div className="lg:hidden">
            {tab === 'timer' && <Timer />}
          </div>

          <QuickLinks />
        </div>

        <div className="lg:w-1/2">
          <div className="hidden lg:flex justify-center gap-1 mb-4 mt-4">
            {tabs.filter(t => t.key !== 'timer').map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer select-none
                  ${tab === t.key ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/50 hover:text-white/80'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="lg:hidden">
            {tab === 'note' && <MiniNote />}
            {tab === 'todo' && <TodoList />}
          </div>
          <div className="hidden lg:block">
            {tab === 'note' && <MiniNote />}
            {tab === 'todo' && <TodoList />}
          </div>
        </div>
      </div>

      <button
        onClick={() => setDark(d => !d)}
        className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700
          flex items-center justify-center text-lg cursor-pointer select-none transition shadow-lg"
        title="Toggle theme"
      >
        {dark ? '☀️' : '🌙'}
      </button>
    </div>
  )
}

export default App
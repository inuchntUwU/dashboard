import { useState } from 'react'
import { useTimer } from '../hooks/useTimer'

export default function Countdown() {
  const [inputMinutes, setInputMinutes] = useState('25')
  const { time, running, start, stop, reset, setCountdown } = useTimer('countdown', 1500)

  const format = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const handleSet = () => {
    const min = parseInt(inputMinutes, 10)
    if (!isNaN(min) && min > 0) setCountdown(min * 60)
  }

  const presets = [
    { label: '🍅 25min', value: 25 },
    { label: '📖 15min', value: 15 },
    { label: '☕ 5min', value: 5 },
  ]

  return (
    <div className="text-center">
      <div className="flex justify-center items-center gap-2 my-2">
        <input
          type="number"
          min="1"
          max="999"
          value={inputMinutes}
          onChange={e => setInputMinutes(e.target.value)}
          className="w-20 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-center text-lg font-mono border border-slate-600 focus:outline-none focus:border-yellow-400"
          disabled={running}
        />
        <span className="text-white/60 text-lg">min</span>
        <button
          onClick={handleSet}
          disabled={running}
          className="px-4 py-1.5 rounded-lg text-sm font-semibold transition cursor-pointer select-none
            bg-slate-700 text-white/80 hover:bg-slate-600 disabled:opacity-40 active:scale-95"
        >
          SET
        </button>
      </div>

      <div className="text-6xl font-mono font-light tracking-wider tabular-nums text-white/90 my-4">
        {format(time)}
      </div>

      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={running ? stop : start}
          className="px-6 py-2 rounded-lg font-semibold transition cursor-pointer select-none
            bg-yellow-400 text-slate-900 hover:bg-yellow-300 active:scale-95"
        >
          {running ? 'STOP' : 'START'}
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg font-semibold transition cursor-pointer select-none
            bg-slate-700 text-white/80 hover:bg-slate-600 active:scale-95"
        >
          RESET
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {presets.map(p => (
          <button
            key={p.value}
            onClick={() => { setCountdown(p.value * 60); setInputMinutes(String(p.value)) }}
            disabled={running}
            className="px-3 py-1.5 rounded-lg text-sm transition cursor-pointer select-none
              bg-slate-700/60 text-white/70 hover:bg-slate-600 disabled:opacity-40 active:scale-95"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
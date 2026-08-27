import { useTimer } from '../hooks/useTimer'

export default function Stopwatch() {
  const { time, running, start, stop, reset } = useTimer('stopwatch')

  const format = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toFixed(1).padStart(5, '0')}`
  }

  return (
    <div className="text-center">
      <div className="text-5xl font-mono font-light tracking-wider tabular-nums text-white/90 my-6">
        {format(time)}
      </div>
      <div className="flex justify-center gap-3">
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
    </div>
  )
}
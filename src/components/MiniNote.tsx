import { useLocalStorage } from '../hooks/useLocalStorage'

export default function MiniNote() {
  const [note, setNote] = useLocalStorage('study-note', '')

  return (
    <div className="py-4">
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="メモを入力..."
        className="w-full h-48 p-4 rounded-xl bg-slate-800/60 text-white/90 placeholder-white/30
          border border-slate-700 focus:outline-none focus:border-yellow-400/50
          resize-none text-sm leading-relaxed transition"
      />
    </div>
  )
}
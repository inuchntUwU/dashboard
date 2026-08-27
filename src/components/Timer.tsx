import { useState } from 'react'
import Stopwatch from './Stopwatch'
import Countdown from './Countdown'

type SubTab = 'stopwatch' | 'countdown'

export default function Timer() {
  const [subTab, setSubTab] = useState<SubTab>('stopwatch')

  return (
    <div className="py-2">
      <div className="flex justify-center gap-1 mb-3">
        <button
          onClick={() => setSubTab('stopwatch')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer select-none
            ${subTab === 'stopwatch' ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/50 hover:text-white/80'}`}
        >
          ⏱ Stopwatch
        </button>
        <button
          onClick={() => setSubTab('countdown')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer select-none
            ${subTab === 'countdown' ? 'bg-yellow-400/20 text-yellow-400' : 'text-white/50 hover:text-white/80'}`}
        >
          ⏳ Countdown
        </button>
      </div>
      {subTab === 'stopwatch' ? <Stopwatch /> : <Countdown />}
    </div>
  )
}
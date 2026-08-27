import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const format = (n: number) => n.toString().padStart(2, '0')

  return (
    <div className="text-center py-4 select-none">
      <span className="text-5xl font-mono font-light tracking-wider tabular-nums text-yellow-400">
        {format(time.getHours())}:{format(time.getMinutes())}:{format(time.getSeconds())}
      </span>
    </div>
  )
}
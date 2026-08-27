import { useState, useRef, useCallback, useEffect } from 'react'

type TimerMode = 'stopwatch' | 'countdown'

export function useTimer(mode: TimerMode, initialCountdown = 1500) {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [countdownTime, setCountdownTime] = useState(initialCountdown)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)
  const elapsedRef = useRef(0)

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(() => {
        const elapsed = elapsedRef.current + (Date.now() - startTimeRef.current)
        if (mode === 'countdown') {
          const remaining = countdownTime - elapsed / 1000
          if (remaining <= 0) {
            setTime(0)
            setRunning(false)
            clear()
          } else {
            setTime(remaining)
          }
        } else {
          setTime(elapsed / 1000)
        }
      }, 100)
    }
    return clear
  }, [running, mode, countdownTime, clear])

  const start = useCallback(() => {
    if (!running) {
      if (mode === 'stopwatch') {
        elapsedRef.current = time
      } else {
        elapsedRef.current = 0
      }
      setRunning(true)
    }
  }, [running, mode, time])

  const stop = useCallback(() => {
    if (running) {
      clear()
      if (mode === 'stopwatch') {
        elapsedRef.current = time
      } else {
        elapsedRef.current = 0
        const remaining = time
        setTime(remaining)
      }
      setRunning(false)
    }
  }, [running, mode, time, clear])

  const reset = useCallback(() => {
    clear()
    setRunning(false)
    elapsedRef.current = 0
    if (mode === 'countdown') {
      setTime(countdownTime)
    } else {
      setTime(0)
    }
  }, [clear, mode, countdownTime])

  const setCountdown = useCallback((seconds: number) => {
    setCountdownTime(seconds)
    setTime(seconds)
    clear()
    setRunning(false)
    elapsedRef.current = 0
  }, [clear])

  return { time, running, start, stop, reset, setCountdown, mode }
}
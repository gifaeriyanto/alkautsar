import { useState, useEffect, useCallback } from 'react'
import type { PrayerTime } from '../types'

interface SyuruqForbiddenTimeReturn {
  isForbiddenTime: boolean
  forbiddenCountdown: {
    minutes: number
    seconds: number
  } | null
  shouldShowFullscreen: boolean
  syuruqTime: PrayerTime | null
  toggleForbiddenMode: () => void
}

export const useSyuruqForbiddenTime = (
  prayerTimes: PrayerTime[],
  isDevMode = false
): SyuruqForbiddenTimeReturn => {
  const [isForbiddenTime, setIsForbiddenTime] = useState(false)
  const [forbiddenCountdown, setForbiddenCountdown] = useState<{
    minutes: number
    seconds: number
  } | null>(null)
  const [shouldShowFullscreen, setShouldShowFullscreen] = useState(false)
  const [isManualMode, setIsManualMode] = useState(false)
  const [mockCountdownSeconds, setMockCountdownSeconds] = useState(0)

  // Find Syuruq prayer time
  const syuruqTime =
    prayerTimes.find((prayer) => prayer.name === 'Syuruq') || null

  const toggleForbiddenMode = useCallback(() => {
    if (!isDevMode || !syuruqTime) return

    setIsManualMode((prev) => {
      const newValue = !prev

      if (newValue) {
        // Start with 15 minutes (900 seconds) countdown in dev mode
        setMockCountdownSeconds(900)
        setIsForbiddenTime(true)
      } else {
        // Reset when turning off
        setMockCountdownSeconds(0)
        setIsForbiddenTime(false)
        setShouldShowFullscreen(false)
        setForbiddenCountdown(null)
      }

      return newValue
    })
  }, [isDevMode, syuruqTime])

  // Handle mock countdown in dev mode
  useEffect(() => {
    if (isDevMode && isManualMode && mockCountdownSeconds > 0) {
      const interval = setInterval(() => {
        setMockCountdownSeconds((prev) => {
          const newValue = prev - 1

          // Update countdown display
          const minutes = Math.floor(newValue / 60)
          const seconds = newValue % 60
          setForbiddenCountdown({ minutes, seconds })

          // Show fullscreen during countdown
          setShouldShowFullscreen(true)

          if (newValue <= 0) {
            // Forbidden period has ended
            setIsForbiddenTime(false)
            setShouldShowFullscreen(false)
            setForbiddenCountdown({ minutes: 0, seconds: 0 })
            setIsManualMode(false)
            return 0
          }

          return newValue
        })
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [isDevMode, isManualMode, mockCountdownSeconds])

  // Calculate forbidden time countdown (real mode)
  useEffect(() => {
    // Skip real countdown if in dev mode
    if (isDevMode && isManualMode) {
      return
    }

    if (!syuruqTime?.time) {
      setIsForbiddenTime(false)
      setForbiddenCountdown(null)
      setShouldShowFullscreen(false)
      return
    }

    const calculateForbiddenTime = () => {
      const now = new Date()
      const [syuruqHours, syuruqMinutes] = syuruqTime.time
        .split(':')
        .map(Number)

      if (syuruqHours === undefined || syuruqMinutes === undefined) {
        setIsForbiddenTime(false)
        setForbiddenCountdown(null)
        setShouldShowFullscreen(false)
        return
      }

      // Create syuruq time for today
      const syuruqStartTime = new Date()
      syuruqStartTime.setHours(syuruqHours, syuruqMinutes, 0, 0)

      // Create forbidden period end time (15 minutes after syuruq)
      const forbiddenEndTime = new Date(syuruqStartTime)
      forbiddenEndTime.setMinutes(forbiddenEndTime.getMinutes() + 15)

      // Check if we're currently in the forbidden time period
      const isInForbiddenPeriod =
        now >= syuruqStartTime && now <= forbiddenEndTime

      if (!isInForbiddenPeriod) {
        setIsForbiddenTime(false)
        setForbiddenCountdown(null)
        setShouldShowFullscreen(false)
        return
      }

      // We are in the forbidden period
      setIsForbiddenTime(true)

      // Calculate remaining time until forbidden period ends
      const diff = forbiddenEndTime.getTime() - now.getTime()

      if (diff <= 0) {
        // Forbidden period has ended
        setIsForbiddenTime(false)
        setForbiddenCountdown({ minutes: 0, seconds: 0 })
        setShouldShowFullscreen(false)
        return
      }

      const totalSeconds = Math.floor(diff / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60

      setForbiddenCountdown({ minutes, seconds })
      setShouldShowFullscreen(true)
    }

    // Calculate immediately
    calculateForbiddenTime()

    // Update every second
    const interval = setInterval(calculateForbiddenTime, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [syuruqTime, isDevMode, isManualMode])

  return {
    isForbiddenTime,
    forbiddenCountdown,
    shouldShowFullscreen,
    syuruqTime,
    toggleForbiddenMode,
  }
}

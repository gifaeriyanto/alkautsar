import { useState, useEffect, useCallback } from 'react'
import type { PrayerTime } from '../types'

interface IqamahTimerReturn {
  isIqamahMode: boolean
  iqamahCountdown: {
    minutes: number
    seconds: number
  } | null
  shouldShowFullscreen: boolean
  toggleIqamahMode: () => void
  currentPrayerWithIqamah: PrayerTime | null
}

export const useIqamahTimer = (
  prayerTimes: PrayerTime[],
  isDevMode = false
): IqamahTimerReturn => {
  const POST_IQAMAH_SCREEN_MS = 10_000
  const [isIqamahMode, setIsIqamahMode] = useState(false)
  const [iqamahCountdown, setIqamahCountdown] = useState<{
    minutes: number
    seconds: number
  } | null>(null)
  const [shouldShowFullscreen, setShouldShowFullscreen] = useState(false)
  const [mockCountdownSeconds, setMockCountdownSeconds] = useState(0)
  const [postIqamahEndAt, setPostIqamahEndAt] = useState<number | null>(null)

  // Find current active prayer that has iqamah time
  const currentPrayerWithIqamah =
    prayerTimes.find(
      (prayer) =>
        prayer.isActive && prayer.iqomah && prayer.iqomah !== prayer.time
    ) || null

  const toggleIqamahMode = useCallback(() => {
    setIsIqamahMode((prev) => {
      const newValue = !prev

      // In dev mode, when turning on iqamah mode, start with a mock countdown
      if (isDevMode && newValue && currentPrayerWithIqamah) {
        // Start with 30 seconds countdown
        setMockCountdownSeconds(30)
        setPostIqamahEndAt(null)
      } else if (!newValue) {
        // Reset mock countdown when turning off
        setMockCountdownSeconds(0)
        setPostIqamahEndAt(null)
      }

      return newValue
    })
  }, [isDevMode, currentPrayerWithIqamah])

  // Handle mock countdown in dev mode
  useEffect(() => {
    if (isDevMode && isIqamahMode && mockCountdownSeconds > 0) {
      const interval = setInterval(() => {
        setMockCountdownSeconds((prev) => {
          const newValue = prev - 1

          // Update countdown display
          const minutes = Math.floor(newValue / 60)
          const seconds = newValue % 60
          setIqamahCountdown({ minutes, seconds })

          // Show fullscreen when countdown reaches 0
          if (newValue <= 0) {
            setShouldShowFullscreen(true)
            setIqamahCountdown({ minutes: 0, seconds: 0 })
            setPostIqamahEndAt(Date.now() + POST_IQAMAH_SCREEN_MS)
            return 0
          }
          setShouldShowFullscreen(true) // Always show fullscreen in dev mock mode
          return newValue
        })
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [isDevMode, isIqamahMode, mockCountdownSeconds])

  // Keep "Waktunya Shalat" screen visible for 10 seconds in dev mode
  useEffect(() => {
    if (!isDevMode || !isIqamahMode || !postIqamahEndAt) return undefined

    const interval = setInterval(() => {
      const isExpired = Date.now() >= postIqamahEndAt

      if (isExpired) {
        setShouldShowFullscreen(false)
        setPostIqamahEndAt(null)
        return
      }

      setShouldShowFullscreen(true)
      setIqamahCountdown({ minutes: 0, seconds: 0 })
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [isDevMode, isIqamahMode, postIqamahEndAt])

  // Calculate countdown to iqamah (real mode)
  useEffect(() => {
    // Skip real countdown if in dev mode
    if (isDevMode && isIqamahMode) {
      return
    }

    if (!currentPrayerWithIqamah?.iqomah) {
      setIqamahCountdown(null)
      setShouldShowFullscreen(false)
      setPostIqamahEndAt(null)
      return
    }

    // Always calculate countdown if there's a prayer with iqamah
    // But only show timer overlay if isIqamahMode is true

    const calculateCountdown = () => {
      const now = new Date()
      const [iqamahHours, iqamahMinutes] = currentPrayerWithIqamah.iqomah
        .split(':')
        .map(Number)
      const [prayerHours, prayerMinutes] = currentPrayerWithIqamah.time
        .split(':')
        .map(Number)

      if (
        iqamahHours === undefined ||
        iqamahMinutes === undefined ||
        prayerHours === undefined ||
        prayerMinutes === undefined
      ) {
        setIqamahCountdown(null)
        setShouldShowFullscreen(false)
        return
      }

      const iqamahTime = new Date()
      iqamahTime.setHours(iqamahHours, iqamahMinutes, 0, 0)

      const prayerTime = new Date()
      prayerTime.setHours(prayerHours, prayerMinutes, 0, 0)

      // Only show countdown if we're currently between prayer time and iqamah time
      // Don't calculate countdown for future prayers
      const isCurrentlyActive = now >= prayerTime && now <= iqamahTime

      if (!isCurrentlyActive) {
        const isPostIqamahActive =
          postIqamahEndAt !== null && now.getTime() < postIqamahEndAt

        if (isPostIqamahActive) {
          setIqamahCountdown({ minutes: 0, seconds: 0 })
          setShouldShowFullscreen(true)
          return
        }

        setIqamahCountdown(null)
        setShouldShowFullscreen(false)
        setPostIqamahEndAt(null)
        return
      }

      const diff = iqamahTime.getTime() - now.getTime()

      if (diff <= 0) {
        setIqamahCountdown({ minutes: 0, seconds: 0 })
        setShouldShowFullscreen(true) // Show fullscreen when time is up
        if (!postIqamahEndAt) {
          setPostIqamahEndAt(now.getTime() + POST_IQAMAH_SCREEN_MS)
        }
        return
      }

      const totalSeconds = Math.floor(diff / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60

      setIqamahCountdown({ minutes, seconds })

      // Show fullscreen countdown since we're in the active window
      setShouldShowFullscreen(true)
      if (postIqamahEndAt) {
        setPostIqamahEndAt(null)
      }
    }

    // Calculate immediately
    calculateCountdown()

    // Update every second
    const interval = setInterval(calculateCountdown, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [currentPrayerWithIqamah, isDevMode, isIqamahMode, postIqamahEndAt])

  return {
    isIqamahMode,
    iqamahCountdown,
    shouldShowFullscreen,
    toggleIqamahMode,
    currentPrayerWithIqamah,
  }
}

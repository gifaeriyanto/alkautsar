import { useState, useCallback } from 'react'
import type { PrayerTime } from '../types'

interface UseDevModeReturn {
  isDevMode: boolean
  isFridayMocked: boolean
  devActiveIndex: number | null
  handlePreviousPrayer: () => void
  handleNextPrayer: () => void
  handleToggleFridayMock: () => void
  handleResetToRealTime: () => void
  applyDevModeToTimes: (times: PrayerTime[]) => PrayerTime[]
}

export const useDevMode = (prayerTimes: PrayerTime[]): UseDevModeReturn => {
  // eslint-disable-next-line react/hook-use-state
  const [isDevMode] = useState(() => {
    // Only enable in development
    return process.env.NODE_ENV === 'development'
  })

  const [isFridayMocked, setIsFridayMocked] = useState(false)
  const [devActiveIndex, setDevActiveIndex] = useState<number | null>(null)

  const handlePreviousPrayer = useCallback(() => {
    setDevActiveIndex((prev) => {
      if (prayerTimes.length === 0) return 0

      if (prev === null) {
        // Find current active prayer
        const currentActiveIndex = prayerTimes.findIndex(
          (prayer) => prayer.isActive
        )
        return currentActiveIndex > 0 ? currentActiveIndex - 1 : 0
      }
      return prev > 0 ? prev - 1 : 0
    })
  }, [prayerTimes])

  const handleNextPrayer = useCallback(() => {
    setDevActiveIndex((prev) => {
      if (prayerTimes.length === 0) return 0

      if (prev === null) {
        // Find current active prayer
        const currentActiveIndex = prayerTimes.findIndex(
          (prayer) => prayer.isActive
        )
        const nextIndex =
          currentActiveIndex < prayerTimes.length - 1
            ? currentActiveIndex + 1
            : prayerTimes.length - 1

        return nextIndex
      }
      const nextIndex =
        prev < prayerTimes.length - 1 ? prev + 1 : prayerTimes.length - 1
      return nextIndex
    })
  }, [prayerTimes])

  const handleToggleFridayMock = useCallback(() => {
    setIsFridayMocked((prev) => !prev)
  }, [])

  const handleResetToRealTime = useCallback(() => {
    setDevActiveIndex(null)
    setIsFridayMocked(false)
  }, [])

  const applyDevModeToTimes = useCallback(
    (times: PrayerTime[]): PrayerTime[] => {
      if (!isDevMode) return times

      // Create a copy of times
      let modifiedTimes = [...times]

      // Apply Friday mock by updating the prayer name
      if (isFridayMocked) {
        modifiedTimes = modifiedTimes.map((prayer) => {
          if (prayer.name === 'Dzuhur') {
            return {
              ...prayer,
              name: "Jum'at",
              iqomah: '', // Remove iqamah for Friday
            }
          }
          return prayer
        })
      } else {
        // Only force to Dzuhur if we're actively overriding a natural Friday
        // Don't change natural Friday detection from the prayer times hook
        const currentDate = new Date()
        const isActualFriday = currentDate.getDay() === 5

        if (!isActualFriday) {
          // Only change Jum'at to Dzuhur if it's NOT actually Friday
          modifiedTimes = modifiedTimes.map((prayer) => {
            if (prayer.name === "Jum'at") {
              return {
                ...prayer,
                name: 'Dzuhur',
                // Restore iqamah time (this should be handled by the hook that fetches times)
              }
            }
            return prayer
          })
        }
      }

      // Apply dev active index override
      if (devActiveIndex !== null) {
        modifiedTimes = modifiedTimes.map((prayer, index) => ({
          ...prayer,
          isActive: index === devActiveIndex,
          isNext: index === (devActiveIndex + 1) % modifiedTimes.length,
        }))
      }

      return modifiedTimes
    },
    [isDevMode, isFridayMocked, devActiveIndex]
  )

  return {
    isDevMode,
    isFridayMocked,
    devActiveIndex,
    handlePreviousPrayer,
    handleNextPrayer,
    handleToggleFridayMock,
    handleResetToRealTime,
    applyDevModeToTimes,
  }
}

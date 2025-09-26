import { useState, useEffect, useCallback } from 'react'
import { useList } from '@client/supabase'
import type { PrayerTime } from '../types'
import { ORGANIZATION_ID } from '../../../_constants'

interface UsePrayerTimesReturn {
  prayerTimes: PrayerTime[]
  isLoading: boolean
  error: string | null
  currentTime: Date
}

export const usePrayerTimes = (): UsePrayerTimesReturn => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch board configuration using hardcoded organization ID
  const { data: boardConfig, isLoading: configLoading } = useList(
    'board_configs',
    {
      pageSize: 1,
      page: 1,
      filters: [['eq', 'organization_id', ORGANIZATION_ID]],
    }
  )

  const config = boardConfig[0]

  // Add time to prayer time
  const addMinutes = useCallback((time: string, minutes: number): string => {
    const [hours, mins] = time.split(':').map(Number)
    if (hours === undefined || mins === undefined) return time
    const date = new Date()
    date.setHours(hours, mins + minutes, 0, 0)
    return date.toTimeString().slice(0, 5)
  }, [])

  // Fetch prayer times from MyQuran API
  useEffect(() => {
    if (!config?.city_id || configLoading) return

    const fetchPrayerTimes = async () => {
      try {
        setIsLoading(true)
        const todayStr = new Date().toISOString().slice(0, 10)
        const response = await fetch(
          `https://api.myquran.com/v2/sholat/jadwal/${config.city_id}/${todayStr}`
        )

        if (!response.ok) {
          throw new Error('Gagal memuat jadwal shalat')
        }

        const data = await response.json()
        const jadwal = data.data.jadwal

        // Check if today is Friday
        const currentDate = new Date()
        const isFriday = currentDate.getDay() === 5

        const times: PrayerTime[] = [
          {
            name: 'Subuh',
            time: jadwal.subuh,
            iqomah: addMinutes(jadwal.subuh, config.fajr_iqomah_offset || 20),
            isActive: false,
            isNext: false,
          },
          {
            name: 'Syuruq',
            time: jadwal.terbit,
            iqomah: '',
            isActive: false,
            isNext: false,
          },
          {
            name: isFriday ? "Jum'at" : 'Dzuhur',
            time: jadwal.dzuhur,
            iqomah: isFriday
              ? ''
              : addMinutes(jadwal.dzuhur, config.dhuhr_iqomah_offset || 10),
            isActive: false,
            isNext: false,
          },
          {
            name: 'Ashar',
            time: jadwal.ashar,
            iqomah: addMinutes(jadwal.ashar, config.asr_iqomah_offset || 10),
            isActive: false,
            isNext: false,
          },
          {
            name: 'Maghrib',
            time: jadwal.maghrib,
            iqomah: addMinutes(
              jadwal.maghrib,
              config.maghrib_iqomah_offset || 5
            ),
            isActive: false,
            isNext: false,
          },
          {
            name: 'Isya',
            time: jadwal.isya,
            iqomah: addMinutes(jadwal.isya, config.isha_iqomah_offset || 10),
            isActive: false,
            isNext: false,
          },
        ]

        setPrayerTimes(times)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrayerTimes()
  }, [
    config?.city_id,
    config?.fajr_iqomah_offset,
    config?.dhuhr_iqomah_offset,
    config?.asr_iqomah_offset,
    config?.maghrib_iqomah_offset,
    config?.isha_iqomah_offset,
    addMinutes,
    configLoading,
  ])

  // Update current time and prayer states
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      if (prayerTimes.length > 0) {
        const now = new Date()
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()

        // Reset all prayer states
        const updatedTimes = prayerTimes.map((prayer) => ({
          ...prayer,
          isActive: false,
          isNext: false,
        }))

        // Find current and next prayer
        let activeIndex = -1
        let nextIndex = -1

        for (let i = 0; i < updatedTimes.length; i++) {
          const prayer = updatedTimes[i]
          if (!prayer) continue
          const timeParts = prayer.time.split(':')
          const prayerHour = parseInt(timeParts[0] || '0')
          const prayerMinute = parseInt(timeParts[1] || '0')

          if (
            currentHour < prayerHour ||
            (currentHour === prayerHour && currentMinute < prayerMinute)
          ) {
            nextIndex = i
            activeIndex = i > 0 ? i - 1 : updatedTimes.length - 1
            break
          }
        }

        // If no next prayer found (past last prayer), next is first prayer tomorrow
        if (nextIndex === -1) {
          nextIndex = 0
          activeIndex = updatedTimes.length - 1
        }

        if (activeIndex >= 0 && updatedTimes[activeIndex]) {
          const activePrayer = updatedTimes[activeIndex]
          if (activePrayer) activePrayer.isActive = true
        }
        if (nextIndex >= 0 && updatedTimes[nextIndex]) {
          const nextPrayerItem = updatedTimes[nextIndex]
          if (nextPrayerItem) nextPrayerItem.isNext = true
        }

        setPrayerTimes(updatedTimes)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [prayerTimes])

  return {
    prayerTimes,
    isLoading: isLoading || configLoading,
    error,
    currentTime,
  }
}

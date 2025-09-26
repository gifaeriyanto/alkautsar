import { FiSun, FiSunrise, FiSunset, FiMoon, FiClock } from 'react-icons/fi'
import { PRAYER_BACKGROUNDS } from '../types'

export const getPrayerBackground = (prayerName: string): string => {
  return PRAYER_BACKGROUNDS[prayerName as keyof typeof PRAYER_BACKGROUNDS]
}

export const getPrayerIcon = (prayerName: string) => {
  const icons = {
    Subuh: FiSunrise,
    Syuruq: FiSun,
    Dzuhur: FiSun,
    "Jum'at": FiSun,
    Ashar: FiSun,
    Maghrib: FiSunset,
    Isya: FiMoon,
  }
  return icons[prayerName as keyof typeof icons] || FiClock
}

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

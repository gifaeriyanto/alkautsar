export interface PrayerTime {
  name: string
  time: string
  iqomah: string
  isActive: boolean
  isNext: boolean
}

export interface TimeUntilNextType {
  hours: number
  minutes: number
  seconds: number
}

export interface BoardConfigType {
  id: string
  city_id: string
  fajr_iqomah_offset: number
  dhuhr_iqomah_offset: number
  asr_iqomah_offset: number
  maghrib_iqomah_offset: number
  isha_iqomah_offset: number
}

export const PRAYER_BACKGROUNDS = {
  Subuh:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  Syuruq:
    'https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  Dzuhur:
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  "Jum'at":
    'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  Ashar:
    'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  Maghrib:
    'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  Isya: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
} as const

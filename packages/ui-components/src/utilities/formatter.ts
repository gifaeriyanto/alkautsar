/* eslint-disable import/no-duplicates */
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const number = (value: number) =>
  new Intl.NumberFormat('de-DE').format(value)

export const currency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

export const capitalizeFirstLetter = (string: string) => {
  try {
    const lowercase = string.toLowerCase()
    return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
  } catch (_error) {
    return ''
  }
}

export const capitalizeEachLetter = (string: string) => {
  const words = string.toLowerCase().split(' ')

  const capitalized = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.substring(1)
  })

  return capitalized.join(' ')
}

export const dateFormat = (date: Date, pattern?: string) => {
  return format(date, pattern || 'dd MMM yyyy', { locale: id })
}

export const dateFormFormat = (date: Date) => {
  return format(date, 'yyyy-MM-dd')
}

export const timeFormat = (time: Date | string) => {
  if (typeof time === 'string') {
    const inputTime = time.substring(0, 8)
    const date = `1970-01-01T${inputTime}`
    return format(new Date(date), 'HH:mm')
  }
  return format(time, 'HH:mm')
}

export const timezFormat = (time: string) => {
  // Extract time and timezone offset from input string
  const inputTime = time.substring(0, 8)
  // Format date string in ISO 8601 format
  const dateISOString = `1970-01-01T${inputTime}.000Z`

  const GMTTimeString = format(new Date(dateISOString), 'HH:mm')
  return GMTTimeString
}

export const presenceFormat = (
  presence: 'present' | 'permit' | 'absent' | null
) => {
  switch (presence) {
    case 'present':
      return 'Hadir'

    case 'permit':
      return 'Izin'

    case 'absent':
      return 'Absen'

    default:
      return '-'
  }
}

export const formatNumberWithOneDecimal = (num: number) => {
  // Check if number is already an integer
  if (Number.isInteger(num)) {
    return num.toFixed(0)
  }
  return num.toFixed(1)
}

export const percentage = (total: number, value: number) => {
  return formatNumberWithOneDecimal((value / total) * 100)
}

export const convertPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.startsWith('08')
    ? `+62${phoneNumber.substring(1)}`
    : phoneNumber
}

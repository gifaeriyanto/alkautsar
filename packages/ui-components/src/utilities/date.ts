import { subDays, startOfWeek, addDays, format } from 'date-fns'

export const getDateRange = () => {
  const today = new Date()
  const lastFriday = subDays(startOfWeek(today, { weekStartsOn: 1 }), 3) // prev friday
  const thisThursday = addDays(lastFriday, 6) // thursday on this week

  return {
    start_date: format(lastFriday, 'yyyy/MM/dd'),
    end_date: format(thisThursday, 'yyyy/MM/dd'),
  }
}

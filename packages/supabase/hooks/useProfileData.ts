/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useEffect, useState } from 'react'
import { getCRUDBase } from '../CRUD-base'
import { Tables } from '../types/database'
import { useUser } from './useUser'

export const useProfileData = () => {
  const [data, setData] = useState<Tables<'profiles'> | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const { data: userData } = useUser()
  const { getOneById } = getCRUDBase('profiles')

  useEffect(() => {
    if (!userData?.id || data) {
      return
    }
    setIsLoading(true)
    getOneById(userData.id)
      .then((res) => setData(res.data as any))
      .finally(() => {
        setIsLoading(false)
      })
  }, [data, getOneById, userData?.id])

  return { isLoading, data }
}

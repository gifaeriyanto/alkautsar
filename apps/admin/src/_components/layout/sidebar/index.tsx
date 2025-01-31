'use client'

import { useMediaQuery } from '@chakra-ui/react'
import { signOut } from '@client/supabase'
import { useRouter } from 'next/navigation'
import { DesktopMenu } from './desktop'
import { MobileMenu } from './mobile'

const Sidebar = () => {
  const router = useRouter()
  const [isLargerThan1140] = useMediaQuery('(min-width: 1140px)')

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <>
      {isLargerThan1140 ? (
        <DesktopMenu onLogout={handleLogout} />
      ) : (
        <MobileMenu onLogout={handleLogout} />
      )}
    </>
  )
}

export default Sidebar

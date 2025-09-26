import { useProfileData } from '@client/supabase'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { BiHomeAlt2, BiWallet, BiCalendarEvent } from 'react-icons/bi'
import { RiWallet3Line } from 'react-icons/ri'
import { MdDashboard } from 'react-icons/md'

const getMenus = (isAdmin: boolean) => [
  { label: 'Beranda', link: '/', icon: <BiHomeAlt2 /> },
  { label: 'Laporan Keuangan', link: '/laporan-keuangan', icon: <BiWallet /> },
  ...(isAdmin
    ? [
        { label: 'Kelola Event', link: '/events', icon: <BiCalendarEvent /> },
        { label: 'Kelola Wallet', link: '/wallets', icon: <RiWallet3Line /> },
        { label: 'Board Shalat', link: '/board', icon: <MdDashboard /> },
      ]
    : []),
]

export const useMenus = () => {
  const pathname = usePathname()
  const { data: profileData } = useProfileData()

  const isAdmin = profileData?.role === 'admin'
  const menus = getMenus(isAdmin)

  const activeIndex = useMemo(
    () =>
      menus.reduce((prev, curr, index) => {
        if (pathname.startsWith(curr.link)) {
          return index
        }
        return prev
      }, -1),
    [menus, pathname]
  )

  return menus.map((menu, index) => ({
    ...menu,
    isActive: index === activeIndex,
  }))
}

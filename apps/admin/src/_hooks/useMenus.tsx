import { useProfileData } from '@client/supabase'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { BiHomeAlt2, BiWallet } from 'react-icons/bi'
import { RiHandHeartLine } from 'react-icons/ri'

const getMenus = (isAdmin: boolean) => [
  { label: 'Beranda', link: '/', icon: <BiHomeAlt2 /> },
  { label: 'Laporan Keuangan', link: '/laporan-keuangan', icon: <BiWallet /> },
  ...(isAdmin
    ? [{ label: 'Bansos', link: '/bansos', icon: <RiHandHeartLine /> }]
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

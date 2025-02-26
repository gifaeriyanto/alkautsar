import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { BiHomeAlt2, BiWallet } from 'react-icons/bi'
import { RiHandHeartLine } from 'react-icons/ri'

const MENUS = [
  {
    label: 'Beranda',
    link: '/',
    icon: <BiHomeAlt2 />,
  },
  {
    label: 'Laporan Keuangan',
    link: '/laporan-keuangan',
    icon: <BiWallet />,
  },
  {
    label: 'Bansos',
    link: '/bansos',
    icon: <RiHandHeartLine />,
  },
]

export const useMenus = () => {
  const pathname = usePathname()

  const activeLink = useMemo(() => {
    const activeIndex = MENUS.reduce((prev, curr, index) => {
      if (pathname.startsWith(curr.link)) {
        return index
      }
      return prev
    }, -1)
    return activeIndex
  }, [pathname])

  return MENUS.map((menu, index) => ({
    ...menu,
    isActive: activeLink === index,
  }))
}

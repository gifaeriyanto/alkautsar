import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { BiHomeAlt2 } from 'react-icons/bi'

const MENUS = [
  {
    label: 'Beranda',
    link: '/',
    icon: <BiHomeAlt2 />,
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

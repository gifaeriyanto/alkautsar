import { useSelectedLayoutSegment } from 'next/navigation'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import AuthLayout from './auth'
import LayoutBody from './body'
import CommonLayout from './common'

const Layout = ({ children }: { children: ReactNode }) => {
  const layoutSegment = useSelectedLayoutSegment()

  const layout = useMemo(() => {
    switch (layoutSegment) {
      case '(auth)':
        return <AuthLayout>{children}</AuthLayout>

      default:
        return <CommonLayout>{children}</CommonLayout>
    }
  }, [children, layoutSegment])

  return <>{layout}</>
}

Layout.Body = LayoutBody
export default Layout

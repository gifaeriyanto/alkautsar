import { useSelectedLayoutSegment } from 'next/navigation'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import AuthLayout from './auth'
import LayoutBody from './body'
import CommonLayout from './common'
import RegisterLayout from './register'
import FullLayout from './full'

const Layout = ({ children }: { children: ReactNode }) => {
  const layoutSegment = useSelectedLayoutSegment()

  const layout = useMemo(() => {
    switch (layoutSegment) {
      case '(auth)':
        return <AuthLayout>{children}</AuthLayout>

      case '(register)':
        return <RegisterLayout>{children}</RegisterLayout>

      case 'market':
        return <FullLayout>{children}</FullLayout>

      default:
        return <CommonLayout>{children}</CommonLayout>
    }
  }, [children, layoutSegment])

  return <>{layout}</>
}

Layout.Body = LayoutBody
export default Layout

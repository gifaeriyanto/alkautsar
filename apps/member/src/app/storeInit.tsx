import { getClient } from '@client/supabase'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useOrganization } from '@/_store/organization'

const StoreInit: React.FC<PropsWithChildren> = ({ children }) => {
  const { saveOrganization } = useOrganization(
    useShallow((state) => ({ saveOrganization: state.save }))
  )

  const getOrgId = useCallback(async () => {
    const session = await getClient().auth.getSession()

    if (!session.data.session?.user.id) {
      return
    }

    getClient()
      .from('kaders')
      .select('organization_id')
      .eq('id', session.data.session.user.id)
      .single()
      .then((data) => {
        if (data.data?.organization_id) {
          saveOrganization(data.data.organization_id)
        }
      })
  }, [saveOrganization])

  useEffect(() => {
    getOrgId()
  }, [getOrgId])

  return <>{children}</>
}

export default StoreInit

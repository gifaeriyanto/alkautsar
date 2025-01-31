'use client'

import { getClient } from '@client/supabase'
import { ActionForm } from '@client/ui-components'
import { useParams } from 'next/navigation'
import { SUB_ORGANIZATION_MEMBER_FORM } from '@/_components/form/presets/organization'

const Index: React.FC = () => {
  const params = useParams()

  const handleSubmit = async (values: Record<string, any>) => {
    await getClient()
      .from('organizations_members')
      .insert(
        values.users.map((item: any) => ({
          profile_id: item.id,
          role: item.role,
          organization_id: params.id,
        }))
      )
      .throwOnError()
  }

  return (
    <ActionForm
      type="custom"
      table="organizations_members"
      redirectTo={`/sub-organisasi/${params.id as string}`}
      formFields={SUB_ORGANIZATION_MEMBER_FORM}
      dataId={params.id as string}
      onSubmit={handleSubmit}
    />
  )
}

export default Index

'use client'

import { ActionForm } from '@client/ui-components'
import { useParams } from 'next/navigation'
import React from 'react'
import { SUB_ORGANIZATION_FORM } from '@/_components/form/presets/organization'

const Index: React.FC = () => {
  const params = useParams()

  return (
    <ActionForm
      type="edit"
      table="organizations"
      redirectTo="/sub-organisasi"
      formFields={SUB_ORGANIZATION_FORM}
      dataId={params.id as string}
    />
  )
}

export default Index

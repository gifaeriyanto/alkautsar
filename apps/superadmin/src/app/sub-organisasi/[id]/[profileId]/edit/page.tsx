'use client'

import { ActionForm } from '@client/ui-components'
import React from 'react'
import axios from 'axios'
import { SUB_ORGANIZATION_MEMBER_ROLE_FORM } from '@/_components/form/presets/organization'

const Page = ({ params }: { params: { id: string; profileId: string } }) => {
  return (
    <ActionForm
      type="edit"
      table="profiles"
      redirectTo={`/sub-organisasi/${params.id}`}
      formFields={SUB_ORGANIZATION_MEMBER_ROLE_FORM}
      onSuccess={({ data }) => {
        axios.put('/api/admin', {
          id: data[0].id,
          metaData: { organization_id: data[0].organization_id },
        })
      }}
      dataId={params.profileId}
    />
  )
}

export default Page

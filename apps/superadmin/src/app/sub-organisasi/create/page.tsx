'use client'

import { ActionForm } from '@client/ui-components'
import { SUB_ORGANIZATION_FORM } from '@/_components/form/presets/organization'

const Index: React.FC = () => {
  return (
    <ActionForm
      type="create"
      table="organizations"
      redirectTo="/sub-organisasi"
      formFields={SUB_ORGANIZATION_FORM}
    />
  )
}

export default Index

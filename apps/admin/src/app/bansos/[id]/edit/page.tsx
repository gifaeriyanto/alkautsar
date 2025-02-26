'use client'

import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'
import { bansosMembersFormFields } from '../../constants'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <Layout.Body title="Edit Data Calon Penerima Bansos">
      <ActionForm
        formFields={bansosMembersFormFields}
        table="bansos_members"
        type="edit"
        redirectTo="/bansos"
        dataId={params.id}
      />
    </Layout.Body>
  )
}

export default Page

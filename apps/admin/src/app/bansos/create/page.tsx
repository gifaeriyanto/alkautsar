'use client'

import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'
import { bansosMembersFormFields } from '../constants'

const Page = () => {
  return (
    <Layout.Body title="Tambah Calon Penerima Bansos">
      <ActionForm
        formFields={bansosMembersFormFields}
        table="bansos_members"
        type="create"
        redirectTo="/bansos"
      />
    </Layout.Body>
  )
}

export default Page

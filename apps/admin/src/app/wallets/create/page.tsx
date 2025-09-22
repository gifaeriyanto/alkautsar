'use client'

import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'
import { walletsFormFields } from '../constants'

const Page = () => {
  return (
    <Layout.Body title="Tambah Wallet">
      <ActionForm
        formFields={walletsFormFields}
        table="wallets"
        type="create"
        redirectTo="/wallets"
      />
    </Layout.Body>
  )
}

export default Page
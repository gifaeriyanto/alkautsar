'use client'

import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'
import { walletsFormFields } from '../../constants'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <Layout.Body title="Edit Wallet">
      <ActionForm
        formFields={walletsFormFields}
        table="wallets"
        type="edit"
        redirectTo="/wallets"
        dataId={params.id}
      />
    </Layout.Body>
  )
}

export default Page
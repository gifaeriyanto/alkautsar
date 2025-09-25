'use client'

import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'
import { eventsFormFields } from '../constants'

const Page = () => {
  return (
    <Layout.Body title="Tambah Event">
      <ActionForm
        formFields={eventsFormFields}
        table="events"
        type="create"
        redirectTo="/events"
      />
    </Layout.Body>
  )
}

export default Page

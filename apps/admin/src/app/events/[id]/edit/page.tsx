'use client'

import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'
import { eventsFormFields } from '../../constants'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <Layout.Body title="Edit Event">
      <ActionForm
        formFields={eventsFormFields}
        table="events"
        type="edit"
        redirectTo="/events"
        dataId={params.id}
      />
    </Layout.Body>
  )
}

export default Page

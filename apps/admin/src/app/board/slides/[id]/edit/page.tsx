'use client'

import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'
import { boardSlidesFormFields } from '@/_validations/board'

interface PageProps {
  params: { id: string }
}

const Page = ({ params }: PageProps) => {
  return (
    <Layout.Body title="Edit Slide Board">
      <ActionForm
        formFields={boardSlidesFormFields}
        table="board_slides"
        type="edit"
        dataId={params.id}
        redirectTo="/board/slides"
      />
    </Layout.Body>
  )
}

export default Page

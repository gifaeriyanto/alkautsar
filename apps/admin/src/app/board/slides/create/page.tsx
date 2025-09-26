'use client'

import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'
import { boardSlidesFormFields } from '@/_validations/board'

const Page = () => {
  return (
    <Layout.Body title="Tambah Slide Board">
      <ActionForm
        formFields={boardSlidesFormFields}
        table="board_slides"
        type="create"
        redirectTo="/board/slides"
      />
    </Layout.Body>
  )
}

export default Page

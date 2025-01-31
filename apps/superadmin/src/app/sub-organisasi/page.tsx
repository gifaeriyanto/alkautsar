'use client'

import { CRUDTable } from '@client/ui-components'
import Layout from '../../_components/layout'

const Page = () => {
  return (
    <Layout.Body title="Sub Organisasi">
      <CRUDTable
        table="organizations"
        baseUrl="/sub-organisasi"
        fields={[
          { type: 'avatar', name: 'name', noImage: true },
          { type: 'text', name: 'name', bold: true },
        ]}
        softDelete
      />
    </Layout.Body>
  )
}

export default Page

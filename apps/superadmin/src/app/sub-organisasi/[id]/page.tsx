'use client'

import { CRUDTable, useSearch } from '@client/ui-components'
import Layout from '@/_components/layout'

const Page = ({ params }: { params: { id: string } }) => {
  const { filter, renderSearch, sort } = useSearch()

  return (
    <Layout.Body title="Anggota">
      <CRUDTable
        table="profiles"
        baseUrl={`/sub-organisasi/${params.id}`}
        fields={[
          { name: 'avatar', type: 'avatar' },
          {
            name: 'name',
            type: 'text',
            width: { base: '155px', lg: '265px' },
            bold: true,
          },
          { name: 'role', type: 'text', capitalize: true, hideOnMobile: true },
        ]}
        filters={[...filter, ['eq', 'organization_id', params.id]]}
        select="id, name, avatar, role"
        renderSearch={renderSearch}
        sort={sort}
      />
    </Layout.Body>
  )
}

export default Page

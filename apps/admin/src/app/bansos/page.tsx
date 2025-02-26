'use client'

import { CRUDTable, useSearch } from '@client/ui-components'
import Layout from '@/_components/layout'

const Page = () => {
  const { renderSearch, sort, filter } = useSearch({
    searchNameKey: 'full_name',
    defaultSortKey: 'created_at',
  })

  return (
    <Layout.Body title="Bansos">
      <CRUDTable
        table="bansos_members"
        fields={[
          { name: 'full_name', type: 'text', width: 200 },
          {
            name: 'whatsapp_number',
            type: 'text',
            width: 200,
            hideOnMobile: true,
          },
          { name: 'job', type: 'text' },
        ]}
        baseUrl="/bansos"
        filters={filter}
        sort={sort}
        renderSearch={renderSearch}
      />
    </Layout.Body>
  )
}

export default Page

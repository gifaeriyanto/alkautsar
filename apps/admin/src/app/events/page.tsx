'use client'

import { CRUDTable, useSearch } from '@client/ui-components'
import Layout from '@/_components/layout'

const Page = () => {
  const { renderSearch, sort, filter } = useSearch({
    searchNameKey: 'name',
    defaultSortKey: 'created_at',
  })

  return (
    <Layout.Body title="Kelola Event">
      <CRUDTable
        table="events"
        fields={[
          { name: 'image', type: 'photo', width: 60, hideOnMobile: true },
          { name: 'name', type: 'text', width: 250 },
          { name: 'start_date', type: 'date' },
        ]}
        baseUrl="/events"
        filters={filter}
        sort={sort}
        renderSearch={renderSearch}
        disableDetail
      />
    </Layout.Body>
  )
}

export default Page

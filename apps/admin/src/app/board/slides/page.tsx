'use client'

import { CRUDTable, useSearch } from '@client/ui-components'
import Layout from '@/_components/layout'

const Page = () => {
  const { renderSearch, sort, filter } = useSearch({
    searchNameKey: 'title',
    defaultSortKey: 'display_order',
  })

  return (
    <Layout.Body title="Kelola Slide Board">
      <CRUDTable
        table="board_slides"
        fields={[
          { name: 'image_url', type: 'photo', width: 60, hideOnMobile: true },
          { name: 'title', type: 'text', width: 200 },
          { name: 'display_order', type: 'text', width: 100 },
          { name: 'is_active', type: 'text', width: 80 },
          { name: 'start_date', type: 'date', width: 120, hideOnMobile: true },
          { name: 'end_date', type: 'date', width: 120, hideOnMobile: true },
        ]}
        baseUrl="/board/slides"
        filters={filter}
        sort={sort}
        renderSearch={renderSearch}
        disableDetail
      />
    </Layout.Body>
  )
}

export default Page

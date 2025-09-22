'use client'

import { CRUDTable, useSearch } from '@client/ui-components'
import Layout from '@/_components/layout'

const Page = () => {
  const { renderSearch, sort, filter } = useSearch({
    searchNameKey: 'name',
    defaultSortKey: 'created_at',
  })

  return (
    <Layout.Body title="Kelola Wallet">
      <CRUDTable
        table="wallets"
        fields={[{ name: 'name', type: 'text', width: 200 }]}
        baseUrl="/wallets"
        filters={filter}
        sort={sort}
        renderSearch={renderSearch}
        disableDetail
      />
    </Layout.Body>
  )
}

export default Page

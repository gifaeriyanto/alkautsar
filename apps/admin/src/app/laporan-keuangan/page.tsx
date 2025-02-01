'use client'

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useList } from '@client/supabase'
import { CRUDTable, useSearch } from '@client/ui-components'
import Layout from '@/_components/layout'

const ListData = ({ walletId }: { walletId: string }) => {
  const { renderSearch, sort, filter } = useSearch({
    searchNameKey: 'description',
    defaultSortKey: 'date',
  })

  return (
    <CRUDTable
      table="financial_reports"
      fields={[
        { name: 'date', type: 'date' },
        { name: 'description', type: 'text' },
        { name: 'amount', type: 'currency' },
      ]}
      baseUrl="/laporan-keuangan"
      variant="table"
      renderSearch={renderSearch}
      sort={sort}
      filters={[['eq', 'wallet_id', walletId], ...filter]}
    />
  )
}

const Page = () => {
  const { data: walletsData } = useList('wallets')

  return (
    <Layout.Body title="Laporan Keuangan">
      <Tabs>
        <TabList>
          {walletsData.map((wallet) => (
            <Tab key={wallet.id}>{wallet.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {walletsData.map((wallet) => (
            <TabPanel key={wallet.id}>
              <ListData walletId={wallet.id} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Layout.Body>
  )
}

export default Page

'use client'

import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { useList } from '@client/supabase'
import { CRUDTable, currency, useSearch } from '@client/ui-components'
import { BiPrinter } from 'react-icons/bi'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '@/_components/layout'
import { useWallet } from '@/_store/wallet'

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
        {
          name: 'amount',
          type: 'currency',
          render: (data) => {
            if (data.amount > 0) {
              return (
                <Text color="green.500" fontWeight="bold">
                  {currency(data.amount)}
                </Text>
              )
            }
            return (
              <Text color="red.500" fontWeight="bold">
                {currency(data.amount)}
              </Text>
            )
          },
        },
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
  const { id: walletId, setWallet } = useWallet()
  const activeTab = walletsData.findIndex((item) => item.id === walletId)
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: number) => {
    if (walletsData[index]) {
      setWallet(walletsData[index])
    }
  }

  useEffect(() => {
    setTabIndex(activeTab)
  }, [activeTab])

  return (
    <Layout.Body
      title="Laporan Keuangan"
      actionArea={
        <Button
          as={Link}
          href="/laporan-keuangan/print"
          ml="auto"
          rightIcon={<BiPrinter />}
          bgColor="white"
          colorScheme="gray"
        >
          Cetak laporan
        </Button>
      }
    >
      <Tabs index={tabIndex} onChange={handleTabsChange}>
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

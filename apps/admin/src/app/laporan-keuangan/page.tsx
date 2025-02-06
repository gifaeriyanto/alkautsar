'use client'

import {
  Button,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { useList } from '@client/supabase'
import {
  CRUDTable,
  currency,
  dateFormat,
  useSearch,
} from '@client/ui-components'
import { BiPrinter } from 'react-icons/bi'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TextStyle } from 'theme/client'
import Layout from '@/_components/layout'
import { useWallet } from '@/_store/wallet'

const ListData = ({ walletId }: { walletId: string }) => {
  const [isLargerThan1140] = useMediaQuery('(min-width: 1140px)')
  const { renderSearch, sort, filter } = useSearch({
    searchNameKey: 'description',
    defaultSortKey: 'date',
  })

  return (
    <CRUDTable
      table="financial_reports"
      fields={[
        { name: 'date', type: 'date', hideOnMobile: true },
        { name: 'description', type: 'text', hideOnMobile: true },
        {
          name: 'amount',
          type: 'currency',
          render: (data) => {
            let amountComponent = (
              <Text color="red.500" fontWeight="bold">
                {currency(data.amount)}
              </Text>
            )
            if (data.amount > 0) {
              amountComponent = (
                <Text color="green.500" fontWeight="bold">
                  {currency(data.amount)}
                </Text>
              )
            }

            if (!isLargerThan1140) {
              return (
                <VStack align="flex-start">
                  <Text textStyle={TextStyle.Tag} color="gray.500">
                    {dateFormat(new Date(data.date), 'dd MMMM yyyy')}
                  </Text>
                  <Text textStyle={TextStyle.Small}>{data.description}</Text>
                  {amountComponent}
                </VStack>
              )
            }

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
      variant={isLargerThan1140 ? 'table' : 'standard'}
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
  const [isLargerThan1140] = useMediaQuery('(min-width: 1140px)')

  const handleTabsChange = (index: number) => {
    const wallet = walletsData[index]
    if (wallet) {
      setWallet(wallet)
    }
  }

  useEffect(() => {
    setTabIndex(activeTab)
  }, [activeTab])

  return (
    <Layout.Body
      title="Laporan Keuangan"
      actionArea={
        isLargerThan1140 ? (
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
        ) : (
          <IconButton
            icon={<BiPrinter />}
            aria-label="print"
            as={Link}
            href="/laporan-keuangan/print"
            mr="50px"
            borderRadius="lg"
            colorScheme="gray"
            variant="outline"
            bgColor="white"
          />
        )
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

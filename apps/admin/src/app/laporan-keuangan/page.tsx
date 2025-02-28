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
import { useList, useProfileData } from '@client/supabase'
import {
  CRUDTable,
  currency,
  dateFormat,
  useSearch,
} from '@client/ui-components'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { BiPrinter } from 'react-icons/bi'
import { TextStyle } from 'theme/client'
import { useWallet } from '@/_store/wallet'
import Layout from '@/_components/layout'

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
  const [tabIndex, setTabIndex] = useState(0)
  const [isLargerThan1140] = useMediaQuery('(min-width: 1140px)')
  const { data: profileData } = useProfileData()

  const isAdminRamadhan = useMemo(() => {
    return profileData?.role === 'admin-ramadhan'
  }, [profileData])

  const filteredWallets = useMemo(() => {
    if (isAdminRamadhan) {
      return walletsData.filter((wallet) => wallet.name === 'Kas Ramadhan')
    }
    return walletsData.filter((wallet) => wallet.name !== 'Kas Ramadhan')
  }, [isAdminRamadhan, walletsData])
  const activeTab = filteredWallets.findIndex((item) => item.id === walletId)

  const handleTabsChange = (index: number) => {
    const wallet = filteredWallets[index]
    if (wallet) {
      setWallet(wallet)
    }
  }

  useEffect(() => {
    if (walletId) {
      return
    }

    const defaultWalletData = filteredWallets[0]
    if (defaultWalletData) {
      setWallet(defaultWalletData)
    }
  }, [setWallet, walletId, filteredWallets])

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
            href={
              isAdminRamadhan
                ? '/laporan-keuangan/ramadhan/print'
                : '/laporan-keuangan/print'
            }
            ml="auto"
            rightIcon={<BiPrinter />}
            bgColor="white"
            colorScheme="gray"
          >
            {isAdminRamadhan ? 'Cetak Laporan Ramadhan' : 'Cetak Laporan'}
          </Button>
        ) : (
          <IconButton
            icon={<BiPrinter />}
            aria-label="print"
            as={Link}
            href={
              isAdminRamadhan
                ? '/laporan-keuangan/ramadhan/print'
                : '/laporan-keuangan/print'
            }
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
          {filteredWallets.map((wallet) => (
            <Tab key={wallet.id}>{wallet.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {filteredWallets.map((wallet) => (
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

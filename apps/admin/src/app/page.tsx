'use client'

import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react'
import { getClient, useList } from '@client/supabase'
import { currency, dateFormat, getDateRange } from '@client/ui-components'
import { useState, useEffect, useMemo } from 'react'
import { TextStyle } from 'theme/client'
import Layout from '@/_components/layout'

const Report = ({ walletId }: { walletId: string }) => {
  const supabase = getClient()
  const [walletSummary, setWalletSummary] = useState<
    | {
        total_income: number
        total_expense: number
        balance: number
        comparation: number
        isPositive: boolean
      }
    | undefined
  >(undefined)

  useEffect(() => {
    const { start_date, end_date } = getDateRange()
    supabase
      .rpc('get_wallet_summary', {
        start_date,
        end_date,
        wallet_id: walletId,
      })
      .then((res) => {
        if (res.data) {
          const summary = res.data[0]
          if (summary) {
            const comparation = summary.total_income + summary.total_expense
            setWalletSummary({
              ...summary,
              comparation,
              isPositive: comparation > 0,
            })
          }
        }
      })
  }, [supabase, walletId])

  return (
    <>
      {walletSummary ? (
        <SimpleGrid minChildWidth="120px" spacing={4} mb={8}>
          <Card>
            <CardHeader>Saldo saat ini</CardHeader>
            <CardBody>
              <Text textStyle={TextStyle.H3}>
                {currency(walletSummary.balance)}
              </Text>
              <Text
                textStyle={TextStyle.H4}
                color={walletSummary.isPositive ? 'green.500' : 'red.500'}
                _before={{
                  content: walletSummary.isPositive ? '"+"' : '""',
                }}
              >
                {currency(walletSummary.comparation)}
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Total pemasukan</CardHeader>
            <CardBody>
              <Text textStyle={TextStyle.H3}>
                {currency(walletSummary.total_income)}
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Total pengeluaran</CardHeader>
            <CardBody>
              <Text textStyle={TextStyle.H3}>
                {currency(walletSummary.total_expense)}
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      ) : null}
    </>
  )
}

const Page = () => {
  const { data: walletsData } = useList('wallets')
  const { start_date, end_date } = useMemo(getDateRange, [])

  return (
    <Layout.Body title="Beranda">
      <VStack w="full" align="stretch">
        {walletsData.map((wallet) => (
          <Box key={wallet.id}>
            <Text textStyle={TextStyle.H3} mb={2}>
              {wallet.name}
            </Text>
            <Text textStyle={TextStyle.H4} mb={6} color="gray.500">
              {dateFormat(new Date(start_date))} -{' '}
              {dateFormat(new Date(end_date))}
            </Text>
            <Report walletId={wallet.id} />
          </Box>
        ))}
      </VStack>
    </Layout.Body>
  )
}

export default Page

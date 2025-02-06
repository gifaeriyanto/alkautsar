'use client'

import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { getClient, useList } from '@client/supabase'
import { currency, dateFormat, getDateRange } from '@client/ui-components'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TextStyle } from 'theme/client'
import ImageTtdBendahara from 'public/static/ttd-bendahara.png'
import ImageTtdKetua from 'public/static/ttd-ketua.png'
import ImageStamp from 'public/static/stamp.png'
import Layout from '@/_components/layout'

const Page = () => {
  const supabase = getClient()
  const { data: walletsData } = useList('wallets')
  const { start_date, end_date } = useMemo(getDateRange, [])
  const { data: financialReportsData } = useList('financial_reports', {
    filters: [
      ['gte', 'date', start_date],
      ['lte', 'date', end_date],
    ],
  })

  const [walletSummary, setWalletSummary] = useState<
    | Record<
        string,
        {
          total_income: number
          total_expense: number
          balance: number
          comparation: number
          isPositive: boolean
        }
      >
    | undefined
  >(undefined)

  const getWalletSummary = useCallback(
    (walletId: string) => {
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
              setWalletSummary((prev) => ({
                ...prev,
                [walletId]: {
                  ...summary,
                  comparation,
                  isPositive: comparation > 0,
                },
              }))
            }
          }
        })
    },
    [end_date, start_date, supabase]
  )

  useEffect(() => {
    walletsData.forEach((wallet) => {
      getWalletSummary(wallet.id)
    })
  }, [getWalletSummary, walletsData])

  return (
    <Layout.Body>
      <VStack align="stretch" spacing={8}>
        <VStack mb={8}>
          <Text textStyle={TextStyle.H1}>
            Laporan Keuangan Masjid Al-Kautsar CitraLand Tallasa City
          </Text>
          <Text textStyle={TextStyle.H2}>
            {dateFormat(new Date(start_date), 'dd MMMM yyyy')} -{' '}
            {dateFormat(new Date(end_date), 'dd MMMM yyyy')}
          </Text>
        </VStack>
        {walletsData.map((wallet) => {
          const summary = walletSummary?.[wallet.id]
          return (
            <Box key={wallet.id}>
              <Text textStyle={TextStyle.H3} mb={4}>
                {wallet.name}
              </Text>
              <TableContainer
                bgColor="white"
                sx={{
                  'th, td': {
                    borderLeft: '1px solid',
                    borderColor: 'gray.500',
                    _last: {
                      borderRight: '1px solid',
                    },
                  },
                  tr: {
                    _first: {
                      'th, td': {
                        borderTop: '1px solid',
                      },
                    },
                  },
                }}
              >
                <Table>
                  <Thead>
                    {summary ? (
                      <Tr fontWeight="bold" bgColor="yellow.100">
                        <Td>Saldo pekan sebelumnya</Td>
                        <Td isNumeric colSpan={2}>
                          {currency(summary.balance - summary.comparation)}
                        </Td>
                      </Tr>
                    ) : null}
                    <Tr>
                      <Th>Nama transaksi</Th>
                      <Th>Pemasukan</Th>
                      <Th>Pengeluaran</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {financialReportsData
                      .filter(
                        (item) =>
                          item.wallet_id === wallet.id && item.amount >= 0
                      )
                      .map((item) => (
                        <Tr key={item.id}>
                          <Td>{item.description}</Td>
                          <Td isNumeric>
                            {item.amount >= 0 ? currency(item.amount) : null}
                          </Td>
                          <Td isNumeric>
                            {item.amount < 0 ? currency(item.amount) : null}
                          </Td>
                        </Tr>
                      ))}
                    {financialReportsData
                      .filter(
                        (item) =>
                          item.wallet_id === wallet.id && item.amount < 0
                      )
                      .map((item) => (
                        <Tr key={item.id}>
                          <Td>{item.description}</Td>
                          <Td isNumeric>
                            {item.amount >= 0 ? currency(item.amount) : null}
                          </Td>
                          <Td isNumeric>
                            {item.amount < 0 ? currency(item.amount) : null}
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                  {summary ? (
                    <Tfoot
                      fontWeight="bold"
                      borderTop="1px solid"
                      borderColor="gray.500"
                    >
                      <Tr>
                        <Td>Total</Td>
                        <Td isNumeric color="green.500">
                          {currency(summary.total_income)}
                        </Td>
                        <Td isNumeric color="red.500">
                          {currency(summary.total_expense)}
                        </Td>
                      </Tr>
                      <Tr bgColor="green.50">
                        <Td>Saldo saat ini</Td>
                        <Td isNumeric colSpan={2}>
                          {currency(summary.balance)}
                        </Td>
                      </Tr>
                    </Tfoot>
                  ) : null}
                </Table>
              </TableContainer>
            </Box>
          )
        })}
      </VStack>

      <Box mt={8}>
        <Text textAlign="right">
          Makassar, {dateFormat(new Date(), 'dd MMMM yyyy')}
        </Text>
        <Box display="flex" justifyContent="space-around">
          <Box textAlign="center">
            <VStack mt={6}>
              <Image
                {...ImageTtdKetua}
                alt="Ttd Ketua"
                width={150}
                height={150}
              />
              <Text fontWeight="bold" borderBottom="1px solid" mt="-40px">
                Dr. Taufan Kurniawan, S.E., M.M.
              </Text>
              <Text>Ketua</Text>
            </VStack>
          </Box>

          <Box textAlign="center">
            <VStack mt={6} pos="relative">
              <Image
                {...ImageTtdBendahara}
                alt="Ttd Bendahara"
                width={150}
                height={150}
              />
              <Box pos="absolute" left="-100px">
                <Image {...ImageStamp} alt="Stempel" width={150} height={150} />
              </Box>
              <Text fontWeight="bold" borderBottom="1px solid" mt="-40px">
                Hj. Andi Erni Novianty
              </Text>
              <Text>Bendahara</Text>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Layout.Body>
  )
}

export default Page

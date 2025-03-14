'use client'

import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Select,
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
import {
  currency,
  dateFormat,
  getDateRangeRamadhan,
} from '@client/ui-components'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TextStyle } from 'theme/client'
import { format, startOfYesterday } from 'date-fns'
import { orderBy } from 'lodash'
import ImageStamp from 'public/static/stamp.png'
import ImageTtdBendaharaRamadhan from 'public/static/ttd-bendahara-ramadhan.png'
import ImageTtdKetua from 'public/static/ttd-ketua.png'
import ImageTtdKetuaRamadhan from 'public/static/ttd-ketua-ramadhan.png'
import Layout from '@/_components/layout'

const Page = () => {
  const supabase = getClient()
  const { data: walletsData } = useList('wallets', {
    filters: [['eq', 'name', 'Kas Ramadhan']],
  })
  const { start_date, end_date } = useMemo(getDateRangeRamadhan, [])
  const { data: financialReportsData } = useList('financial_reports', {
    filters: [
      ['eq', 'date', start_date],
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
  const [printFormat, setPrintFormat] = useState<'common' | 'for-read'>(
    'common'
  )

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

  const renderReport = useMemo(() => {
    if (printFormat === 'for-read') {
      return (
        <>
          {walletsData.map((wallet) => {
            const summary = walletSummary?.[wallet.id]
            if (!summary) {
              return null
            }
            return (
              <Box key={wallet.id}>
                <VStack align="stretch" spacing={8}>
                  <Box>
                    <Text textStyle={TextStyle.H1} mb={4} textAlign="center">
                      Pemasukan
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
                        <Tbody>
                          <Tr fontWeight="bold" bgColor="yellow.100">
                            <Td>Saldo kas sampai malam lalu</Td>
                            <Td w="200px" isNumeric>
                              {currency(summary.balance - summary.comparation)}
                            </Td>
                          </Tr>
                          {financialReportsData
                            .filter(
                              (item) =>
                                item.wallet_id === wallet.id && item.amount >= 0
                            )
                            .map((item) => (
                              <Tr key={item.id}>
                                <Td>{item.description}</Td>
                                <Td isNumeric>
                                  {item.amount >= 0
                                    ? currency(item.amount)
                                    : null}
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                        <Tfoot
                          fontWeight="bold"
                          borderTop="1px solid"
                          borderColor="gray.500"
                        >
                          <Tr bgColor="green.50">
                            <Td>Total pemasukan malam ini</Td>
                            <Td w="200px" isNumeric color="green.500">
                              {currency(summary.total_income)}
                            </Td>
                          </Tr>
                        </Tfoot>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Box>
                    <Text textStyle={TextStyle.H1} mb={4} textAlign="center">
                      Pengeluaran
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
                        <Tbody>
                          {financialReportsData
                            .filter(
                              (item) =>
                                item.wallet_id === wallet.id && item.amount < 0
                            )
                            .map((item) => (
                              <Tr key={item.id}>
                                <Td>{item.description}</Td>
                                <Td w="200px" isNumeric>
                                  {item.amount < 0
                                    ? currency(item.amount)
                                    : null}
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                        <Tfoot
                          fontWeight="bold"
                          borderTop="1px solid"
                          borderColor="gray.500"
                        >
                          <Tr bgColor="red.50">
                            <Td>Total pengeluaran malam ini</Td>
                            <Td w="200px" isNumeric color="red.500">
                              {currency(summary.total_expense)}
                            </Td>
                          </Tr>
                        </Tfoot>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Box textAlign="center" my={8}>
                    <Text textStyle={TextStyle.H3} mb={4}>
                      Total saldo saat ini
                    </Text>

                    <Text
                      textStyle={TextStyle.H1}
                      mb={4}
                      fontSize="xx-large"
                      color="green.500"
                    >
                      {currency(summary.balance)}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            )
          })}
        </>
      )
    }

    return (
      <>
        {walletsData.map((wallet) => {
          const summary = walletSummary?.[wallet.id]
          return (
            <Box key={wallet.id}>
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
                        <Td>
                          Saldo {format(startOfYesterday(), 'dd MMM yyyy')}
                        </Td>
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
                    {orderBy(
                      financialReportsData.filter(
                        (item) =>
                          item.wallet_id === wallet.id && item.amount >= 0
                      ),
                      ['description'],
                      ['asc']
                    ).map((item) => (
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
                    {orderBy(
                      financialReportsData.filter(
                        (item) =>
                          item.wallet_id === wallet.id && item.amount < 0
                      ),
                      ['description'],
                      ['asc']
                    ).map((item) => (
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
      </>
    )
  }, [financialReportsData, printFormat, walletSummary, walletsData])

  return (
    <Layout.Body>
      <Card
        mb={8}
        sx={{
          '@media print': {
            display: 'none',
          },
        }}
      >
        <CardBody>
          <FormControl>
            <FormLabel>Format cetak</FormLabel>
            <Select
              onChange={(e) => {
                setPrintFormat(e.currentTarget.value as typeof printFormat)
              }}
              value={printFormat}
            >
              <option value="common">Standard</option>
              <option value="for-read">Protokol</option>
            </Select>
          </FormControl>
        </CardBody>
      </Card>
      <VStack align="stretch" spacing={8}>
        <VStack mb={8} textAlign="center">
          <Text textStyle={TextStyle.H1}>
            Laporan Keuangan Ramadhan Masjid Al-Kautsar CitraLand Tallasa City
          </Text>
          <Text textStyle={TextStyle.H2}>
            {dateFormat(new Date(start_date), 'dd MMMM yyyy')}
          </Text>
        </VStack>
        {renderReport}
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
              <Text>Ketua Pengurus</Text>
            </VStack>
          </Box>

          <Box textAlign="center">
            <VStack mt={6}>
              <Image
                {...ImageTtdKetuaRamadhan}
                alt="Ttd Ketua"
                width={150}
                height={150}
              />
              <Text fontWeight="bold" borderBottom="1px solid" mt="-40px">
                dr. A. Irwansyah Achmad, Sp.B.
              </Text>
              <Text>Ketua Panitia Ramadhan</Text>
            </VStack>
          </Box>

          <Box textAlign="center">
            <VStack mt={6} pos="relative">
              <Image
                {...ImageTtdBendaharaRamadhan}
                alt="Ttd Bendahara"
                width={150}
                height={150}
              />
              <Box pos="absolute" left="-100px">
                <Image {...ImageStamp} alt="Stempel" width={150} height={150} />
              </Box>
              <Text fontWeight="bold" borderBottom="1px solid" mt="-40px">
                A. Irdiansyah Achmad, A.Md
              </Text>
              <Text>Bendahara Panitia Ramadhan</Text>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Layout.Body>
  )
}

export default Page

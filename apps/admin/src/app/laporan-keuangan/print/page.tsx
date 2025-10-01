'use client'

import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
import { orderBy } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { BiChevronDown } from 'react-icons/bi'
import ImageTtdBendahara from 'public/static/ttd-bendahara.png'
import ImageTtdKetua from 'public/static/ttd-ketua.png'
import ImageStamp from 'public/static/stamp.png'
import Layout from '@/_components/layout'

const Page = () => {
  const supabase = getClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: walletsData } = useList('wallets')

  // Get default date range (Friday to Thursday)
  const defaultDateRange = useMemo(getDateRange, [])

  // Get date range from URL params or use default
  const start_date =
    searchParams.get('start_date') || defaultDateRange.start_date
  const end_date = searchParams.get('end_date') || defaultDateRange.end_date

  // Get selected wallets from URL params or use all wallets
  const selectedWalletIds = useMemo(() => {
    const walletParam = searchParams.get('wallets')
    if (walletParam) {
      return walletParam.split(',')
    }
    return walletsData.map((wallet) => wallet.id)
  }, [searchParams, walletsData])

  // State for the date inputs
  const [startDateInput, setStartDateInput] = useState(
    start_date.replace(/\//g, '-')
  )
  const [endDateInput, setEndDateInput] = useState(end_date.replace(/\//g, '-'))

  // State for wallet selection
  const [selectedWallets, setSelectedWallets] =
    useState<string[]>(selectedWalletIds)

  const { data: financialReportsData } = useList('financial_reports', {
    filters: [
      ['gte', 'date', start_date],
      ['lte', 'date', end_date],
      ['in', 'wallet_id', selectedWalletIds],
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

  const totalBalance = useMemo(() => {
    if (!walletSummary) {
      return 0
    }
    return selectedWalletIds.reduce((prev, walletId) => {
      return prev + (walletSummary[walletId]?.balance || 0)
    }, 0)
  }, [walletSummary, selectedWalletIds])

  // Handler for wallet selection
  const handleWalletToggle = useCallback((walletId: string) => {
    setSelectedWallets((prev) => {
      if (prev.includes(walletId)) {
        return prev.filter((id) => id !== walletId)
      }
      return [...prev, walletId]
    })
  }, [])

  // Handler for selecting all wallets
  const handleSelectAllWallets = useCallback(() => {
    setSelectedWallets(walletsData.map((wallet) => wallet.id))
  }, [walletsData])

  // Handler for applying filters
  const handleApplyFilter = useCallback(() => {
    const params = new URLSearchParams()
    const formattedStartDate = startDateInput.replace(/-/g, '/')
    const formattedEndDate = endDateInput.replace(/-/g, '/')

    params.set('start_date', formattedStartDate)
    params.set('end_date', formattedEndDate)

    if (selectedWallets.length < walletsData.length) {
      params.set('wallets', selectedWallets.join(','))
    }

    router.push(`?${params.toString()}`)
  }, [
    startDateInput,
    endDateInput,
    selectedWallets,
    walletsData.length,
    router,
  ])

  // Handler for resetting to default
  const handleResetFilter = useCallback(() => {
    const defaultRange = getDateRange()
    setStartDateInput(defaultRange.start_date.replace(/\//g, '-'))
    setEndDateInput(defaultRange.end_date.replace(/\//g, '-'))
    setSelectedWallets(walletsData.map((wallet) => wallet.id))
    router.push('/laporan-keuangan/print')
  }, [router, walletsData])

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

  // Sync selected wallets state with URL params
  useEffect(() => {
    setSelectedWallets(selectedWalletIds)
  }, [selectedWalletIds])

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
        {walletsData
          .filter((wallet) => selectedWalletIds.includes(wallet.id))
          .map((wallet) => {
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
        <Flex
          justify="space-between"
          border="1px solid"
          borderColor="gray.500"
          p={4}
          bgColor="green.100"
        >
          <Text textStyle={TextStyle.H3}>Total Saldo Seluruh Kas</Text>
          <Text textStyle={TextStyle.H1} color="green.500">
            {currency(totalBalance)}
          </Text>
        </Flex>
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

      {/* Floating Date Range Filter */}
      <Box
        position="fixed"
        bottom={6}
        left="50%"
        transform="translateX(-50%)"
        p={3}
        bg="white"
        borderRadius="xl"
        boxShadow="0 8px 25px rgba(0, 0, 0, 0.15)"
        border="1px solid"
        borderColor="gray.100"
        zIndex={1000}
        sx={{
          '@media print': {
            display: 'none',
          },
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <HStack spacing={3} align="center">
          <Input
            type="date"
            value={startDateInput}
            onChange={(e) => {
              setStartDateInput(e.target.value)
            }}
            size="sm"
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: 'blue.300' }}
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
            w="140px"
          />
          <Text color="gray.400" fontSize="sm" fontWeight="medium">
            —
          </Text>
          <Input
            type="date"
            value={endDateInput}
            onChange={(e) => {
              setEndDateInput(e.target.value)
            }}
            size="sm"
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: 'blue.300' }}
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
            w="140px"
          />

          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<BiChevronDown />}
              size="sm"
              variant="outline"
              borderRadius="md"
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.300' }}
              minW="120px"
            >
              {selectedWallets.length === walletsData.length
                ? 'Semua Kas'
                : `${selectedWallets.length} Kas`}
            </MenuButton>
            <MenuList maxH="200px" overflowY="auto">
              <MenuItem onClick={handleSelectAllWallets}>
                <Checkbox
                  isChecked={selectedWallets.length === walletsData.length}
                  isIndeterminate={
                    selectedWallets.length > 0 &&
                    selectedWallets.length < walletsData.length
                  }
                  mr={3}
                />
                Pilih Semua
              </MenuItem>
              {walletsData.map((wallet) => (
                <MenuItem
                  key={wallet.id}
                  onClick={() => {
                    handleWalletToggle(wallet.id)
                  }}
                >
                  <Checkbox
                    isChecked={selectedWallets.includes(wallet.id)}
                    mr={3}
                  />
                  {wallet.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Button
            size="sm"
            onClick={handleApplyFilter}
            borderRadius="md"
            fontWeight="medium"
            px={4}
          >
            Terapkan
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilter}
            borderRadius="md"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
            px={3}
          >
            Reset
          </Button>
        </HStack>
      </Box>
    </Layout.Body>
  )
}

export default Page

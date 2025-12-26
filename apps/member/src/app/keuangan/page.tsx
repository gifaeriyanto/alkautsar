'use client'

import {
  Badge,
  Box,
  Card,
  CardBody,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Button,
} from '@chakra-ui/react'
import { getClient, useRealtimeList } from '@client/supabase'
import { currency, dateFormat, dateFormFormat } from '@client/ui-components'
import {
  previousFriday,
  startOfDay,
  subWeeks,
  subDays,
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
} from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  FaArrowDown,
  FaArrowUp,
  FaEquals,
  FaWallet,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import Footer from '../../_components/Footer'
import Navigation from '../../_components/Navigation'
import { ORGANIZATION_ID } from '../../_constants'

interface WalletSummary {
  total_income: number
  total_expense: number
  balance: number
}

interface FinancialReport {
  id: string
  date: string
  amount: number
  description: string | null
  notes: string | null
}

interface MonthlyData {
  month: string
  income: number
  expense: number
}

const WalletCard = ({
  wallet,
  summary,
  reports,
  isLoading,
}: {
  wallet: { id: string | null; name: string }
  summary: WalletSummary | undefined
  reports: FinancialReport[]
  isLoading: boolean
}) => {
  const router = useRouter()

  const handleClick = () => {
    if (wallet.id) {
      router.push(`/keuangan/${wallet.id}`)
    }
  }

  return (
    <Card
      bg="white"
      border="1px solid rgba(0, 0, 0, 0.08)"
      borderRadius="2xl"
      overflow="hidden"
      cursor="pointer"
      onClick={handleClick}
      _hover={{
        transform: 'translateY(-4px)',
        shadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
      }}
      transition="all 0.3s ease"
    >
      <CardBody p={{ base: 4, md: 8 }}>
        <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
          {/* Wallet Header */}
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={2}>
              <HStack spacing={{ base: 2, md: 3 }}>
                <Icon
                  as={FaWallet}
                  boxSize={{ base: 5, md: 6 }}
                  color="orange.500"
                />
                <Heading
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="700"
                  color="gray.800"
                >
                  {wallet.name}
                </Heading>
              </HStack>
            </VStack>
            <Text fontSize="xs" color="gray.500" fontWeight="500">
              Klik untuk detail →
            </Text>
          </HStack>

          <Divider borderColor="gray.200" />

          {/* Summary Section */}
          {isLoading && (
            <VStack py={{ base: 6, md: 8 }}>
              <Spinner size={{ base: 'md', md: 'lg' }} color="orange.500" />
              <Text color="gray.500" fontSize="sm">
                Memuat data...
              </Text>
            </VStack>
          )}
          {!isLoading && summary && (
            <SimpleGrid
              columns={{ base: 1, sm: 3 }}
              spacing={{ base: 3, md: 4 }}
            >
              {/* Total Income */}
              <Box
                bg="white"
                borderRadius="xl"
                p={{ base: 3, md: 4 }}
                border="1px solid"
                borderColor="gray.200"
              >
                <VStack spacing={2} align="start">
                  <HStack spacing={2}>
                    <Icon
                      as={FaArrowUp}
                      boxSize={{ base: 3, md: 4 }}
                      color="gray.600"
                    />
                    <Text
                      fontSize={{ base: '2xs', md: 'xs' }}
                      color="gray.600"
                      fontWeight="600"
                    >
                      Pemasukan
                    </Text>
                  </HStack>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight="700"
                    color="gray.800"
                    wordBreak="break-word"
                  >
                    {currency(summary.total_income)}
                  </Text>
                </VStack>
              </Box>

              {/* Total Expense */}
              <Box
                bg="white"
                borderRadius="xl"
                p={{ base: 3, md: 4 }}
                border="1px solid"
                borderColor="gray.200"
              >
                <VStack spacing={2} align="start">
                  <HStack spacing={2}>
                    <Icon
                      as={FaArrowDown}
                      boxSize={{ base: 3, md: 4 }}
                      color="red.600"
                    />
                    <Text
                      fontSize={{ base: '2xs', md: 'xs' }}
                      color="red.600"
                      fontWeight="600"
                    >
                      Pengeluaran
                    </Text>
                  </HStack>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight="700"
                    color="red.600"
                    wordBreak="break-word"
                  >
                    {currency(Math.abs(summary.total_expense))}
                  </Text>
                </VStack>
              </Box>

              {/* Balance */}
              <Box
                bg="white"
                borderRadius="xl"
                p={{ base: 3, md: 4 }}
                border="1px solid"
                borderColor="gray.200"
              >
                <VStack spacing={2} align="start">
                  <HStack spacing={2}>
                    <Icon
                      as={FaEquals}
                      boxSize={{ base: 3, md: 4 }}
                      color="gray.600"
                    />
                    <Text
                      fontSize={{ base: '2xs', md: 'xs' }}
                      color="gray.600"
                      fontWeight="600"
                    >
                      Saldo
                    </Text>
                  </HStack>
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight="700"
                    color="gray.800"
                    wordBreak="break-word"
                  >
                    {currency(summary.balance)}
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          )}
          {!isLoading && !summary && (
            <Box py={4}>
              <Text color="gray.500" fontSize="sm" textAlign="center">
                Tidak ada data
              </Text>
            </Box>
          )}

          {/* Recent Reports */}
          {reports.length > 0 && (
            <>
              <Divider borderColor="gray.200" />
              <VStack align="stretch" spacing={3}>
                <Heading
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="600"
                  color="gray.700"
                >
                  Transaksi Terbaru
                </Heading>
                <Box overflowX="auto" w="full">
                  <Table variant="simple" size={{ base: 'xs', md: 'sm' }}>
                    <Thead>
                      <Tr>
                        <Th fontSize={{ base: 'xs', md: 'sm' }}>Tanggal</Th>
                        <Th fontSize={{ base: 'xs', md: 'sm' }}>Keterangan</Th>
                        <Th isNumeric fontSize={{ base: 'xs', md: 'sm' }}>
                          Jumlah
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {reports.slice(0, 5).map((report) => (
                        <Tr key={report.id}>
                          <Td
                            fontSize={{ base: 'xs', md: 'sm' }}
                            whiteSpace="nowrap"
                          >
                            {dateFormat(new Date(report.date))}
                          </Td>
                          <Td>
                            <Text
                              fontSize={{ base: 'xs', md: 'sm' }}
                              noOfLines={1}
                              maxW={{ base: '120px', md: 'none' }}
                            >
                              {report.description || '-'}
                            </Text>
                          </Td>
                          <Td isNumeric fontSize={{ base: 'xs', md: 'sm' }}>
                            <Badge
                              colorScheme={report.amount >= 0 ? 'green' : 'red'}
                              px={{ base: 1.5, md: 2 }}
                              py={1}
                              borderRadius="md"
                              fontSize={{ base: 'xs', md: 'sm' }}
                            >
                              {report.amount >= 0 ? '+' : ''}
                              {currency(report.amount)}
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </>
          )}
        </VStack>
      </CardBody>
    </Card>
  )
}

const KeuanganPage = () => {
  // Specific wallet IDs to show
  const ALLOWED_WALLET_IDS = useMemo(
    () => [
      'edbfa00b-eace-4bd1-ada5-41e7b709a4c3',
      'fcfefe72-7374-4957-bf9e-2579a533f124',
    ],
    []
  )

  // Get date range for last week (following shalat board logic)
  const getLastTwoFridaysToLastFriday = (currentDate: Date) => {
    // Get the most recent Friday (or today if it's Friday)
    const lastFriday =
      currentDate.getDay() === 5
        ? startOfDay(currentDate)
        : previousFriday(currentDate)

    // Get the Friday two weeks before
    const twoFridaysAgo = subWeeks(lastFriday, 1)

    return {
      start: dateFormFormat(twoFridaysAgo),
      end: dateFormFormat(subDays(lastFriday, 1)),
    }
  }

  const [currentTime, setCurrentTime] = useState(new Date())
  const dateRange = getLastTwoFridaysToLastFriday(currentTime)

  const handlePrevPeriod = () => {
    const newDate = subWeeks(currentTime, 1)
    setCurrentTime(newDate)
  }

  const handleNextPeriod = () => {
    const newDate = subWeeks(currentTime, -1)
    setCurrentTime(newDate)
  }

  const { data: wallets } = useRealtimeList('wallets', {
    select: '',
    filters: [['eq', 'organization_id', ORGANIZATION_ID]],
  })
  const allWallets = wallets

  // Filter wallets to only show allowed IDs
  const walletsData = useMemo(() => {
    return allWallets.filter((wallet) =>
      ALLOWED_WALLET_IDS.includes(wallet.id as any)
    )
  }, [allWallets, ALLOWED_WALLET_IDS])

  const [walletSummaries, setWalletSummaries] = useState<
    Record<string, WalletSummary>
  >({})
  const [walletReports, setWalletReports] = useState<
    Record<string, FinancialReport[]>
  >({})
  const [loadingWallets, setLoadingWallets] = useState<Set<string>>(new Set())

  const getWalletSummary = useCallback(
    async (walletId: string) => {
      const supabase = getClient()
      setLoadingWallets((prev) => new Set(prev).add(walletId))

      try {
        // Get summary for last week date range
        const res = await supabase.rpc('get_wallet_summary', {
          start_date: dateRange.start,
          end_date: dateRange.end,
          wallet_id: walletId,
        })

        if (res.data?.[0]) {
          const summary = res.data[0] as WalletSummary
          setWalletSummaries((prev) => {
            const updated: Record<string, WalletSummary> = {
              ...prev,
              [walletId]: summary,
            }
            return updated
          })
        }
      } catch (error) {
        // Handle error silently
      } finally {
        setLoadingWallets((prev) => {
          const next = new Set(prev)
          next.delete(walletId)
          return next
        })
      }
    },
    [dateRange.end, dateRange.start]
  )

  const getWalletReports = useCallback(
    (walletId: string) => {
      const supabase = getClient()
      supabase
        .from('financial_reports')
        .select('id, date, amount, description, notes')
        .eq('wallet_id', walletId)
        .eq('deleted_at', null)
        .gte('date', dateRange.start)
        .lte('date', dateRange.end)
        .order('date', { ascending: false })
        .limit(10)
        .then((res) => {
          if (res.data) {
            setWalletReports((prev) => ({
              ...prev,
              [walletId]: res.data as FinancialReport[],
            }))
          }
        })
    },
    [dateRange.end, dateRange.start]
  )

  useEffect(() => {
    walletsData.forEach((wallet) => {
      if (wallet.id) {
        getWalletSummary(wallet.id)
        getWalletReports(wallet.id)
      }
    })
  }, [walletsData, getWalletSummary, getWalletReports])

  const totalSummary = useMemo(() => {
    return Object.values(walletSummaries).reduce(
      (acc, summary) => ({
        total_income: acc.total_income + summary.total_income,
        total_expense: acc.total_expense + summary.total_expense,
        balance: acc.balance + summary.balance,
      }),
      {
        total_income: 0,
        total_expense: 0,
        balance: 0,
      }
    )
  }, [walletSummaries])

  // Monthly trend data for last 12 months
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [isLoadingMonthlyData, setIsLoadingMonthlyData] = useState(true)

  const fetchMonthlyData = useCallback(async () => {
    const supabase = getClient()
    setIsLoadingMonthlyData(true)

    try {
      const today = new Date()

      // Create array of month data promises
      const monthPromises = Array.from({ length: 12 }, (_, i) => {
        const monthDate = subMonths(today, 11 - i)
        const monthStart = startOfMonth(monthDate)
        const monthEnd = endOfMonth(monthDate)

        const startDate = dateFormFormat(monthStart)
        const endDate = dateFormFormat(monthEnd)

        // Fetch data for all wallets in parallel
        const walletPromises = ALLOWED_WALLET_IDS.map((walletId) =>
          supabase.rpc('get_wallet_summary', {
            start_date: startDate,
            end_date: endDate,
            wallet_id: walletId,
          })
        )

        return Promise.all(walletPromises).then((results) => {
          let totalIncome = 0
          let totalExpense = 0

          results.forEach((res) => {
            if (res.data?.[0]) {
              totalIncome += res.data[0].total_income || 0
              totalExpense += Math.abs(res.data[0].total_expense || 0)
            }
          })

          return {
            month: format(monthDate, 'MMM yyyy'),
            income: totalIncome,
            expense: totalExpense,
          }
        })
      })

      const months = await Promise.all(monthPromises)
      setMonthlyData(months)
    } catch (error) {
      // Handle error silently
    } finally {
      setIsLoadingMonthlyData(false)
    }
  }, [ALLOWED_WALLET_IDS])

  useEffect(() => {
    fetchMonthlyData()
  }, [fetchMonthlyData])

  // Calculate averages
  const averages = useMemo(() => {
    if (monthlyData.length === 0) {
      return { avgIncome: 0, avgExpense: 0 }
    }

    const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0)
    const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0)

    return {
      avgIncome: totalIncome / monthlyData.length,
      avgExpense: totalExpense / monthlyData.length,
    }
  }, [monthlyData])

  return (
    <Box minH="100vh" color="gray.800" bg="gray.50">
      <Navigation />

      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
        color="white"
        py={{ base: 12, md: 20 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.1"
          bgImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
          bgSize="40px 40px"
        />
        <Container
          maxW="6xl"
          position="relative"
          zIndex={1}
          px={{ base: 4, md: 6 }}
        >
          <VStack spacing={{ base: 4, md: 6 }} textAlign="center">
            <Heading
              fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
              fontWeight="800"
              mb={4}
            >
              Laporan Keuangan
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'xl' }}
              maxW="3xl"
              opacity={0.95}
              px={{ base: 2, md: 0 }}
            >
              Transparansi pengelolaan keuangan Masjid Al-Kautsar
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="6xl" py={{ base: 8, md: 16 }} px={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 8, md: 12 }}>
          {/* Period Navigation */}
          <Card
            bg="white"
            border="1px solid rgba(0, 0, 0, 0.08)"
            borderRadius="2xl"
            w="full"
          >
            <CardBody p={{ base: 4, md: 6 }}>
              <HStack justify="space-between" align="center">
                <Button
                  leftIcon={<FaChevronLeft />}
                  onClick={handlePrevPeriod}
                  variant="outline"
                  colorScheme="orange"
                  size={{ base: 'sm', md: 'md' }}
                >
                  Sebelumnya
                </Button>
                <VStack spacing={1}>
                  <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    fontWeight="600"
                    color="gray.700"
                  >
                    Periode
                  </Text>
                  <Text
                    fontSize={{ base: 'xs', md: 'sm' }}
                    color="gray.600"
                    textAlign="center"
                  >
                    {dateFormat(new Date(dateRange.start))} -{' '}
                    {dateFormat(new Date(dateRange.end))}
                  </Text>
                </VStack>
                <Button
                  rightIcon={<FaChevronRight />}
                  onClick={handleNextPeriod}
                  variant="outline"
                  colorScheme="orange"
                  size={{ base: 'sm', md: 'md' }}
                >
                  Selanjutnya
                </Button>
              </HStack>
            </CardBody>
          </Card>

          {/* Monthly Trend Graph */}
          <Card
            bg="white"
            border="1px solid rgba(0, 0, 0, 0.08)"
            borderRadius="2xl"
            w="full"
          >
            <CardBody p={{ base: 4, md: 8 }}>
              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                <Heading
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="700"
                  color="gray.800"
                >
                  Tren 12 Bulan Terakhir
                </Heading>

                {isLoadingMonthlyData ? (
                  <VStack py={8}>
                    <Spinner size="lg" color="orange.500" />
                    <Text color="gray.500" fontSize="sm">
                      Memuat data grafik...
                    </Text>
                  </VStack>
                ) : null}
                {!isLoadingMonthlyData && monthlyData.length > 0 ? (
                  <>
                    {/* Chart will be rendered here */}
                    <Box
                      w="full"
                      h={{ base: '300px', md: '400px' }}
                      position="relative"
                    >
                      {/* Simple bar chart using CSS */}
                      <VStack spacing={4} align="stretch">
                        {monthlyData.map((data: MonthlyData) => {
                          const maxValue = Math.max(
                            ...monthlyData.map((d: MonthlyData) =>
                              Math.max(d.income, d.expense)
                            )
                          )
                          const incomePercent =
                            maxValue > 0 ? (data.income / maxValue) * 100 : 0
                          const expensePercent =
                            maxValue > 0 ? (data.expense / maxValue) * 100 : 0

                          return (
                            <Box key={data.month}>
                              <HStack
                                spacing={2}
                                mb={1}
                                fontSize={{ base: 'xs', md: 'sm' }}
                              >
                                <Text
                                  fontWeight="600"
                                  color="gray.700"
                                  minW={{ base: '60px', md: '80px' }}
                                >
                                  {data.month}
                                </Text>
                                <HStack spacing={2} flex={1}>
                                  <Box
                                    bg="green.500"
                                    h="20px"
                                    borderRadius="md"
                                    width={`${incomePercent}%`}
                                    minW={incomePercent > 0 ? '2px' : '0'}
                                  />
                                  <Box
                                    bg="red.500"
                                    h="20px"
                                    borderRadius="md"
                                    width={`${expensePercent}%`}
                                    minW={expensePercent > 0 ? '2px' : '0'}
                                  />
                                </HStack>
                                <HStack spacing={4} fontSize="xs">
                                  <Text color="green.600" fontWeight="600">
                                    {currency(data.income)}
                                  </Text>
                                  <Text color="red.600" fontWeight="600">
                                    {currency(data.expense)}
                                  </Text>
                                </HStack>
                              </HStack>
                            </Box>
                          )
                        })}
                      </VStack>
                    </Box>

                    {/* Legend */}
                    <HStack
                      justify="center"
                      spacing={6}
                      pt={4}
                      borderTop="1px solid"
                      borderColor="gray.200"
                    >
                      <HStack spacing={2}>
                        <Box w={4} h={4} bg="green.500" borderRadius="sm" />
                        <Text
                          fontSize={{ base: 'xs', md: 'sm' }}
                          color="gray.700"
                        >
                          Pemasukan
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Box w={4} h={4} bg="red.500" borderRadius="sm" />
                        <Text
                          fontSize={{ base: 'xs', md: 'sm' }}
                          color="gray.700"
                        >
                          Pengeluaran
                        </Text>
                      </HStack>
                    </HStack>

                    {/* Average Summary */}
                    <SimpleGrid
                      columns={{ base: 1, sm: 2 }}
                      spacing={{ base: 3, md: 6 }}
                      pt={4}
                    >
                      <Box
                        bg="white"
                        borderRadius="xl"
                        p={{ base: 4, md: 6 }}
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <VStack spacing={2} align="start">
                          <Text
                            fontSize={{ base: 'xs', md: 'sm' }}
                            color="gray.600"
                            fontWeight="600"
                          >
                            Rata-rata Pemasukan/Bulan
                          </Text>
                          <Text
                            fontSize={{ base: 'xl', md: '2xl' }}
                            fontWeight="800"
                            color="gray.800"
                            wordBreak="break-word"
                          >
                            {currency(averages.avgIncome)}
                          </Text>
                        </VStack>
                      </Box>
                      <Box
                        bg="white"
                        borderRadius="xl"
                        p={{ base: 4, md: 6 }}
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <VStack spacing={2} align="start">
                          <Text
                            fontSize={{ base: 'xs', md: 'sm' }}
                            color="red.600"
                            fontWeight="600"
                          >
                            Rata-rata Pengeluaran/Bulan
                          </Text>
                          <Text
                            fontSize={{ base: 'xl', md: '2xl' }}
                            fontWeight="800"
                            color="red.600"
                            wordBreak="break-word"
                          >
                            {currency(averages.avgExpense)}
                          </Text>
                        </VStack>
                      </Box>
                    </SimpleGrid>
                  </>
                ) : (
                  <Box py={8} textAlign="center">
                    <Text color="gray.500" fontSize="sm">
                      Tidak ada data untuk ditampilkan
                    </Text>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Total Summary */}
          {Object.keys(walletSummaries).length > 0 && (
            <Card
              bg="white"
              border="1px solid rgba(0, 0, 0, 0.08)"
              borderRadius="2xl"
              w="full"
            >
              <CardBody p={{ base: 4, md: 8 }}>
                <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                  <Heading
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="700"
                    color="gray.800"
                  >
                    Ringkasan Total
                  </Heading>
                  <SimpleGrid
                    columns={{ base: 1, sm: 3 }}
                    spacing={{ base: 3, md: 6 }}
                  >
                    <Box
                      bg="white"
                      borderRadius="xl"
                      p={{ base: 4, md: 6 }}
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <VStack spacing={2} align="start">
                        <Text
                          fontSize={{ base: 'xs', md: 'sm' }}
                          color="gray.600"
                          fontWeight="600"
                        >
                          Total Pemasukan
                        </Text>
                        <Text
                          fontSize={{ base: 'xl', md: '2xl' }}
                          fontWeight="800"
                          color="gray.800"
                          wordBreak="break-word"
                        >
                          {currency(totalSummary.total_income)}
                        </Text>
                      </VStack>
                    </Box>
                    <Box
                      bg="white"
                      borderRadius="xl"
                      p={{ base: 4, md: 6 }}
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <VStack spacing={2} align="start">
                        <Text
                          fontSize={{ base: 'xs', md: 'sm' }}
                          color="red.600"
                          fontWeight="600"
                        >
                          Total Pengeluaran
                        </Text>
                        <Text
                          fontSize={{ base: 'xl', md: '2xl' }}
                          fontWeight="800"
                          color="red.600"
                          wordBreak="break-word"
                        >
                          {currency(Math.abs(totalSummary.total_expense))}
                        </Text>
                      </VStack>
                    </Box>
                    <Box
                      bg="white"
                      borderRadius="xl"
                      p={{ base: 4, md: 6 }}
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <VStack spacing={2} align="start">
                        <Text
                          fontSize={{ base: 'xs', md: 'sm' }}
                          color="gray.600"
                          fontWeight="600"
                        >
                          Total Saldo
                        </Text>
                        <Text
                          fontSize={{ base: 'xl', md: '2xl' }}
                          fontWeight="800"
                          color="gray.800"
                          wordBreak="break-word"
                        >
                          {currency(totalSummary.balance)}
                        </Text>
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Wallets List */}
          {walletsData.length === 0 ? (
            <Card
              bg="white"
              border="1px solid rgba(0, 0, 0, 0.08)"
              borderRadius="2xl"
              w="full"
            >
              <CardBody p={12}>
                <VStack spacing={4}>
                  <Icon as={FaWallet} boxSize={12} color="gray.400" />
                  <Text color="gray.500" fontSize="lg" textAlign="center">
                    Belum ada data wallet
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6} w="full">
              {walletsData.map((wallet) => (
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  summary={walletSummaries[wallet.id || '']}
                  reports={walletReports[wallet.id || ''] || []}
                  isLoading={loadingWallets.has(wallet.id || '')}
                />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>

      <Footer />
    </Box>
  )
}

export default KeuanganPage

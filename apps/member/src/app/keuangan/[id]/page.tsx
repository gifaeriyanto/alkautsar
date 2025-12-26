'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
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
} from '@chakra-ui/react'
import { getClient, useDetail, useList } from '@client/supabase'
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
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  FaArrowDown,
  FaArrowUp,
  FaChevronLeft,
  FaChevronRight,
  FaEquals,
  FaWallet,
} from 'react-icons/fa'
import Footer from '../../../_components/Footer'
import Navigation from '../../../_components/Navigation'

interface WalletSummary {
  total_income: number
  total_expense: number
  balance: number
}

interface MonthlyData {
  month: string
  income: number
  expense: number
}

const WalletDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: wallet, isLoading: isLoadingWallet } = useDetail(
    'wallets',
    params.id
  )

  // Get date range for last week (following shalat board logic)
  const getLastTwoFridaysToLastFriday = (currentDate: Date) => {
    const lastFriday =
      currentDate.getDay() === 5
        ? startOfDay(currentDate)
        : previousFriday(currentDate)
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

  const [walletSummary, setWalletSummary] = useState<WalletSummary | undefined>(
    undefined
  )
  const [isLoadingSummary, setIsLoadingSummary] = useState(true)

  const { data: financialReports, isLoading: isLoadingReports } = useList(
    'financial_reports',
    {
      filters: [
        ['eq', 'wallet_id', params.id],
        ['gte', 'date', dateRange.start],
        ['lte', 'date', dateRange.end],
      ],
      sort: {
        column: 'date',
        ascending: false,
      },
    }
  )

  const getWalletSummary = useCallback(async () => {
    if (!params.id) return

    const supabase = getClient()
    setIsLoadingSummary(true)

    try {
      const res = await supabase.rpc('get_wallet_summary', {
        start_date: dateRange.start,
        end_date: dateRange.end,
        wallet_id: params.id,
      })

      if (res.data?.[0]) {
        setWalletSummary(res.data[0])
      }
    } catch (error) {
      // Handle error silently
    } finally {
      setIsLoadingSummary(false)
    }
  }, [params.id, dateRange.end, dateRange.start])

  useEffect(() => {
    getWalletSummary()
  }, [getWalletSummary])

  // Monthly trend data for last 12 months (independent of period navigation)
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [isLoadingMonthlyData, setIsLoadingMonthlyData] = useState(true)

  const fetchMonthlyData = useCallback(async () => {
    if (!params.id) return

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

        return supabase
          .rpc('get_wallet_summary', {
            start_date: startDate,
            end_date: endDate,
            wallet_id: params.id,
          })
          .then((res) => {
            const income = res.data?.[0]?.total_income || 0
            const expense = Math.abs(res.data?.[0]?.total_expense || 0)

            return {
              month: format(monthDate, 'MMM yyyy'),
              income,
              expense,
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
  }, [params.id])

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

  if (isLoadingWallet || !wallet) {
    return (
      <Box minH="100vh" color="gray.800" bg="gray.50">
        <Navigation />
        <Container maxW="6xl" py={20}>
          <VStack spacing={8}>
            <Spinner size="xl" color="orange.500" />
            <Text color="gray.500">Memuat data wallet...</Text>
          </VStack>
        </Container>
        <Footer />
      </Box>
    )
  }

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
            <HStack spacing={3} justify="center">
              <Icon as={FaWallet} boxSize={{ base: 8, md: 10 }} />
              <Heading
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                fontWeight="800"
              >
                {wallet.name}
              </Heading>
            </HStack>
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
                    {/* Chart */}
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
                ) : null}
                {!isLoadingMonthlyData && monthlyData.length === 0 ? (
                  <Box py={8} textAlign="center">
                    <Text color="gray.500" fontSize="sm">
                      Tidak ada data untuk ditampilkan
                    </Text>
                  </Box>
                ) : null}
              </VStack>
            </CardBody>
          </Card>

          {/* Summary Section */}
          {isLoadingSummary ? (
            <Card
              bg="white"
              border="1px solid rgba(0, 0, 0, 0.08)"
              borderRadius="2xl"
              w="full"
            >
              <CardBody p={{ base: 4, md: 8 }}>
                <VStack py={8}>
                  <Spinner size="lg" color="orange.500" />
                  <Text color="gray.500" fontSize="sm">
                    Memuat data...
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          ) : null}
          {!isLoadingSummary && walletSummary ? (
            <SimpleGrid
              columns={{ base: 1, sm: 3 }}
              spacing={{ base: 3, md: 4 }}
              w="full"
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
                    {currency(walletSummary.total_income)}
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
                    {currency(Math.abs(walletSummary.total_expense))}
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
                    {currency(walletSummary.balance)}
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          ) : null}

          {/* Transactions List */}

          {/* Transactions List */}
          <Card
            bg="white"
            border="1px solid rgba(0, 0, 0, 0.08)"
            borderRadius="2xl"
            w="full"
          >
            <CardBody p={{ base: 4, md: 8 }}>
              <VStack align="stretch" spacing={4}>
                <Heading
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="700"
                  color="gray.800"
                >
                  Daftar Transaksi
                </Heading>

                {isLoadingReports ? (
                  <VStack py={8}>
                    <Spinner size="lg" color="orange.500" />
                    <Text color="gray.500" fontSize="sm">
                      Memuat transaksi...
                    </Text>
                  </VStack>
                ) : null}
                {!isLoadingReports && financialReports.length > 0 && (
                  <Box overflowX="auto" w="full">
                    <Table variant="simple" size={{ base: 'xs', md: 'sm' }}>
                      <Thead>
                        <Tr>
                          <Th fontSize={{ base: 'xs', md: 'sm' }}>Tanggal</Th>
                          <Th fontSize={{ base: 'xs', md: 'sm' }}>
                            Keterangan
                          </Th>
                          <Th isNumeric fontSize={{ base: 'xs', md: 'sm' }}>
                            Jumlah
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {financialReports.map((report) => (
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
                                maxW={{ base: '150px', md: 'none' }}
                              >
                                {report.description || '-'}
                              </Text>
                            </Td>
                            <Td isNumeric fontSize={{ base: 'xs', md: 'sm' }}>
                              <Badge
                                colorScheme={
                                  report.amount >= 0 ? 'green' : 'red'
                                }
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
                )}
                {!isLoadingReports && financialReports.length === 0 && (
                  <Box py={8} textAlign="center">
                    <Text color="gray.500" fontSize="sm">
                      Tidak ada transaksi pada periode ini
                    </Text>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>

      <Footer />
    </Box>
  )
}

export default WalletDetailPage

import { Center, Flex, Grid, Text, VStack } from '@chakra-ui/react'
import { getClient, useRealtimeList } from '@client/supabase'
import type { Database } from '@client/supabase/types/database'
import { currency, dateFormat, dateFormFormat } from '@client/ui-components'
import { previousFriday, startOfDay, subWeeks } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ORGANIZATION_ID } from '../../../_constants'
import type { PrayerTime } from '../types'
import { formatTime, getPrayerBackground } from '../utils/prayerUtils'

interface MainSlidesProps {
  prayerTimes: PrayerTime[]
  currentTime: Date
}

export const MainSlides = ({ prayerTimes, currentTime }: MainSlidesProps) => {
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
      end: dateFormFormat(lastFriday),
    }
  }

  const dateRange = getLastTwoFridaysToLastFriday(currentTime)

  const { data: wallets } = useRealtimeList('wallets_without_events' as any, {
    select: '',
    filters: [['eq', 'organization_id', ORGANIZATION_ID]],
  })
  const walletsData =
    wallets as Database['public']['Views']['wallets_without_events']['Row'][]
  const activePrayer = prayerTimes.find((p) => p.isActive)
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
      const supabase = getClient()
      supabase
        .rpc('get_wallet_summary', {
          start_date: dateRange.start,
          end_date: dateRange.end,
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
    [dateRange.end, dateRange.start]
  )

  useEffect(() => {
    walletsData.forEach((wallet) => {
      if (wallet.id) {
        getWalletSummary(wallet.id)
      }
    })
  }, [getWalletSummary, walletsData])

  const allWalletSummary = useMemo(() => {
    return walletsData.reduce(
      (acc, curr) => {
        return {
          total_income:
            acc.total_income + (walletSummary?.[curr.id!]?.total_income || 0),
          total_expense:
            acc.total_expense + (walletSummary?.[curr.id!]?.total_expense || 0),
          balance: acc.balance + (walletSummary?.[curr.id!]?.balance || 0),
        }
      },
      {
        total_income: 0,
        total_expense: 0,
        balance: 0,
      }
    )
  }, [walletSummary, walletsData])

  return (
    <Grid templateColumns="4fr 2fr" h="100%" w="100%" bgColor="gray.800">
      <Center
        h="100%"
        w="100%"
        backgroundImage={`url('${getPrayerBackground(
          activePrayer?.name || ''
        )}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        color="white"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.6) 100%)',
          zIndex: 0,
        }}
      >
        <VStack>
          <Flex
            justify="space-between"
            w="full"
            fontSize="4xl"
            fontWeight="bold"
          >
            <Text>{activePrayer?.name}</Text>
            <Text>Iqamah {activePrayer?.time}</Text>
          </Flex>
          {/* Current Time (only for active prayer) */}
          <Text
            fontSize="140px"
            fontWeight="400"
            className="mono-time"
            opacity={0.8}
            lineHeight="1"
          >
            {formatTime(currentTime)}
          </Text>
        </VStack>
      </Center>

      <Grid
        h="100%"
        w="100%"
        bgColor="orange.500"
        templateRows="50px repeat(3, 1fr)"
        color="white"
        fontSize="xx-large"
        fontWeight="bold"
      >
        <Flex
          color="white"
          fontSize="xl"
          fontWeight="bold"
          bgColor="orange.400"
          justify="center"
          align="center"
          backgroundImage={`url('${getPrayerBackground(
            activePrayer?.name || ''
          )}')`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${getPrayerBackground(
              activePrayer?.name || ''
            )}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(8px)',
            zIndex: 0,
          }}
        >
          <Text position="relative" zIndex={1}>
            Laporan Keuangan {dateFormat(new Date(dateRange.start))} -{' '}
            {dateFormat(new Date(dateRange.end))}
          </Text>
        </Flex>
        <Flex
          h="100%"
          bgColor="orange.500"
          flexDirection="column"
          justify="center"
          align="center"
        >
          <Text fontSize="2xl">Pemasukan</Text>
          <Text fontFamily="'JetBrains Mono', monospace">
            {currency(allWalletSummary.total_income)}
          </Text>
        </Flex>
        <Flex
          h="100%"
          bgColor="orange.600"
          flexDirection="column"
          justify="center"
          align="center"
        >
          <Text fontSize="2xl">Pengeluaran</Text>
          <Text fontFamily="'JetBrains Mono', monospace">
            {currency(allWalletSummary.total_expense)}
          </Text>
        </Flex>
        <Flex
          h="100%"
          bgColor="orange.700"
          flexDirection="column"
          justify="center"
          align="center"
        >
          <Text fontSize="2xl">Saldo</Text>
          <Text fontFamily="'JetBrains Mono', monospace">
            {currency(allWalletSummary.balance)}
          </Text>
        </Flex>
      </Grid>
    </Grid>
  )
}

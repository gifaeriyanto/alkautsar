import { Box, Grid } from '@chakra-ui/react'
import type { PrayerTime } from '../types'
import { PrayerColumn } from './PrayerColumn'

interface ShalatBoardProps {
  prayerTimes: PrayerTime[]
  currentTime: Date
}

export const ShalatBoard = ({ prayerTimes, currentTime }: ShalatBoardProps) => {
  return (
    <Box
      h="100vh"
      w="100vw"
      position="fixed"
      top={0}
      left={0}
      overflow="hidden"
      bg="orange.500"
      style={{
        aspectRatio: '16/9',
        maxHeight: '100vh',
        maxWidth: '100vw',
      }}
    >
      {/* Six Column Prayer Times Layout */}
      <Grid
        templateColumns="repeat(6, 1fr)"
        h="100vh"
        w="100vw"
        position="relative"
        zIndex={2}
      >
        {prayerTimes.map((prayer) => (
          <PrayerColumn
            key={prayer.name}
            prayer={prayer}
            currentTime={currentTime}
          />
        ))}
      </Grid>
    </Box>
  )
}

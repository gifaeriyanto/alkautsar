import { Flex, VStack, Icon, Text, Box } from '@chakra-ui/react'
import type { PrayerTime } from '../types'
import { getPrayerBackground, getPrayerIcon } from '../utils/prayerUtils'

interface PrayerColumnProps {
  prayer: PrayerTime
}

export const PrayerColumn = ({ prayer }: PrayerColumnProps) => {
  const IconComponent = getPrayerIcon(prayer.name)
  const isCurrentPrayer = prayer.isActive

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className={`prayer-column ${isCurrentPrayer ? 'active' : 'inactive'}`}
      color="white"
      position="relative"
      h="40vh"
      p={8}
      backgroundImage={`url('${getPrayerBackground(prayer.name)}')`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
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
      <VStack spacing={4} position="relative" zIndex={1}>
        {/* Prayer Icon */}
        <Icon as={IconComponent} fontSize="6xl" color="white" />

        {/* Prayer Name */}
        <Text fontSize="3xl" fontWeight="600" textAlign="center">
          {prayer.name}
        </Text>

        {/* Prayer Time */}
        <Text fontSize="4xl" fontWeight="500" className="mono-time">
          {prayer.time}
        </Text>

        {/* Iqomah Time - Hide for Friday prayer */}
        <Box fontSize="xl" fontWeight="400" opacity={0.7} h="32px">
          {Boolean(prayer.iqomah) && <>Iqamah: {prayer.iqomah}</>}
        </Box>
      </VStack>
    </Flex>
  )
}

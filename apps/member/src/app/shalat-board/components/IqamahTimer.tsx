/* eslint-disable no-nested-ternary */
import { Box, VStack, HStack, Text, Badge, Icon } from '@chakra-ui/react'
import { FiClock } from 'react-icons/fi'
import type { PrayerTime } from '../types'

interface IqamahTimerProps {
  isVisible: boolean
  currentPrayer: PrayerTime | null
  countdown: {
    minutes: number
    seconds: number
  } | null
}

export const IqamahTimer = ({
  isVisible,
  currentPrayer,
  countdown,
}: IqamahTimerProps) => {
  if (!isVisible || !currentPrayer || !countdown) return null

  const isUrgent = countdown.minutes < 5
  const isVeryUrgent = countdown.minutes < 2

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex={1001}
      bg="rgba(0, 0, 0, 0.9)"
      backdropFilter="blur(15px)"
      borderRadius="2xl"
      p={8}
      color="white"
      minW="400px"
      border="2px solid"
      borderColor={
        isVeryUrgent ? 'red.400' : isUrgent ? 'orange.400' : 'whiteAlpha.300'
      }
      boxShadow="2xl"
    >
      <VStack spacing={6} align="center">
        {/* Header */}
        <HStack spacing={3}>
          <Icon as={FiClock} fontSize="2xl" />
          <Text fontSize="lg" fontWeight="medium">
            Iqamah Timer
          </Text>
          <Badge
            colorScheme={isVeryUrgent ? 'red' : isUrgent ? 'orange' : 'blue'}
            fontSize="sm"
            px={3}
            py={1}
          >
            {currentPrayer.name}
          </Badge>
        </HStack>

        {/* Prayer Details */}
        <VStack spacing={2}>
          <Text fontSize="sm" opacity={0.8}>
            Prayer Time: {currentPrayer.time}
          </Text>
          <Text fontSize="sm" opacity={0.8}>
            Iqamah Time: {currentPrayer.iqomah}
          </Text>
        </VStack>

        {/* Countdown Display */}
        <VStack spacing={2}>
          <Text fontSize="sm" opacity={0.7}>
            Time until Iqamah:
          </Text>
          <HStack spacing={1} align="baseline">
            <Text
              fontSize="4xl"
              fontWeight="bold"
              fontFamily="'JetBrains Mono', monospace"
              color={
                isVeryUrgent ? 'red.300' : isUrgent ? 'orange.300' : 'white'
              }
            >
              {String(countdown.minutes).padStart(2, '0')}
            </Text>
            <Text fontSize="2xl" opacity={0.6}>
              :
            </Text>
            <Text
              fontSize="4xl"
              fontWeight="bold"
              fontFamily="'JetBrains Mono', monospace"
              color={
                isVeryUrgent ? 'red.300' : isUrgent ? 'orange.300' : 'white'
              }
            >
              {String(countdown.seconds).padStart(2, '0')}
            </Text>
          </HStack>
          <Text fontSize="sm" opacity={0.6}>
            minutes : seconds
          </Text>
        </VStack>

        {/* Status Message */}
        {isVeryUrgent ? (
          <Badge colorScheme="red" fontSize="sm" px={4} py={2}>
            🔔 Iqamah dalam 2 menit!
          </Badge>
        ) : null}
        {isUrgent && !isVeryUrgent ? (
          <Badge colorScheme="orange" fontSize="sm" px={4} py={2}>
            ⏰ Bersiap untuk Iqamah
          </Badge>
        ) : null}
      </VStack>
    </Box>
  )
}

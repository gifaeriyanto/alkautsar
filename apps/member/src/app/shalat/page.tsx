'use client'

import {
  Box,
  Card,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Badge,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { usePrayerTimes } from '../shalat-board/hooks/usePrayerTimes'
import { getPrayerBackground, getPrayerIcon } from '../shalat-board/utils/prayerUtils'
import Navigation from '../../_components/Navigation'
import Footer from '../../_components/Footer'
import type { PrayerTime } from '../shalat-board/types'

const PrayerCard = ({ prayer }: { prayer: PrayerTime }) => {
  const IconComponent = getPrayerIcon(prayer.name)
  const isCurrentPrayer = prayer.isActive
  const isNextPrayer = prayer.isNext

  return (
    <Card
      bg="white"
      border="1px solid"
      borderColor={isCurrentPrayer ? 'orange.400' : 'gray.200'}
      borderWidth={isCurrentPrayer ? '2px' : '1px'}
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'xl',
        borderColor: 'orange.300',
      }}
      transition="all 0.3s ease"
    >
      {/* Background Image */}
      <Box
        position="relative"
        h="200px"
        overflow="hidden"
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
          bg: isCurrentPrayer
            ? 'linear-gradient(180deg, rgba(245, 158, 11, 0.3) 0%, rgba(245, 158, 11, 0.5) 100%)'
            : 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)',
          zIndex: 0,
        }}
      >
        {/* Status Badges */}
        <HStack
          position="absolute"
          top={4}
          right={4}
          zIndex={2}
          spacing={2}
        >
          {isCurrentPrayer ? (
            <Badge
              colorScheme="orange"
              fontSize="xs"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="700"
              textTransform="uppercase"
            >
              Sedang Berlangsung
            </Badge>
          ) : null}
          {isNextPrayer && !isCurrentPrayer ? (
            <Badge
              colorScheme="blue"
              fontSize="xs"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="700"
              textTransform="uppercase"
            >
              Selanjutnya
            </Badge>
          ) : null}
        </HStack>

        {/* Icon and Content */}
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
          spacing={3}
          color="white"
        >
          <Icon as={IconComponent} fontSize="5xl" />
          <Text fontSize="2xl" fontWeight="700" textAlign="center">
            {prayer.name}
          </Text>
        </VStack>
      </Box>

      {/* Prayer Time Info */}
      <VStack spacing={3} p={6} align="center">
        <VStack spacing={1}>
          <Text fontSize="xs" color="gray.500" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
            Waktu Shalat
          </Text>
          <Text
            fontSize="3xl"
            fontWeight="700"
            color="gray.900"
            fontFamily="'JetBrains Mono', 'SF Mono', Consolas, monospace"
            letterSpacing="tight"
          >
            {prayer.time}
          </Text>
        </VStack>

        {prayer.iqomah ? (
          <VStack spacing={1}>
            <Text fontSize="xs" color="gray.500" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
              Iqamah
            </Text>
            <Text
              fontSize="xl"
              fontWeight="600"
              color="orange.600"
              fontFamily="'JetBrains Mono', 'SF Mono', Consolas, monospace"
            >
              {prayer.iqomah}
            </Text>
          </VStack>
        ) : null}
      </VStack>
    </Card>
  )
}

const ShalatPage = () => {
  const { prayerTimes, isLoading, error, currentTime } = usePrayerTimes()

  const activePrayer = prayerTimes.find((p) => p.isActive)
  const nextPrayer = prayerTimes.find((p) => p.isNext)

  const renderPrayerTimesContent = () => {
    if (isLoading) {
      return (
        <Center py={20}>
          <VStack spacing={4}>
            <Spinner size="xl" color="orange.500" thickness="4px" />
            <Text color="gray.600" fontSize="lg">
              Memuat jadwal shalat...
            </Text>
          </VStack>
        </Center>
      )
    }

    if (error) {
      return (
        <Center py={20}>
          <VStack spacing={4}>
            <Text color="red.500" fontSize="xl" fontWeight="600">
              {error}
            </Text>
          </VStack>
        </Center>
      )
    }

    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
        {prayerTimes.map((prayer) => (
          <PrayerCard key={prayer.name} prayer={prayer} />
        ))}
      </SimpleGrid>
    )
  }

  return (
    <Box minH="100vh" bg="linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)" color="gray.800">
      <Navigation />

      {/* Hero Section */}
      <Box
        position="relative"
        py={20}
        px={{ base: 6, md: 12, lg: 16 }}
        bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
        color="white"
        overflow="hidden"
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity="0.1"
          bgImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
          bgSize="30px 30px"
        />

        <Container maxW="8xl" position="relative" zIndex={1}>
          <VStack spacing={8} textAlign="center">
            <VStack spacing={4}>
              <Text
                fontSize="sm"
                fontWeight="700"
                letterSpacing="wider"
                textTransform="uppercase"
                opacity={0.9}
              >
                Jadwal Shalat
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="800"
                lineHeight="1.2"
              >
                Waktu Shalat Hari Ini
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} opacity={0.9} maxW="2xl">
                Jadwal shalat dan iqamah untuk Masjid Al-Kautsar
              </Text>
            </VStack>

            {/* Current Time Display */}
            {!isLoading && (
              <Box
                bg="whiteAlpha.200"
                backdropFilter="blur(10px)"
                borderRadius="2xl"
                p={6}
                border="1px solid"
                borderColor="whiteAlpha.300"
              >
                <VStack spacing={2}>
                  <Text fontSize="sm" fontWeight="600" opacity={0.8}>
                    Waktu Sekarang
                  </Text>
                  <Text
                    fontSize={{ base: '3xl', md: '4xl' }}
                    fontWeight="700"
                    fontFamily="'JetBrains Mono', 'SF Mono', Consolas, monospace"
                  >
                    {currentTime.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    })}
                  </Text>
                  {activePrayer ? (
                    <Text fontSize="lg" fontWeight="600" mt={2}>
                      Shalat {activePrayer.name} sedang berlangsung
                    </Text>
                  ) : null}
                  {nextPrayer && !activePrayer ? (
                    <Text fontSize="lg" fontWeight="600" mt={2}>
                      Shalat {nextPrayer.name} selanjutnya
                    </Text>
                  ) : null}
                </VStack>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Prayer Times Grid */}
      <Box py={20} px={{ base: 6, md: 12, lg: 16 }}>
        <Container maxW="8xl">
          {renderPrayerTimesContent()}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default ShalatPage


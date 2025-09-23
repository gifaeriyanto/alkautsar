/* eslint-disable react/no-array-index-key */
'use client'

import {
  Box,
  Card,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Badge,
  Stack,
  HStack,
} from '@chakra-ui/react'

const Imams = () => {
  const imams = [
    {
      name: 'Imam Naldi',
      image: '/images/imam-naldi.jpeg',
      title: 'Imam Masjid',
      achievements: [
        'Hafiz Al-Quran 30 Juz',
        'Sarjana Syariah',
        'Pengalaman 10+ Tahun',
        'Ahli Tafsir & Hadits',
      ],
      abilities: [
        'Memimpin Sholat 5 Waktu',
        'Khutbah Jumat Inspiratif',
        'Kajian Tafsir Al-Quran',
        'Konseling Keluarga Islam',
        'Pembinaan Remaja Masjid',
      ],
      specialization: 'Tafsir & Hadits',
    },
    {
      name: 'Imam Mahmud',
      image: '/images/imam-mahmud.jpeg',
      title: 'Imam Muda',
      achievements: [
        'Hafiz Al-Quran 30 Juz',
        'Alumni Pesantren Gontor',
        'Juara MTQ Nasional',
        'Sertifikat Qiraat 7',
      ],
      abilities: [
        'Memimpin Sholat Tarawih',
        'Tilawah Merdu',
        'Kajian Fiqh Kontemporer',
        'Pembinaan Tahfiz',
        'Program Dakwah Digital',
      ],
      specialization: 'Qiraat & Tahfiz',
    },
  ]

  return (
    <Box
      position="relative"
      py={32}
      px={{ base: 6, md: 12, lg: 16 }}
      bg="white"
      data-section="imams"
    >
      <Container maxW="8xl">
        <VStack spacing={20}>
          {/* Section Header */}
          <VStack spacing={6} textAlign="center" maxW="3xl">
            <Text
              fontSize="sm"
              fontWeight="700"
              letterSpacing="wider"
              color="gray.600"
              textTransform="uppercase"
            >
              Imam Masjid
            </Text>
            <VStack spacing={2}>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.900"
              >
                Para Imam
              </Heading>
              <Heading
                as="h3"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.700"
              >
                Berpengalaman
              </Heading>
            </VStack>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.600"
              lineHeight="1.8"
              maxW="2xl"
            >
              Dipimpin oleh imam-imam berpengalaman yang memiliki kompetensi
              tinggi dalam bidang agama dan dakwah
            </Text>
          </VStack>

          {/* Imams Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} w="full">
            {imams.map((imam) => (
              <Card
                key={imam.name}
                bg="white"
                border="1px solid rgba(0, 0, 0, 0.08)"
                borderRadius="2xl"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-8px)',
                  shadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}
                transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                position="relative"
              >
                {/* Image Section */}
                <Box position="relative" h="400px" overflow="hidden">
                  <Image
                    src={imam.image}
                    alt={imam.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                    transition="transform 0.5s ease"
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    h="50%"
                    bgGradient="linear(to-t, rgba(0,0,0,0.8), transparent)"
                  />
                  <VStack
                    position="absolute"
                    bottom="6"
                    left="6"
                    align="start"
                    spacing={2}
                  >
                    <Heading
                      as="h3"
                      fontSize="2xl"
                      fontWeight="700"
                      color="white"
                      textShadow="0 2px 4px rgba(0,0,0,0.5)"
                    >
                      {imam.name}
                    </Heading>
                    <Badge
                      colorScheme="orange"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="600"
                    >
                      {imam.title}
                    </Badge>
                  </VStack>
                </Box>

                {/* Content Section */}
                <VStack spacing={6} p={8} align="start">
                  {/* Specialization */}
                  <Box>
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="orange.600"
                      textTransform="uppercase"
                      letterSpacing="wide"
                      mb={2}
                    >
                      Spesialisasi
                    </Text>
                    <Text fontSize="lg" fontWeight="700" color="gray.900">
                      {imam.specialization}
                    </Text>
                  </Box>

                  {/* Achievements */}
                  <Box w="full">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="gray.700"
                      textTransform="uppercase"
                      letterSpacing="wide"
                      mb={3}
                    >
                      Prestasi & Pendidikan
                    </Text>
                    <Stack spacing={2}>
                      {imam.achievements.map((achievement, idx) => (
                        <HStack key={idx} spacing={3}>
                          <Box
                            w="6px"
                            h="6px"
                            bg="orange.400"
                            borderRadius="full"
                            flexShrink={0}
                          />
                          <Text fontSize="sm" color="gray.600">
                            {achievement}
                          </Text>
                        </HStack>
                      ))}
                    </Stack>
                  </Box>

                  {/* Abilities */}
                  <Box w="full">
                    <Text
                      fontSize="sm"
                      fontWeight="600"
                      color="gray.700"
                      textTransform="uppercase"
                      letterSpacing="wide"
                      mb={3}
                    >
                      Keahlian & Bidang Dakwah
                    </Text>
                    <Stack spacing={2}>
                      {imam.abilities.map((ability, idx) => (
                        <HStack key={idx} spacing={3}>
                          <Box
                            w="6px"
                            h="6px"
                            bg="green.400"
                            borderRadius="full"
                            flexShrink={0}
                          />
                          <Text fontSize="sm" color="gray.600">
                            {ability}
                          </Text>
                        </HStack>
                      ))}
                    </Stack>
                  </Box>
                </VStack>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Imams

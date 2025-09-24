/* eslint-disable react/no-array-index-key */
'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

const Imams = () => {
  const [expandedImam, setExpandedImam] = useState<number | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedImam(expandedImam === index ? null : index)
  }

  const imams = [
    {
      name: 'Muh. Rinaldi Ruslan',
      image: '/images/imam-naldi.jpeg',
      title: 'Imam Masjid 1',
      achievements: [
        'Hafiz Al-Quran 30 Juz',
        'Juara 1 Hifdil Quran 30 Juz Kategori Nasional Musabaqah Hifdil Quran (2025)',
        'Juara 1 MHQ 20 Juz Kategori Musabaqah Tilawatil Quran Mahasiswa (2025)',
        'Juara 1 Hifdil Quran 30 Juz Kategori Musabaqah Hifdil Quran IKMN Makassar (2024)',
        'Juara 2 MHQ 20 Juz Kategori Musabaqah Tilawatil Quran Mahasiswa (2024)',
        'Juara 3 Musabaqah Tilawatil Quran Kategori Musabaqah Tilawatil Quran Mahasiswa (2024)',
        'Juara 5 PTON (Pekan Tilawatil Quran Nasional) RRI Tahfidz Kategori Yogyakarta City (2024)',
        'Juara 1 PTQ (Pekan Tilawatil Quran) RRI Makassar Regional South Sulawesi (2024)',
        'Juara 5 MTQMN (Musabaqah Tilawatil Quran Mahasiswa Nasional) (2023)',
        'Juara 1 MTQPN (Musabaqah Tilawatil Quran Pelajar Nasional) (2022)',
        'Juara 1 FCQ (Festival Cerdas Quran) Hifdil Quran 10 Juz (2022)',
        'Alumni PPTQ Al-Imam Ashim Makassar',
        'Mahasiswa Sistem Informasi Unhas',
      ],
      abilities: [
        'Memimpin Sholat 5 Waktu',
        'Supervisi Program Tahfiz',
        "Pembinaan Qur'an Mahasiswa",
        'Koordinasi Kegiatan Ekstrakurikuler',
        "Mentoring Tilawah Al-Qur'an",
      ],
      specialization: "Tahfiz & Tilawah Al-Qur'an",
    },
    {
      name: 'Imam Mahmud Maro',
      image: '/images/imam-mahmud.jpeg',
      title: 'Imam Masjid 2',
      achievements: [
        'Hafiz Al-Quran 30 Juz',
        'Alumni Pesantren Modern Darussalam Gontor',
        'Juara MTQ (Musabaqah Tilawatil Quran) Nasional',
        "Sertifikat Qiraat Sab'ah (7 Qiraat)",
        'Pembina Tahfiz Regional Sulawesi Selatan',
        'Instruktur Qiraat Bersertifikat',
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
      bg="linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)"
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
            {imams.map((imam, imamIndex) => {
              const isExpanded = expandedImam === imamIndex
              const displayedAchievements = isExpanded
                ? imam.achievements
                : imam.achievements.slice(0, 3)
              const hasMoreAchievements = imam.achievements.length > 3

              return (
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
                        {displayedAchievements.map((achievement, idx) => (
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

                      {/* Show More/Less Button */}
                      {hasMoreAchievements ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme="orange"
                          onClick={() => {
                            toggleExpanded(imamIndex)
                          }}
                          mt={3}
                          fontWeight="600"
                          _hover={{
                            bg: 'orange.50',
                          }}
                        >
                          {isExpanded
                            ? `Tampilkan Lebih Sedikit`
                            : `Tampilkan ${
                                imam.achievements.length - 3
                              } Lainnya`}
                        </Button>
                      ) : null}
                    </Box>
                  </VStack>
                </Card>
              )
            })}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Imams

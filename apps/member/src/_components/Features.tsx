'use client'

import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  FaArrowRight,
  FaGraduationCap,
  FaHeart,
  FaMosque,
  FaPray,
} from 'react-icons/fa'

const Features = () => {
  const features = [
    {
      icon: FaPray,
      title: 'Ruang Sholat 2 Lantai',
      subtitle: 'Kapasitas 600 Jamaah',
      description:
        'Ruang sholat modern dengan AC penuh dan karpet berkualitas tinggi untuk kenyamanan ibadah',
      gradient: 'linear(135deg, #F59E0B 0%, #FBBF24 100%)',
      image: '/images/facilities/mosque-inside Medium.jpeg',
    },
    {
      icon: FaMosque,
      title: 'Area Parkir Luas',
      subtitle: 'Parkir Nyaman & Aman',
      description:
        'Area parkir yang luas dan aman untuk kendaraan bermotor jamaah',
      gradient: 'linear(135deg, #FBBF24 0%, #FCD34D 100%)',
      image: '/images/facilities/parkiran Medium.jpeg',
    },
    {
      icon: FaGraduationCap,
      title: 'Fasilitas Rekreasi',
      subtitle: 'Tenis Meja & View Danau',
      description:
        'Area rekreasi dengan tenis meja dan pemandangan danau yang indah',
      gradient: 'linear(135deg, #F59E0B 0%, #FBBF24 100%)',
      image: '/images/facilities/tennis-table Medium.jpeg',
    },
    {
      icon: FaHeart,
      title: 'Monitor TV 100 Inch',
      subtitle: 'Mendukung Berbagai Acara',
      description:
        '2 unit TV monitor 100 inch untuk mendukung presentasi, kajian, dan berbagai kegiatan masjid',
      gradient: 'linear(135deg, #FCD34D 0%, #FEF3C7 100%)',
      image: '/images/facilities/monitor Medium.jpeg',
    },
    {
      icon: FaHeart,
      title: 'Taman Hijau',
      subtitle: 'Area Hijau dengan Pepohonan',
      description:
        'Lingkungan asri dengan banyak pepohonan dan area hijau untuk relaksasi',
      gradient: 'linear(135deg, #10B981 0%, #34D399 100%)',
      image: '/images/facilities/taman Medium.jpeg',
    },
    {
      icon: FaHeart,
      title: 'Donasi Masjid',
      subtitle: 'Dukung Proyek Selanjutnya',
      description:
        'Berpartisipasi dalam pengembangan masjid dan program-program dakwah untuk kemajuan umat',
      gradient: 'linear(135deg, #8B5CF6 0%, #A78BFA 100%)',
      image:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
    },
  ]

  return (
    <Box
      position="relative"
      py={32}
      px={{ base: 6, md: 12, lg: 16 }}
      bg="linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)"
      data-section="features"
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
              Fasilitas Masjid
            </Text>
            <VStack spacing={2}>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.900"
              >
                Fasilitas Lengkap
              </Heading>
              <Heading
                as="h3"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.700"
              >
                untuk Umat
              </Heading>
            </VStack>
          </VStack>

          {/* Feature Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {features.map((item, index) => {
              // Special styling for donation card (last item)
              const isDonationCard = index === 5

              if (isDonationCard) {
                return (
                  <Card
                    key={item.title}
                    bg="white"
                    border="1px solid rgba(0, 0, 0, 0.08)"
                    borderRadius="2xl"
                    p={8}
                    textAlign="center"
                    _hover={{
                      transform: 'translateY(-4px)',
                      shadow: '0 20px 40px rgba(245, 158, 11, 0.15)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                    }}
                    transition="all 0.3s ease"
                    position="relative"
                  >
                    {/* Icon */}
                    <Box
                      w="60px"
                      h="60px"
                      bg="orange.50"
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                      mb={6}
                      border="1px solid"
                      borderColor="orange.100"
                    >
                      <Icon as={FaHeart} boxSize={8} color="orange.500" />
                    </Box>

                    {/* Content */}
                    <VStack spacing={4}>
                      <VStack spacing={2}>
                        <Heading
                          as="h3"
                          fontSize="xl"
                          fontWeight="700"
                          color="gray.900"
                          letterSpacing="tight"
                        >
                          {item.title}
                        </Heading>
                        <Text
                          fontSize="sm"
                          color="orange.600"
                          fontWeight="600"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          {item.subtitle}
                        </Text>
                      </VStack>

                      <Text
                        fontSize="sm"
                        color="gray.600"
                        lineHeight="1.6"
                        maxW="250px"
                      >
                        {item.description}
                      </Text>

                      <Button
                        size="md"
                        bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
                        color="white"
                        _hover={{
                          bg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                          transform: 'translateY(-2px)',
                          shadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                        }}
                        borderRadius="lg"
                        fontWeight="600"
                        px={8}
                        rightIcon={<FaArrowRight size={14} />}
                        transition="all 0.3s ease"
                        mt={4}
                      >
                        Donasi Sekarang
                      </Button>
                    </VStack>
                  </Card>
                )
              }

              // Regular facility cards
              return (
                <Card
                  key={item.title}
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
                  <Box position="relative" h="200px" overflow="hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      w="full"
                      h="full"
                      objectFit="cover"
                      transition="transform 0.5s ease"
                      _hover={{
                        transform: 'scale(1.05)',
                      }}
                    />
                  </Box>

                  {/* Content Section */}
                  <VStack spacing={4} p={6} align="start">
                    <VStack spacing={2} align="start" w="full">
                      <Heading
                        as="h3"
                        fontSize="lg"
                        fontWeight="700"
                        color="gray.900"
                        letterSpacing="tight"
                      >
                        {item.title}
                      </Heading>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        {item.subtitle}
                      </Text>
                    </VStack>

                    <Text fontSize="sm" color="gray.700" lineHeight="1.6">
                      {item.description}
                    </Text>
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

export default Features

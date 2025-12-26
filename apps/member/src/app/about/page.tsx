'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  Divider,
  HStack,
} from '@chakra-ui/react'
import { FaMosque, FaLandmark, FaHandshake, FaClock } from 'react-icons/fa'
import Footer from '../../_components/Footer'
import Navigation from '../../_components/Navigation'

const AboutPage = () => {
  const aboutSections = [
    {
      icon: FaMosque,
      title: 'Tentang Masjid',
      content:
        'Masjid Al-Kautsar adalah tempat ibadah dan pusat kegiatan dakwah yang terletak di CitraLand Tallasa City, Makassar. Masjid ini didirikan sebagai sarana untuk meningkatkan kualitas ibadah dan pengembangan umat Islam di kawasan tersebut.',
      color: 'orange.500',
    },
    {
      icon: FaLandmark,
      title: 'Luas Tanah',
      content:
        'Masjid Al-Kautsar berdiri di atas lahan seluas 865 m² (delapan ratus enam puluh lima meter persegi) yang dikelola dengan penuh tanggung jawab untuk kepentingan umat.',
      color: 'green.500',
    },
    {
      icon: FaHandshake,
      title: 'Pengelolaan',
      content:
        'Pengelolaan Masjid Al-Kautsar dan fasilitasnya dilakukan oleh Pengurus Masjid dengan komitmen penuh untuk menjaga dan mengembangkan masjid sebagai pusat kegiatan ibadah dan dakwah yang nyaman, transparan, dan berkesan.',
      color: 'blue.500',
    },
    {
      icon: FaClock,
      title: 'Masa Jabatan',
      content:
        'Masa jabatan Pengurus Masjid adalah 3 (tiga) tahun, dengan komitmen untuk memberikan pelayanan terbaik kepada jamaah dan masyarakat sekitar.',
      color: 'purple.500',
    },
  ]

  const commitments = [
    {
      title: 'Kepemilikan Tanah dan Bangunan',
      description:
        'Hak kepemilikan penuh atas Tanah dan Bangunan Masjid Al-Kautsar beserta fasilitasnya tetap dipegang oleh pihak pemilik, dengan pengelolaan operasional diserahkan kepada Pengurus Masjid.',
    },
    {
      title: 'Komitmen Lokasi',
      description:
        'Berdasarkan siteplan yang telah ditetapkan, lokasi Masjid Al-Kautsar tidak akan dialihfungsikan dan akan tetap menjadi tempat ibadah dan pusat kegiatan dakwah untuk kepentingan umat Islam.',
    },
    {
      title: 'Visi dan Misi',
      description:
        'Masjid Al-Kautsar berkomitmen untuk menjadi masjid yang mengedepankan kenyamanan jamaah, transparansi pengelolaan, dan program dakwah yang berkesan untuk kemajuan umat Islam.',
    },
  ]

  return (
    <Box minH="100vh" color="gray.800" bg="gray.50">
      <Navigation />

      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
        color="white"
        py={20}
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
        <Container maxW="6xl" position="relative" zIndex={1}>
          <VStack spacing={6} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="800"
              mb={4}
            >
              Tentang Masjid Al-Kautsar
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl" opacity={0.95}>
              Pusat Ibadah dan Dakwah di CitraLand Tallasa City, Makassar
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="6xl" py={16}>
        <VStack spacing={16}>
          {/* About Sections */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            {aboutSections.map((section, index) => (
              <Card
                key={index}
                bg="white"
                border="1px solid rgba(0, 0, 0, 0.08)"
                borderRadius="2xl"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}
                transition="all 0.3s ease"
              >
                <CardBody p={8}>
                  <VStack align="start" spacing={4}>
                    <Box
                      p={4}
                      bg={`${section.color}15`}
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={section.icon} boxSize={8} color={section.color} />
                    </Box>
                    <Heading fontSize="xl" fontWeight="700" color="gray.800">
                      {section.title}
                    </Heading>
                    <Text color="gray.600" lineHeight="1.8" fontSize="md">
                      {section.content}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Divider borderColor="gray.300" />

          {/* Commitments Section */}
          <Box w="full">
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading fontSize="3xl" fontWeight="800" color="gray.800" mb={4}>
                  Komitmen Kami
                </Heading>
                <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
                  Sebagai pengelola Masjid Al-Kautsar, kami berkomitmen untuk
                  memberikan pelayanan terbaik dan menjaga amanah yang telah
                  dipercayakan kepada kami.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={8}>
                {commitments.map((commitment, index) => (
                  <Card
                    key={index}
                    bg="white"
                    border="1px solid rgba(0, 0, 0, 0.08)"
                    borderRadius="2xl"
                    _hover={{
                      transform: 'translateY(-4px)',
                      shadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                    }}
                    transition="all 0.3s ease"
                  >
                    <CardBody p={6}>
                      <VStack align="start" spacing={3}>
                        <Heading fontSize="lg" fontWeight="700" color="gray.800">
                          {commitment.title}
                        </Heading>
                        <Text color="gray.600" lineHeight="1.7" fontSize="sm">
                          {commitment.description}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Location Section */}
          <Box
            w="full"
            bg="white"
            borderRadius="2xl"
            p={8}
            border="1px solid rgba(0, 0, 0, 0.08)"
          >
            <VStack spacing={6} align="start">
              <HStack spacing={3}>
                <Icon as={FaLandmark} boxSize={6} color="orange.500" />
                <Heading fontSize="2xl" fontWeight="700" color="gray.800">
                  Lokasi
                </Heading>
              </HStack>
              <VStack align="start" spacing={2} pl={9}>
                <Text fontSize="md" color="gray.700" fontWeight="600">
                  Masjid Al-Kautsar CitraLand Tallasa City
                </Text>
                <Text fontSize="sm" color="gray.600" lineHeight="1.7">
                  CitraLand Tallasa City, Kapasa, Kec. Tamalanrea, Kota Makassar,
                  Sulawesi Selatan 90241
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Management Info */}
          <Box
            w="full"
            bg="linear-gradient(135deg, #1F2937 0%, #374151 100%)"
            borderRadius="xl"
            p={8}
            color="white"
          >
            <VStack spacing={4} align="start">
              <Heading fontSize="2xl" fontWeight="700" color="white">
                Informasi Pengelolaan
              </Heading>
              <VStack align="start" spacing={3} fontSize="sm" color="gray.300">
                <Text>
                  Masjid Al-Kautsar dikelola oleh Pengurus Masjid yang dipilih
                  untuk masa jabatan 3 (tiga) tahun. Pengelolaan dilakukan dengan
                  prinsip transparansi dan akuntabilitas untuk kepentingan umat.
                </Text>
                <Text>
                  Semua kegiatan dan program masjid diarahkan untuk meningkatkan
                  kualitas ibadah, pengembangan dakwah, dan pemberdayaan umat Islam
                  di kawasan CitraLand Tallasa City dan sekitarnya.
                </Text>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Container>

      <Footer />
    </Box>
  )
}

export default AboutPage


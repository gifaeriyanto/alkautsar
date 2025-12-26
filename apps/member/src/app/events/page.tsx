'use client'

import { Box, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react'
import { FaClock } from 'react-icons/fa'
import Footer from '../../_components/Footer'
import Navigation from '../../_components/Navigation'

const EventsPage = () => {
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
              Acara & Kegiatan
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl" opacity={0.95}>
              Informasi acara dan kegiatan Masjid Al-Kautsar akan segera hadir
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Coming Soon Content */}
      <Container maxW="4xl" py={20}>
        <VStack spacing={8} textAlign="center">
          <Box
            bg="white"
            borderRadius="2xl"
            p={12}
            border="1px solid rgba(0, 0, 0, 0.08)"
            w="full"
          >
            <VStack spacing={6}>
              <Icon as={FaClock} boxSize={16} color="orange.500" />
              <Heading fontSize="2xl" fontWeight="700" color="gray.800">
                Segera Hadir
              </Heading>
              <Text fontSize="lg" color="gray.600" lineHeight="1.8" maxW="2xl">
                Halaman acara dan kegiatan Masjid Al-Kautsar sedang dalam tahap
                pengembangan. Kami akan segera menghadirkan informasi lengkap
                tentang berbagai acara, kegiatan, dan program yang
                diselenggarakan oleh masjid.
              </Text>
              <Text fontSize="md" color="gray.500" mt={4}>
                Terima kasih atas kesabaran dan dukungan Anda.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>

      <Footer />
    </Box>
  )
}

export default EventsPage

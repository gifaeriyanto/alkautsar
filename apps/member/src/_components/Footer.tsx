'use client'

import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  Divider,
} from '@chakra-ui/react'
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaMapMarkerAlt,
  FaPrayingHands,
  FaHeart,
} from 'react-icons/fa'

const Footer = () => {
  const quickLinks = [
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Kegiatan', href: '/events' },
    { name: 'Keuangan', href: '/keuangan' },
    { name: 'Donasi', href: '/donate' },
  ]

  const programs = [
    { name: 'Kajian Rutin', href: '/programs/kajian' },
    { name: 'Tahfiz Al-Quran', href: '/programs/tahfiz' },
    { name: 'Pendidikan Anak', href: '/programs/education' },
    { name: 'Bantuan Sosial', href: '/programs/social' },
  ]

  return (
    <Box
      bg="linear-gradient(135deg, #1F2937 0%, #374151 100%)"
      color="white"
      py={20}
      position="relative"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.05"
        bgImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
        bgSize="30px 30px"
      />

      <Container maxW="8xl" position="relative">
        <VStack spacing={16}>
          {/* Main Footer Content */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12} w="full">
            {/* Brand Section */}
            <VStack align="start" spacing={6} gridColumn={{ lg: 'span 2' }}>
              <HStack spacing={4}>
                <Box bg="white" p={3} borderRadius="xl">
                  <Image
                    src="/images/logo.png"
                    alt="Masjid Al-Kautsar"
                    boxSize={16}
                    objectFit="contain"
                  />
                </Box>
                <VStack align="start" spacing={1}>
                  <Heading
                    fontSize="2xl"
                    fontWeight="800"
                    bgGradient="linear(to-r, #F59E0B, #FBBF24)"
                    bgClip="text"
                  >
                    MASJID AL-KAUTSAR
                  </Heading>
                  <Text fontSize="sm" color="gray.300" fontWeight="500">
                    CitraLand Tallasa City
                  </Text>
                  <HStack spacing={2} mt={2}>
                    <Icon as={FaPrayingHands} color="orange.400" boxSize={4} />
                    <Text fontSize="xs" color="orange.300" fontWeight="600">
                      #NyamanTransparanBerkesan
                    </Text>
                  </HStack>
                </VStack>
              </HStack>

              <Text color="gray.300" fontSize="sm" lineHeight="1.7" maxW="md">
                Masjid yang mengedepankan kenyamanan jamaah, transparansi
                pengelolaan, dan program dakwah yang berkesan untuk kemajuan
                umat Islam.
              </Text>

              {/* Contact Info */}
              <VStack align="start" spacing={3} mt={4}>
                <HStack spacing={3}>
                  <Icon as={FaMapMarkerAlt} color="orange.400" boxSize={4} />
                  <Text fontSize="sm" color="gray.300" lineHeight="1.6">
                    CitraLand Tallasa City, Kapasa, Kec. Tamalanrea, Kota
                    Makassar, Sulawesi Selatan 90241
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            {/* Quick Links */}
            <VStack align="start" spacing={4}>
              <Heading fontSize="lg" fontWeight="700" color="white">
                Menu Utama
              </Heading>
              <VStack align="start" spacing={3}>
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    color="gray.300"
                    _hover={{
                      color: 'orange.400',
                      transform: 'translateX(4px)',
                    }}
                    fontSize="sm"
                    fontWeight="500"
                    transition="all 0.3s"
                  >
                    {link.name}
                  </Link>
                ))}
              </VStack>
            </VStack>

            {/* Programs */}
            <VStack align="start" spacing={4}>
              <Heading fontSize="lg" fontWeight="700" color="white">
                Program
              </Heading>
              <VStack align="start" spacing={3}>
                {programs.map((program) => (
                  <Link
                    key={program.name}
                    href={program.href}
                    color="gray.300"
                    _hover={{
                      color: 'orange.400',
                      transform: 'translateX(4px)',
                    }}
                    fontSize="sm"
                    fontWeight="500"
                    transition="all 0.3s"
                  >
                    {program.name}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </SimpleGrid>

          <Divider borderColor="gray.600" />

          {/* Social Media & Bottom Section */}
          <VStack spacing={8} w="full">
            {/* Social Media */}
            <VStack spacing={4}>
              <Heading
                fontSize="lg"
                fontWeight="700"
                color="white"
                textAlign="center"
              >
                Ikuti Kami
              </Heading>
              <HStack spacing={6}>
                <Link
                  href="https://www.instagram.com/masjid_alkautsar_cltc/"
                  isExternal
                  w={16}
                  h={16}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="whiteAlpha.100"
                  borderRadius="xl"
                  _hover={{
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)',
                    shadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                  }}
                  transition="all 0.3s"
                >
                  <Icon as={FaInstagram} boxSize={6} color="pink.400" />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61568411123173"
                  isExternal
                  w={16}
                  h={16}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="whiteAlpha.100"
                  borderRadius="xl"
                  _hover={{
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)',
                    shadow: '0 8px 25px rgba(66, 103, 178, 0.3)',
                  }}
                  transition="all 0.3s"
                >
                  <Icon as={FaFacebook} boxSize={6} color="blue.400" />
                </Link>
                <Link
                  href="https://www.youtube.com/@MasjidAlKautsarCLTC"
                  isExternal
                  w={16}
                  h={16}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="whiteAlpha.100"
                  borderRadius="xl"
                  _hover={{
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)',
                    shadow: '0 8px 25px rgba(255, 0, 0, 0.3)',
                  }}
                  transition="all 0.3s"
                >
                  <Icon as={FaYoutube} boxSize={6} color="red.400" />
                </Link>
              </HStack>
            </VStack>

            {/* Bottom Bar */}
            <Box borderTop="1px solid" borderColor="gray.600" pt={8} w="full">
              <Flex
                justify="space-between"
                align="center"
                direction={{ base: 'column', md: 'row' }}
                gap={4}
              >
                <Text color="gray.400" fontSize="sm">
                  © 2024 Masjid Al-Kautsar CitraLand Tallasa City. Hak cipta
                  dilindungi.
                </Text>
                <HStack spacing={2}>
                  <Text color="gray.400" fontSize="sm">
                    Dibuat dengan
                  </Text>
                  <Icon as={FaHeart} color="red.400" boxSize={4} />
                  <Text color="gray.400" fontSize="sm">
                    untuk umat
                  </Text>
                </HStack>
              </Flex>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer

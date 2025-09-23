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
} from '@chakra-ui/react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const quickLinks = ['About Us', 'Prayer Times', 'Events', 'Donate']
  const services = [
    'Islamic Education',
    'Marriage Counseling',
    'Funeral Services',
    'Community Outreach',
  ]

  return (
    <Box
      bg="linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)"
      borderTop="1px solid rgba(0, 0, 0, 0.1)"
      py={20}
      position="relative"
    >
      <Container maxW="8xl">
        <VStack spacing={16}>
          {/* Main Footer Content */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12} w="full">
            {/* Brand Section */}
            <VStack align="start" spacing={6}>
              <HStack spacing={4}>
                <Image
                  src="/images/logo.png"
                  alt="Masjid Al-Kautsar"
                  boxSize={12}
                  objectFit="contain"
                />
                <VStack align="start" spacing={0}>
                  <Text
                    fontWeight="800"
                    fontSize="lg"
                    bgGradient="linear(to-r, #F59E0B, #FBBF24)"
                    bgClip="text"
                  >
                    AL-KAUTSAR
                  </Text>
                  <Text fontSize="xs" color="gray.400" fontWeight="500">
                    CitraLand Tallasa City
                  </Text>
                </VStack>
              </HStack>
              <Text color="gray.400" fontSize="sm" lineHeight="1.7" maxW="xs">
                Building bridges between faith and modernity in our vibrant
                community
              </Text>
            </VStack>

            {/* Quick Links */}
            <VStack align="start" spacing={4}>
              <Text fontWeight="700" color="gray.900" fontSize="lg">
                Quick Links
              </Text>
              <VStack align="start" spacing={3}>
                {quickLinks.map((link) => (
                  <Link
                    key={link}
                    color="gray.800"
                    _hover={{
                      color: 'gray.900',
                      transform: 'translateX(4px)',
                    }}
                    fontSize="sm"
                    fontWeight="500"
                    transition="all 0.3s"
                  >
                    {link}
                  </Link>
                ))}
              </VStack>
            </VStack>

            {/* Services */}
            <VStack align="start" spacing={4}>
              <Text fontWeight="700" color="gray.900" fontSize="lg">
                Services
              </Text>
              <VStack align="start" spacing={3}>
                {services.map((service) => (
                  <Link
                    key={service}
                    color="gray.800"
                    _hover={{
                      color: 'white',
                      transform: 'translateX(4px)',
                    }}
                    fontSize="sm"
                    fontWeight="500"
                    transition="all 0.3s"
                  >
                    {service}
                  </Link>
                ))}
              </VStack>
            </VStack>

            {/* Social & Contact */}
            <VStack align="start" spacing={4}>
              <Text fontWeight="700" color="gray.900" fontSize="lg">
                Connect
              </Text>
              <VStack align="start" spacing={4}>
                <HStack spacing={4}>
                  <Link
                    href="https://instagram.com/masjid.alkautsar.cltc"
                    isExternal
                    p={3}
                    bg="gray.100"
                    borderRadius="xl"
                    _hover={{
                      bg: 'gray.200',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.3s"
                  >
                    <Icon as={FaInstagram} boxSize={5} color="pink.400" />
                  </Link>
                  <Link
                    href="https://wa.me/628123456789"
                    isExternal
                    p={3}
                    bg="gray.100"
                    borderRadius="xl"
                    _hover={{
                      bg: 'gray.200',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.3s"
                  >
                    <Icon as={FaWhatsapp} boxSize={5} color="green.400" />
                  </Link>
                </HStack>
                <Text color="gray.400" fontSize="sm" lineHeight="1.6">
                  Follow our journey and stay connected with the community
                </Text>
              </VStack>
            </VStack>
          </SimpleGrid>

          {/* Bottom Bar */}
          <Box borderTop="1px solid rgba(0, 0, 0, 0.1)" pt={8} w="full">
            <Flex
              justify="space-between"
              align="center"
              direction={{ base: 'column', md: 'row' }}
              gap={4}
            >
              <Text color="gray.400" fontSize="sm">
                © 2025 Masjid Al-Kautsar CitraLand Tallasa City. All rights
                reserved.
              </Text>
              <Text color="gray.700" fontSize="sm" fontWeight="500">
                Crafted with ❤️ for the Ummah
              </Text>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer

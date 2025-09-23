'use client'

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Link,
  Button,
  Card,
  Flex,
  Badge,
  Image,
  Container,
} from '@chakra-ui/react'
import {
  FaMosque,
  FaInstagram,
  FaWhatsapp,
  FaPray,
  FaQuran,
  FaHeart,
  FaGraduationCap,
  FaArrowRight,
  FaPlay,
} from 'react-icons/fa'

const Page = () => {
  return (
    <Box bg="gray.50" minH="100vh" color="gray.800" overflow="hidden">
      {/* Premium Navigation */}
      <Box
        py={6}
        px={{ base: 6, md: 12, lg: 16 }}
        bg="white"
        borderBottom="1px solid"
        borderColor="rgba(0, 0, 0, 0.1)"
      >
        <Container maxW="8xl">
          <VStack spacing={4}>
            {/* Logo Section - Centered */}
            <Flex justify="center" w="full" pt={2}>
              <Image
                src="/images/logo.png"
                alt="Masjid Al-Kautsar"
                h="auto"
                maxH="140px"
                objectFit="contain"
              />
            </Flex>

            {/* Navigation Section */}
            <Flex align="center" justify="center" w="full" position="relative">
              <HStack spacing={10} display={{ base: 'none', lg: 'flex' }}>
                {[
                  'Beranda',
                  'Tentang',
                  'Sholat',
                  'Acara',
                  'Galeri',
                  'Kontak',
                ].map((item) => (
                  <Link
                    key={item}
                    color="gray.700"
                    _hover={{
                      color: 'gray.900',
                      transform: 'translateY(-1px)',
                      _after: {
                        width: '100%',
                      },
                    }}
                    fontWeight="600"
                    fontSize="sm"
                    letterSpacing="wide"
                    transition="all 0.2s ease"
                    textDecoration="none"
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      width: '0',
                      height: '2px',
                      bottom: '-4px',
                      left: '50%',
                      bg: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </HStack>

              {/* Donation Button - Positioned Absolutely to Right */}
              <Box
                position="absolute"
                right={0}
                display={{ base: 'none', lg: 'block' }}
              >
                <Button
                  size="sm"
                  bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
                  color="white"
                  _hover={{
                    transform: 'translateY(-1px)',
                    shadow: '0 8px 25px rgba(245, 158, 11, 0.4)',
                  }}
                  transition="all 0.2s ease"
                  borderRadius="full"
                  px={6}
                  fontWeight="600"
                  fontSize="sm"
                  rightIcon={<FaArrowRight size={10} />}
                >
                  Donasi
                </Button>
              </Box>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Parallax Hero Section */}
      <Box
        h="calc(100vh - 226px)"
        px={{ base: 6, md: 12, lg: 16 }}
        bg="white"
        display="flex"
        alignItems="center"
      >
        <Container maxW="8xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={16}
            alignItems="center"
          >
            {/* Left Content */}
            <VStack align="start" spacing={10}>
              {/* Premium Badge */}
              <Badge
                bg="rgba(245, 158, 11, 0.1)"
                color="gray.800"
                px={6}
                py={2}
                borderRadius="full"
                fontSize="sm"
                fontWeight="600"
                letterSpacing="wider"
                border="1px solid rgba(245, 158, 11, 0.2)"
              >
                ✨ MASJID AL-KAUTSAR
              </Badge>

              {/* Hero Typography */}
              <VStack align="start" spacing={6}>
                <Heading
                  as="h1"
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  fontWeight="800"
                  lineHeight="1.1"
                  color="gray.900"
                >
                  Masjid Modern untuk
                  <Text
                    as="span"
                    display="block"
                    bgGradient="linear(135deg, #F59E0B 0%, #FBBF24 100%)"
                    bgClip="text"
                    mt={1}
                  >
                    Komunitas Berkualitas
                  </Text>
                </Heading>

                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  lineHeight="1.7"
                  color="gray.700"
                  maxW="xl"
                >
                  Bergabunglah dengan komunitas muslim yang berkembang di masjid
                  modern dengan kapasitas 600+ jamaah. Nikmati fasilitas terkini
                  dan program unggulan dalam perjalanan spiritual di CitraLand
                  Tallasa City.
                </Text>
              </VStack>

              {/* CTA Buttons */}
              <HStack spacing={4}>
                <Button
                  size="lg"
                  bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
                  color="white"
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: '0 12px 30px rgba(245, 158, 11, 0.4)',
                  }}
                  px={8}
                  py={3}
                  h="auto"
                  fontWeight="600"
                  borderRadius="full"
                  rightIcon={<FaArrowRight />}
                  transition="all 0.3s ease"
                >
                  Jelajahi Sekarang
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  color="gray.700"
                  borderColor="gray.300"
                  _hover={{
                    bg: 'gray.50',
                    transform: 'translateY(-2px)',
                    borderColor: 'gray.400',
                  }}
                  px={8}
                  py={3}
                  h="auto"
                  fontWeight="600"
                  borderRadius="full"
                  leftIcon={<FaPlay />}
                  transition="all 0.3s ease"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </HStack>

              {/* Stats Preview */}
              <HStack spacing={8} pt={6}>
                <VStack spacing={1} align="start">
                  <Text fontSize="2xl" fontWeight="800" color="gray.900">
                    600+
                  </Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="500">
                    Kapasitas Jamaah
                  </Text>
                </VStack>
                <VStack spacing={1} align="start">
                  <Text fontSize="2xl" fontWeight="800" color="gray.900">
                    27 Okt
                  </Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="500">
                    Berdiri Sejak Okt 2024
                  </Text>
                </VStack>
                <VStack spacing={1} align="start">
                  <Text fontSize="2xl" fontWeight="800" color="gray.900">
                    10
                  </Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="500">
                    Program Unggulan
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Right Content - Parallax Mosque Box */}
            <Box>
              <Box
                position="relative"
                borderRadius="3xl"
                overflow="hidden"
                shadow="2xl"
                border="1px solid"
                borderColor="gray.200"
                bg="linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)"
                h="400px"
                p={6}
              >
                {/* Sky Background Layer */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgImage="url('/images/mosque-sky.png')"
                  bgSize="160%"
                  bgPosition="center 20%"
                  bgRepeat="no-repeat"
                  borderRadius="2xl"
                />

                {/* Mosque Front Layer */}
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  h="100%"
                  bgImage="url('/images/mosque-front.png')"
                  bgSize="120%"
                  bgPosition="center 85%"
                  bgRepeat="no-repeat"
                  borderRadius="2xl"
                  zIndex={2}
                />

                {/* Subtle overlay for depth */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 100%)"
                  borderRadius="2xl"
                  zIndex={3}
                />
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Premium Feature Cards */}
      <Box
        position="relative"
        py={32}
        px={{ base: 6, md: 12, lg: 16 }}
        bg="linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)"
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
                Our Services
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="800"
                lineHeight="1.2"
                color="gray.900"
              >
                Spiritual Journey
                <Text
                  as="span"
                  display="block"
                  color="gray.700"
                  fontSize={{ base: '2xl', md: '4xl' }}
                >
                  Made Modern
                </Text>
              </Heading>
            </VStack>

            {/* Feature Grid */}
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={8}
              w="full"
            >
              {[
                {
                  icon: FaPray,
                  title: 'Prayer',
                  subtitle: 'Join our congregation',
                  description:
                    'Experience collective worship in our modern prayer hall',
                  gradient: 'linear(135deg, #F59E0B 0%, #FBBF24 100%)',
                },
                {
                  icon: FaQuran,
                  title: 'Al-Quran',
                  subtitle: 'Study the holy book',
                  description:
                    'Dive deep into Quranic teachings with expert guidance',
                  gradient: 'linear(135deg, #FBBF24 0%, #FCD34D 100%)',
                },
                {
                  icon: FaGraduationCap,
                  title: 'Education',
                  subtitle: 'Islamic learning',
                  description: 'Comprehensive Islamic education for all ages',
                  gradient: 'linear(135deg, #F59E0B 0%, #FBBF24 100%)',
                },
                {
                  icon: FaHeart,
                  title: 'Charity',
                  subtitle: 'Help others',
                  description: 'Be part of our community outreach programs',
                  gradient: 'linear(135deg, #FCD34D 0%, #FEF3C7 100%)',
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  bg="white"
                  border="1px solid rgba(0, 0, 0, 0.08)"
                  borderRadius="2xl"
                  p={8}
                  textAlign="center"
                  _hover={{
                    transform: 'translateY(-8px) rotateY(5deg)',
                    shadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    _before: {
                      opacity: 0.1,
                    },
                  }}
                  transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: item.gradient,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <VStack spacing={6} position="relative" zIndex={2}>
                    <Box
                      p={4}
                      borderRadius="xl"
                      bg={item.gradient}
                      shadow="0 10px 40px rgba(0, 0, 0, 0.3)"
                      _groupHover={{
                        transform: 'scale(1.1) rotate(5deg)',
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      <Icon as={item.icon} boxSize={8} color="white" />
                    </Box>

                    <VStack spacing={3}>
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
                        color="gray.800"
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        {item.subtitle}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.800"
                        lineHeight="1.6"
                        textAlign="center"
                      >
                        {item.description}
                      </Text>
                    </VStack>

                    <Button
                      size="sm"
                      variant="ghost"
                      color="gray.800"
                      _hover={{
                        bg: 'gray.100',
                      }}
                      rightIcon={<FaArrowRight size={12} />}
                      fontWeight="600"
                      letterSpacing="wide"
                    >
                      Learn More
                    </Button>
                  </VStack>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Premium Stats & Content Section */}
      <Box
        py={40}
        bg="linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 251, 0.95) 50%, rgba(255, 255, 255, 1) 100%)"
        position="relative"
        overflow="hidden"
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.1}
          bgImage="radial-gradient(circle at 25% 25%, rgba(245, 158, 11, 0.2) 0%, transparent 70%),
                   radial-gradient(circle at 75% 75%, rgba(251, 191, 36, 0.2) 0%, transparent 70%)"
        />
        <Container maxW="8xl" position="relative" zIndex={2}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={20}
            alignItems="center"
          >
            {/* Left Content */}
            <VStack align="start" spacing={12}>
              <VStack align="start" spacing={6}>
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  letterSpacing="wider"
                  color="gray.700"
                  textTransform="uppercase"
                >
                  Community Excellence
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: '3xl', md: '5xl' }}
                  fontWeight="800"
                  lineHeight="1.2"
                  bgGradient="linear(to-r, white, gray.300)"
                  bgClip="text"
                >
                  Building Tomorrow&apos;s
                  <Text as="span" display="block" color="gray.400">
                    Islamic Heritage
                  </Text>
                </Heading>
                <Text color="gray.300" fontSize="lg" lineHeight="1.8" maxW="xl">
                  Discover a sanctuary where ancient wisdom meets contemporary
                  life. Join our thriving community in worship, learning, and
                  service.
                </Text>
              </VStack>

              {/* Premium Stats */}
              <SimpleGrid columns={3} spacing={8} w="full">
                {[
                  { number: '1000+', label: 'Active Members', icon: FaHeart },
                  {
                    number: '50+',
                    label: 'Weekly Programs',
                    icon: FaGraduationCap,
                  },
                  { number: '15', label: 'Years Serving', icon: FaMosque },
                ].map((stat) => (
                  <VStack
                    key={stat.label}
                    spacing={3}
                    p={6}
                    bg="white"
                    borderRadius="xl"
                    border="1px solid rgba(0, 0, 0, 0.08)"
                    shadow="sm"
                    _hover={{
                      transform: 'translateY(-4px)',
                      shadow: 'lg',
                      borderColor: 'gray.200',
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    <Icon as={stat.icon} boxSize={6} color="gray.400" />
                    <Heading
                      fontSize="3xl"
                      fontWeight="800"
                      bgGradient="linear(135deg, #F59E0B 0%, #FBBF24 100%)"
                      bgClip="text"
                    >
                      {stat.number}
                    </Heading>
                    <Text
                      fontSize="sm"
                      color="gray.800"
                      textAlign="center"
                      fontWeight="500"
                      letterSpacing="wide"
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                ))}
              </SimpleGrid>

              <Button
                size="lg"
                bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
                color="white"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: '0 20px 60px rgba(245, 158, 11, 0.4)',
                }}
                px={12}
                py={4}
                h="auto"
                fontWeight="700"
                borderRadius="full"
                fontSize="lg"
                rightIcon={<FaArrowRight />}
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Discover More
              </Button>
            </VStack>

            {/* Right Content - Prayer Timer */}
            <Box>
              <Card
                bg="white"
                p={10}
                borderRadius="3xl"
                border="1px solid rgba(0, 0, 0, 0.08)"
                shadow="xl"
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
                  zIndex: 1,
                }}
              >
                <VStack spacing={8} position="relative" zIndex={2}>
                  <VStack spacing={4}>
                    <Heading
                      as="h3"
                      fontSize="2xl"
                      fontWeight="700"
                      textAlign="center"
                      color="gray.900"
                      letterSpacing="tight"
                    >
                      Next Prayer
                    </Heading>
                    <Text
                      color="gray.300"
                      textAlign="center"
                      fontSize="md"
                      fontWeight="500"
                    >
                      Time remaining until Maghrib
                    </Text>
                  </VStack>

                  <Box
                    bg="gray.100"
                    p={8}
                    borderRadius="2xl"
                    border="1px solid rgba(0, 0, 0, 0.08)"
                    w="full"
                  >
                    <HStack spacing={8} justify="center">
                      {[
                        { value: '05', label: 'HRS' },
                        { value: '42', label: 'MIN' },
                        { value: '33', label: 'SEC' },
                      ].map((time, index) => (
                        <VStack key={time.label} spacing={2}>
                          <Text
                            fontSize="4xl"
                            fontWeight="900"
                            bgGradient="linear(135deg, #F59E0B 0%, #FBBF24 100%)"
                            bgClip="text"
                            textShadow="0 2px 10px rgba(0,0,0,0.3)"
                          >
                            {time.value}
                          </Text>
                          <Text
                            fontSize="xs"
                            color="gray.800"
                            fontWeight="700"
                            letterSpacing="wider"
                          >
                            {time.label}
                          </Text>
                          {index < 2 && (
                            <Text
                              position="absolute"
                              right={-4}
                              top="50%"
                              transform="translateY(-50%)"
                              fontSize="2xl"
                              color="gray.500"
                              fontWeight="300"
                            >
                              :
                            </Text>
                          )}
                        </VStack>
                      ))}
                    </HStack>
                  </Box>

                  <VStack spacing={3}>
                    <Heading
                      as="h4"
                      fontSize="xl"
                      color="gray.900"
                      fontWeight="600"
                    >
                      Maghrib Prayer
                    </Heading>
                    <Text
                      fontSize="sm"
                      color="gray.800"
                      textAlign="center"
                      lineHeight="1.6"
                    >
                      Join us for collective worship and spiritual connection
                    </Text>
                  </VStack>
                </VStack>
              </Card>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Premium Footer */}
      <Box
        bg="linear-gradient(to bottom, rgba(249, 250, 251, 1) 0%, rgba(243, 244, 246, 1) 100%)"
        borderTop="1px solid rgba(0, 0, 0, 0.1)"
        py={20}
        position="relative"
      >
        <Container maxW="8xl">
          <VStack spacing={16}>
            {/* Main Footer Content */}
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={12}
              w="full"
            >
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
                  {['About Us', 'Prayer Times', 'Events', 'Donate'].map(
                    (link) => (
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
                    )
                  )}
                </VStack>
              </VStack>

              {/* Services */}
              <VStack align="start" spacing={4}>
                <Text fontWeight="700" color="gray.900" fontSize="lg">
                  Services
                </Text>
                <VStack align="start" spacing={3}>
                  {[
                    'Islamic Education',
                    'Marriage Counseling',
                    'Funeral Services',
                    'Community Outreach',
                  ].map((service) => (
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
    </Box>
  )
}

export default Page

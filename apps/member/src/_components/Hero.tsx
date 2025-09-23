'use client'

import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { FaMosque } from 'react-icons/fa'

const Hero = () => {
  return (
    <Container maxW="8xl">
      <Box
        position="relative"
        borderTopRadius="3xl"
        overflow="hidden"
        shadow="2xl"
        border="1px solid"
        borderColor="gray.200"
        h="calc(100vh - 224px)"
        bg="gray.900"
      >
        {/* Background Image with Parallax Effect */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage="url('/images/mosque-sky.png')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          borderRadius="2xl"
          sx={{
            '@keyframes parallaxFloat': {
              '0%, 100%': { transform: 'scale(1.05) translateY(0px)' },
              '50%': { transform: 'scale(1.08) translateY(-10px)' },
            },
            animation: 'parallaxFloat 20s ease-in-out infinite',
          }}
        />

        {/* Hero Content */}
        <Box
          position="absolute"
          top="20%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={2}
          textAlign="center"
          w="full"
          maxW="1000px"
          px={4}
        >
          <VStack spacing={8}>
            {/* Main Title with Advanced Typography */}
            <VStack spacing={2}>
              {/* Masjid - Refined serif */}
              <Text
                fontSize={{
                  base: '18px',
                  sm: '24px',
                  md: '28px',
                  lg: '32px',
                  xl: '36px',
                }}
                color="whiteAlpha.800"
                fontWeight="300"
                letterSpacing="0.3em"
                fontFamily="'Playfair Display', serif"
                fontStyle="italic"
                textTransform="lowercase"
                sx={{
                  position: 'relative',
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(30px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                  animation: 'fadeInUp 1s ease-out 0.2s both',
                }}
              >
                masjid
              </Text>

              {/* AL-KAUTSAR - Modern display */}
              <Heading
                as="h1"
                fontSize={{
                  base: '64px',
                  sm: '80px',
                  md: '96px',
                  lg: '120px',
                  xl: '140px',
                }}
                fontWeight="900"
                lineHeight={0.8}
                letterSpacing="-0.02em"
                fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                textTransform="uppercase"
                color="whiteAlpha.800"
                sx={{
                  position: 'relative',
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(50px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                  animation: 'fadeInUp 1s ease-out 0.4s both',
                }}
              >
                AL-KAUTSAR
              </Heading>
            </VStack>
          </VStack>
        </Box>

        {/* CTA Buttons - In front of mosque */}
        <Box
          position="absolute"
          bottom="10%"
          left="50%"
          transform="translateX(-50%)"
          zIndex={4}
          textAlign="center"
        >
          <Box
            sx={{
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(30px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
              animation: 'fadeInUp 1s ease-out 0.8s both',
            }}
          >
            <Button
              size="lg"
              bg="white"
              color="gray.900"
              _hover={{
                transform: 'translateY(-4px)',
                shadow: '0 20px 40px rgba(255,255,255,0.3)',
                bg: 'gray.50',
              }}
              px={8}
              py={4}
              h="auto"
              fontWeight="700"
              borderRadius="full"
              leftIcon={<FaMosque color="#F59E0B" size={20} />}
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              fontSize="lg"
              onClick={() => {
                const nextSection =
                  document.querySelector('[data-section="features"]') ||
                  document.querySelector('.next-section') ||
                  document.documentElement
                nextSection.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              Lihat Fasilitas Masjid
            </Button>
          </Box>
        </Box>

        {/* Mosque Silhouette */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="100%"
          bgImage="url('/images/mosque-front.png')"
          bgSize="100% auto"
          bgPosition="center bottom"
          bgRepeat="no-repeat"
          zIndex={3}
        />

        {/* Floating Decorative Elements */}
        <Box
          position="absolute"
          top="20%"
          left="10%"
          w="3px"
          h="3px"
          bg="whiteAlpha.600"
          borderRadius="full"
          sx={{
            '@keyframes float1': {
              '0%, 100%': { transform: 'translateY(0px) scale(1)' },
              '50%': { transform: 'translateY(-20px) scale(1.2)' },
            },
            animation: 'float1 4s ease-in-out infinite',
          }}
        />
        <Box
          position="absolute"
          top="30%"
          right="15%"
          w="2px"
          h="2px"
          bg="whiteAlpha.400"
          borderRadius="full"
          sx={{
            '@keyframes float2': {
              '0%, 100%': { transform: 'translateY(0px) scale(1)' },
              '50%': { transform: 'translateY(-15px) scale(1.5)' },
            },
            animation: 'float2 3s ease-in-out infinite 1s',
          }}
        />
        <Box
          position="absolute"
          bottom="40%"
          left="20%"
          w="4px"
          h="4px"
          bg="whiteAlpha.500"
          borderRadius="full"
          sx={{
            '@keyframes float3': {
              '0%, 100%': { transform: 'translateY(0px) scale(1)' },
              '50%': { transform: 'translateY(-25px) scale(0.8)' },
            },
            animation: 'float3 5s ease-in-out infinite 2s',
          }}
        />
      </Box>
    </Container>
  )
}

export default Hero

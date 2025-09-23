'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  VStack,
} from '@chakra-ui/react'
import { FaYoutube } from 'react-icons/fa'

const Navigation = () => {
  return (
    <Box py={6} px={{ base: 6, md: 12, lg: 16 }} bg="white">
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

            {/* YouTube Button - Positioned Absolutely to Right */}
            <Box
              position="absolute"
              right={0}
              display={{ base: 'none', lg: 'block' }}
            >
              <Link
                href="https://www.youtube.com/@MasjidAlKautsarCLTC"
                isExternal
                _hover={{ transform: 'translateY(-1px)' }}
                transition="all 0.2s ease"
              >
                <Button
                  size="sm"
                  bg="linear-gradient(135deg, #DC2626 0%, #EF4444 100%)"
                  color="white"
                  _hover={{
                    bg: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)',
                    shadow: '0 8px 25px rgba(220, 38, 38, 0.4)',
                  }}
                  transition="all 0.2s ease"
                  borderRadius="full"
                  px={6}
                  fontWeight="600"
                  fontSize="sm"
                  rightIcon={<FaYoutube size={14} />}
                >
                  YouTube
                </Button>
              </Link>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  )
}

export default Navigation

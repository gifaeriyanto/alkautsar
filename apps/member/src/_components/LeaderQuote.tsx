'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  Stack,
  Badge,
  Image,
} from '@chakra-ui/react'
import { FaQuoteLeft } from 'react-icons/fa'

const LeaderQuote = () => {
  return (
    <Box
      position="relative"
      py={32}
      px={{ base: 6, md: 12, lg: 16 }}
      bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FCD34D 100%)"
      data-section="leader-quote"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        bgImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
        bgSize="50px 50px"
      />

      <Container maxW="6xl" position="relative">
        <VStack spacing={12} textAlign="center">
          {/* Quote Icon */}
          <Box
            w="80px"
            h="80px"
            bg="white"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            shadow="0 10px 30px rgba(0, 0, 0, 0.1)"
          >
            <Icon as={FaQuoteLeft} boxSize={10} color="orange.500" />
          </Box>

          {/* Main Content - Quote with Leader Photo */}
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing={{ base: 12, lg: 16 }}
            align="center"
            maxW="7xl"
          >
            {/* Leader Photo */}
            <Box flexShrink={0}>
              <Image
                src="/images/ketua-taufan.jpeg"
                alt="Dr. Taufan Kurniawan"
                maxW={{ base: '280px', md: '320px', lg: '400px' }}
                h="auto"
                borderRadius="2xl"
                border="6px solid white"
                shadow="0 20px 60px rgba(0, 0, 0, 0.3)"
              />
            </Box>

            {/* Quote Content */}
            <VStack
              spacing={8}
              flex="1"
              textAlign={{ base: 'center', lg: 'left' }}
            >
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                fontWeight="800"
                lineHeight="1.3"
                color="white"
                textShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              >
                &ldquo;Masjid Al-Kautsar hadir untuk memberikan pelayanan yang{' '}
                <Text as="span" color="yellow.100">
                  nyaman
                </Text>
                , pengelolaan yang{' '}
                <Text as="span" color="yellow.100">
                  transparan
                </Text>
                , dan program-program dakwah yang{' '}
                <Text as="span" color="yellow.100">
                  berkesan
                </Text>{' '}
                bagi seluruh jamaah dan masyarakat&rdquo;
              </Heading>

              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="white"
                lineHeight="1.8"
                opacity="0.95"
                fontWeight="500"
              >
                Komitmen kami adalah membangun masjid yang tidak hanya menjadi
                tempat ibadah, tetapi juga pusat pemberdayaan umat yang
                berkelanjutan dengan manajemen yang profesional dan akuntabel.
              </Text>

              {/* Leader Info */}
              <VStack
                spacing={3}
                align={{ base: 'center', lg: 'start' }}
                w="full"
              >
                <Heading
                  as="h3"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="700"
                  color="white"
                  textShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
                >
                  Dr. Taufan Kurniawan, S.E., M.M.
                </Heading>

                <Text
                  fontSize="lg"
                  color="yellow.100"
                  fontWeight="600"
                  letterSpacing="wide"
                >
                  Ketua Pengurus Masjid Al-Kautsar
                </Text>
              </VStack>
            </VStack>
          </Stack>

          {/* Hashtag */}
          <Box>
            <Badge
              bg="white"
              color="orange.600"
              px={6}
              py={3}
              borderRadius="full"
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="700"
              letterSpacing="wide"
              textTransform="none"
              shadow="0 4px 15px rgba(0, 0, 0, 0.1)"
              _hover={{
                transform: 'translateY(-2px)',
                shadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
              }}
              transition="all 0.3s ease"
            >
              #NyamanTransparanBerkesan
            </Badge>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default LeaderQuote

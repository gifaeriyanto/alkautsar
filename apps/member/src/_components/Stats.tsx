'use client'

import {
  Box,
  Button,
  Card,
  Container,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  FaArrowRight,
  FaGraduationCap,
  FaHeart,
  FaMosque,
} from 'react-icons/fa'

const Stats = () => {
  const stats = [
    { number: '1000+', label: 'Active Members', icon: FaHeart },
    {
      number: '50+',
      label: 'Weekly Programs',
      icon: FaGraduationCap,
    },
    { number: '15', label: 'Years Serving', icon: FaMosque },
  ]

  return (
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
              {stats.map((stat) => (
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
  )
}

export default Stats

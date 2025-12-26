'use client'

import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { FaYoutube } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const pathname = usePathname()

  const menuItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang', href: '/about' },
    { label: 'Pengurus', href: '/pengurus' },
    { label: 'Sholat', href: '/shalat' },
    { label: 'Acara', href: '/events' },
    { label: 'Kontak', href: '#' },
  ]

  const isActive = (href: string) => {
    if (href === '#') return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

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

          {/* Navigation Section - Desktop Only */}
          <Flex
            align="center"
            justify="center"
            w="full"
            position="relative"
            display={{ base: 'none', lg: 'flex' }}
          >
            {/* Desktop Navigation */}
            <HStack spacing={10}>
              {menuItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    color={active ? 'orange.500' : 'gray.700'}
                    _hover={{
                      color: active ? 'orange.600' : 'gray.900',
                      transform: 'translateY(-1px)',
                      _after: {
                        width: '100%',
                      },
                    }}
                    fontWeight={active ? '700' : '600'}
                    fontSize="sm"
                    letterSpacing="wide"
                    transition="all 0.2s ease"
                    textDecoration="none"
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      width: active ? '100%' : '0',
                      height: '2px',
                      bottom: '-4px',
                      left: '50%',
                      bg: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </HStack>

            {/* YouTube Button - Desktop */}
            <Box position="absolute" right={0}>
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

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay bg="blackAlpha.300" />
        <DrawerContent bg="white" maxW="320px" ml="auto">
          {/* Custom Header with Close Button */}
          <Flex
            align="center"
            justify="space-between"
            p={6}
            borderBottomWidth="1px"
            borderColor="gray.100"
          >
            <Image
              src="/images/logo.png"
              alt="Masjid Al-Kautsar"
              h="50px"
              objectFit="contain"
            />
            <IconButton
              aria-label="Close menu"
              icon={<HiX />}
              onClick={onClose}
              variant="ghost"
              size="lg"
              color="gray.600"
              _hover={{ bg: 'gray.100' }}
            />
          </Flex>

          <DrawerBody p={0}>
            <VStack spacing={0} align="stretch">
              {menuItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Flex
                      align="center"
                      px={6}
                      py={4}
                      borderBottomWidth="1px"
                      borderColor="gray.50"
                      bg={active ? 'linear-gradient(90deg, #F59E0B10, #FBBF2410)' : 'transparent'}
                      borderLeftWidth={active ? '4px' : '0'}
                      borderLeftColor="orange.400"
                      _hover={{
                        bg: 'linear-gradient(90deg, #F59E0B10, #FBBF2410)',
                        borderLeftWidth: '4px',
                        borderLeftColor: 'orange.400',
                      }}
                      transition="all 0.2s ease"
                      cursor="pointer"
                    >
                      <Box
                        w="8px"
                        h="8px"
                        bg="orange.400"
                        borderRadius="full"
                        mr={4}
                        opacity={active ? 1 : 0.7}
                      />
                      <Box
                        color={active ? 'orange.600' : 'gray.700'}
                        fontWeight={active ? '700' : '600'}
                        fontSize="lg"
                        _hover={{ color: active ? 'orange.700' : 'gray.900' }}
                      >
                        {item.label}
                      </Box>
                    </Flex>
                  </Link>
                )
              })}

              {/* YouTube Section */}
              <Box px={6} py={8}>
                <Link
                  href="https://www.youtube.com/@MasjidAlKautsarCLTC"
                  isExternal
                  onClick={onClose}
                  textDecoration="none"
                >
                  <Button
                    w="full"
                    bg="linear-gradient(135deg, #DC2626 0%, #EF4444 100%)"
                    color="white"
                    _hover={{
                      bg: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)',
                      transform: 'translateY(-2px)',
                      shadow: '0 10px 25px rgba(220, 38, 38, 0.3)',
                    }}
                    leftIcon={<FaYoutube size={20} />}
                    size="lg"
                    h="56px"
                    borderRadius="xl"
                    fontWeight="700"
                    fontSize="md"
                    transition="all 0.3s ease"
                  >
                    Subscribe YouTube
                  </Button>
                </Link>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Floating Menu Button - Mobile Only */}
      <Box
        position="fixed"
        bottom={0}
        right={0}
        zIndex={1000}
        display={{ base: 'block', lg: 'none' }}
      >
        <Button
          onClick={onOpen}
          bg="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
          color="white"
          _hover={{
            bg: 'linear-gradient(135deg, #E28D0B 0%, #F59E0B 100%)',
            transform: 'translateY(-2px)',
            shadow: '0 12px 30px rgba(245, 158, 11, 0.4)',
          }}
          _active={{
            transform: 'translateY(0px)',
          }}
          size="lg"
          h="60px"
          px={6}
          borderTopLeftRadius="20px"
          fontWeight="700"
          fontSize="md"
          leftIcon={<HiMenu size={20} />}
          shadow="0 8px 25px rgba(245, 158, 11, 0.3)"
          transition="all 0.3s ease"
        >
          Menu
        </Button>
      </Box>
    </Box>
  )
}

export default Navigation

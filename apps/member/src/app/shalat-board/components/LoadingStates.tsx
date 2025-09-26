import { Box, VStack, Spinner, Text, Alert, AlertIcon } from '@chakra-ui/react'

export const ConfigurationLoading = () => (
  <Box
    minH="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="gray.900"
    color="white"
  >
    <VStack spacing={4}>
      <Spinner size="xl" />
      <Text>Memuat konfigurasi...</Text>
    </VStack>
  </Box>
)

export const PrayerTimesLoading = () => (
  <Box
    minH="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="gray.900"
    color="white"
  >
    <VStack spacing={4}>
      <Spinner size="xl" />
      <Text>Memuat jadwal shalat...</Text>
    </VStack>
  </Box>
)

interface ErrorStateProps {
  error: string
}

export const ErrorState = ({ error }: ErrorStateProps) => (
  <Box
    minH="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={4}
  >
    <Alert status="error" maxW="md">
      <AlertIcon />
      {error}
    </Alert>
  </Box>
)

'use client'

import { Box, Container, useMediaQuery } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import Sidebar from './sidebar'

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const [isLargerThan1140] = useMediaQuery('(min-width: 1140px)')

  return (
    <Box bgColor="gray.100" minH="100vh">
      <Container maxW="960px" py="40px" px={isLargerThan1140 ? '0' : '20px'}>
        <Sidebar />

        <Box minH="calc(100vh - 124px)">{children}</Box>

        {isLargerThan1140 ? (
          <Box color="blackAlpha.500" mt={6} textAlign="center">
            &copy; Masjid Al-Kautsar CLTC {new Date().getFullYear()}
          </Box>
        ) : null}
      </Container>
    </Box>
  )
}

export default CommonLayout

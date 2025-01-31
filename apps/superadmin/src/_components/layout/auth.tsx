import { Container, Flex } from '@chakra-ui/react'
import type { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex bgColor="white" align="center" h="100vh" justify="center" w="full">
      <Container as="section" maxW="30rem">
        {children}
      </Container>
    </Flex>
  )
}

export default AuthLayout

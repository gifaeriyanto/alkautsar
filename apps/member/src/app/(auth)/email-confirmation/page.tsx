'use client'

import { Flex, Heading, Text } from '@chakra-ui/react'

const Page = () => {
  return (
    <Flex
      border="1px solid"
      borderColor={{ base: 'transparent', md: 'gray.200' }}
      borderRadius="md"
      maxW="440px"
      p="2.5rem"
      w="full"
      direction="column"
    >
      <Heading color="green.500" fontSize="40px" mb="30px">
        Cek email Anda
      </Heading>
      <Text>Kami telah mengirimkan link reset kata sandi di email Anda</Text>
    </Flex>
  )
}

export default Page

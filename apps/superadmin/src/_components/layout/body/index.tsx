import { Flex, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export interface LayoutBodyProps {
  children?: ReactNode
  title: string
}

const LayoutBody = ({ children, title }: LayoutBodyProps) => {
  return (
    <>
      <Flex justify="space-between">
        <Heading fontSize="3xl" as="h1" mb={8}>
          {title}
        </Heading>
      </Flex>
      {children}
    </>
  )
}

export default LayoutBody

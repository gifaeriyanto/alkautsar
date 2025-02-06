import { Flex, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export interface LayoutBodyProps {
  children?: ReactNode
  title?: string
  actionArea?: ReactNode
}

const LayoutBody = ({ children, title, actionArea }: LayoutBodyProps) => {
  return (
    <>
      <Flex justify="space-between">
        {title ? (
          <Heading fontSize="3xl" as="h1" mb={8}>
            {title}
          </Heading>
        ) : null}
        {actionArea}
      </Flex>
      {children}
    </>
  )
}

export default LayoutBody

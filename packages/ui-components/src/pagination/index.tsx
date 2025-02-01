import { Button, HStack, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

interface PaginationProps {
  currentPage: number
  totalPage: number
  onPageChange?: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) => {
  const pages = [...Array(totalPage).keys()].map((i) => i + 1)

  return (
    <HStack justify="center" mt="1.5rem">
      <IconButton
        aria-label="Prev button"
        colorScheme="gray"
        fontSize="x-large"
        icon={<BiChevronLeft />}
        isDisabled={currentPage === 1}
        onClick={() => {
          onPageChange?.(currentPage - 1)
        }}
      />
      {pages.map((number) => {
        // show first, last and two pages around current page.
        if (
          number === 1 ||
          number === totalPage ||
          (number >= currentPage - 1 && number <= currentPage + 1)
        ) {
          return (
            <Button
              colorScheme={currentPage === number ? 'orange' : 'gray'}
              key={number}
              onClick={() => {
                onPageChange?.(number)
              }}
            >
              {number}
            </Button>
          )
        } else if (number === currentPage - 2 || number === currentPage + 2) {
          return <Text key={number}>...</Text>
        }
        return null
      })}
      <IconButton
        aria-label="Next button"
        colorScheme="gray"
        fontSize="x-large"
        icon={<BiChevronRight />}
        isDisabled={currentPage === totalPage}
        onClick={() => {
          onPageChange?.(currentPage + 1)
        }}
      />
    </HStack>
  )
}

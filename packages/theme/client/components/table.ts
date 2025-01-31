import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const simple = definePartsStyle({
  table: {
    border: '1px solid',
    borderColor: 'gray.100',
  },
  thead: {
    bgColor: 'gray.50',
  },
  tbody: {
    tr: {
      _last: {
        td: {
          borderBottom: 0,
        },
      },
    },
  },
})

export const tableTheme = defineMultiStyleConfig({ variants: { simple } })

import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  header: {
    pb: 0,
  },
  container: {
    boxShadow: 'none',
    w: 'full',
  },
})

export const cardTheme = defineMultiStyleConfig({ baseStyle })

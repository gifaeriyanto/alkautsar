import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle({
  tabpanel: {
    px: 0,
    py: '2.5rem',
  },
})

export const tabsTheme = defineMultiStyleConfig({ baseStyle })

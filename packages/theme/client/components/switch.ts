import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const solid = definePartsStyle(({ colorScheme }) => {
  if (colorScheme === 'black') {
    return {
      track: {
        bgColor: 'black',
      },
    }
  }

  return {}
})

export const switchTheme = defineMultiStyleConfig({
  variants: { solid },
  defaultProps: {
    colorScheme: 'black',
  },
})

'use client'

import type { ThemeComponents, ThemeOverride } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './components/button'
import { cardTheme } from './components/card'
import { inputTheme } from './components/input'
import { colors } from './foundations/colors'
import { textStyles } from './foundations/text-styles'
import { tabsTheme } from './components/tabs'
import { tableTheme } from './components/table'
import { switchTheme } from './components/switch'
import { modalTheme } from './components/modal'

const config: ThemeOverride = {
  colors,
  components: {
    Button: buttonTheme,
    Card: cardTheme,
    Input: inputTheme,
    Switch: switchTheme,
    Table: tableTheme,
    Tabs: tabsTheme,
    Modal: modalTheme,
  } as ThemeComponents,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif',
    heading: '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif',
  },
  lineHeights: {
    lg: '1.7',
    md: '1.5',
    sm: '1.3',
  },
  radii: {
    lg: '8px',
    md: '4px',
    sm: '2px',
  },
  textStyles,
  styles: {
    global: (props) => ({
      'html, body': {
        // same as textStyles.content
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '1.8',
        [`@media(max-width: ${props.theme.breakpoints.lg})`]: {
          // media query for mobile devices
          fontSize: '16px',
        },
      },
    }),
  },
}

export const theme = extendTheme(config)

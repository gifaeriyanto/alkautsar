'use client'

import { createStandaloneToast } from '@chakra-ui/react'
import { theme } from '../theme'

const { ToastContainer, toast } = createStandaloneToast({
  theme,
})

export const toastService = {
  toast,
  ToastContainer,
}

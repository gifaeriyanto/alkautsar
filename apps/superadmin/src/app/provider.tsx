'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { theme, toastService } from 'theme/client'
import Layout from '@/_components/layout'

const queryClient = new QueryClient()

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ChakraProvider
        theme={theme}
        toastOptions={{ defaultOptions: { position: 'top' } }}
      >
        <QueryClientProvider client={queryClient}>
          <Layout>{children}</Layout>
        </QueryClientProvider>
      </ChakraProvider>
      <toastService.ToastContainer />
    </>
  )
}

export default Provider

'use client'

import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { forgotPassword } from '@client/supabase'
import type { FormGeneratorProps } from '@client/ui-components'
import { FormGenerator } from '@client/ui-components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toastService } from 'theme/client'

const formItems: FormGeneratorProps['data'] = [
  {
    name: 'email',
    placeholder: 'Alamat email',
    type: 'text',
    label: 'Masukkan email Anda',
    rules: {
      required: 'Mohon diisi',
      pattern: {
        message: 'Mohon masukkan email yang valid',
        value: /\S+@\S+\.\S+/,
      },
    },
  },
]

interface ForgotPasswordInputs {
  email: string
}

const Page = () => {
  const [loading, setLoading] = useState(false)
  const formMethods = useForm<ForgotPasswordInputs>()
  const { handleSubmit } = formMethods
  const router = useRouter()

  const handleForgotPassword = async (value: ForgotPasswordInputs) => {
    setLoading(true)
    try {
      const res = await forgotPassword(value.email)
      if (res.error) {
        toastService.toast({
          title: 'Terjadi kesalahan',
          description: res.error.message,
          status: 'error',
        })
      } else {
        router.push('/email-confirmation')
      }
    } catch (error: any) {
      toastService.toast({
        title: 'Terjadi kesalahan',
        description: error?.message,
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex
      border="1px solid"
      borderColor={{ base: 'transparent', md: 'gray.200' }}
      borderRadius="md"
      maxW="440px"
      p="2.5rem"
      w="full"
    >
      <FormProvider {...formMethods}>
        <Box as="form" onSubmit={handleSubmit(handleForgotPassword)} w="full">
          <Heading color="orange.500" fontSize="40px" mb="30px">
            Lupa kata sandi
          </Heading>

          <Box mb="3rem">
            <FormGenerator data={formItems} loading={loading} />
          </Box>

          <Flex align="center" justify="space-between">
            <Button type="submit">Reset Password</Button>
          </Flex>
        </Box>
      </FormProvider>
    </Flex>
  )
}

export default Page

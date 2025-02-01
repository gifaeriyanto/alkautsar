'use client'

import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { resetPassword } from '@client/supabase'
import { FormGenerator } from '@client/ui-components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toastService } from 'theme/client'

interface ResetPasswordInputs {
  password: string
}

const Page = () => {
  const [loading, setLoading] = useState(false)
  const formMethods = useForm<ResetPasswordInputs>()
  const { handleSubmit } = formMethods
  const router = useRouter()

  const handleResetPassword = async (value: ResetPasswordInputs) => {
    setLoading(true)
    try {
      const res = await resetPassword(value.password)
      if (res.error) {
        toastService.toast({
          title: 'Terjadi kesalahan',
          description: res.error.message,
          status: 'error',
        })
      } else {
        router.push('/')
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
        <Box as="form" onSubmit={handleSubmit(handleResetPassword)} w="full">
          <Heading color="orange.500" fontSize="40px" mb="30px">
            Lupa kata sandi
          </Heading>

          <Box mb="3rem">
            <FormGenerator
              data={[
                {
                  name: 'password',
                  label: 'Masukkan kata sandi baru',
                  placeholder: '******',
                  type: 'password',
                  rules: {
                    required: 'Mohon diisi',
                  },
                },
                {
                  name: 'confirm-password',
                  label: 'Ulangi kata sandi baru',
                  placeholder: '******',
                  type: 'password',
                  rules: {
                    required: 'Mohon diisi',
                    validate: (val: string) => {
                      if (formMethods.watch('password') !== val) {
                        return 'Kata sandi yang Anda masukkan salah'
                      }
                    },
                  },
                },
              ]}
              loading={loading}
            />
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

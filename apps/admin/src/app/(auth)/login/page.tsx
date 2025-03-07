'use client'
import {
  Box,
  Button,
  Link as CLink,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import type { FormGeneratorProps } from '@client/ui-components'
import { toastService } from 'theme/client'
import { FormGenerator } from '@client/ui-components'
import { signIn, signOut } from '@client/supabase/auth'
import { useSearchParams } from 'next/navigation'

const formItems: FormGeneratorProps['data'] = [
  {
    name: 'email',
    placeholder: 'Alamat email',
    type: 'text',
    rules: {
      required: 'Mohon diisi',
      pattern: {
        message: 'Mohon masukkan email yang valid',
        value: /\S+@\S+\.\S+/,
      },
    },
  },
  {
    name: 'password',
    placeholder: 'Kata Sandi',
    type: 'password',
    rules: {
      required: 'Mohon diisi',
    },
  },
]

export interface LoginInputs {
  email: string
  password: string
}

const Page = () => {
  const [loading, setLoading] = useState(false)
  const formMethods = useForm<LoginInputs>()
  const { handleSubmit } = formMethods
  const searchParams = useSearchParams()

  const error = searchParams.get('error')

  useEffect(() => {
    if (error === 'unauthorized') {
      toastService.toast({
        title: 'Anda tidak memiliki akses',
        description:
          'Silakan hubungi admin atau gunakan akun lain untuk mengakses halaman ini.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      signOut(false)
    }
  }, [error])

  const handleLogin = async (value: LoginInputs) => {
    setLoading(true)
    try {
      const res = await signIn(value.email, value.password)
      if (res.error) {
        toastService.toast({
          title: 'Terjadi kesalahan',
          description: res.error.message,
          status: 'error',
        })
      } else {
        // hard refresh to make sure we get session
        window.location.href = '/'
      }
    } catch (err: any) {
      toastService.toast({
        title: 'Terjadi kesalahan',
        description: err?.message,
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
        <Box as="form" onSubmit={handleSubmit(handleLogin)} w="full">
          <Heading color="orange.500" fontSize="40px" mb="30px">
            alkautsar
          </Heading>

          <Box mb="3rem">
            <Text mb="1rem">Login dengan akun Anda</Text>

            <FormGenerator data={formItems} loading={loading} />
          </Box>

          <Flex align="center" justify="space-between">
            <Button type="submit">Masuk</Button>

            <Link href="/forgot-password">
              <CLink as="span">Lupa kata sandi?</CLink>
            </Link>
          </Flex>
        </Box>
      </FormProvider>
    </Flex>
  )
}

export default Page

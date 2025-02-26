'use client'

import { Button, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import Layout from '@/_components/layout'

const ThanksPage = () => {
  return (
    <Layout.Body title="Pendaftaran Anda Berhasil!">
      <VStack spacing={6} textAlign="center" align="flex-start">
        <Text color="gray.600">
          Terima kasih telah mendaftar. Kami akan segera meninjau data Anda dan
          menghubungi jika diperlukan.
        </Text>
        <Button as={Link} colorScheme="blue" href="/">
          Kembali ke Halaman Utama
        </Button>
      </VStack>
    </Layout.Body>
  )
}

export default ThanksPage

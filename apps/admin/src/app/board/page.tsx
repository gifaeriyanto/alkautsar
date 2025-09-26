'use client'

import { Box, Button, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { useList } from '@client/supabase'
import { ActionForm } from '@client/ui-components'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { boardConfigsFormFields } from '@/_validations/board'
import Layout from '@/_components/layout'

interface BoardConfig {
  id: string
  organization_id: string
  location_name: string
  city_id: string
}

const Page = () => {
  const router = useRouter()
  const [existingConfig, setExistingConfig] = useState<BoardConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { data: configs, isLoading: configsLoading } = useList('board_configs')

  useEffect(() => {
    if (!configsLoading) {
      setExistingConfig(configs[0] || null)
      setIsLoading(false)
    }
  }, [configs, configsLoading])

  if (isLoading) {
    return (
      <Layout.Body title="Konfigurasi Board Shalat">
        <VStack spacing={4} py={8}>
          <Spinner size="lg" />
          <Text>Memuat konfigurasi...</Text>
        </VStack>
      </Layout.Body>
    )
  }

  return (
    <Layout.Body title="Konfigurasi Board Shalat">
      <VStack spacing={6} align="stretch">
        {/* Navigation buttons */}
        <HStack spacing={4} justify="flex-end">
          <Button
            colorScheme="blue"
            onClick={() => {
              router.push('/board/slides')
            }}
          >
            Kelola Slide
          </Button>
          <Button
            colorScheme="green"
            onClick={() =>
              window.open(`${window.location.origin}/shalat-board`, '_blank')
            }
          >
            Lihat Board
          </Button>
        </HStack>

        <Box maxW="2xl" mx="auto" w="full">
          <ActionForm
            formFields={boardConfigsFormFields}
            table="board_configs"
            type={existingConfig ? 'edit' : 'create'}
            dataId={existingConfig?.id}
            redirectTo="/board"
          />
        </Box>
      </VStack>
    </Layout.Body>
  )
}

export default Page

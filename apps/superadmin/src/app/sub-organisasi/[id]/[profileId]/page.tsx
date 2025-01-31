'use client'

import { Spinner, VStack } from '@chakra-ui/react'
import { useDetail } from '@client/supabase'

const Page = ({ params }: { params: { profileId: string } }) => {
  const { data, isLoading } = useDetail('profiles', params.profileId)

  if (isLoading || !data) {
    return <Spinner />
  }

  return <VStack spacing={8}>{data.name}</VStack>
}

export default Page

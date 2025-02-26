'use client'

import { Card, CardBody, Center, Spinner, Text, VStack } from '@chakra-ui/react'
import { useDetail } from '@client/supabase'
import { currency, dateFormat } from '@client/ui-components'
import { TextStyle } from 'theme/client'
import Layout from '@/_components/layout'
import {
  education,
  houseStatus,
  maritalStatus,
  socialAssistance,
} from '../constants'

const Page = ({ params }: { params: { id: string } }) => {
  const { data: bansosMemberData, isLoading: isLoadingReport } = useDetail(
    'bansos_members',
    params.id
  )

  if (!bansosMemberData || isLoadingReport) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Layout.Body title={bansosMemberData.full_name}>
      <VStack>
        <Card>
          <CardBody>
            <VStack align="flex-start">
              <VStack align="flex-start" spacing={0}>
                <Text textStyle={TextStyle.Small}>Nomor WhatsApp</Text>
                <Text fontWeight="bold">
                  {bansosMemberData.whatsapp_number}
                </Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Text textStyle={TextStyle.Small}>Alamat</Text>
                <Text fontWeight="bold">{bansosMemberData.address}</Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Text textStyle={TextStyle.Small}>
                  Tempat dan Tanggal Lahir
                </Text>
                <Text fontWeight="bold">
                  {bansosMemberData.birth_place},{' '}
                  {dateFormat(new Date(bansosMemberData.birth_date as string))}
                </Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Text textStyle={TextStyle.Small}>Jenis Kelamin</Text>
                <Text fontWeight="bold">
                  {bansosMemberData.gender === 'male'
                    ? 'Laki-laki'
                    : 'Perempuan'}
                </Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Text textStyle={TextStyle.Small}>Status Pernikahan</Text>
                <Text fontWeight="bold">
                  {
                    maritalStatus.find(
                      (item) => item.value === bansosMemberData.marital_status
                    )?.label
                  }
                </Text>
              </VStack>
              <VStack
                align="flex-start"
                spacing={0}
                hidden={!bansosMemberData.education}
              >
                <Text textStyle={TextStyle.Small}>Pendidikan Terakhir</Text>
                <Text fontWeight="bold">
                  {
                    education.find(
                      (item) => item.value === bansosMemberData.education
                    )?.label
                  }
                </Text>
              </VStack>

              <VStack
                align="flex-start"
                spacing={0}
                hidden={!bansosMemberData.job}
              >
                <Text textStyle={TextStyle.Small}>Pekerjaan</Text>
                <Text fontWeight="bold">{bansosMemberData.job}</Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Text textStyle={TextStyle.Small}>Penghasilan per Bulan</Text>
                <Text fontWeight="bold">
                  {currency(bansosMemberData.income_per_month)}
                </Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Text textStyle={TextStyle.Small}>Tanggungan</Text>
                <Text fontWeight="bold">
                  {bansosMemberData.dependents > 0
                    ? `${bansosMemberData.dependents} orang`
                    : 'Belum ada'}
                </Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Text textStyle={TextStyle.Small}>Status Tempat Tinggal</Text>
                <Text fontWeight="bold">
                  {
                    houseStatus.find(
                      (item) => item.value === bansosMemberData.house_status
                    )?.label
                  }
                </Text>
              </VStack>
              <VStack
                align="flex-start"
                spacing={0}
                hidden={!bansosMemberData.social_assistance?.length}
              >
                <Text textStyle={TextStyle.Small}>
                  Bantuan Sosial yang Pernah Diterima
                </Text>
                <Text fontWeight="bold">
                  {bansosMemberData.social_assistance
                    ?.map(
                      (item) =>
                        socialAssistance.find((sa) => sa.value === item)?.label
                    )
                    .join(', ')}
                </Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Layout.Body>
  )
}

export default Page

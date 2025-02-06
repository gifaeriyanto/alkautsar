'use client'

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useDetail } from '@client/supabase'
import { currency, dateFormat } from '@client/ui-components'
import { TextStyle } from 'theme/client'
import { BiCalendar, BiWallet } from 'react-icons/bi'
import Layout from '@/_components/layout'

const Page = ({ params }: { params: { id: string } }) => {
  const { data: reportData, isLoading: isLoadingReport } = useDetail(
    'financial_reports',
    params.id,
    {
      select: '*, wallets(name)',
    }
  )

  if (!reportData || isLoadingReport) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Layout.Body title={reportData.amount >= 0 ? 'Pemasukan' : 'Pengeluaran'}>
      <VStack>
        <Card>
          <CardBody>
            <VStack align="flex-start">
              <VStack align="flex-start" mb={4}>
                <Text textStyle={TextStyle.H3}>{reportData.description}</Text>
                <Text
                  textStyle={TextStyle.H1}
                  color={reportData.amount >= 0 ? 'green.500' : 'red.500'}
                >
                  {currency(reportData.amount)}
                </Text>
              </VStack>
              <HStack>
                <Icon as={BiCalendar} />
                <Text>{dateFormat(new Date(reportData.date))}</Text>
              </HStack>
              <HStack>
                <Icon as={BiWallet} />
                <Text>{(reportData as any).wallets.name}</Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {reportData.photos?.length ? (
          <Card>
            <CardHeader>
              <Text textStyle={TextStyle.H3}>Bukti transaksi</Text>
            </CardHeader>
            <CardBody>
              <VStack align="flex-start" spacing={4}>
                {reportData.photos.map((photo, index) => (
                  <Box
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    as="img"
                    src={photo}
                    alt={`image-${index + 1}`}
                    borderRadius="md"
                    maxW="100%"
                  />
                ))}
              </VStack>
            </CardBody>
          </Card>
        ) : null}
      </VStack>
    </Layout.Body>
  )
}

export default Page

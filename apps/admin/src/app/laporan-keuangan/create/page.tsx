'use client'

import { useList } from '@client/supabase'
import { ActionForm } from '@client/ui-components'
import { Center, Spinner } from '@chakra-ui/react'
import Layout from '@/_components/layout'
import { useWallet } from '@/_store/wallet'

const Page = () => {
  const { data: walletsData, isLoading: isLoadingWalletData } =
    useList('wallets')
  const { id: walletId } = useWallet()

  if (isLoadingWalletData) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Layout.Body title="Tambah Transaksi">
      <ActionForm
        defaultValues={{ wallet_id: walletId }}
        formFields={[
          {
            name: 'description',
            type: 'text',
            label: 'Nama transaksi',
            rules: { required: 'Mohon diisi' },
          },
          {
            name: 'type',
            type: 'select',
            label: 'Jenis transaksi',
            options: ['Pemasukan', 'Pengeluaran'],
            rules: { required: 'Mohon diisi' },
          },
          {
            name: 'amount',
            type: 'number',
            label: 'Jumlah',
            rules: { required: 'Mohon diisi' },
          },
          {
            name: 'date',
            type: 'date',
            label: 'Tanggal transaksi',
            rules: { required: 'Mohon diisi' },
          },
          {
            name: 'wallet_id',
            type: 'select',
            label: 'Dompet',
            options: walletsData.map((wallet) => ({
              label: wallet.name,
              value: wallet.id,
            })),
            rules: { required: 'Mohon diisi' },
          },
          {
            name: 'notes',
            type: 'textarea',
            label: 'Catatan',
          },
          {
            name: 'photos',
            type: 'multiple-upload',
            label: 'Bukti pembayaran',
          },
          {
            name: 'organization_id',
            type: 'organization_id',
          },
        ]}
        table="financial_reports"
        type="create"
        redirectTo="/laporan-keuangan"
        mapperData={(values) => {
          const { type, ...newValues } = values
          if (type === 'Pengeluaran') {
            newValues.amount = newValues.amount * -1
            return newValues
          }
          return newValues
        }}
      />
    </Layout.Body>
  )
}

export default Page

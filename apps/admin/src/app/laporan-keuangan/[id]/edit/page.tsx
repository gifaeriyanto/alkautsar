'use client'

import { useList } from '@client/supabase'
import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'

const Page = ({ params }: { params: { id: string } }) => {
  const { data: walletsData } = useList('wallets')

  return (
    <Layout.Body title="Tambah Transaksi">
      <ActionForm
        formFields={[
          {
            name: 'description',
            type: 'text',
            label: 'Nama transaksi',
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
        type="edit"
        redirectTo="/laporan-keuangan"
        dataId={params.id}
      />
    </Layout.Body>
  )
}

export default Page

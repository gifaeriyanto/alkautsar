import type { FieldData } from '@client/ui-components'

export const eventsFormFields: FieldData[] = [
  {
    name: 'name',
    label: 'Nama Event',
    type: 'text',
    rules: { required: 'Nama Event wajib diisi' },
  },
  {
    name: 'description',
    label: 'Deskripsi',
    type: 'textarea',
  },
  {
    name: 'image',
    label: 'Gambar Event',
    type: 'upload',
  },
  {
    name: 'start_date',
    label: 'Tanggal Mulai',
    type: 'date',
    rules: { required: 'Tanggal mulai wajib diisi' },
  },
  {
    name: 'end_date',
    label: 'Tanggal Selesai',
    type: 'date',
  },
  {
    name: 'wallet_id',
    label: 'Wallet',
    type: 'asyncList',
    tableName: 'wallets',
  },
  {
    name: 'organization_id',
    type: 'organization_id',
  },
]

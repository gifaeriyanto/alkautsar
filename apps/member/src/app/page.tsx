'use client'

import type { FieldData } from '@client/ui-components'
import { ActionForm } from '@client/ui-components'
import Layout from '@/_components/layout'

const formFields: FieldData[] = [
  {
    name: 'full_name',
    label: 'Nama Lengkap',
    type: 'text',
    rules: { required: 'Nama Lengkap wajib diisi' },
  },
  {
    name: 'whatsapp_number',
    label: 'Nomor WhatsApp',
    type: 'text',
    rules: { required: 'Nomor WhatsApp wajib diisi' },
  },
  {
    name: 'birth_place_date',
    label: 'Tempat, Tanggal Lahir',
    type: 'text',
    rules: { required: 'Tempat dan Tanggal Lahir wajib diisi' },
  },
  {
    name: 'gender',
    label: 'Jenis Kelamin',
    type: 'select',
    options: [
      { label: 'Laki-laki', value: 'male' },
      { label: 'Perempuan', value: 'female' },
    ],
    rules: { required: 'Pilih jenis kelamin' },
  },
  {
    name: 'marital_status',
    label: 'Status Pernikahan',
    type: 'select',
    options: [
      { label: 'Belum Menikah', value: 'single' },
      { label: 'Menikah', value: 'married' },
      { label: 'Cerai', value: 'divorced' },
    ],
    rules: { required: 'Pilih status pernikahan' },
  },
  {
    name: 'address',
    label: 'Alamat Lengkap',
    type: 'textarea',
    rules: { required: 'Alamat wajib diisi' },
  },
  {
    name: 'education',
    label: 'Pendidikan Terakhir',
    type: 'select',
    options: [
      { label: 'Tidak Sekolah', value: 'none' },
      { label: 'SD', value: 'sd' },
      { label: 'SMP', value: 'smp' },
      { label: 'SMA', value: 'sma' },
      { label: 'Perguruan Tinggi', value: 'college' },
    ],
  },
  {
    name: 'job',
    label: 'Pekerjaan',
    type: 'text',
  },
  {
    name: 'income_per_month',
    label: 'Penghasilan per Bulan',
    type: 'text',
    rules: { required: 'Isi penghasilan dan jumlah tanggungan' },
  },
  {
    name: 'dependents',
    label: 'Tanggungan',
    type: 'number',
    rules: { required: 'Isi penghasilan dan jumlah tanggungan' },
  },
  {
    name: 'house_status',
    label: 'Status Tempat Tinggal',
    type: 'select',
    options: [
      { label: 'Milik Sendiri', value: 'owned' },
      { label: 'Kontrak', value: 'rented' },
      { label: 'Menumpang', value: 'staying_with_family' },
    ],
    rules: { required: 'Pilih status tempat tinggal' },
  },
  {
    name: 'social_assistance',
    label: 'Bantuan Sosial yang Pernah Diterima',
    type: 'checkbox',
    options: [
      { label: 'PKH', value: 'pkh' },
      { label: 'BPNT', value: 'bpnt' },
      { label: 'BLT', value: 'blt' },
      { label: 'Bansos Lainnya', value: 'other' },
    ],
  },
]

const Page = () => {
  return (
    <Layout.Body title="Form Pendaftaran">
      <ActionForm
        formFields={formFields}
        table={'bansos_members' as any}
        type="create"
      />
    </Layout.Body>
  )
}

export default Page

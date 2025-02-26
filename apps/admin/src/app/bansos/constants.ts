import type { FieldData } from '@client/ui-components'

export const socialAssistance = [
  { label: 'PKH', value: 'pkh' },
  { label: 'BPNT', value: 'bpnt' },
  { label: 'BLT', value: 'blt' },
  { label: 'Bansos Lainnya', value: 'other' },
]

export const maritalStatus = [
  { label: 'Belum Menikah', value: 'single' },
  { label: 'Menikah', value: 'married' },
  { label: 'Cerai', value: 'divorced' },
]

export const education = [
  { label: 'Tidak Sekolah', value: 'none' },
  { label: 'SD', value: 'sd' },
  { label: 'SMP', value: 'smp' },
  { label: 'SMA', value: 'sma' },
  { label: 'Perguruan Tinggi', value: 'college' },
]

export const houseStatus = [
  { label: 'Milik Sendiri', value: 'owned' },
  { label: 'Kontrak', value: 'rented' },
  { label: 'Menumpang', value: 'staying_with_family' },
]

export const bansosMembersFormFields: FieldData[] = [
  {
    name: 'full_name',
    label: 'Nama Lengkap',
    type: 'text',
    rules: { required: 'Nama Lengkap wajib diisi' },
  },
  {
    name: 'whatsapp_number',
    label: 'Nomor WhatsApp',
    type: 'phone',
    rules: { required: 'Nomor WhatsApp wajib diisi' },
  },
  {
    name: 'birth_place',
    label: 'Tempat Lahir',
    type: 'text',
    rules: { required: 'Tempat Lahir wajib diisi' },
  },
  {
    name: 'birth_date',
    label: 'Tanggal Lahir',
    type: 'date',
    rules: { required: 'Tanggal Lahir wajib diisi' },
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
    options: maritalStatus,
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
    options: education,
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
    rules: { required: 'Isi penghasilan' },
  },
  {
    name: 'dependents',
    label: 'Jumlah Tanggungan',
    type: 'number',
    rules: { required: 'Isi jumlah tanggungan' },
  },
  {
    name: 'house_status',
    label: 'Status Tempat Tinggal',
    type: 'select',
    options: houseStatus,
    rules: { required: 'Pilih status tempat tinggal' },
  },
  {
    name: 'social_assistance',
    label: 'Bantuan Sosial yang Pernah Diterima',
    type: 'checkbox',
    options: socialAssistance,
  },
  {
    name: 'avatar',
    label: 'Foto Profil',
    type: 'upload',
  },
  {
    name: 'organization_id',
    type: 'organization_id',
  },
]

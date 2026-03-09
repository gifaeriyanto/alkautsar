import type { FieldData } from '@client/ui-components'

interface WalletOption {
  label: string
  value: string
}

export const boardConfigsFormFields: FieldData[] = [
  {
    name: 'location_name',
    label: 'Nama Lokasi',
    type: 'text',
    rules: { required: 'Nama lokasi wajib diisi' },
  },
  {
    name: 'city_id',
    label: 'ID Kota (MyQuran API)',
    type: 'text',
    rules: { required: 'ID kota wajib diisi' },
    info: 'ID kota untuk API jadwal shalat dari MyQuran',
  },
  {
    name: 'fajr_iqomah_offset',
    label: 'Offset Iqomah Subuh (menit)',
    type: 'number',
    rules: { required: 'Offset iqomah subuh wajib diisi' },
  },
  {
    name: 'dhuhr_iqomah_offset',
    label: 'Offset Iqomah Dzuhur (menit)',
    type: 'number',
    rules: { required: 'Offset iqomah dzuhur wajib diisi' },
  },
  {
    name: 'asr_iqomah_offset',
    label: 'Offset Iqomah Ashar (menit)',
    type: 'number',
    rules: { required: 'Offset iqomah ashar wajib diisi' },
  },
  {
    name: 'maghrib_iqomah_offset',
    label: 'Offset Iqomah Maghrib (menit)',
    type: 'number',
    rules: { required: 'Offset iqomah maghrib wajib diisi' },
  },
  {
    name: 'isha_iqomah_offset',
    label: 'Offset Iqomah Isya (menit)',
    type: 'number',
    rules: { required: 'Offset iqomah isya wajib diisi' },
  },
  {
    name: 'slide_duration_seconds',
    label: 'Durasi Slide (detik)',
    type: 'number',
    rules: { required: 'Durasi slide wajib diisi' },
  },
  {
    name: 'selected_wallet_ids',
    label: 'Wallet Ditampilkan di Shalat Board',
    type: 'checkbox',
    info: 'Jika tidak ada yang dipilih, semua wallet tetap ditampilkan.',
    options: [],
  },
  {
    name: 'financial_summary_period',
    label: 'Periode Ringkasan Keuangan',
    type: 'select',
    options: [
      { label: 'Jumat ke Jumat', value: 'weekly_friday_to_friday' },
      { label: 'Hari Ini', value: 'daily_today' },
    ],
    info: 'Pilih periode perhitungan untuk ringkasan keuangan di board.',
  },
  {
    name: 'organization_id',
    label: 'Organization',
    type: 'organization_id',
  },
]

export const getBoardConfigsFormFields = (
  walletOptions: WalletOption[]
): FieldData[] =>
  boardConfigsFormFields.map((field) =>
    field.name === 'selected_wallet_ids'
      ? {
          ...field,
          options: walletOptions,
        }
      : field
  )

export const boardSlidesFormFields: FieldData[] = [
  {
    name: 'title',
    label: 'Judul Slide',
    type: 'text',
  },
  {
    name: 'description',
    label: 'Deskripsi',
    type: 'textarea',
  },
  {
    name: 'image_url',
    label: 'Gambar Slide',
    type: 'upload',
  },
  {
    name: 'display_order',
    label: 'Urutan Tampil',
    type: 'number',
  },
  {
    name: 'is_active',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Aktif', value: true },
      { label: 'Tidak Aktif', value: false },
    ],
  },
  {
    name: 'organization_id',
    type: 'organization_id',
  },
]

import type { FieldData } from '@client/ui-components'

export const walletsFormFields: FieldData[] = [
  {
    name: 'name',
    label: 'Nama Wallet',
    type: 'text',
    rules: { required: 'Nama Wallet wajib diisi' },
  },
  {
    name: 'organization_id',
    type: 'organization_id',
  },
]
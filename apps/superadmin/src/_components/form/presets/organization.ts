import type { FormGeneratorProps } from '@client/ui-components'

export const SUB_ORGANIZATION_FORM: FormGeneratorProps['data'] = [
  {
    name: 'name',
    label: 'Nama Sub Organisasi',
    type: 'text',
    rules: {
      required: 'Mohon diisi',
    },
  },
]

export const SUB_ORGANIZATION_MEMBER_FORM: FormGeneratorProps['data'] = [
  {
    name: 'users',
    type: 'select_multiple_users',
    options: [
      { label: 'Anggota', value: 'member' },
      { label: 'Admin', value: 'admin' },
    ],
  },
]

export const SUB_ORGANIZATION_MEMBER_ROLE_FORM: FormGeneratorProps['data'] = [
  {
    label: 'Posisi',
    name: 'role',
    type: 'select',
    options: [
      { label: 'Super Admin', value: 'superadmin' },
      { label: 'Admin', value: 'admin' },
      { label: 'Anggota', value: 'member' },
    ],
    rules: {
      required: 'Mohon diisi',
    },
  },
  {
    label: 'Sub organisasi',
    name: 'organization_id',
    type: 'asyncList',
    tableName: 'organizations',
    rules: {
      required: 'Mohon diisi',
    },
  },
]

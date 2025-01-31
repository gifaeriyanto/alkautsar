export interface SignUpPayload {
  full_name: string
  email: string
  password: string
  confirm_password: string
}

export enum AccountRole {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  Member = 'anggota',
}

export interface UserMetadata {
  role: AccountRole
}

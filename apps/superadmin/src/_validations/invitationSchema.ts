import { array, object, string } from 'yup'

export const batchInvitationSchema = object({
  invitations: array()
    .required()
    .of(
      object({
        email: string().required('Email is a required field'),
      })
    ),
})

export const batchAdminInvitationSchema = object({
  invitations: array()
    .required()
    .of(
      object({
        email: string()
          .email('It must be an email')
          .required('Email is a required field'),
        full_name: string().required('Full name is a required field'),
      })
    ),
})

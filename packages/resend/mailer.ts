const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

export interface MailerProps {
  from: string
  to: string
  subject: string
  body: string
}

export const deliver = async (mailerProps: MailerProps) => {
  const { from, to, subject, body } = mailerProps

  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html: body,
    }),
  })
}

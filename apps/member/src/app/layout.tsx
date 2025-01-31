import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Provider from './provider'

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'Logo',
  description: 'Wahdah Islamiyah',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  authors: [
    { name: 'Gifa Eriyanto' },
    {
      name: 'Gifa Eriyanto',
      url: 'https://www.linkedin.com/in/gifa-eriyanto-8b740a100/',
    },
  ],
  icons: [
    { rel: 'apple-touch-icon', url: 'images/icons/icon-128x128.png' },
    { rel: 'icon', url: 'images/icons/icon-128x128.png' },
  ],
}

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) => {
  return (
    <html lang={locale}>
      <body className={noto.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

export default RootLayout

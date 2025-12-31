import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'Masjid Al-Kautsar CitraLand Tallasa City',
  description:
    'Selamat datang di website resmi Masjid Al-Kautsar CitraLand Tallasa City. Pusat kegiatan ibadah dan dakwah untuk umat muslim di CitraLand Tallasa City.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: [
    'masjid',
    'al-kautsar',
    'citraland',
    'tallasa',
    'city',
    'ibadah',
    'islam',
    'dakwah',
    'komunitas',
    'sholat',
    'quran',
    'pendidikan islam',
    'makassar',
  ],
  authors: [
    { name: 'Gifa Eriyanto' },
    {
      name: 'Gifa Eriyanto',
      url: 'https://www.linkedin.com/in/gifa-eriyanto-8b740a100/',
    },
  ],
  icons: [
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'icon', url: '/favicon-32x32.png' },
  ],
  openGraph: {
    title: 'Masjid Al-Kautsar CitraLand Tallasa City',
    description:
      'Pusat kegiatan ibadah dan dakwah untuk umat muslim di CitraLand Tallasa City.',
    url: 'https://member.alkautsar.com',
    siteName: 'Masjid Al-Kautsar',
    images: [
      {
        url: '/images/mosque.jpeg',
        width: 1200,
        height: 630,
        alt: 'Masjid Al-Kautsar CitraLand Tallasa City',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

export default RootLayout

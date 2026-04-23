import type { Metadata } from 'next'
import { Josefin_Sans, Raleway, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mahamudul Hasan Rasel — Full-stack Developer',
  description:
    'Full-stack developer building production web and mobile products. Frontend, backend, database, DevOps — one engineer, the whole pipeline.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} ${raleway.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}

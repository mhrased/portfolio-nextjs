import type { Metadata } from 'next'
import { Josefin_Sans, Raleway, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { getSiteData } from '@/lib/data.server'
import './globals.css'

export const dynamic = 'force-dynamic'

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
  const { gaId } = getSiteData()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}else if(!t&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()` }} />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`}</Script>
          </>
        )}
      </head>
      <body className={`${josefinSans.variable} ${raleway.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}

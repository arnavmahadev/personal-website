import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Libre_Baskerville, Lora, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arnav Mahadev',
  description:
    'EECS student at UC Berkeley. I build full-stack tools and data-driven products that make complex systems more usable.',
  openGraph: {
    title: 'Arnav Mahadev',
    description:
      'EECS student at UC Berkeley. Full-stack developer with experience in backend systems and data pipelines.',
    type: 'website',
    images: [{ url: 'https://arnavmaha.dev/avatar.jpg' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${libreBaskerville.variable} ${lora.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <meta name="format-detection" content="telephone=no, address=no, email=no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">{children}<Analytics /><SpeedInsights /></body>
    </html>
  )
}

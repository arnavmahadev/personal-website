import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Fraunces, Newsreader, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

// To change the site's type, swap the fonts here; the rest of the site only sees the three variables.
const bodyFont = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: false,
})

const displayFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
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
    <html lang="en" className={`scroll-smooth ${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
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

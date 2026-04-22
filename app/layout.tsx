import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arnav Mahadev — Software Engineer',
  description:
    'EECS student at UC Berkeley. I build full-stack tools and data-driven products that make complex systems more usable.',
  openGraph: {
    title: 'Arnav Mahadev — Software Engineer',
    description:
      'EECS student at UC Berkeley. Full-stack developer with experience in backend systems, data pipelines, and product engineering.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}

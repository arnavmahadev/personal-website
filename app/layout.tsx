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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  )
}

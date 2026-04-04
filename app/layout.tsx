import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hardeep.cv'),
  title: 'Hardeep Singh',
  description: 'Chemical Engineer @ IIT Delhi → building AI products that turn messy real-world data into usable systems.',
  openGraph: {
    title: 'Hardeep Singh',
    description: 'Chemical Engineer @ IIT Delhi → building AI products that turn messy real-world data into usable systems.',
    images: [{ url: '/assets/hero.jpg' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='26' font-size='28' font-family='serif' fill='%23C8956C'>H</text></svg>"
        />
      </head>
      <body className="bg-page-bg font-inter text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}

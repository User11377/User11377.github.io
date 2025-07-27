import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata = {
  title: 'Johannes Mayer - Full Stack Developer',
  description: 'Leidenschaftlicher Programmierer und Schüler an der HTL Perg. Spezialisiert auf moderne Webtechnologien, KI und Softwareentwicklung.',
  keywords: 'Johannes Mayer, Developer, Programmierer, HTL Perg, React, Next.js, Python, AI',
  authors: [{ name: 'Johannes Mayer' }],
  creator: 'Johannes Mayer',
  openGraph: {
    title: 'Johannes Mayer - Full Stack Developer',
    description: 'Leidenschaftlicher Programmierer und Schüler an der HTL Perg',
    url: 'https://user11377.github.io',
    siteName: 'Johannes Mayer Portfolio',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

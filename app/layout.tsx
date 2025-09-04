import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luxe Fashion Boutique - Premium Designer Fashion',
  description: 'Discover luxury fashion pieces from renowned designers. Shop curated collections of dresses, handbags, shoes, and accessories.',
  keywords: 'luxury fashion, designer clothes, high-end fashion, premium accessories, designer handbags, elegant dresses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
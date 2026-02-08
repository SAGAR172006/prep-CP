import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prep CP - Free Coding Practice Platform',
  description: 'Gamified coding practice platform with AI assistance, built entirely on free-tier services',
  keywords: ['coding', 'practice', 'interview prep', 'competitive programming', 'free'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

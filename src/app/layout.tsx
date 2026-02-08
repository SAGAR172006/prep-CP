import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/shared/Providers';

export const metadata: Metadata = {
  title: 'Prep-CP - Gamified Coding Practice Platform',
  description: 'Master coding interviews with gamified practice, AI assistance, and competitive programming',
  keywords: ['coding', 'interview prep', 'algorithms', 'data structures', 'competitive programming'],
  authors: [{ name: 'Prep-CP Team' }],
  openGraph: {
    title: 'Prep-CP - Gamified Coding Practice Platform',
    description: 'Master coding interviews with gamified practice',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

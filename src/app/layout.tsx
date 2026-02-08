import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepCP - Gamified Coding Practice Platform",
  description: "Master coding interviews with our gamified practice platform featuring leagues, challenges, and AI-powered assistance.",
  keywords: ["coding", "practice", "interview", "programming", "algorithms", "data structures"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

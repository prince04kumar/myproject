import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  Providers  from "./providers";
import { Playfair_Display } from 'next/font/google'

export const metadata: Metadata = {
  title: "Digitalcube",
  description: "Made by Prince Kumar",
  icons: {
    icon: [
      { url: '/digitalCube.ico', sizes: 'any' },
      { url: '/digitalCube.png', type: 'image/png' }
    ],
  },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={playfair.className}>
      <head>
  {/* Make sure the path is correct and the file exists in the public folder */}
  <link rel="icon" href="/digitalCube.png" />
</head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     
     <Providers>{children}</Providers>
        
      </body>
    </html>
  );
}

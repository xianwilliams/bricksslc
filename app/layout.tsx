import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Motion } from '@/components/motion';
import { site } from '@/lib/site';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bricksslc.com'),
  icons: { icon: '/brand/logo.png' },
  title: { default: site.title, template: '%s | BRICKS' },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BRICKS',
    title: site.title,
    description: site.description,
    images: [{ url: '/media/hero-poster.jpg', width: 1600, height: 900 }],
  },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#10100f',
  viewportFit: 'cover',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}

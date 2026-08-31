import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RazorpayScript from '@/components/RazorpayScript';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Mastered English Speaking Challenge | 32 Challenges • ₹300 Back',
  description:
    'Accept the Mastered English Speaking Challenge. Complete 32 speaking challenges within 2 months, build a consistent English-practice habit and earn ₹300 back after eligible successful completion.',
  keywords: [
    'Mastered Language Coach',
    'English Speaking Challenge',
    'Malayalam to English',
    'Hindi to English',
    '32 Speaking Challenges',
    '2 Month Habit Challenge',
    'Speak With Confidence',
    'AI English Coach',
  ],
  authors: [{ name: 'Mastered Language Coach' }],
  openGraph: {
    title: 'Mastered English Speaking Challenge | 32 Challenges • ₹300 Back',
    description:
      'Accept the Mastered English Speaking Challenge. Complete 32 speaking challenges within 2 months, build a consistent English-practice habit and earn ₹300 back after eligible successful completion.',
    url: 'https://masteredlanguagecoach.com',
    siteName: 'Mastered Language Coach',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Mastered Language Coach Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mastered English Speaking Challenge | 32 Challenges • ₹300 Back',
    description:
      'Accept the Mastered English Speaking Challenge. Complete 32 speaking challenges within 2 months, build a consistent English-practice habit and earn ₹300 back.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-brand-500 selection:text-white">
        {children}
        <RazorpayScript />
      </body>
    </html>
  );
}

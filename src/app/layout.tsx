import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RazorpayScript from '@/components/RazorpayScript';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Mastered Language Coach Speaking Challenge | Speak With Confidence',
  description:
    'Build your English speaking confidence with the Mastered Language Coach Speaking Challenge. Choose Malayalam to English or Hindi to English and start practicing.',
  keywords: [
    'Mastered Language Coach',
    'Speaking Challenge',
    'Speak With Confidence',
    'Malayalam to English',
    'Hindi to English',
    'English Speaking Course',
    'Fluent English Practice',
  ],
  authors: [{ name: 'Mastered Language Coach' }],
  openGraph: {
    title: 'Mastered Language Coach Speaking Challenge | Speak With Confidence',
    description:
      'Build your English speaking confidence with the Mastered Language Coach Speaking Challenge. Choose Malayalam to English or Hindi to English and start practicing.',
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
    title: 'Mastered Language Coach Speaking Challenge',
    description: 'Speak English with confidence. Choose Malayalam to English or Hindi to English.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-white selection:bg-brand-500 selection:text-white">
        <RazorpayScript />
        {children}
      </body>
    </html>
  );
}

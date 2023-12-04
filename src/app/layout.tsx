import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Client, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tex',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

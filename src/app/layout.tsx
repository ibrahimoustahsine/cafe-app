import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import UrqlWrapper from './wrapper';

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
      <body className={inter.className}>
        <UrqlWrapper> {children}</UrqlWrapper>
      </body>
    </html>
  );
}

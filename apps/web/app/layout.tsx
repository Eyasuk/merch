import React from 'react';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { CommonLayout } from 'components/layouts/common';
import './global.css';

export const metadata = {
  title: 'Welcome to lebes',
  description: 'lebes offical site',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <CommonLayout>{children}</CommonLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

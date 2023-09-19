import React from 'react';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../../web/lib/AntdRegistry';
import { CommonLayout } from 'components/layouts/common';
import { AuthProvider } from 'components/utils/contexts/auth';

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
      <StyledComponentsRegistry>
        <body className={inter.className}>
          <AuthProvider>
            <CommonLayout>{children}</CommonLayout>
          </AuthProvider>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}

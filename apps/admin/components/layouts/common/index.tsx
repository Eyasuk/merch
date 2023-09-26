'use client';
import { usePathname } from 'next/navigation';
import { ConfigProvider, Layout } from 'antd';
import { theme } from '@merch/shared';

import styles from './common_layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const { Header, Content, Footer } = Layout;

export function CommonLayout({ children }: Props): JSX.Element {
  const pathname = usePathname();

  return (
    <ConfigProvider theme={theme}>
      <Layout className={styles.body}>
        {pathname !== '/signin' && pathname !== '/signup' ? (
          <>
            <Content>{children}</Content>
          </>
        ) : (
          <Content>{children}</Content>
        )}
      </Layout>
    </ConfigProvider>
  );
}

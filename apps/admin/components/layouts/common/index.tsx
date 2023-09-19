'use client';
import { usePathname } from 'next/navigation';
import { ConfigProvider, Layout } from 'antd';
// import theme from 'theme/themeConfig';

import styles from './common_layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const { Header, Content, Footer } = Layout;

export function CommonLayout({ children }: Props): JSX.Element {
  const pathname = usePathname();

  return (
    <ConfigProvider>
      <Layout className={styles.body}>
        {pathname !== '/signin' && pathname !== '/signup' ? (
          <>
            <Content>{children}</Content>
          </>
        ) : (
          children
        )}
      </Layout>
    </ConfigProvider>
  );
}

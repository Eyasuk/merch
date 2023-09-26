'use client';
import { usePathname } from 'next/navigation';
import { ConfigProvider, Layout } from 'antd';
import { theme } from '@merch/shared';
import FooterModule from 'components/features/footer';
import HeaderModule from 'components/features/header';

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
        <>
          <Header className={styles.header} children={<HeaderModule />} />
          <Content>{children}</Content>
          <Footer>
            <FooterModule />
          </Footer>
        </>
        : ( children )
      </Layout>
    </ConfigProvider>
  );
}

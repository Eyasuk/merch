'use client';
import { ConfigProvider, Layout } from 'antd';
import theme from 'theme/themeConfig';
import FooterModule from 'components/modules/footer';
import HeaderModule from 'components/modules/header';

import styles from './common_layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const { Header, Content, Footer } = Layout;

export function CommonLayout({ children }: Props): JSX.Element {
  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Header className={styles.header} children={<HeaderModule />} />
        <Content>{children}</Content>
        <Footer>
          <FooterModule />
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

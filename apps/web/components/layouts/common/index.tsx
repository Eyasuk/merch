'use client';

import { ConfigProvider, Layout } from 'antd';
import FooterModule from 'components/modules/footer';
import theme from 'theme/themeConfig';
import styles from './common_layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const { Header, Content, Footer } = Layout;

export function CommonLayout({ children }: Props): JSX.Element {
  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Header className={styles.header}>s</Header>
        <Content>{children}</Content>
        <Footer>
          <FooterModule />
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

import { ConfigProvider } from 'antd';
import theme from 'theme/themeConfig';

type Props = {
  children: React.ReactNode;
};

export function CommonLayout({ children }: Props): JSX.Element {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}

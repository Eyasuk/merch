import { ThemeConfig, theme as antdTheme } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#22A39F',
    colorBgContainer: '#fffff',
  },
  // algorithm: antdTheme.darkAlgorithm,
  algorithm: antdTheme.defaultAlgorithm,
};

export default theme;

'use client';
import { ThemeConfig, theme as antdTheme } from 'antd';

export const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#22A39F',
    fontFamily: 'Roboto',
  },
  // algorithm: antdTheme.darkAlgorithm,
  algorithm: antdTheme.defaultAlgorithm,
};

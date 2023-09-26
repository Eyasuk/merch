'use client';
import { Typography } from 'antd';
import React from 'react';

import styles from './antd-text.module.scss';

const {
  Title: AntdTitle,
  Text: AntdText,
  Link: AntdLink,
  Paragraph: AntdParagraph,
} = Typography;

export function Title({ ...props }: any) {
  return <AntdTitle {...props} />;
}

export function Text({ ...props }: any) {
  return <AntdText {...props} />;
}

export function Link({ ...props }: any) {
  return <AntdLink {...props} />;
}

export function Paragraph({ ...props }: any) {
  return <AntdParagraph {...props} />;
}

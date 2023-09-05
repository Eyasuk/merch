'use client';
import { Typography } from 'antd';

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

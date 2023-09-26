import React from 'react';
import { render } from '@testing-library/react';

import { Link, Paragraph, Text, Title } from './antd-text';

describe('AntdText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Text />);
    expect(baseElement).toBeTruthy();
  });
});

describe('AntdParagraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Paragraph />);
    expect(baseElement).toBeTruthy();
  });
});

describe('AntdLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Link />);
    expect(baseElement).toBeTruthy();
  });
});

describe('AntdTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Title />);
    expect(baseElement).toBeTruthy();
  });
});

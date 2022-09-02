import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { ArticleCounter } from './ArticleCounter';

describe('ArticleCounter', () => {
  test('render component', () => {
    render(<ArticleCounter count={3} />);
    expect(screen.getByText(`記事の字数: 3文字`)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { ArticleCounter } from './ArticleCounter';

describe('ArticleCounter', () => {
  test('render component', () => {
    render(<ArticleCounter count={7543} />);
    expect(screen.getByText(7543)).toBeInTheDocument();
  });
});

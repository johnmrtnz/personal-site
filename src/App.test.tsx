import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  render(<App />);
  const heading = screen.getByText(/Hello, I'm/i);
  expect(heading).toBeInTheDocument();
});

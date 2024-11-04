// app/page.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Adds custom matchers like toBeInTheDocument
import Home from '../app/page'; // Adjust the import path based on your folder structure

describe('Home component', () => {
  it('renders correctly with static title', () => {
    render(<Home />); // Render the Home component

    // Assertions to check if elements are in the document
    expect(screen.getByText('hello')).toBeInTheDocument(); // Check for the static title
    expect(screen.getByText('We are building a SaaS application')).toBeInTheDocument();
  });
});

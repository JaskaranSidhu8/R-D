import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  // Provides extra matchers for DOM testing
import Home from '../app/page';  // Import the Home component

// A basic test to check if the Home component renders
describe('Home Component', () => {
  it('renders the Home component with correct heading and paragraphs', () => {
    // Render the Home component
    render(<Home />);

    // Assert that the heading is rendered correctly
    const heading = screen.getByText('Welcome to the R&D Project!');
    expect(heading).toBeInTheDocument();

    // Assert that the paragraph is rendered correctly
    const paragraph1 = screen.getByText('This is a simple page rendered on the client side.');
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText('This is a simple page rendered on the client side 2.');
    expect(paragraph2).toBeInTheDocument();
  });
});

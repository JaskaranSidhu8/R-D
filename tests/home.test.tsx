// app/page.test.tsx
import React from 'react'; // Import React to avoid the UMD global warning
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // This adds custom matchers like toBeInTheDocument
import Home from '../app/page'; // Adjust the import path based on your folder structure

describe('Home component', () => {
  it('renders correctly', () => {
    render(<Home />); // Render the Home component

    // Assertions to check if the elements are in the document
    expect(screen.getByText('Welcome to the R&D Project!')).toBeInTheDocument();
    expect(screen.getByText('Pula in cur')).toBeInTheDocument();
    expect(screen.getByText('MUIE DINAMO! MUIE RAPID!')).toBeInTheDocument();
  });
});

// tests/home.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page'; // Adjust the import path based on your folder structure
import About from '../app/about'; // Assuming you have an About component

// Mock the next/router module
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home component', () => {
  it('renders correctly with static title', () => {
    render(<Home />); // Render the Home component

    // Assertions to check if elements are in the document
    expect(screen.getByText('hello')).toBeInTheDocument(); // Check for the static title
    expect(screen.getByText('We are building a SaaS application')).toBeInTheDocument(); // Check for the description
  });

  it('navigates to the About Us page', () => {
    render(<Home />); // Render the Home component

    // Simulate clicking the link to navigate to About Us
    const link = screen.getByText('Go to About Us'); 
    fireEvent.click(link);

    // Render the About component to check its content
    render(<About />); 

    // Assertions to verify that the About page content is now rendered
    expect(screen.getByText('About Us')).toBeInTheDocument(); // Check for the About Us title
    expect(screen.getByText('We provide innovative solutions for businesses.')).toBeInTheDocument(); // Check for the description
  });

  it('displays a message when the button is clicked', () => {
    render(<Home />); // Render the Home component

    // Initially, the message should not be visible
    expect(screen.queryByText(/here is your message/i)).toBeNull();

    // Click the button to show the message
    fireEvent.click(screen.getByText(/toggle message/i));

    // Now the message should be visible
    expect(screen.getByText(/here is your message/i)).toBeInTheDocument();

    // Click the button again to hide the message
    fireEvent.click(screen.getByText(/toggle message/i));

    // Now the message should not be visible again
    expect(screen.queryByText(/here is your message/i)).toBeNull();
  });
});

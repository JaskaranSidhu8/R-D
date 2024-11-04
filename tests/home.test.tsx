// tests/home.test.tsx
import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom'; 
import Home from '../app/page'; 
import About from '../app/about'; 

// Mock the next/router module
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home component', () => {
  it('renders correctly with static title', () => {
    render(<Home />); 

    expect(screen.getByText('hello')).toBeInTheDocument(); 
    expect(screen.getByText('We are building a SaaS application')).toBeInTheDocument(); 
  });

  it('navigates to the About Us page', () => {
    render(<Home />); // Render the Home component

    // Click the link to navigate to About Us
    const link = screen.getByText('Go to About Us'); 
    fireEvent.click(link);

    // Render the About component to check its content
    render(<About />); 

    // Assert that the About page content is now rendered
    expect(screen.getByText('About Us')).toBeInTheDocument(); 
    expect(screen.getByText('We provide innovative solutions for businesses.')).toBeInTheDocument(); 
  });
});

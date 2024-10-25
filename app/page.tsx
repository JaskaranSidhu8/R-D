'use client'
import React from 'react';

// Use environment variables to set the title based on the environment
const Home: React.FC = () => { 
  const appTitle = process.env.NEXT_PUBLIC_APP_TITLE; // Get the title from the environment variable

  return (
    <div className='flex items-center justify-center min-h-screen shadow-ml bg-gray-200'>
      <h1 className="text-3xl text-red bg-red-900">{appTitle}</h1> {/* Display title based on environment */}
      {/* Additional static content */}
      <p>We are building a SaaS application</p>
    </div>
  );
};

export default Home;


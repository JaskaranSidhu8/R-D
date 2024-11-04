'use client'
import React from 'react';

const Home: React.FC = () => { 
  const appTitle = "hello"; // Use a static title instead of an environment variable

  return (
    <div className='flex items-center justify-center min-h-screen shadow-ml bg-gray-200'>
      <h1 className="text-3xl text-red bg-red-900">{appTitle}</h1> {/* Display static title */}
      {/* Additional static content */}
      <p>We are building a SaaS application</p>
    </div>
  );
};

export default Home;

// app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js

const Home: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false); // State to manage message visibility
  const appTitle = "hello"; // Use a static title instead of an environment variable

  const handleButtonClick = () => {
    setShowMessage(!showMessage); // Toggle the message visibility
  };

  return (
    <div className='flex items-center justify-center min-h-screen shadow-ml bg-gray-200'>
      <h1 className="text-3xl text-red bg-red-900">{appTitle}</h1>
      <p>We are building a SaaS application</p>
      <p> Testing vercel deployment on dev branch.</p>
      
      {/* Button to toggle the message */}
      <button 
        onClick={handleButtonClick} 
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Toggle Message
      </button>
      
      {/* Conditionally render the message */}
      {showMessage && <p className="mt-2">Here is your message!</p>}

      {/* Navigation link to the About Us page */}
      <Link href="/about" className="text-blue-500 mt-4">
        Go to About Us
      </Link>
    </div>
  );
};

export default Home;

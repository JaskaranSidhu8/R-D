// app/page.tsx
'use client'; 
import React from 'react'; 
import Link from 'next/link';

const Home: React.FC = () => { 
  const appTitle = "hello"; 

  return ( 
    <div className='flex items-center justify-center min-h-screen shadow-ml bg-gray-200'> 
      <h1 className="text-3xl text-red bg-red-900">{appTitle}</h1> 
      <p>We are building a SaaS application</p> 
      {/* Link to the About page without a nested <a> */} 
      <Link href="/about" className="text-blue-500"> 
        Go to About Us 
      </Link> 
    </div> 
  ); 
};

export default Home;

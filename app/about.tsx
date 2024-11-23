// app/about.tsx
"use client";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl text-red bg-red-900">About Us</h1>
      <p>We provide innovative solutions for businesses.</p>
    </div>
  );
};

export default About;

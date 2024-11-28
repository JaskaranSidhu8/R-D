"use client";

import React from "react";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return (
    <div className="flex justify-center w-full min-h-screen px-4 py-8">
      <div className="w-full max-w-md mx-auto">{children}</div>
    </div>
  );
};

export default ScreenWrapper;

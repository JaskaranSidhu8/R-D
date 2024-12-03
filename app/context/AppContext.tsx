'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

// Type definition for the context value
interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
  logout: () => void;
}

// Create the context with a default value of `undefined`
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to store the user's email
  const [email, setEmail] = useState<string>('');

  // Logout function that clears the email state
  const logout = () => {
    setEmail(''); // Clear the email when logging out
  };

  return (
    <AuthContext.Provider value = {{ email, setEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

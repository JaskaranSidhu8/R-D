"use client";

import React, { createContext, useState, ReactNode } from "react";

// Type for context value
interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize email state
  const [email, setEmail] = useState<string>("");

  // Logout function that clears email from state
  const logout = () => {
    setEmail(""); // Clear the email from state
  };

  // Return the context provider
  return (
    <AuthContext.Provider value={{ email, setEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

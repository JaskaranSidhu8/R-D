"use client";

import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { getUserAvatarUrl } from "@/actions/avatarfunctions";
import { fetchAccountDetails } from "@/actions/functions";

interface UserContextType {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("/defaultAvatar.jpg");
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserData = async () => {
    try {
      setIsLoading(true);
      const [accountDetails, userAvatarUrl] = await Promise.all([
        fetchAccountDetails(),
        getUserAvatarUrl(),
      ]);

      setFirstName(accountDetails.firstName || "");
      setLastName(accountDetails.lastName || "");
      if (userAvatarUrl) {
        setAvatarUrl(userAvatarUrl);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        firstName,
        lastName,
        avatarUrl,
        isLoading,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

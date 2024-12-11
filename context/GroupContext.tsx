"use client";

import React from "react";
import { createContext, useContext, useState } from "react";

interface GroupContextType {
  groupId: number | null;
  groupCode: string;
  groupName: string;
  setGroupId: (id: number) => void;
  setGroupCode: (code: string) => void;
  setGroupName: (name: string) => void;
  clearGroupData: () => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: React.ReactNode }) {
  const [groupId, setGroupId] = useState<number | null>(null);
  const [groupCode, setGroupCode] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");

  const clearGroupData = () => {
    setGroupId(null);
    setGroupCode("");
    setGroupName("");
  };

  return (
    <GroupContext.Provider
      value={{
        groupId,
        groupCode,
        groupName,
        setGroupId,
        setGroupCode,
        setGroupName,
        clearGroupData,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export function useGroup() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
}

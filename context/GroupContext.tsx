"use client";

import React from "react";
import { createContext, useContext, useState } from "react";

interface GroupContextType {
  contextGroupId: number | null;
  groupCode: string;
  groupName: string;
  setContextGroupId: (id: number) => void;
  setGroupCode: (code: string) => void;
  setGroupName: (name: string) => void;
  clearGroupData: () => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: React.ReactNode }) {
  const [contextGroupId, setContextGroupId] = useState<number | null>(null);
  const [groupCode, setGroupCode] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");

  const clearGroupData = () => {
    setContextGroupId(null);
    setGroupCode("");
    setGroupName("");
  };

  return (
    <GroupContext.Provider
      value={{
        contextGroupId,
        groupCode,
        groupName,
        setContextGroupId,
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

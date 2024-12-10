import React from "react";
import { createContext, useContext, useState } from "react";

// Define types for our bit strings
interface BitStrings {
  cuisine_preferences: string;
  soft_constraints: string;
  budget: string;
}

// Define what our context will provide
interface QuizContextType {
  bitStrings: BitStrings;
  groupId: number | null;
  updateBitStrings: (field: keyof BitStrings, value: string) => void;
  setGroupId: (id: number) => void;
}

// Create the context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// the provider component
export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [bitStrings, setBitStrings] = useState<BitStrings>({
    cuisine_preferences: "0000000000000",
    soft_constraints: "000000000",
    budget: "000000",
  });
  const [groupId, setGroupId] = useState<number | null>(null);

  const updateBitStrings = (field: keyof BitStrings, value: string) => {
    setBitStrings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <QuizContext.Provider
      value={{ bitStrings, updateBitStrings, groupId, setGroupId }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// Create a custom hook to use the context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

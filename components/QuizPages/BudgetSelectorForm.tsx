"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "../ui/slider";
import SectionTitle from "../static/SectionTitle";
import Link from "next/link";
import { useQuiz } from "@/context/QuizContext";
import { updateUserConstraints } from "@/utils/updateUserConstraints";

const BudgetSelectorForm = () => {
  const [range, setRange] = useState([20, 40]);
  const { bitStrings, updateBitStrings, groupId } = useQuiz();
  const [currentBudgetBitString, setCurrentBudgetBitString] = useState("");

  const getBudgetBitString = (max: number): string => {
    // Map the max value to a budget bit string
    if (max === 0) return "010000"; // Free
    if (max < 20) return "001000"; // Inexpensive
    if (max < 40) return "000100"; // Moderate
    if (max < 60) return "000010"; // Expensive
    if (max <= 100) return "000001"; // Very Expensive
    return "100000"; // Fallback, should not occur
  };

  useEffect(() => {
    const budgetBitString = getBudgetBitString(range[1]); // Use the upper range value

    // Only update context if the value changes
    if (budgetBitString !== currentBudgetBitString) {
      setCurrentBudgetBitString(budgetBitString);
      updateBitStrings("budget", budgetBitString);
      console.log("Updated budget bit string:", budgetBitString);
    }
  }, [range]);

  const handleRangeChange = (values: number[]) => {
    setRange(values);
  };

  const handleSubmit = async () => {
    //const userId = 6; // testing wiht hard coded values for now, replace later
    //const groupId = 3;
    const { soft_constraints, cuisine_preferences, budget } = bitStrings;

    if (!groupId) {
      console.error("No group ID found in context");
      return;
    }

    try {
      console.log(
        "Attempting to update user constraints with the following values:",
      );
      console.log("Group ID:", groupId); // Log the group ID
      console.log("Soft Constraints:", soft_constraints); // Log soft constraints
      console.log("Cuisine Preferences:", cuisine_preferences); // Log cuisine preferences
      console.log("Budget:", budget); // Log budget constraints
      await updateUserConstraints(
        //userId,
        //parseInt(groupId),
        groupId, //gotten from context now
        soft_constraints,
        cuisine_preferences,
        budget,
      );
      console.log("User constraints updated successfully");
    } catch (error) {
      console.error("Failed to update user constraints:", error);
    }
  };

  return (
    <div className="w-full">
      <SectionTitle text="What's your budget?" classname=" mt-2 mb-8" />

      <div className="mb-12">
        <Slider
          defaultValue={[20, 40]}
          min={0}
          max={100}
          step={1}
          value={range}
          onValueChange={handleRangeChange}
          className="my-8"
        />

        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm text-gray-600">From:</p>
            <p className="text-lg font-medium">€ {range[0]}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">To:</p>
            <p className="text-lg font-medium">€ {range[1]}</p>
          </div>
        </div>
      </div>
      <Link href="/Completed">
        <Button onClick={handleSubmit}>Next</Button>
      </Link>
    </div>
  );
};

export default BudgetSelectorForm;

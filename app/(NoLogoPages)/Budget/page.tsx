"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import BudgetSelectorForm from "@/components/QuizPages/BudgetSelectorForm";

const Budget = () => {
  return (
    <div>
      <QuizHeader progress={70} />
      <div className="flex justify-center mt-6">
        <BudgetSelectorForm />
      </div>
    </div>
  );
};

export default Budget;

"use client";

import React from "react";
import BudgetSelectorForm from "../../../components/QuizPages/BudgetSelectorForm";
import QuizHeader from "../../../components/QuizPages/QuizHeader"


const QuizQuestionPage = () => { 
    return (
      <div>
        <QuizHeader progress={33} />
        <div className="flex justify-center mt-6">
          <BudgetSelectorForm />
        </div>
      </div>
    )
  }

export default QuizQuestionPage;
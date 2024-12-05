"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import DrinksForm from "@/components/QuizPages/DrinksForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const Drinks = () => {
  return (
    <div>
      <QuizHeader progress={50} />
      <QuizTransition>
        <div className="flex justify-center">
          <DrinksForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default Drinks;

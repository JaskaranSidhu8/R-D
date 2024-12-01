"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import DrinksForm from "@/components/QuizPages/DrinksForm";

const Drinks = () => {
  return (
    <div>
      <QuizHeader progress={50} />
      <div className="flex justify-center">
        <DrinksForm />
      </div>
    </div>
  );
};

export default Drinks;

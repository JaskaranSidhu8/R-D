"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import DessertForm from "@/components/QuizPages/DessertForm";

const Dessert = () => {
  return (
    <div>
      <QuizHeader progress={83} />
      <div className="flex justify-center">
        <DessertForm />
      </div>
    </div>
  );
};

export default Dessert;

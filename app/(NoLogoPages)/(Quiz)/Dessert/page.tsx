"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import DessertForm from "@/components/QuizPages/DessertForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const Dessert = () => {
  return (
    <div>
      <QuizHeader progress={75} returnLink="/Drinks" />
      <QuizTransition>
        <div className="flex justify-center">
          <DessertForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default Dessert;

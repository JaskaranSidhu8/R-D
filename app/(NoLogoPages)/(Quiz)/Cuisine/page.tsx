"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import CuisineForm from "@/components/QuizPages/CuisineForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const Cuisine = () => {
  return (
    <div>
      <QuizHeader progress={13} />
      <QuizTransition>
        <div className="flex justify-center">
          <CuisineForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default Cuisine;

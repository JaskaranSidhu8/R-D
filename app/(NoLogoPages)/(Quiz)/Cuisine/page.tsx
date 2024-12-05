"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import CuisineForm from "@/components/QuizPages/CuisineForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const Cuisine = () => {
  return (
    <div>
      <QuizHeader progress={10} />
      <QuizTransition>
        {" "}
        <CuisineForm></CuisineForm>{" "}
      </QuizTransition>
    </div>
  );
};

export default Cuisine;

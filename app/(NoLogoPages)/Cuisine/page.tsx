"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import CuisineForm from "@/components/QuizPages/CuisineForm";

const Cuisine = () => {
  return (
    <div>
      <QuizHeader progress={10} />
      <CuisineForm></CuisineForm>
    </div>
  );
};

export default Cuisine;

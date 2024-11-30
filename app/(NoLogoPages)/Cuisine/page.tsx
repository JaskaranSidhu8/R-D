"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import CuisineForm from "@/components/QuizPages/CuisineForm";

const Cuisine = () => {
  return (
    <div>
      <QuizHeader progress={23} />
      <CuisineForm></CuisineForm>
      {/* <div className="flex justify-center">
        <CuisineForm></CuisineForm>
      </div> */}
    </div>
  );
};

export default Cuisine;

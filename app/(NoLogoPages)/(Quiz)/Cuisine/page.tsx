"use client";

//import React, { useState } from "react";
import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import CuisineForm from "@/components/QuizPages/CuisineForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

// const Cuisine = () => {
//   // Initialize the bit strings at page level
//   const [bitStrings, setBitStrings] = useState({
//     cuisine_preferences: "0000000000000",
//     soft_constraints: "000000000",
//     budget: "000000",
//   });

const Cuisine = () => {
  return (
    <div>
      <QuizHeader progress={13} />
      <QuizTransition>
        <div className="flex justify-center">
          {/* <CuisineForm bitStrings={bitStrings} setBitStrings={setBitStrings} /> */}
          <CuisineForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default Cuisine;

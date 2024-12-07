"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";
import CompletedForm from "@/components/QuizPages/CompletedForm";

const Completed = () => {
  return (
    <div>
      <QuizHeader progress={100} />
      <QuizTransition>
        <div className="flex justify-center">
          <CompletedForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default Completed;

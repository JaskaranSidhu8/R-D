"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import EntertainmentForm from "@/components/QuizPages/EntertainmentForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const Entertainment = () => {
  return (
    <div>
      <QuizHeader progress={50} />
      <QuizTransition>
        <div className="flex justify-center">
          <EntertainmentForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default Entertainment;

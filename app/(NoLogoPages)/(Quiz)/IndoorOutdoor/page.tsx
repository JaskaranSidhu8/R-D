"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import IndoorOutdoorForm from "@/components/QuizPages/IndoorOutdoorForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const IndoorOutdoor = () => {
  return (
    <div>
      <QuizHeader progress={25} />
      <QuizTransition>
        <div className="flex justify-center">
          <IndoorOutdoorForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default IndoorOutdoor;

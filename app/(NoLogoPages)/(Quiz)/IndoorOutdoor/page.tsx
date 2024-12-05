"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import IndoorOutdoorForm from "@/components/QuizPages/IndoorOutdoorForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const IndoorOutdoor = () => {
  return (
    <div>
      <QuizHeader progress={20} />
      <div className="flex justify-center">
        <QuizTransition>
          {" "}
          <IndoorOutdoorForm />
        </QuizTransition>
      </div>
    </div>
  );
};

export default IndoorOutdoor;

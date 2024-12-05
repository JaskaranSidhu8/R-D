"use client";

import VibeForm from "@/components/QuizPages/VibeForm";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import React from "react";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const Vibe = () => {
  return (
    <div>
      <QuizHeader progress={30} />
      <QuizTransition>
        <VibeForm />
      </QuizTransition>
    </div>
  );
};

export default Vibe;

"use client";

import VibeForm from "@/components/QuizPages/VibeForm";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import React from "react";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

const Vibe = () => {
  return (
    <div>
      <QuizHeader progress={38} returnLink="/IndoorOutdoor" />
      <QuizTransition>
        <div className="flex justify-center">
          <VibeForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default Vibe;

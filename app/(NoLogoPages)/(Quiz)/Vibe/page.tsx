"use client";

import VibeForm from "@/components/QuizPages/VibeForm";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import React from "react";

const Vibe = () => {
  return (
    <div>
      <QuizHeader progress={30} />
      <VibeForm />
    </div>
  );
};

export default Vibe;

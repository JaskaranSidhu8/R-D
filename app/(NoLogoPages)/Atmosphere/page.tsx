"use client";

import AtmosphereForm from "@/components/QuizPages/AtmosphereForm";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import React from "react";

const Atmosphere = () => {
  return (
    <div>
      <QuizHeader progress={43} />
      <AtmosphereForm />
    </div>
  );
};

export default Atmosphere;

"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import EntertainmentForm from "@/components/QuizPages/EntertainmentForm";

const Entertainment = () => {
  return (
    <div>
      <QuizHeader progress={63} />
      <div className="flex justify-center">
        <EntertainmentForm />
      </div>
    </div>
  );
};

export default Entertainment;

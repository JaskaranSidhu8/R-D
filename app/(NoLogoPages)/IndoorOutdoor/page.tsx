"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import IndoorOutdoorForm from "@/components/QuizPages/IndoorOutdoorForm";

const IndoorOutdoor = () => {
  return (
    <div>
      <QuizHeader progress={53} />
      <IndoorOutdoorForm />
    </div>
  );
};

export default IndoorOutdoor;

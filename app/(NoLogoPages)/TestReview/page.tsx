"use client";

import React from "react";
import ReviewForm from "@/components/Home/ReviewForm";

const TestReview = () => {
  return (
    <div className="flex justify-center">
      <ReviewForm userId={1} />
    </div>
  );
};

export default TestReview;

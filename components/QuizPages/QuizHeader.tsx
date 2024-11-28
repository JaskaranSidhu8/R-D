"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import ReturnButton from "@/components/static/ReturnButton";

interface QuizHeaderProps {
  progress: number;
  returnLink?: string;
}

const QuizHeader = ({ progress, returnLink }: QuizHeaderProps) => {
  return (
    <div className="absolute top-0 left-0 right-0">
      <div className="relative flex items-center gap-3 px-6">
        <ReturnButton link={returnLink} />
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default QuizHeader;

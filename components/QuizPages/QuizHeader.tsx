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
    <div className=" pt-2">
      <div className="flex items-center ">
        <div className="w-6 h-6 flex items-center justify-center">
          <ReturnButton link={returnLink} />
        </div>
        <div className="ml-2 flex-1">
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;

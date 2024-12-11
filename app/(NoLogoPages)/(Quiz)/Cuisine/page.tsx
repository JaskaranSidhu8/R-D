"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import CuisineForm from "@/components/QuizPages/CuisineForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";

type Props = {
  searchParams: {
    groupId?: string;
  };
};

const Cuisine: React.FC<Props> = ({ searchParams }) => {
  const { groupId } = searchParams;
  return (
    <div>
      <QuizHeader progress={13} />
      <QuizTransition>
        <div className="flex justify-center">
          <CuisineForm groupId={Number(groupId)} />
        </div>
      </QuizTransition>
    </div>
  );
};

export default Cuisine;

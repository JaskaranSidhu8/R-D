"use client";

import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import CuisineForm from "@/components/QuizPages/CuisineForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";
import { useGroup } from "@/context/GroupContext";

// type Props = {
//   searchParams: {
//     groupId?: string;
//   };
// };

//const Cuisine: React.FC<Props> = ({ searchParams }) => {
const Cuisine: React.FC = () => {
  //const { groupId } = searchParams;
  const { contextGroupId } = useGroup();
  console.log("group id gotten on the page.tsx file:", contextGroupId);
  return (
    <div>
      {contextGroupId !== null ? (
        <>
          <QuizHeader progress={13} />
          <QuizTransition>
            <div className="flex justify-center">
              <CuisineForm groupId={contextGroupId} />
            </div>
          </QuizTransition>
        </>
      ) : (
        <div className="flex justify-center mt-10 text-lg font-semibold">
          You are not part of a group.
        </div>
      )}
    </div>
  );
};

export default Cuisine;

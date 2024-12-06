"use client";

//import React, { useState } from "react";
import React from "react";
import QuizHeader from "@/components/QuizPages/QuizHeader";
import IndoorOutdoorForm from "@/components/QuizPages/IndoorOutdoorForm";
import { QuizTransition } from "@/components/QuizPages/QuizTransition";
//import { useSearchParams } from "next/navigation";

// const IndoorOutdoor = () => {
//   const searchParams = useSearchParams();
//   const initialBitStrings = searchParams?.get("bitStrings")
//     ? JSON.parse(searchParams.get("bitStrings")!)
//     : {
//         cuisine_preferences: "0000000000000",
//         soft_constraints: "000000000",
//         budget: "000000",
//       };

//   const [bitStrings, setBitStrings] = useState(initialBitStrings);
//   console.log("Page level bitStrings:", bitStrings);
const IndoorOutdoor = () => {
  return (
    <div>
      <QuizHeader progress={25} />
      <QuizTransition>
        <div className="flex justify-center">
          {/* <IndoorOutdoorForm
            bitStrings={bitStrings}
            setBitStrings={setBitStrings}
          /> */}
          <IndoorOutdoorForm />
        </div>
      </QuizTransition>
    </div>
  );
};

export default IndoorOutdoor;
